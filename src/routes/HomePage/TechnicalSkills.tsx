import { Fragment, type CSSProperties } from "react";
import CustomIcon, { type IconName } from "../../CustomIcon";
import SkillHover, { type SkillInfo } from "./SkillHover";

const skills: { name: string; key: IconName; info?: SkillInfo }[] = [
  {
    name: "Python",
    key: "python",
    info: {
      description:
        "My first choice mostly. I use it regularly for various projects and smaller scripts",
      tags: [
        "Data Science",
        "Algorithmic Applications",
        "Scripting",
        "Notebooks",
      ],
    },
  },
  {
    name: "PyTorch",
    key: "pytorch",
    info: {
      description: "Building and training models for machine learning projects",
      tags: ["Deep Learning", "Model Training", "Research"],
    },
  },
  {
    name: "Pandas",
    key: "pandas",
    info: {
      description:
        "Loading, cleaning and analysing tabular data. I use it in conjunction with the prior two technologies of course.",
      tags: ["Data Wrangling", "Analysis", "Experiment Results"],
    },
  },
  {
    name: "TypeScript",
    key: "typescript",
    info: {
      description:
        "My default for anything web-related, including this site. Because plain JavaScript simply sucks. I love its functional programming integration.",
      tags: ["Frontend", "Type Safety", "Tooling"],
    },
  },
  {
    name: "React",
    key: "react",
    info: {
      description: 'My Typescript "Framework" of choice.',
      tags: ["Components", "Hooks", "Tailwind CSS"],
    },
  },
  {
    name: "C",
    key: "c",
    info: {
      description: "Backends, APIs and build tooling for web projects",
      tags: ["REST APIs", "Backend", "CLI Tools"],
    },
  },
  {
    name: "AWS",
    key: "aws",
    info: {
      description:
        "I taught it a ton at university. I love its simplicity and building small scale programs with it.",
      tags: ["Teaching", "hardware"],
    },
  },
  {
    name: "Rust",
    key: "rust",
    info: {
      description:
        "Learning it in my free time for fast, reliable programs. Also it's the most fun I've had with a programming language ever. I love its type system, all of its iterators and of course the compile time error checking.",
      tags: [
        "Systems Programming",
        "Performance",
        "Side Projects",
        "Leetcode",
        "Competitive Coding",
      ],
    },
  },
  {
    name: "Java",
    key: "java",
    info: {
      description: "Taught it at university and used in coursework projects.",
      tags: ["Teaching", "OOP", "University"],
    },
  },
  {
    name: "LaTeX",
    key: "latex",
    info: {
      description:
        "I use it for writing academic documents, reports and even personal notes.",
      tags: ["Academic Writing"],
    },
  },
];

const chip =
  "group relative isolate inline-flex items-center gap-2.5 outline-none " +
  "rounded-xl py-2 pl-4 pr-5 text-base font-semibold text-foreground " +
  "bg-[color-mix(in_oklab,var(--c)_10%,var(--surface))] " +
  "ring-3 ring-inset ring-[color-mix(in_oklab,var(--c)_28%,transparent)] " +
  "shadow-glass inset-shadow-[0_1px_0_rgb(255_255_255/0.45)] dark:inset-shadow-[0_1px_0_rgb(255_255_255/0.08)] " +
  "transition-[background-color,box-shadow,translate,color] duration-300 ease-smooth " +
  "hover:-translate-y-1 hover:text-(--c) " +
  "hover:bg-[color-mix(in_oklab,var(--c)_18%,var(--surface))] " +
  "hover:shadow-[0_10px_24px_-8px_color-mix(in_oklab,var(--c)_55%,transparent)] cursor-default " +
  "focus-visible:-translate-y-1 focus-visible:text-(--c) " +
  "focus-visible:ring-[color-mix(in_oklab,var(--c)_60%,transparent)] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0";

// Clips only the sheen, so the icon can overflow the chip on hover.
const sheenClip =
  "pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]";

const sheen =
  "absolute inset-0 -translate-x-full " +
  "bg-linear-to-r from-transparent via-white/35 to-transparent dark:via-white/12 " +
  "transition-transform duration-700 ease-smooth group-hover:translate-x-full motion-reduce:hidden";

const icon =
  "shrink-0 text-(--c) transition-transform duration-300 ease-smooth " +
  "group-hover:scale-115 group-hover:-rotate-6 motion-reduce:transition-none";

export default function TechnicalSkills() {
  return (
    <section>
      <h2 className="font-display text-4xl font-bold tracking-tight">
        Technical Skills
      </h2>
      <p className="mt-3 text-muted">
        Apart from teaching some languages (C, Java, Python) at university, I
        enjoy coding and learning new technologies in my free time, including
        but not limited to:
      </p>
      <ul className="mt-6 -mb-3 text-justify [text-align-last:justify] [word-spacing:0.6rem]">
        {skills.map(({ name, key, info }) => {
          const tipId = `skill-${key}`;
          return (
            <Fragment key={name}>
              <li
                className="group/skill relative mb-3 inline-block [word-spacing:normal]"
                style={{ "--c": `var(--lang-${key})` } as CSSProperties}
              >
                <span
                  className={chip}
                  tabIndex={info ? 0 : undefined}
                  aria-describedby={info ? tipId : undefined}
                >
                  <span aria-hidden className={sheenClip}>
                    <span className={sheen} />
                  </span>
                  <CustomIcon
                    name={key}
                    size={17}
                    className={icon}
                    aria-hidden
                  />
                  {name}
                </span>
                {info && (
                  <SkillHover
                    id={tipId}
                    name={name}
                    iconKey={key}
                    info={info}
                  />
                )}
              </li>{" "}
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
}
