// HomePage.tsx
import { ContactCTA } from "./ContactCTA";
import { FeaturedProjects } from "./FeaturedProjects";
import { HeroSection } from "./HeroSection";
import TechnicalSkills from "./TechnicalSkills";

function HomePage() {
  return (
    <div>
      <div className="mt-8 mb-16 max-md:mt-2 max-md:mb-8">
        <HeroSection />
      </div>
      <div className="mx-auto my-10 max-w-7xl max-md:my-6">
        <TechnicalSkills />
      </div>
      <div className="mt-16 mb-16 max-md:mt-8 max-md:mb-8">
        <FeaturedProjects />
      </div>
      <div className="mx-auto max-w-7xl">
        <ContactCTA />
      </div>
    </div>
  );
}

export default HomePage;
