import { type CSSProperties } from "react";
import Tooltip from "@mui/material/Tooltip";

const SEGMENTS = 10;

const SCALES = [
  {
    key: "time_spent",
    label: "Time",
    levels: ["Minimal", "Light", "Moderate", "Heavy", "Extensive"],
    fill: "bg-sky-500 dark:bg-sky-400",
    track: "bg-sky-500/15",
  },
  {
    key: "difficulty",
    label: "Difficulty",
    levels: ["Trivial", "Easy", "Medium", "Hard", "Very hard"],
    fill: "bg-amber-500 dark:bg-amber-400",
    track: "bg-amber-500/15",
  },
  {
    key: "ai_use",
    label: "AI usage",
    levels: ["None", "Minimal", "Assisted", "Heavy", "Mostly generated"],
    fill: "bg-violet-500 dark:bg-violet-400",
    track: "bg-violet-500/15",
  },
] as const;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const levelOf = (v: number, levels: readonly string[]) =>
  levels[Math.min(levels.length - 1, Math.floor(v * levels.length))];

export default function AssessmentBadge({
  project: p,
}: {
  project: PersonalProject;
}) {
  const bars = SCALES.filter((s) => p[s.key] != null).map((s) => ({
    ...s,
    value: clamp(p[s.key]!),
  }));

  return (
    <Tooltip
      arrow
      placement="top"
      slotProps={{
        tooltip: {
          className:
            "bg-surface! text-foreground! border border-border shadow-lg rounded-lg! px-3! py-2! text-sm",
        },
        arrow: { className: "text-surface!" },
      }}
      title={
        <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1">
          {bars.map((s) => (
            <div key={s.key} className="contents">
              <dt className="flex items-center gap-2 text-muted">
                <span className={`size-2 rounded-full ${s.fill}`} />
                {s.label}
              </dt>
              <dd className="text-right font-medium">
                {levelOf(s.value, s.levels)}
              </dd>
            </div>
          ))}
        </dl>
      }
    >
      <div
        tabIndex={0}
        className="group/badge relative z-10 flex shrink-0 items-end gap-4 rounded-md outline-none
               focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
               focus-visible:ring-offset-background"
      >
        {bars.map((s) => (
          <div key={s.key} className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
              {s.label}
            </span>
            <div
              role="meter"
              aria-label={s.label}
              aria-valuemin={0}
              aria-valuemax={1}
              aria-valuenow={s.value}
              aria-valuetext={levelOf(s.value, s.levels)}
              className="flex gap-0.5"
            >
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <span
                  key={i}
                  className={`block h-1.5 w-3 overflow-hidden rounded-full ${s.track}
                    transition-transform duration-200 ease-out group-hover/badge:scale-y-150`}
                >
                  <span
                    style={
                      {
                        "--p": clamp(s.value * SEGMENTS - i),
                        transitionDelay: `${i * 70}ms`,
                      } as CSSProperties
                    }
                    className={`block h-full w-[calc(var(--p)*100%)] ${s.fill}
                      transition-[width] duration-500 ease-out starting:w-0`}
                  />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Tooltip>
  );
}
