// HomePage.tsx
import { ContactCTA } from "./ContactCTA";
import { FeaturedProjects } from "./FeaturedProjects";
import { HeroSection } from "./HeroSection";
import TechnicalSkills from "./TechnicalSkills";

function HomePage() {
  return (
    <div>
      <div className="my-18 mt-8">
        <HeroSection />
      </div>
      <div className="mx-auto my-12 max-w-7xl">
        <TechnicalSkills />
      </div>
      <div className="my-18">
        <FeaturedProjects />
      </div>
      <div className="mx-auto max-w-7xl">
        <ContactCTA />
      </div>
    </div>
  );
}

export default HomePage;
