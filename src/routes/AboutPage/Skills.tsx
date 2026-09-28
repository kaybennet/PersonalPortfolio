import { useEffect, useRef, useState } from "react";
import { LangIcon } from "../../CustomIcon";
import { fmtLatex } from "../../util/helpers";

const skills = [
  {
    group: "Machine learning",
    items: ["PyTorch", "Pandas", "Jupyter", "Matplotlib"],
  },
  { group: "Web", items: ["React", "Tailwind", "AWS", "Vite", "NodeJS"] },
  {
    group: "Spoken Languages",
    items: ["English (C1)", "German (Native)", "Spanish (A2)"],
  },
];

const proficiency: { lang: ProgrammingLanguage; level: number }[] = [
  { lang: "Python", level: 80 },
  { lang: "TypeScript", level: 80 },
  { lang: "Java", level: 65 },
  { lang: "Rust", level: 60 },
  { lang: "C", level: 35 },
];

const chip =
  "rounded-xl bg-surface/60 px-4 py-1.5 text-sm font-medium " +
  "backdrop-blur-xl backdrop-saturate-150 " +
  "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.4),0_2px_8px_-2px_rgb(0_0_0/0.12)] " +
  "dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.08),0_2px_8px_-2px_rgb(0_0_0/0.45)] " +
  "transition-[color,background-color,translate] duration-200 ease-smooth " +
  "hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary motion-reduce:transition-none cursor-default";

const langColor = (lang: ProgrammingLanguage) =>
  `var(--lang-${
    lang === "C++" ? "cpp" : lang === "C#" ? "csharp" : lang.toLowerCase()
  })`;

const clamp = (n: number) => Math.min(100, Math.max(0, n));

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export default function Skills() {
  const [barsRef, barsVisible] = useInView<HTMLUListElement>();

  return (
    <section className="grid gap-10 py-16 md:grid-cols-3">
      <div className="md:col-span-2">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          What I work with
        </h2>

        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="font-semibold text-muted">{s.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {s.items.map((item) => (
                  <li key={item} className={chip}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-foreground/80">
          {fmtLatex(
            "Furthermore, I enjoy competitive programming in the form of \\textbf{LeetCode} or \\textbf{Advent of Code}. To that end, I have dabbled in several other programming languages, including \\textbf{C++}, \\textbf{Go} and \\textbf{C#}.",
          )}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-muted">
          Self-assessed coding language proficiency
        </h3>
        <ul ref={barsRef} className="mt-3 space-y-4">
          {proficiency.map(({ lang, level }, i) => {
            const value = clamp(level);
            const color = langColor(lang);
            return (
              <li key={lang}>
                <div className="flex items-center justify-between text-base font-normal">
                  <span className="flex items-center gap-2">
                    <LangIcon
                      lang={lang}
                      size={18}
                      className="shrink-0"
                      style={{ color }}
                    />
                    {lang}
                  </span>
                  <span className="tabular-nums text-muted">{value}</span>
                </div>
                <div
                  role="meter"
                  aria-label={`${lang} proficiency`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={value}
                  className="mt-2 h-2 overflow-hidden rounded-md bg-foreground/3 backdrop-blur-lg"
                >
                  <div
                    className="h-full rounded-md transition-[width] duration-1000 ease-smooth motion-reduce:transition-none "
                    style={{
                      width: barsVisible ? `${value}%` : "0%",
                      transitionDelay: `${i * 90}ms`,
                      backgroundColor: `color-mix(in oklab, ${color} 75%, transparent)`,
                      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${color} 70%, transparent)`,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
