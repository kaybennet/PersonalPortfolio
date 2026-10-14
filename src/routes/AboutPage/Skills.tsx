import { useEffect, useRef, useState } from "react";
import { LangIcon } from "../../CustomIcon";
import { fmtLatex } from "../../util/helpers";
import { PROFICIENCY, SKILLS_FOOTER, SKILL_GROUPS } from "../../content";

const chip =
  "glass relative rounded-xl px-4 py-1.5 text-sm font-medium " +
  "[--glass-drop:0_2px_8px_-2px_var(--glass-shadow-color)] " +
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
    <section className="grid gap-10 py-16 max-md:gap-6 max-md:py-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <h2 className="section-title-center">
          What I work with
        </h2>

        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {SKILL_GROUPS.map((s) => (
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

        <p className="mt-8 text-foreground/80">{fmtLatex(SKILLS_FOOTER)}</p>
      </div>

      <div>
        <h3 className="font-semibold text-muted">
          Self-assessed coding language proficiency
        </h3>
        <ul ref={barsRef} className="mt-3 space-y-4">
          {PROFICIENCY.map(({ lang, level }, i) => {
            const value = clamp(level);
            const color = langColor(lang);
            return (
              <li key={lang}>
                <div className="flex items-center justify-between text-base font-normal">
                  <span className="flex items-center gap-2">
                    <LangIcon
                      lang={lang}
                      size={18}
                      className="shrink-0 overflow-visible"
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
