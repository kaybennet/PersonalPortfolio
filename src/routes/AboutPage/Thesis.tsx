import { useState } from "react";
import thesisPic from "../../assets/bachelorsthesis.png";
import thesisPage2 from "../../assets/bachelorsthesis2.png";
import thesisPage3 from "../../assets/bachelorsthesis3.png";
import thesisPdf from "../../assets/docs/bachelors_thesis_kay_bennet_staeding.pdf";

const glass =
  "bg-surface/60 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-inset ring-foreground/10 " +
  "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.3),0_12px_32px_-16px_rgb(0_0_0/0.25)] " +
  "dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06),0_12px_32px_-16px_rgb(0_0_0/0.7)]";

const page =
  "size-full rounded-md object-cover ring-1 ring-foreground/10 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.5)]";

const sheet =
  "absolute inset-0 origin-bottom-left transition-[translate,rotate,filter] duration-500 ease-out motion-reduce:transition-none";

const stats = [
  { value: "1.0", label: "Bachelor's thesis" },
  { value: "1.5", label: "B.Sc. GPA" },
  { value: "3×", label: "Landesstipendium" },
];

export default function Thesis() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-16 max-md:mt-8">
      <h2 className="font-display text-3xl font-bold tracking-tight max-md:text-center">
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

        <dl className="flex gap-6 md:flex-col md:justify-center">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-4xl font-bold text-primary">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
