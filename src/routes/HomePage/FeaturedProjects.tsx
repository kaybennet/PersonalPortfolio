import { Link } from "react-router";
import { Projects } from "../ProjectsPage/Projects";
import { ProjectCard } from "./ProjectCard";

const FEATURED_IDS = ["BA", "StrongPro", "java_nn"];

export function FeaturedProjects() {
  const featured = Projects.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-4xl font-bold">
          Some Featured Projects
        </h2>
        <Link
          to="/projects"
          className="font-semibold text-primary hover:underline"
        >
          All projects →
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
