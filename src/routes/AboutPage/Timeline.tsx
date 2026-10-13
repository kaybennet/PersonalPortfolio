import { useEffect, useRef, useState } from "react";
import { EVENTS } from "./TimelineEvents";

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", year: "numeric" });

const INTRO_MS = 1500;

const motion =
  "transition-all duration-300 ease-out motion-reduce:transition-none";

export default function Timeline({
  events = EVENTS,
}: {
  events?: TimelineEvent[];
}) {
  const sorted = [...events].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
  const n = sorted.length;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const stopIntro = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    const el = rootRef.current;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!el || n < 2 || reduced) {
      setActive(n - 1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        for (let i = 1; i < n; i++) {
          const t = INTRO_MS * (i / (n - 1)) ** 2;
          timers.current.push(window.setTimeout(() => setActive(i), t));
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stopIntro();
    };
  }, [n]);

  const edge = 50 / n;
  const progress = n > 1 ? active / (n - 1) : 0;
  const x = edge + progress * (100 - 2 * edge);
  const current = sorted[active];

  const show = (i: number) => {
    stopIntro();
    setActive(i);
    setOpen(true);
  };

  return (
    <section className="">
      <h2 className="font-display text-3xl font-bold tracking-tight ml-4 max-md:ml-0 max-md:text-center">
        How I Got Here
      </h2>
      <div
        ref={rootRef}
        className="relative w-full"
        onMouseLeave={() => setOpen(false)}
      >
        <span
          aria-hidden
          className="absolute top-15.75 h-0.5 rounded-full bg-border max-sm:top-5.75"
          style={{ left: `${edge}%`, right: `${edge}%` }}
        />
        <span
          aria-hidden
          className="absolute top-15.75 max-sm:top-5.75 h-0.5 rounded-full bg-linear-to-r from-primary/20 to-primary shadow-[0_0_12px] shadow-primary/60 transition-[width] duration-800 ease-out motion-reduce:transition-none"
          style={{
            left: `${edge}%`,
            width: `calc(${progress} * (100% - ${2 * edge}%))`,
          }}
        />

        <ol className="flex">
          {sorted.map((e, i) => {
            const isActive = i === active;
            const isPast = i < active;
            const year = e.date.getFullYear();
            const newYear =
              i === 0 || sorted[i - 1].date.getFullYear() !== year;
            const align =
              i === 0
                ? "left-0"
                : i === n - 1
                  ? "right-0"
                  : "left-1/2 -translate-x-1/2";

            return (
              <li
                key={i}
                className="relative flex flex-1 flex-col items-center"
              >
                <div className="relative hidden h-10 w-full sm:block">
                  {e.label && (
                    <span
                      className={`pointer-events-none absolute bottom-1 whitespace-nowrap rounded-lg px-2.5 py-1 text-sm font-medium glass$ ${motion} ${align} ${
                        isActive
                          ? "-translate-y-0.5 text-primary"
                          : "text-muted"
                      }`}
                    >
                      {e.label}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  aria-label={`${formatDate(e.date)}: ${e.title}`}
                  aria-describedby={
                    open && isActive ? "timeline-tooltip" : undefined
                  }
                  onMouseEnter={() => show(i)}
                  onFocus={() => show(i)}
                  onClick={() => show(i)}
                  onBlur={() => setOpen(false)}
                  className={`group grid h-12 w-full place-items-center rounded-xl outline-none hover:bg-foreground/4 focus-visible:ring-2 focus-visible:ring-primary ${motion}`}
                >
                  <span
                    className={`size-4 rounded-full border-2 ${motion} ${
                      isActive
                        ? "scale-150 border-primary bg-primary ring-6 ring-primary/15 shadow-[0_0_20px] shadow-primary/70"
                        : isPast
                          ? "border-primary bg-primary/30 group-hover:scale-125 group-hover:ring-4 group-hover:ring-primary/15"
                          : "border-border bg-background group-hover:scale-125 group-hover:border-primary group-hover:ring-4 group-hover:ring-primary/15"
                    }`}
                  />
                </button>

                <span
                  className={`hidden h-5 text-sm tabular-nums sm:block font-bold ${motion} ${
                    isActive ? "font-bold text-foreground" : "text-muted"
                  }`}
                >
                  {newYear ? year : ""}
                </span>
              </li>
            );
          })}
        </ol>

        <div
          id="timeline-tooltip"
          role="tooltip"
          className={`pointer-events-none absolute top-20 max-sm:top-14 z-20 w-80 max-w-[calc(100vw-2rem)] rounded-2xl p-5 glass transition-[left,transform,opacity,translate] duration-300 ease-out motion-reduce:transition-none ${
            open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{
            left: `${x}%`,
            transform: `translateX(-${progress * 100}%)`,
          }}
        >
          <time
            dateTime={current.date.toISOString()}
            className="inline-block rounded-md bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary"
          >
            {formatDate(current.date)}
          </time>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground">
            {current.title}
          </h3>
          {current.place && (
            <p className="text-sm text-muted">{current.place}</p>
          )}
          <p className="pt-2 text-foreground/80">{current.description}</p>
        </div>
      </div>
    </section>
  );
}
