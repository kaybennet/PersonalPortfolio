import type { CSSProperties } from "react";

const card =
  "glass glass-hover relative flex items-center gap-4 rounded-2xl p-5 cursor-default " +
  "[--glass-lift:-0.25rem] " +
  "[--glass-tint:color-mix(in_oklab,var(--c)_7%,color-mix(in_oklab,var(--surface)_12%,transparent))] " +
  "[--glass-tint-hover:color-mix(in_oklab,var(--c)_14%,color-mix(in_oklab,var(--surface)_30%,transparent))]";

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
    color: "var(--lang-javascript)",
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
      <p className="mt-2 text-lg text-foreground/80">
        Since 2024 I've tutored for different computer science courses at the
        university.
      </p>

      <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((c) => (
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
