import type { CSSProperties } from "react";

const glass =
  "elevate backdrop-blur-3xl backdrop-saturate-150 " +
  "bg-[color-mix(in_oklab,var(--c)_7%,color-mix(in_oklab,var(--surface)_12%,transparent))] " +
  "ring-3 ring-inset ring-[color-mix(in_oklab,var(--c)_18%,rgb(255_255_255/0.25))] " +
  "dark:ring-[color-mix(in_oklab,var(--c)_22%,rgb(255_255_255/0.06))] " +
  "inset-shadow-[0_1px_0_rgb(255_255_255/0.55)] dark:inset-shadow-[0_1px_0_rgb(255_255_255/0.1)] " +
  "transition-[translate,box-shadow] duration-300 ease-smooth " +
  "hover:-translate-y-1 hover:shadow-glass-hover " +
  "hover:ring-[color-mix(in_oklab,var(--c)_35%,rgb(255_255_255/0.3))] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const courses = [
  {
    name: "Programming II",
    detail: "Teaching OOP via Java",
    color: "var(--lang-java)",
  },
  {
    name: "Fundamentals of Computer Science",
    detail: "Teaching C and Python",
    color: "var(--lang-python)",
  },
  {
    name: "Human-Computer Interaction",
    detail: "JavaScript, design and evaluation",
    color: "var(--lang-javascript, #f7df1e)",
  },
  {
    name: "Fundamentals of Digital Systems",
    detail: "Binary logic and hardware components",
    color: "var(--primary)",
  },
];

export default function Experience() {
  return (
    <section className="py-4">
      <h2 className="font-display text-3xl font-bold tracking-tight">
        Experience
      </h2>
      <p className="mt-6 text-lg text-foreground/80">
        Since 2024 I've tutored for different computer science courses at the
        university.
      </p>

      <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((c) => (
          <li
            key={c.name}
            className={`group flex items-center gap-4 rounded-2xl p-5 ${glass}`}
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
