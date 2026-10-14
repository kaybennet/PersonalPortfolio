import { Link } from "react-router";
import { HOME, Projects } from "../../content";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const featured = Projects.filter((p) => HOME.featured.includes(p.id));

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-8 max-md:mb-4 flex items-end justify-between max-md:flex-col max-md:items-center max-md:gap-3 max-md:text-center">
        <div className="flex flex-col max-md:items-center">
          <h2 className="section-title">
            Some Featured Projects
          </h2>
          <p className="section-subtitle md:hidden">
            {HOME.featuredIntroShort}
          </p>
          <p className="section-subtitle max-md:hidden">
            {HOME.featuredIntro}
          </p>
        </div>
        <Link
          to="/projects"
          className="font-semibold text-foreground italic transition-colors hover:text-primary max-md:text-sm"
        >
          All projects →
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6 max-md:gap-4">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
