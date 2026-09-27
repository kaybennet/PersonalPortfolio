import { useState } from "react";
import CustomIcon, { LangIcon } from "../../CustomIcon";
import { getImages } from "../ProjectsPage/ProjectImages";
import ProjectModal from "../ProjectsPage/ProjectModal";
import { LangBadge } from "../ProjectsPage/StandardEntry";

export function ProjectCard({ project: p }: { project: PersonalProject }) {
  const [open, setOpen] = useState(false);
  const cover = getImages(p.id)[p.thumbnail ?? 0];

  return (
    <>
      <article className="group relative isolate h-76 transform-gpu overflow-hidden rounded-2xl bg-surface elevate transition-[translate,box-shadow] duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/20 focus-within:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        {cover ? (
          <img
            src={cover.src}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full scale-100 object-cover object-top transition-[scale,filter] duration-700 ease-smooth will-change-transform group-hover:scale-105 group-hover:blur-[3px] motion-reduce:transition-none"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-linear-to-br from-primary/30 via-surface to-surface text-muted">
            <LangIcon
              lang={p.languages[0]}
              size={72}
              className="-translate-y-10 opacity-40 transition-[scale,filter] duration-700 ease-smooth group-hover:scale-110 group-hover:blur-[2px] motion-reduce:transition-none"
            />
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-smooth group-hover:translate-x-full motion-reduce:hidden"
        />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open details for ${p.title}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        />

        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 transform-gpu rounded-xl bg-background/45 bg-linear-to-b from-white/25 to-white/5 p-5 shadow-glass backdrop-blur-2xl backdrop-saturate-[1.8] transition-[translate,background-color,box-shadow] duration-500 ease-smooth group-hover:-translate-y-2 group-hover:bg-background/60 group-hover:shadow-glass-hover group-focus-within:-translate-y-2 group-focus-within:shadow-glass-hover dark:from-white/10 dark:to-transparent motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-sm text-muted">
                {p.started.getFullYear()}
              </p>
              <h3 className="font-display text-xl font-bold transition-colors duration-500 ease-smooth group-hover:text-primary">
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
                className="pointer-events-auto grid size-9 shrink-0 place-items-center rounded-lg text-muted transition-colors duration-300 hover:bg-surface/60 hover:text-foreground"
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
                  <p className="pt-4 leading-relaxed text-foreground/80">
                    {p.summary}
                  </p>
                )}
                <ul className="flex flex-wrap gap-2 pt-4 pb-1">
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
