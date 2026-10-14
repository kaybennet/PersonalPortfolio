import { useState, type CSSProperties } from "react";
import { LangIcon } from "../../CustomIcon";
import { formatStarted, prefetchProject } from "../../util/images";
import ProjectModal from "./ProjectModal";

export function CompactEntry({ project: p }: { project: PersonalProject }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      onPointerEnter={() => prefetchProject(p.id)}
      onPointerDown={() => prefetchProject(p.id)}
      onFocus={() => prefetchProject(p.id)}
      className="relative -mx-2 flex items-center gap-4 border-t border-border px-2 py-3 transition-colors
        hover:bg-surface has-focus-visible:ring-2 has-focus-visible:ring-primary"
    >
      <span className="w-20 shrink-0 text-sm tabular-nums text-muted">
        {formatStarted(p.started)}
      </span>
      <h2 className="min-w-0 flex-1 truncate font-semibold text-foreground">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="cursor-pointer text-left focus-visible:outline-none after:absolute after:inset-0"
        >
          {p.title}
        </button>
      </h2>
      <ul className="hidden shrink-0 gap-1.5 sm:flex">
        {p.languages.map((lang) => (
          <LangBadge key={lang} lang={lang} />
        ))}
      </ul>

      <ProjectModal project={p} open={open} onClose={() => setOpen(false)} />
    </li>
  );
}

const langSlug = (lang: ProgrammingLanguage) =>
  lang.toLowerCase().replace("++", "pp").replace("#", "sharp");

function LangBadge({ lang }: { lang: ProgrammingLanguage }) {
  return (
    <li
      style={
        {
          "--lang": `var(--lang-${langSlug(lang)}, var(--muted))`,
        } as CSSProperties
      }
      className="lang-chip rounded-md px-2 ring-(--lang)/25"
    >
      <LangIcon lang={lang} size={15} className="shrink-0 overflow-visible" />
      {lang}
    </li>
  );
}
