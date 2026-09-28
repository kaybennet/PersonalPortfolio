import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight, Lock, X } from "lucide-react";
import { formatStarted, getHeaderPic, getImages } from "../../util/images";
import { LangBadge } from "./StandardEntry";
import ImageMasonry from "./ImageMasonry";
import CustomIcon from "../../CustomIcon";
import { fmtLatex } from "../../util/helpers";
import { ERR_IMG } from "../../util/consts";

export default function ProjectModal({
  project: p,
  open,
  onClose,
}: {
  project: PersonalProject;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  const header = getHeaderPic(p.id);
  const hasHeader = header !== ERR_IMG;

  const gallery = getImages(p.id);
  const hasBoth = Boolean(p.description) && p.learnings.length > 0;

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
      className="m-auto w-[min(76rem,calc(100%-2rem))] overflow-hidden rounded-3xl bg-background p-0 text-foreground elevate ring-1 ring-border
        opacity-0 scale-95 translate-y-4 transition-[opacity,scale,translate,display,overlay] transition-discrete duration-300 ease-smooth
        open:opacity-100 open:scale-100 open:translate-y-0
        starting:open:opacity-0 starting:open:scale-95 starting:open:translate-y-4
        backdrop:bg-black/55 backdrop:backdrop-blur-md backdrop:opacity-0 backdrop:transition-opacity backdrop:duration-300
        open:backdrop:opacity-100 starting:open:backdrop:opacity-0
        motion-reduce:transition-none"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="glass absolute right-4 top-4 z-20 grid size-10 cursor-pointer place-items-center rounded-full text-foreground/80
          transition-[scale,color] duration-200 ease-smooth hover:scale-105 hover:text-foreground
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <X size={18} />
      </button>

      <div className="max-h-[90dvh] overflow-y-auto overscroll-contain pb-10 scrollbar-thin">
        {hasHeader && (
          <div className="relative h-56 sm:h-80">
            <img
              src={header.src}
              alt=""
              className="absolute inset-0 size-full object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent"
            />
          </div>
        )}

        <header
          className={`relative px-6 sm:px-10 ${
            hasHeader ? "-mt-20" : "pt-10 sm:pt-12"
          }`}
        >
          <p className="font-mono text-sm text-muted">
            {formatStarted(p.started)}
          </p>
          <h2 className="mt-1 pr-12 font-display text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            {p.title}
          </h2>

          {p.summary && (
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-pretty text-foreground/80">
              {fmtLatex(p.summary)}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ul className="flex flex-wrap gap-2">
              {p.languages.map((lang) => (
                <LangBadge key={lang} lang={lang} />
              ))}
            </ul>

            <div className="ml-auto">
              {p.github_link ? (
                <a
                  href={p.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/gh inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background
                    shadow-glass transition-[translate,box-shadow] duration-200 ease-smooth
                    hover:-translate-y-0.5 hover:shadow-glass-hover
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                    motion-reduce:transition-none"
                >
                  <CustomIcon name="github" size={18} className="" />
                  View code
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 ease-smooth group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5"
                  />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-muted ring-1 ring-inset ring-border">
                  <Lock size={15} />
                  Private repository
                </span>
              )}
            </div>
          </div>
        </header>

        {(p.description || p.learnings.length > 0) && (
          <div
            className={`mt-10 grid items-start gap-8 px-6 sm:px-10 lg:gap-12 ${
              hasBoth ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : ""
            }`}
          >
            {p.description && (
              <section>
                <SectionTitle>About</SectionTitle>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-pretty text-foreground/85">
                  {fmtLatex(p.description)}
                </p>
              </section>
            )}

            {p.learnings.length > 0 && (
              <section
                className="group/learn glass relative isolate rounded-2xl p-6 lg:sticky lg:top-6
                  [--glass-tint:color-mix(in_oklab,var(--surface)_70%,transparent)]
                  transition-[translate,box-shadow] duration-500 ease-smooth
                  hover:-translate-y-1 hover:[--glass-drop:0_18px_40px_-12px_rgb(0_0_0/0.45)]
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* Sheen sweep, clipped to the card */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
                >
                  <span
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent dark:via-white/8
                      transition-transform duration-1000 ease-smooth group-hover/learn:translate-x-full motion-reduce:hidden"
                  />
                </span>

                <SectionTitle>What I learned</SectionTitle>
                <ul className="mt-5 space-y-4">
                  {p.learnings.map((l) => (
                    <li
                      key={l}
                      className="group/item flex gap-3 leading-snug text-foreground/85 transition-colors duration-300 hover:text-foreground"
                    >
                      <span
                        className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary
                          transition-[scale,rotate,background-color] duration-300 ease-smooth
                          group-hover/item:scale-110 group-hover/item:-rotate-6 group-hover/item:bg-primary/20
                          motion-reduce:transition-none"
                      >
                        <CustomIcon name="idea" size={15} className="" />
                      </span>
                      <span className="pt-1">{fmtLatex(l)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {gallery.length > 0 && (
          <section className="mt-12 px-6 sm:px-10">
            <SectionTitle>
              Gallery
              <span className="font-mono normal-case tracking-normal text-muted/70">
                {gallery.length}
              </span>
            </SectionTitle>
            <div className="mt-5">
              <ImageMasonry images={gallery} title={p.title} />
            </div>
          </section>
        )}
      </div>
    </dialog>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
      <span aria-hidden className="h-px w-6 bg-primary" />
      {children}
    </h3>
  );
}
