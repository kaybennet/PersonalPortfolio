import { Link } from "react-router";
import { PortraitCard } from "./PortraitCard";
import profilePic from "../../assets/site/pfp.jpg";
import { fmtLatex } from "../../util/helpers";
import { CV_PDF, HERO } from "../../content";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-wrap-reverse items-center justify-between gap-10 max-md:justify-center max-md:gap-4">
      <div className="flex max-w-175 flex-col gap-6 max-md:grid max-md:w-full max-md:grid-cols-[auto_1fr] max-md:items-center max-md:gap-x-4 max-md:gap-y-3 max-md:text-left">
        {/* mobile: name on top, portrait with the two buttons to its right; wrappers vanish via `contents` */}
        <div className="contents">
          {/* fills the height of the text column; the img is absolute so it never sets the row height */}
          <div className="relative min-h-36 w-36 self-stretch overflow-hidden rounded-2xl elevate max-md:col-start-1 max-md:row-span-2 max-md:row-start-1 max-sm:w-32 md:hidden">
            <img
              src={profilePic}
              alt="Kay Bennet Städing"
              className="absolute inset-0 size-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col max-md:col-start-2 max-md:row-start-1 max-md:flex-row max-md:flex-wrap max-md:gap-x-1.5 md:contents">
            <p className="font-mono text-sm text-muted max-md:order-last max-md:mt-1 max-md:basis-full max-md:text-xs">
              {HERO.role}
            </p>
            <h1 className="font-display text-6xl font-bold tracking-tight -mt-6 max-md:mt-0 max-md:text-xl max-sm:text-base">
              Kay Bennet
            </h1>
            <h1 className="font-display text-9xl font-bold tracking-tight -mt-5 mb-4 max-md:mt-0 max-md:mb-0 max-md:text-xl max-sm:text-base">
              Staeding
            </h1>
          </div>
        </div>
        <p className="text-lg leading-relaxed max-md:hidden">
          {fmtLatex(HERO.paragraph)} <br></br>
          {fmtLatex(HERO.thesis)}
        </p>

        <div className="flex gap-4 max-md:col-start-2 max-md:row-start-2 max-md:flex-col max-md:gap-2">
          <Link
            to="/projects"
            className="rounded-lg bg-primary px-6 py-3 font-semibold max-md:px-4 max-md:py-2 max-md:text-center max-md:text-sm text-primary-foreground hover:bg-primary-hover"
          >
            View projects
          </Link>
          <a
            href={CV_PDF}
            download
            className="rounded-lg border border-border px-6 py-3 font-semibold max-md:px-4 max-md:py-2 max-md:text-center max-md:text-sm hover:bg-surface"
          >
            Download CV
          </a>
        </div>
      </div>

      <div className="max-md:hidden md:contents">
        <PortraitCard />
      </div>
    </section>
  );
}
