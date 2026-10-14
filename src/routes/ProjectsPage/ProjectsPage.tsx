import { useEffect, useState, type ComponentType } from "react";
import { LayoutGrid, List, Rows3, type LucideIcon } from "lucide-react";
import { PROJECTS_PAGE, Projects } from "../../content";
import { warmProjectCovers } from "../../util/images";
import { GridEntry } from "./GridEntry";
import { StandardEntry } from "./StandardEntry";
import { CompactEntry } from "./CompactEntry";

type ViewStyle = "grid" | "standard" | "compact";

type ViewConfig = {
  label: string;
  icon: LucideIcon;
  listClass: string;
  Entry: ComponentType<{ project: PersonalProject; index: number }>;
};

const views: Record<ViewStyle, ViewConfig> = {
  grid: {
    label: "Grid view",
    icon: LayoutGrid,
    listClass:
      "grid grid-cols-2 gap-6 max-sm:gap-3 sm:grid-cols-2 lg:grid-cols-3",
    Entry: GridEntry,
  },
  standard: {
    label: "Standard view",
    icon: Rows3,
    listClass: "",
    Entry: StandardEntry,
  },
  compact: {
    label: "Compact view",
    icon: List,
    listClass: "",
    Entry: CompactEntry,
  },
};

const viewIds = Object.keys(views) as ViewStyle[];

// mobile only gets the grid view, so there's nothing to switch between
const MOBILE_QUERY = "(max-width: 767px)";

// slide by own width + gap-1 (0.25rem), so it fits any button size
const slide = (i: number) => `calc(${i} * (100% + 0.25rem)) 0`;

// newest first; Projects is static, so sort once
const ordered = [...Projects].sort(
  (a, b) => b.started.getTime() - a.started.getTime(),
);

function ProjectsPage() {
  const [mobile, setMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches,
  );
  const [choice, setChoice] = useState<ViewStyle>(() =>
    window.matchMedia(MOBILE_QUERY).matches ? "grid" : "standard",
  );
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // keep the desktop choice remembered, but always render the grid on mobile
  const view = mobile ? "grid" : choice;
  const { listClass, Entry } = views[view];
  const active = viewIds.indexOf(view);

  // after first paint, quietly warm the covers of every project
  useEffect(() => {
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
    const id = idle(warmProjectCovers);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  return (
    <main className="mx-auto max-w-7xl pb-24 max-md:pb-10 pt-6 max-md:pt-2 text-foreground">
      <div className="mb-8 max-md:mb-5 flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-center max-sm:gap-4 max-sm:text-center">
        <div className="min-w-0">
          <h1 className="section-title">
            {PROJECTS_PAGE.title}
          </h1>
          <p className="mt-1 text-sm text-pretty text-muted">
            {PROJECTS_PAGE.intro}
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label="Layout"
          onMouseLeave={() => setHovered(null)}
          className="relative flex shrink-0 gap-1 max-md:hidden"
        >
          {/* hover ghost: glides after the cursor */}
          <span
            aria-hidden
            className={`pointer-events-none absolute left-0 top-0 size-12 rounded-lg bg-foreground/4
              transition-[translate,opacity] duration-300 ease-snappy motion-reduce:transition-none`}
            style={{
              translate: slide(hovered ?? active),
              opacity: hovered !== null && hovered !== active ? 1 : 0,
            }}
          />

          {/* active pill: bounces into place */}
          <span
            aria-hidden
            className={`pointer-events-none absolute left-0 top-0 size-12 rounded-lg bg-foreground/[0.07]
              transition-[translate] duration-500 ease-bounce motion-reduce:transition-none`}
            style={{ translate: slide(active) }}
          />

          {viewIds.map((id, i) => {
            const { label, icon: Icon } = views[id];
            const selected = view === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={label}
                title={label}
                onClick={() => setChoice(id)}
                onMouseEnter={() => setHovered(i)}
                className={`group/view relative z-10 grid size-12 cursor-pointer place-items-center rounded-lg
                  ${selected ? "text-foreground" : "text-muted hover:text-foreground"}`}
              >
                <Icon size={22} />
              </button>
            );
          })}
        </div>
      </div>

      <ol className={listClass}>
        {ordered.map((p, i) => (
          <Entry key={p.id} project={p} index={i} />
        ))}
      </ol>
    </main>
  );
}

export default ProjectsPage;
