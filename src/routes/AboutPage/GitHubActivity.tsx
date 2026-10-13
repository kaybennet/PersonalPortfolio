import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

const FIRST_YEAR = 2023; // year you joined GitHub
const BLOCK_MARGIN = 4;
const WEEKS = 53; // columns in a year view
const BOUNCE = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

const theme = {
  light: ["#e5e7eb", "#bfdbfe", "#93c5fd", "#3b82f6", "#1d4ed8"],
  dark: ["#1f2937", "#1e3a8a", "#1d4ed8", "#3b82f6", "#60a5fa"],
};

type Year = number | "last";

function useIsDark() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setDark(el.classList.contains("dark")),
    );
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function useFittedBlockSize<T extends HTMLElement>(min = 8) {
  const ref = useRef<T>(null);
  const [size, setSize] = useState(12);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setSize(Math.max(min, (width + BLOCK_MARGIN) / WEEKS - BLOCK_MARGIN));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [min]);

  return [ref, size] as const;
}

function YearPicker({
  years,
  value,
  onChange,
}: {
  years: Year[];
  value: Year;
  onChange: (y: Year) => void;
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef(new Map<Year, HTMLButtonElement>());
  const [pill, setPill] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const btn = buttonRefs.current.get(value);
      if (!btn) return;
      setPill({
        x: btn.offsetLeft,
        y: btn.offsetTop,
        w: btn.offsetWidth,
        h: btn.offsetHeight,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (groupRef.current) ro.observe(groupRef.current);
    return () => ro.disconnect();
  }, [value]);

  return (
    <div
      ref={groupRef}
      role="group"
      aria-label="Select year"
      className="relative flex flex-wrap gap-1 rounded-lg p-1.5"
    >
      {/* Sliding pill */}
      <span
        aria-hidden
        className={`absolute top-0 left-0 rounded-md bg-primary transition-[translate,width,height,opacity] duration-500 ${BOUNCE} motion-reduce:transition-none`}
        style={{
          translate: `${pill.x}px ${pill.y}px`,
          width: pill.w,
          height: pill.h,
          opacity: pill.w ? 1 : 0,
        }}
      />

      {years.map((y) => {
        const active = y === value;
        return (
          <button
            key={y}
            ref={(el) => {
              if (el) buttonRefs.current.set(y, el);
              else buttonRefs.current.delete(y);
            }}
            type="button"
            onClick={() => onChange(y)}
            aria-pressed={active}
            className={`relative z-10 rounded-xl px-3.5 py-1.5 font-mono text-sm tabular-nums transition-[color,scale] duration-300 ${BOUNCE} active:scale-90 motion-reduce:transition-none ${
              active
                ? "text-primary-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {y === "last" ? "Last 12 months" : y}
          </button>
        );
      })}
    </div>
  );
}

export function GitHubActivity() {
  const isDark = useIsDark();
  const [year, setYear] = useState<Year>("last");
  const [calRef, blockSize] = useFittedBlockSize<HTMLDivElement>();

  const currentYear = new Date().getFullYear();
  const years: Year[] = [
    "last",
    ...Array.from(
      { length: currentYear - FIRST_YEAR + 1 },
      (_, i) => currentYear - i,
    ),
  ];

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4 max-md:justify-center">
        <h2 className="font-display text-3xl font-bold tracking-tight max-md:text-center">
          GitHub activity
        </h2>
        <YearPicker years={years} value={year} onChange={setYear} />
      </div>

      <div ref={calRef} className="mt-6 w-full overflow-x-auto">
        <GitHubCalendar
          username="kaybennet"
          year={year}
          colorScheme={isDark ? "dark" : "light"}
          theme={theme}
          blockSize={blockSize}
          blockMargin={BLOCK_MARGIN}
          fontSize={13}
        />
      </div>
    </section>
  );
}
