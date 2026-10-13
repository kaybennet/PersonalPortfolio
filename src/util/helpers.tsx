import { useEffect, type ReactNode, type RefObject } from "react";
import { LINKS } from "../content";

const COMMANDS: Record<
  string,
  (children: ReactNode[], key: number) => ReactNode
> = {
  textbf: (c, k) => (
    <strong key={k} className="font-semibold text-foreground">
      {c}
    </strong>
  ),
  textit: (c, k) => <em key={k}>{c}</em>,
  underline: (c, k) => (
    <u key={k} className="underline-offset-2">
      {c}
    </u>
  ),
  texttt: (c, k) => (
    <code
      key={k}
      className="rounded bg-surface px-1 py-0.5 font-mono text-[0.9em]"
    >
      {c}
    </code>
  ),
};

/** Calls `onNear` once, when the element comes within `rootMargin` of the viewport. */
export function useNearViewport(
  ref: RefObject<Element | null>,
  onNear: () => void,
  rootMargin = "800px",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        onNear();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, onNear, rootMargin]);
}

/** Bare URLs in plain text; trailing punctuation is left out of the link. */
const URL_RE = /\b((?:https?:\/\/|www\.)[^\s<>"]*[^\s<>".,;:!?)\]'])/g;

/** Only allow http(s) and mailto links, so `javascript:` etc. can't sneak in. */
const safeHref = (url: string): string | null => {
  const u = url.trim();
  if (/^(https?:|mailto:)/i.test(u)) return u;
  if (/^www\./i.test(u)) return `https://${u}`;
  return null;
};

function Link({ href, children }: { href: string; children: ReactNode }) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      // Don't trigger parent click handlers (e.g. a card that opens a modal).
      onClick={(e) => e.stopPropagation()}
      // relative z-10: sit above stretched-link overlays so the link stays clickable.
      className="relative z-10 text-primary underline decoration-primary/40 underline-offset-2
        transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  );
}

/**
 * Renders a small LaTeX subset as React nodes:
 * \textbf{}, \textit{}, \underline{}, \texttt{}, \url{url}, \href{url}{text},
 * escapes \{ \} \\, and auto-links bare https:// / www. URLs.
 */
export function fmtLatex(s: string): ReactNode[] {
  let i = 0;
  let key = 0;

  /** Reads a {...} argument verbatim (no command parsing), honouring \{ \} and nesting. */
  const readRaw = (): string => {
    let depth = 1;
    let raw = "";
    while (i < s.length) {
      const ch = s[i];
      if (ch === "\\" && (s[i + 1] === "{" || s[i + 1] === "}")) {
        raw += s[i + 1];
        i += 2;
        continue;
      }
      if (ch === "{") depth++;
      if (ch === "}" && --depth === 0) {
        i++;
        break;
      }
      raw += ch;
      i++;
    }
    return raw;
  };

  /** Plain text → strings + auto-linked URLs. */
  const linkify = (text: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(URL_RE)) {
      const href = safeHref(m[0]);
      if (!href || m.index === undefined) continue;
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(
        <Link key={key++} href={href}>
          {m[0]}
        </Link>,
      );
      last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };

  const parse = (insideGroup: boolean): ReactNode[] => {
    const out: ReactNode[] = [];
    let buf = "";
    const flush = () => {
      if (buf) out.push(...linkify(buf));
      buf = "";
    };

    while (i < s.length) {
      const ch = s[i];

      if (ch === "}" && insideGroup) {
        i++;
        break;
      }

      if (ch === "\\") {
        const m = /^\\([a-zA-Z]+)\{/.exec(s.slice(i));

        if (m && (m[1] === "url" || m[1] === "href")) {
          flush();
          i += m[0].length;
          const url = readRaw();
          // `@key` refers to an entry of the site links table (content/site.toml)
          const href = url.startsWith("@")
            ? (LINKS[url.slice(1)] ?? null)
            : safeHref(url);
          let label: ReactNode[] = [url];
          if (m[1] === "href" && s[i] === "{") {
            i++;
            label = parse(true);
          }
          out.push(
            href ? (
              <Link key={key++} href={href}>
                {label}
              </Link>
            ) : (
              <span key={key++}>{label}</span>
            ),
          );
          continue;
        }

        if (m && COMMANDS[m[1]]) {
          flush();
          i += m[0].length;
          out.push(COMMANDS[m[1]](parse(true), key++));
          continue;
        }

        const next = s[i + 1];
        if (next === "{" || next === "}" || next === "\\") {
          buf += next;
          i += 2;
          continue;
        }
      }

      buf += ch;
      i++;
    }

    flush();
    return out;
  };

  return parse(false);
}
