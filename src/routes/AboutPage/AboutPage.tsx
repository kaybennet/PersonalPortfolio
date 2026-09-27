import Now from "./Now";
import Skills from "./Skills";
import Thesis from "./Thesis";
import Experience from "./Experience";
import Timeline from "./Timeline";
import { GitHubActivity } from "./GitHubActivity";

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3 items-center gap-8 mt-10">
          <div className="min-w-0">
            <Now />
          </div>
          <div className="col-span-2 min-w-0 ml-8">
            <Timeline />
          </div>
        </div>
        <Thesis />
        <Skills />
        <div className="mt-6 mb-12 mx-auto max-w-7xl">
          <GitHubActivity />
        </div>
        <Experience />
      </main>
    </div>
  );
}

export default AboutPage;
