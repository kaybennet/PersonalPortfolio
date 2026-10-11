import { useState } from "react";
import { getCover } from "../../util/images";
import BlurImage from "../../shared/BlurImage";
import ProjectModal from "./ProjectModal";

const ease =
  "ease-[cubic-bezier(0.22,1,0.36,1)] duration-700 motion-reduce:transition-none";

export function GridEntry({ project: p }: { project: PersonalProject }) {
  const cover = getCover(p.id);
  const [open, setOpen] = useState(false);

  return (
    <li className="group relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`elevate relative isolate block aspect-4/3 w-full cursor-pointer overflow-hidden rounded-2xl bg-surface text-left
          transform-gpu transition-[translate,box-shadow] ${ease}
          hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.45)]
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
      >
        {cover ? (
          <BlurImage
            img={cover}
            loading="lazy"
            wrapperClassName={`size-full transform-gpu backface-hidden will-change-transform
              transition-[scale] ${ease} group-hover:scale-[1.035]`}
            className="size-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-full place-items-center bg-surface text-6xl font-semibold tracking-tight text-muted/40"
          >
            {p.title.charAt(0)}
          </span>
        )}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent
            opacity-0 -translate-x-1/4 transition-[opacity,translate] ${ease}
            group-hover:translate-x-0 group-hover:opacity-100`}
        />

        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/30 to-transparent
            opacity-50 transition-opacity ${ease} group-hover:opacity-90`}
        />

        <div
          className={`absolute inset-x-2 bottom-2 rounded-lg px-3 py-2 transform-gpu will-change-transform
            transition-[translate] ${ease} group-hover:-translate-y-1 glass`}
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="truncate text-md font-semibold tracking-tight text-foreground text-wrap">
              {p.title}
            </h2>
            <time
              dateTime={p.started.toISOString()}
              className="shrink-0 text-sm font-medium tabular-nums text-foreground/60"
            >
              {p.started.getFullYear()}
            </time>
          </div>

          {p.summary && (
            <div
              className={`grid grid-rows-[0fr] transition-[grid-template-rows] ${ease}
                group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]`}
            >
              <p className="overflow-hidden">
                <span
                  className={`block pt-1 text-sm leading-relaxed text-foreground/70 line-clamp-2
                    opacity-0 translate-y-1 transition-[opacity,translate] ${ease}
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-100
                    group-focus-visible:opacity-100 group-focus-visible:translate-y-0`}
                >
                  {p.summary}
                </span>
              </p>
            </div>
          )}
        </div>
      </button>

      <ProjectModal project={p} open={open} onClose={() => setOpen(false)} />
    </li>
  );
}
