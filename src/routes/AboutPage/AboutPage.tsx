import Now from "./Now";
import Skills from "./Skills";
import Thesis from "./Thesis";
import Experience from "./Experience";
import Timeline from "./Timeline";
import { GitHubActivity } from "./GitHubActivity";
import BeyondCode from "./BeyondCode";

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 items-center gap-8 mt-10 max-md:mt-4 max-md:gap-4 max-md:grid-cols-1">
          <div className="min-w-0">
            <Now />
          </div>
          <div className="col-span-2 min-w-0 ml-8 max-md:col-span-1 max-md:ml-0">
            <Timeline />
          </div>
        </div>
        <Thesis />
        <Skills />
        <div className="mt-6 mb-12 mx-auto max-w-7xl">
          <GitHubActivity />
        </div>
        <Experience />
        <BeyondCode />
      </main>
    </div>
  );
}

export default AboutPage;
