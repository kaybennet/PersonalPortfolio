import { useState, type CSSProperties } from "react";
import { formatStarted, getCover, getImages } from "../../util/images";
import CustomIcon, { LangIcon } from "../../CustomIcon";
import ProjectModal from "./ProjectModal";
import ImageStack, { buildGallery } from "../../shared/ImageStack";

export function StandardEntry({ project: p }: { project: PersonalProject }) {
  const gallery = buildGallery(getCover(p.id), getImages(p.id));
  const hasImages = gallery.length > 0;
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  return (
    <li
      className={`group relative isolate grid gap-3 border-t border-border px-4 py-8
        sm:grid-cols-[9rem_1fr] sm:gap-8
        ${hasImages ? "lg:grid-cols-[9rem_1fr_15rem]" : ""}
        before:absolute before:inset-x-0 before:inset-y-2 before:-z-10 before:rounded-xl before:bg-surface/0
        before:transition-colors before:duration-300 before:ease-out hover:before:bg-surface/70
        motion-reduce:before:transition-none`}
    >
      <span className="flex flex-row gap-2 text-sm font-medium text-muted">
        <CustomIcon name="calendar" />
        {formatStarted(p.started)}
      </span>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            <button
              type="button"
              onClick={openModal}
              className="cursor-pointer text-left transition-colors duration-300 group-hover:text-primary
                focus-visible:outline-none
                after:absolute after:inset-x-0 after:inset-y-2 after:rounded-xl
                focus-visible:after:ring-2 focus-visible:after:ring-primary"
            >
              {p.title}
            </button>
          </h2>

          {/*{(p.time_spent !== undefined || p.difficulty !== undefined) && (
            <div className="flex shrink-0 flex-col">
              <AssessmentBadge project={p} />
            </div>
          )}*/}
        </div>

        {p.summary && (
          <p className="mt-1 max-w-2xl leading-relaxed text-muted">
            {p.summary}
          </p>
        )}

        <ul className="mt-4 flex flex-wrap gap-2">
          {p.languages.map((lang) => (
            <LangBadge key={lang} lang={lang} />
          ))}
        </ul>
      </div>

      <ImageStack images={gallery} title={p.title} onOpen={openModal} />

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
      <LangIcon lang={lang} size={13} aria-hidden="true" />
      {lang}
    </li>
  );
}
