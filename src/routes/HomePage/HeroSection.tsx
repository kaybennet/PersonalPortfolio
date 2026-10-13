import { Link } from "react-router";
import thesisPdf from "../../assets/docs/bachelors_thesis_kay_bennet_staeding.pdf";
import cv from "../../assets/docs/Curriculum Vitae.pdf";
import { PortraitCard } from "./PortraitCard";
import profilePic from "../../assets/kaybennet_pfp.jpg";
import { fmtLatex } from "../../util/helpers";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-wrap-reverse items-center justify-between gap-10 max-md:justify-center max-md:gap-4">
      <div className="flex max-w-175 flex-col gap-6 max-md:w-full max-md:gap-3 max-md:items-center max-md:text-center">
        {/* mobile: small portrait next to the name; desktop: wrappers vanish */}
        <div className="flex items-center gap-4 md:contents">
          <img
            src={profilePic}
            alt="Kay Bennet Städing"
            className="size-28 shrink-0 rounded-2xl object-cover elevate md:hidden max-sm:size-24"
          />
          <div className="flex flex-col max-md:text-left md:contents">
            <p className="font-mono text-sm text-muted max-md:order-last max-md:mt-2 max-md:text-xs">
              B.Sc. Computer Science · Leibniz Universität Hannover
            </p>
            <h1 className="font-display text-6xl font-bold tracking-tight -mt-6 max-md:mt-0 max-md:text-3xl max-sm:text-2xl">
              Kay Bennet
            </h1>
            <h1 className="font-display text-9xl font-bold tracking-tight -mt-5 mb-4 max-md:mt-0 max-md:mb-0 max-md:text-5xl max-sm:text-4xl">
              Staeding
            </h1>
          </div>
        </div>
        <p className="text-lg leading-relaxed max-md:hidden">
          {fmtLatex(
            "I enjoy the field of technology and whatever I can get my hands on. Primarily I work in \\textbf{Machine Learning} and anything needing creativity from \\textbf{WebDev} to \\textbf{GameDev}. ",
          )}
          <br></br>For my{" "}
          <a
            href={thesisPdf}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary-hover"
          >
            Bachelor's thesis
          </a>{" "}
          I did research on how prior knowledge can guide Bayesian optimization.
        </p>

        <div className="flex gap-4 max-md:mt-2 max-md:grid max-md:w-full max-md:grid-cols-2 max-md:gap-3">
          <Link
            to="/projects"
            className="rounded-lg bg-primary px-6 py-3 font-semibold max-md:px-3 max-md:text-center text-primary-foreground hover:bg-primary-hover"
          >
            View projects
          </Link>
          <a
            href={cv}
            download
            className="rounded-lg border border-border px-6 py-3 font-semibold max-md:px-3 max-md:text-center hover:bg-surface"
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
