// HomePage.tsx
import { useEffect } from "react";
import { ContactCTA } from "./ContactCTA";
import { FeaturedProjects } from "./FeaturedProjects";
import { HeroSection } from "./HeroSection";
import TechnicalSkills from "./TechnicalSkills";
import { warmHobbyImages, warmProjectCovers } from "../../util/images";

function HomePage() {
  // once the home page has loaded and the browser is idle, warm the other pages
  useEffect(() => {
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 500));
    const run = () => {
      warmProjectCovers();
      idle(warmHobbyImages);
    };
    let id: number;
    const start = () => (id = idle(run) as number);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

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
