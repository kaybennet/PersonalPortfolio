import type { CSSProperties } from "react";
import { LangIcon } from "../../CustomIcon";
import { formatStarted } from "./ProjectImages";

export function CompactEntry({ project: p }: { project: PersonalProject }) {
  return (
    <li className="flex items-center gap-4 border-t border-border py-3">
      <span className="w-20 shrink-0 text-sm tabular-nums text-muted">
        {formatStarted(p.started)}
      </span>
      <h2 className="min-w-0 flex-1 truncate font-medium text-foreground">
        {p.title}
      </h2>
      <ul className="hidden shrink-0 gap-1.5 sm:flex">
        {p.languages.map((lang) => (
          <LangBadge key={lang} lang={lang} />
        ))}
      </ul>
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
      className="inline-flex items-center gap-1.5 rounded-md bg-(--lang)/10 px-2 py-1 text-xs font-medium text-(--lang) ring-1 ring-inset ring-(--lang)/25"
    >
      <LangIcon lang={lang} size={13} className="" />
      {lang}
    </li>
  );
}
