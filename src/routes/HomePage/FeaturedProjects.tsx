import { Link } from "react-router";
import { Projects } from "../../shared/Projects";
import { ProjectCard } from "./ProjectCard";

const FEATURED_IDS = ["BA", "StrongPro", "java_nn"];

export function FeaturedProjects() {
  const featured = Projects.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-8 max-md:mb-4 flex items-end justify-between max-md:flex-col max-md:items-center max-md:gap-3 max-md:text-center">
        <div className="flex flex-col max-md:items-center">
          <h2 className="font-display text-4xl font-bold">
            Some Featured Projects
          </h2>
          <p className="mt-2 text-muted md:hidden">
            Projects I'm most proud of.
          </p>
          <p className="mt-3 text-muted max-md:hidden">
            My projects are mostly done out of enjoyment and for private use
            cases. Some projects I am very proud of include:
          </p>
        </div>
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
