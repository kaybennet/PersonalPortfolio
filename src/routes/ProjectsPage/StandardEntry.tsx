import { useMemo, useState, type CSSProperties } from "react";
import { formatStarted, getCover, getImages } from "../../util/images";
import { LangIcon } from "../../CustomIcon";
import ProjectModal from "./ProjectModal";
import ImageStack, { buildGallery } from "../../shared/ImageStack";

/** Renders projects as a timeline, newest first. */
export function ProjectTimeline({ projects }: { projects: PersonalProject[] }) {
  const sorted = useMemo(
    () =>
      [...projects].sort((a, b) => b.started.getTime() - a.started.getTime()),
    [projects],
  );

  return (
    <ol className="flex flex-col">
      {sorted.map((p) => (
        <StandardEntry key={p.id} project={p} />
      ))}
    </ol>
  );
}

export function StandardEntry({ project: p }: { project: PersonalProject }) {
  const gallery = buildGallery(getCover(p.id), getImages(p.id));
  const hasImages = gallery.length > 0;
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  // Keep the arrow glued to the last word so it never wraps onto its own line.
  const words = p.title.trim().split(/\s+/);
  const lastWord = words.pop();
  const leadingWords = words.length ? words.join(" ") + " " : "";

  return (
    <li
      className={`group relative isolate grid gap-x-8 gap-y-1.5 py-5
        border-t border-border first:border-t-0 sm:border-t-0
        sm:grid-cols-[6rem_1fr] sm:items-baseline sm:py-6
        ${hasImages ? "lg:grid-cols-[6rem_1fr_11rem]" : ""}
        before:absolute before:-inset-x-3 before:inset-y-1 before:-z-10 before:rounded-2xl
        before:transition-colors before:duration-300 before:ease-out
        hover:before:bg-surface/60 has-focus-visible:before:bg-surface/60
        motion-reduce:before:transition-none`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-28 hidden w-px -translate-x-1/2 bg-border sm:block
          group-first:bg-transparent group-first:bg-linear-to-b group-first:from-transparent group-first:to-border
          group-last:bg-transparent group-last:bg-linear-to-b group-last:from-border group-last:to-transparent
          group-only:hidden"
      />

      <time
        dateTime={p.started.toISOString()}
        className="relative text-sm tabular-nums text-muted transition-colors duration-300
          group-hover:text-foreground sm:text-right motion-reduce:transition-none
          sm:after:absolute sm:after:top-1/2 sm:after:-right-4 sm:after:size-2.5
          sm:after:translate-x-1/2 sm:after:-translate-y-1/2 sm:after:rounded-full
          sm:after:bg-background sm:after:ring-2 sm:after:ring-border
          sm:after:transition-[background-color,box-shadow] sm:after:duration-300
          sm:group-hover:after:bg-primary sm:group-hover:after:ring-primary/30
          motion-reduce:after:transition-none"
      >
        {formatStarted(p.started)}
      </time>

      <div className="min-w-0">
        <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-[1.75rem] sm:leading-tight">
          <button
            type="button"
            onClick={openModal}
            className="cursor-pointer text-left transition-colors duration-300 group-hover:text-primary
              focus-visible:outline-none motion-reduce:transition-none
              after:absolute after:-inset-x-3 after:inset-y-1 after:rounded-2xl
              focus-visible:after:ring-2 focus-visible:after:ring-primary"
          >
            {leadingWords}
            <span className="whitespace-nowrap">
              {lastWord}
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="ml-2 inline-block size-[0.6em] -translate-x-1 align-[0.05em] opacity-0
                  transition-[opacity,translate] duration-300 ease-out
                  group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </button>
        </h2>

        {p.summary && (
          <p className="mt-2.5 line-clamp-3 max-w-prose leading-relaxed text-pretty text-muted">
            {p.summary}
          </p>
        )}

        {p.languages.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Languages">
            {p.languages.map((lang) => (
              <LangBadge key={lang} lang={lang} />
            ))}
          </ul>
        )}
      </div>

      {hasImages && (
        <ImageStack
          images={gallery}
          title={p.title}
          onOpen={openModal}
          className="mt-3 max-w-44 self-start sm:col-start-2 lg:col-start-auto lg:-my-2 lg:mt-0 lg:max-w-none"
        />
      )}

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
      className="inline-flex items-center gap-1.5 rounded-full bg-(--lang)/10 px-2.5 py-1 text-xs font-medium
        text-(--lang) ring-1 ring-inset ring-(--lang)/20"
    >
      <LangIcon lang={lang} size={12} aria-hidden="true" />
      {lang}
    </li>
  );
}
