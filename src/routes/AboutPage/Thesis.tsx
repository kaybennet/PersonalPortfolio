import { useState } from "react";
import thesisPic from "../../assets/bachelorsthesis.png";
import thesisPage2 from "../../assets/bachelorsthesis2.png";
import thesisPage3 from "../../assets/bachelorsthesis3.png";
import thesisPdf from "../../assets/docs/bachelors_thesis_kay_bennet_staeding.pdf";

const glass = "glass relative";

const page =
  "size-full rounded-md object-cover ring-1 ring-foreground/10 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.5)]";

const sheet =
  "absolute inset-0 origin-bottom-left transition-[translate,rotate,filter] duration-500 ease-out motion-reduce:transition-none";

const stats = [
  { value: "1.0", label: "Thesis grade" },
  { value: "1.5", label: "B.Sc. grade" },
  { value: "3×", label: "Landesstipendium" },
];

export default function Thesis() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-16 max-md:mt-8">
      <h2 className="font-display text-3xl font-bold tracking-tight max-md:text-2xl max-md:text-center">
        Bachelor's thesis
      </h2>
      <div
        className={`mt-6 flex flex-row justify-between items-center gap-8 rounded-3xl p-8 max-md:flex-col max-md:items-center max-md:gap-6 max-md:p-5 ${glass}`}
      >
        <div className="max-w-prose">
          <h3 className="font-display text-xl font-semibold">
            Improving Prior-Guided Bayesian Optimization through Revisited Decay
            and Rejection Mechanisms
          </h3>
          <p className="mt-1 text-muted">
            Institute for Artificial Intelligence, 2026
          </p>
          <p className="mt-4 text-foreground/80">
            Bayesian optimization finds good settings for expensive systems,
            like the hyperparameters of a neural network, in as few tries as
            possible. Prior-guided variants let a user say where they think good
            settings are. If that guess is wrong, it can slow everything down.
          </p>
          <p className="mt-3 text-foreground/80">
            I reworked how quickly the optimizer lets go of the user's guess and
            when it rejects it outright, so it keeps the speed-up from good
            guesses and recovers faster from bad ones.
          </p>
        </div>

        <a
          href={thesisPdf}
          target="_blank"
          rel="noreferrer"
          aria-label="Open bachelor's thesis (PDF)"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          className={`relative z-20 block h-63 w-45 shrink-0 max-md:self-center rounded-md elevate transition-[scale] duration-500 ease-out motion-reduce:transition-none ${
            open ? "scale-110" : ""
          }`}
        >
          <div
            className={`${sheet} ${
              open
                ? "translate-x-8 -translate-y-4 rotate-12 brightness-75 delay-75"
                : "translate-x-0 rotate-0 delay-0"
            }`}
          >
            <img src={thesisPage3} alt="" className={page} />
          </div>

          <div
            className={`${sheet} ${
              open
                ? "translate-x-4.5 rotate-6 brightness-90 delay-0 -translate-y-3"
                : "translate-x-0 rotate-0 delay-75"
            }`}
          >
            <img src={thesisPage2} alt="" className={page} />
          </div>

          <img src={thesisPic} alt="" className={`relative ${page}`} />
        </a>

        <dl
          className="flex shrink-0 max-md:w-full max-md:justify-around md:flex-col md:gap-5 md:border-l md:border-primary/30 md:pl-6
            max-md:divide-x max-md:divide-foreground/10"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-baseline gap-3 max-md:flex-1 max-md:flex-col max-md:items-center max-md:gap-1"
            >
              <dd className="w-14 font-display text-4xl font-bold leading-none tracking-tight text-primary max-md:w-auto max-md:text-3xl">
                {s.value}
              </dd>
              <dt className="text-sm leading-tight text-muted max-md:text-center max-md:text-xs">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
