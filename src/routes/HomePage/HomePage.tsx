// HomePage.tsx
import { ContactCTA } from "./ContactCTA";
import { FeaturedProjects } from "./FeaturedProjects";
import { HeroSection } from "./HeroSection";
import TechnicalSkills from "./TechnicalSkills";

function HomePage() {
  return (
    <div>
      <div className="mt-8 mb-16 max-md:mt-2 max-md:mb-0">
        <HeroSection />
      </div>
      <div className="mx-auto my-10 max-w-7xl max-md:mt-6 max-md:mb-0 max-md:border-t max-md:border-border max-md:pt-6">
        <TechnicalSkills />
      </div>
      <div className="mt-16 mb-16 max-md:mt-6 max-md:mb-0 max-md:border-t max-md:border-border max-md:pt-6">
        <FeaturedProjects />
      </div>
      <div className="mx-auto max-w-7xl max-md:mt-6 max-md:border-t max-md:border-border max-md:pt-6">
        <ContactCTA />
      </div>
    </div>
  );
}

export default HomePage;
