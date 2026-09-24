import { formatStarted, getImages } from "./ProjectImages";
import { LangIcon } from "../../CustomIcon";
import type { CSSProperties } from "react";

export function StandardEntry({ project: p }: { project: PersonalProject }) {
  const images = getImages(p.id);

  return (
    <li className="grid gap-3 border-t border-border py-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
      <span className="text-sm font-medium text-muted">
        {formatStarted(p.started)}
      </span>

      <div className="min-w-0">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {p.title}
        </h2>
        {p.summary && (
          <p className="mt-2 max-w-2xl leading-relaxed text-foreground/75">
            {p.summary}
          </p>
        )}

        <ul className="mt-4 flex flex-wrap gap-2">
          {p.languages.map((lang) => (
            <LangBadge key={lang} lang={lang} />
          ))}
        </ul>

        {images.length > 0 && (
          <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
            {images.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={`${p.title}: ${img.name}`}
                loading="lazy"
                className="h-36 w-auto shrink-0 rounded-lg bg-surface shadow-sm ring-1 ring-border"
              />
            ))}
          </div>
        )}
      </div>
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
