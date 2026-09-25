import { useEffect, useRef } from "react";
import { formatStarted, getImages } from "./ProjectImages";
import { LangBadge } from "./StandardEntry";
import ImageMasonry from "./ImageMasonry";
import CustomIcon from "../../CustomIcon";
import { fmtLatex } from "../../util/helpers";

type Props = {
  project: PersonalProject;
  open: boolean;
  onClose: () => void;
};

export default function ProjectModal({ project: p, open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const images = getImages(p.id);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[min(76rem,calc(100%-2rem))] overflow-hidden rounded-2xl bg-background p-0 text-foreground shadow-2xl
        opacity-0 scale-95 transition-[opacity,scale,display,overlay] transition-discrete duration-200 ease-out
        open:opacity-100 open:scale-100 starting:open:opacity-0 starting:open:scale-95
        backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:opacity-0 backdrop:transition-opacity backdrop:duration-200
        open:backdrop:opacity-100 starting:open:backdrop:opacity-0"
    >
      <div className="max-h-[90dvh] overflow-y-auto p-6 sm:p-10">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted">
              <span>{formatStarted(p.started)}</span>
            </div>
            <div className="flex">
              <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
                {p.title}
                <span className="absolute left-full top-1/2 ml-5 mt-0.5 -translate-y-1/2">
                  {p.github_link ? (
                    <a
                      href={p.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${p.title} on GitHub`}
                      className="group/gh relative flex rounded-lg p-1.5 text-foreground/70 transition-all duration-200
                        hover:scale-110 hover:bg-surface hover:text-foreground
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <CustomIcon size={32} name="github" />
                      <Tooltip text="View on GitHub" />
                    </a>
                  ) : (
                    <span
                      tabIndex={0}
                      aria-label="Repository is private"
                      className="group/gh relative flex cursor-not-allowed rounded-lg p-1.5 text-muted opacity-40 transition-opacity duration-200
                        hover:opacity-60 focus-visible:outline-none focus-visible:opacity-60"
                    >
                      <CustomIcon size={32} name="github" />
                      <Tooltip text="Repo private" />
                    </span>
                  )}
                </span>
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 shrink-0 cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        {p.summary && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/80">
            {fmtLatex(p.summary)}
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-2">
          {p.languages.map((lang) => (
            <LangBadge key={lang} lang={lang} />
          ))}
        </ul>

        {(p.description || p.learnings.length > 0) && (
          <div
            className={`mt-10 grid items-start gap-8 lg:gap-12 ${
              p.description && p.learnings.length > 0
                ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
                : ""
            }`}
          >
            {p.description && (
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  About
                </h3>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/85">
                  {fmtLatex(p.description)}
                </p>
              </section>
            )}

            {p.learnings.length > 0 && (
              <section className="rounded-xl bg-surface p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                  What I learned
                </h3>
                <ul className="mt-4 space-y-3">
                  {p.learnings.map((l) => (
                    <li
                      key={l}
                      className="flex gap-2 leading-snug text-foreground/85"
                    >
                      <CustomIcon name="idea" size={20} className="mb-0.5" />
                      <span>{fmtLatex(l)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
        {images.length > 0 && (
          <div className="mt-8">
            <ImageMasonry images={images} title={p.title} />
          </div>
        )}
      </div>
    </dialog>
  );
}

function Tooltip({ text }: { text: string }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1
        text-xs font-medium tracking-normal text-background opacity-0 -translate-x-1 transition-all duration-200
        group-hover/gh:translate-x-0 group-hover/gh:opacity-100 group-focus-visible/gh:translate-x-0 group-focus-visible/gh:opacity-100"
    >
      {text}
    </span>
  );
}
