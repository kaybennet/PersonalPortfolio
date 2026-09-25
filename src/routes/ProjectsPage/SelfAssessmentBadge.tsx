import type { CSSProperties } from "react";
import Tooltip from "@mui/material/Tooltip";

const SCALES = [
  {
    key: "time_spent",
    label: "Time spent",
    fill: "bg-sky-500 dark:bg-sky-400",
    track: "bg-sky-500/15 group-hover/bars:bg-sky-500/30",
  },
  {
    key: "difficulty",
    label: "Difficulty",
    fill: "bg-amber-500 dark:bg-amber-400",
    track: "bg-amber-500/15 group-hover/bars:bg-amber-500/30",
  },
] as const;

export default function AssessmentBadge({
  project: p,
}: {
  project: PersonalProject;
}) {
  const bars = SCALES.filter((s) => p[s.key] !== undefined);
  if (bars.length === 0) return null;

  return (
    <Tooltip
      arrow
      placement="top"
      title={
        <ul className="flex flex-col gap-1">
          {bars.map((s) => (
            <li key={s.key} className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${s.fill}`} />
              {s.label}
            </li>
          ))}
        </ul>
      }
    >
      <div className="group/bars relative z-10 flex shrink-0 flex-col">
        {bars.map((s) => {
          const v = Math.min(1, Math.max(0, p[s.key]!));
          return (
            <div
              key={s.key}
              role="meter"
              aria-label={s.label}
              aria-valuemin={0}
              aria-valuemax={1}
              aria-valuenow={v}
              className="flex h-3 w-18 items-center"
            >
              <span
                className={`block h-1.5 w-full overflow-hidden rounded-full transition-all duration-200 ease-out
                  group-hover/bars:h-2 ${s.track}`}
              >
                <span
                  style={{ "--p": v } as CSSProperties}
                  className={`block h-full w-[calc(var(--p)*100%)] rounded-full ${s.fill}
                    transition-[width] duration-700 ease-out starting:w-0`}
                />
              </span>
            </div>
          );
        })}
      </div>
    </Tooltip>
  );
}
