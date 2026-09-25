import { FeaturedProjects } from "./FeaturedProjects";
import { HeroSection } from "./HeroSection";

function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="my-18 mt-8">
        <HeroSection />
      </div>
      <div className="my-18">
        <FeaturedProjects />
      </div>
    </main>
  );
}

export default HomePage;
