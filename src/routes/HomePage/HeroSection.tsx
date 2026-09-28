import { Link } from "react-router";
import thesisPdf from "../../docs/bachelors_thesis_kay_bennet_staeding.pdf";
import cv from "../../docs/Curriculum Vitae.pdf";
import { PortraitCard } from "./PortraitCard";
import { fmtLatex } from "../../util/helpers";

export function HeroSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-wrap-reverse items-center justify-between gap-10">
      <div className="flex max-w-175 flex-col gap-6">
        <p className="font-mono text-sm text-muted">
          B.Sc. Computer Science · Leibniz Universität Hannover
        </p>
        <h1 className="font-display text-6xl font-bold tracking-tight -mt-6">
          Kay Bennet
        </h1>
        <h1 className="font-display text-9xl font-bold tracking-tight -mt-5 mb-4">
          Staeding
        </h1>
        <p className="text-lg leading-relaxed">
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

        <div className="flex gap-4">
          <Link
            to="/projects"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            View projects
          </Link>
          <a
            href={cv}
            download
            className="rounded-lg border border-border px-6 py-3 font-semibold hover:bg-surface"
          >
            Download CV
          </a>
        </div>
      </div>

      <PortraitCard />
    </section>
  );
}
