import { getCover } from "../../util/images";

const glassCaption =
  "bg-surface/55 backdrop-blur-xl backdrop-saturate-150 " +
  "ring-2 ring-inset ring-white/35 dark:ring-white/10 " +
  "inset-shadow-[0_1px_0_rgb(255_255_255/0.5)] dark:inset-shadow-[0_1px_0_rgb(255_255_255/0.08)]";

export function GridEntry({ project: p }: { project: PersonalProject }) {
  const cover = getCover(p.id);

  return (
    <li
      className={
        "group relative aspect-4/3 overflow-hidden rounded-lg elevate " +
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] " +
        "after:ring-1 after:ring-inset after:ring-white/25 dark:after:ring-white/10"
      }
    >
      <img
        src={cover.src}
        alt={p.title}
        loading="lazy"
        className="block h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03] motion-reduce:transition-none"
      />

      <div
        className={`absolute inset-x-2 bottom-2 flex items-baseline justify-between gap-8 rounded-xl px-3 py-2 ${glassCaption}`}
      >
        <h2 className="truncate text-sm font-semibold tracking-tight">
          {p.title}
        </h2>
        <span className="shrink-0 text-xs text-muted">
          {p.started.getFullYear()}
        </span>
      </div>
    </li>
  );
}
