import { useState, type ComponentType } from "react";
import { LayoutGrid, List, Rows3, type LucideIcon } from "lucide-react";
import { Projects } from "./Projects";
import { GridEntry } from "./GridEntry";
import { StandardEntry } from "./StandardEntry";
import { CompactEntry } from "./CompactEntry";

type ViewStyle = "grid" | "standard" | "compact";

type ViewConfig = {
  label: string;
  icon: LucideIcon;
  listClass: string;
  Entry: ComponentType<{ project: PersonalProject }>;
};

const views: Record<ViewStyle, ViewConfig> = {
  grid: {
    label: "Grid view",
    icon: LayoutGrid,
    listClass: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
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

// Newest first
const sortedProjects = [...Projects].sort(
  (a, b) => b.started.getTime() - a.started.getTime(),
);

function ProjectsPage() {
  const [view, setView] = useState<ViewStyle>("standard");
  const { listClass, Entry } = views[view];

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-16 text-foreground">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Personal Projects
        </h1>

        <div
          role="radiogroup"
          aria-label="Layout"
          className="flex gap-0.5 rounded-lg border border-border p-1"
        >
          {(Object.keys(views) as ViewStyle[]).map((id) => {
            const { label, icon: Icon } = views[id];
            return (
              <button
                key={id}
                role="radio"
                aria-checked={view === id}
                aria-label={label}
                title={label}
                onClick={() => setView(id)}
                className={`rounded-md p-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  view === id
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>

      <ul className={listClass}>
        {sortedProjects.map((p) => (
          <Entry key={p.id} project={p} />
        ))}
      </ul>
    </main>
  );
}

export default ProjectsPage;
