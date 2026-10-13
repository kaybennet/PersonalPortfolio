import CustomIcon, { type IconName } from "../../CustomIcon";

export type SkillInfo = {
  description: string;
  since?: number;
  level?: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
};

type Props = {
  id: string;
  name: string;
  iconKey: IconName;
  info: SkillInfo;
};

// Shown when the parent `group/skill` is hovered or focused.
// Reads the brand colour from the inherited `--c` variable.
export default function SkillHover({ id, name, iconKey, info }: Props) {
  return (
    <div
      id={id}
      role="tooltip"
      className={
        "pointer-events-none invisible absolute top-full left-1/2 z-50 mt-3 w-72 " +
        "-translate-x-1/2 -translate-y-1.5 scale-95 origin-top opacity-0 " +
        "max-md:top-auto max-md:right-4 max-md:left-4 max-md:w-auto max-md:translate-x-0 " +
        "rounded-xl p-4 text-left text-sm font-normal [text-align-last:auto] " +
        "glass " +
        "transition-[opacity,translate,scale,visibility] duration-200 ease-smooth " +
        "group-hover/skill:visible group-hover/skill:translate-y-0 group-hover/skill:scale-100 " +
        "group-hover/skill:opacity-100 group-hover/skill:delay-150 " +
        "group-focus-within/skill:visible group-focus-within/skill:translate-y-0 " +
        "group-focus-within/skill:scale-100 group-focus-within/skill:opacity-100 " +
        "motion-reduce:transition-none"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-semibold text-foreground">
          <CustomIcon
            name={iconKey}
            size={16}
            className="text-(--c)"
            aria-hidden
          />
          {name}
        </span>
        {info.since && (
          <span className="font-mono text-xs text-muted">
            since {info.since}
          </span>
        )}
      </div>

      {info.level && (
        <div className="mt-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              aria-hidden
              className={`h-1.5 flex-1 rounded-full ${
                i <= info.level! ? "bg-(--c)" : "bg-foreground/10"
              }`}
            />
          ))}
          <span className="sr-only">Proficiency {info.level} of 5</span>
        </div>
      )}

      <p className="mt-3 leading-relaxed text-foreground/85">
        {info.description}
      </p>

      {info.tags && info.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {info.tags.map((t) => (
            <li
              key={t}
              className="rounded-md bg-[color-mix(in_oklab,var(--c)_14%,transparent)] px-2 py-0.5 text-xs text-foreground/90"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
