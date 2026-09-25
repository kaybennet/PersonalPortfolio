import { useState, type CSSProperties } from "react";
import { formatStarted, getImages } from "./ProjectImages";
import CustomIcon, { LangIcon } from "../../CustomIcon";
import ProjectModal from "./ProjectModal";
import AssessmentBadge from "./SelfAssessmentBadge";
export function StandardEntry({ project: p }: { project: PersonalProject }) {
  const images = getImages(p.id);
  const [open, setOpen] = useState(false);

  return (
    <li
      className="group relative isolate grid gap-3 border-t border-border py-8 sm:grid-cols-[9rem_1fr] sm:gap-8
        before:absolute before:inset-x-0 before:inset-y-2 before:-z-10 before:rounded-xl before:bg-surface/0
        before:transition-colors before:duration-300 before:ease-out hover:before:bg-surface/70 px-4"
    >
      <span className="text-sm font-medium text-muted flex flex-row gap-2">
        <CustomIcon name="calendar" />
        {formatStarted(p.started)}
      </span>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="cursor-pointer text-left transition-colors duration-300 group-hover:text-primary
                focus-visible:outline-none
                after:absolute after:inset-x-0 after:inset-y-2 after:rounded-xl
                focus-visible:after:ring-2 focus-visible:after:ring-primary"
            >
              {p.title}
            </button>
          </h2>

          {(p.time_spent !== undefined || p.difficulty !== undefined) && (
            <div className="flex shrink-0 flex-col">
              <AssessmentBadge project={p} />
            </div>
          )}
        </div>

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
          // z-10 keeps the row scrollable above the stretched button
          <div
            onClick={() => setOpen(true)}
            className="relative z-10 mt-5 flex cursor-pointer gap-3 overflow-x-auto pb-1"
          >
            {images.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={`${p.title}: ${img.name}`}
                loading="lazy"
                className="h-36 w-auto shrink-0 rounded-lg bg-surface shadow-sm ring-1 ring-border
                  transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              />
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={p} open={open} onClose={() => setOpen(false)} />
    </li>
  );
}

const langSlug = (lang: ProgrammingLanguage) =>
  lang.toLowerCase().replace("++", "pp").replace("#", "sharp");

export function LangBadge({ lang }: { lang: ProgrammingLanguage }) {
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
