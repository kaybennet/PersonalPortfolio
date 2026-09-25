import type { ReactNode } from "react";

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

export function fmtLatex(s: string): ReactNode[] {
  let i = 0;
  let key = 0;

  const parse = (insideGroup: boolean): ReactNode[] => {
    const out: ReactNode[] = [];
    let buf = "";
    const flush = () => {
      if (buf) out.push(buf);
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
