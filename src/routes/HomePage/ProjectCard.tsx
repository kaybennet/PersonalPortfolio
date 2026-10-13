import { useState } from "react";
import CustomIcon, { LangIcon } from "../../CustomIcon";
import { getMainCover, prefetchProject } from "../../util/images";
import ProjectModal from "../ProjectsPage/ProjectModal";
import { LangBadge } from "../ProjectsPage/StandardEntry";
import BlurImage from "../../shared/BlurImage";

export function ProjectCard({ project: p }: { project: PersonalProject }) {
  const [open, setOpen] = useState(false);
  const cover = getMainCover(p.id);

  return (
    <>
      <article
        onPointerEnter={() => prefetchProject(p.id)}
        onPointerDown={() => prefetchProject(p.id)}
        onFocus={() => prefetchProject(p.id)}
        className={
          "group relative isolate h-76 max-md:h-64 transform-gpu overflow-hidden rounded-2xl bg-surface elevate " +
          "transition-[translate,box-shadow] duration-500 ease-smooth " +
          "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/20 focus-within:-translate-y-1.5 " +
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
          // Hairline edge on the card itself
          "after:pointer-events-none after:absolute after:inset-0 after:z-30 after:rounded-[inherit] "
        }
      >
        {cover ? (
          <BlurImage
            img={cover}
            priority
            className="absolute inset-0 size-full object-cover object-top transition-[scale] duration-700 ease-smooth will-change-transform group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-linear-to-br from-primary/30 via-surface to-surface text-muted">
            <LangIcon
              lang={p.languages[0]}
              size={72}
              className="-translate-y-10 opacity-40 transition-[scale] duration-700 ease-smooth group-hover:scale-110 motion-reduce:transition-none"
            />
          </div>
        )}

        {/* Bottom scrim so the glass reads on bright images */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent"
        />

        {/* Sheen sweep */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-smooth group-hover:translate-x-full motion-reduce:hidden"
        />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open details for ${p.title}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        />

        <div className="glass glass-hover pointer-events-none absolute inset-x-3 bottom-3 z-20 transform-gpu rounded-xl p-5 max-md:p-3.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-sm text-muted">
                {p.started.getFullYear()}
              </p>
              <h3 className="font-display text-xl font-bold max-md:text-lg transition-colors duration-500 ease-smooth group-hover:text-primary">
                {p.title}
              </h3>
            </div>

            {p.github_link && (
              <a
                href={p.github_link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.title} on GitHub`}
                title="View code on GitHub"
                className="pointer-events-auto grid size-9 shrink-0 place-items-center rounded-lg text-muted ring-1 ring-inset ring-transparent transition-[color,background-color,box-shadow] duration-300 hover:bg-white/20 hover:text-foreground hover:ring-white/30 dark:hover:bg-white/10 dark:hover:ring-white/15"
              >
                <CustomIcon name="github" size={20} className="" />
              </a>
            )}
          </div>

          {/* Height expands first… */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-smooth group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr] pointer-coarse:grid-rows-[1fr] motion-reduce:transition-none">
            <div className="min-h-0 overflow-hidden">
              {/* …then content fades and slides in */}
              <div className="translate-y-3 opacity-0 transition-[opacity,translate] duration-400 ease-smooth group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:delay-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100 motion-reduce:transition-none">
                {p.summary && (
                  <p className="pt-3 text-sm leading-relaxed text-foreground/85 max-md:line-clamp-3 md:pt-4 md:text-base">
                    {p.summary}
                  </p>
                )}
                <ul className="flex flex-wrap gap-2 pt-4 pb-1 max-md:gap-1.5 max-md:pt-2.5 max-md:pb-0">
                  {p.languages.map((lang) => (
                    <LangBadge key={lang} lang={lang} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>

      <ProjectModal project={p} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
