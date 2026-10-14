import type { CSSProperties } from "react";
import { COURSES, EXPERIENCE_INTRO } from "../../content";

const card =
  "glass glass-hover relative flex items-center gap-4 rounded-2xl p-5 cursor-default " +
  "[--glass-lift:-0.25rem] " +
  "[--glass-tint:color-mix(in_oklab,var(--c)_7%,color-mix(in_oklab,var(--surface)_12%,transparent))] " +
  "[--glass-tint-hover:color-mix(in_oklab,var(--c)_14%,color-mix(in_oklab,var(--surface)_30%,transparent))]";

export default function Experience() {
  return (
    <section className="py-4 max-md:py-2">
      <h2 className="section-title-center">
        Experience
      </h2>
      <p className="section-subtitle max-md:text-center">
        {EXPERIENCE_INTRO}
      </p>

      <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COURSES.map((c) => (
          <li
            key={c.name}
            className={card}
            style={{ "--c": c.color } as CSSProperties}
          >
            <div className="min-w-0">
              <p className="font-semibold">{c.name}</p>
              <p className="mt-0.5 text-sm text-muted">{c.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
