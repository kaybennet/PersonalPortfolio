import { Fragment, type CSSProperties } from "react";
import CustomIcon, { type IconName } from "../../CustomIcon";

const skills: { name: string; key: IconName }[] = [
  { name: "Python", key: "python" },
  { name: "PyTorch", key: "pytorch" },
  { name: "Pandas", key: "pandas" },
  { name: "TypeScript", key: "typescript" },
  { name: "React", key: "react" },
  { name: "NodeJS", key: "node" },
  { name: "AWS", key: "aws" },
  { name: "Rust", key: "rust" },
  { name: "Java", key: "java" },
  { name: "LaTeX", key: "latex" },
];

const chip =
  "group mb-3 inline-flex items-center gap-2.5 [word-spacing:normal] " +
  "rounded-xl py-2 pl-4 pr-5 text-base font-semibold text-foreground " +
  "bg-[color-mix(in_oklab,var(--c)_10%,var(--surface))] " +
  "ring-3 ring-inset ring-[color-mix(in_oklab,var(--c)_28%,transparent)] " +
  "shadow-glass transition-[background-color,box-shadow,translate,color] duration-200 ease-smooth " +
  "hover:-translate-y-0.5 hover:text-(--c) hover:shadow-glass-hover " +
  "hover:bg-[color-mix(in_oklab,var(--c)_18%,var(--surface))] motion-reduce:transition-none";

const icon =
  "shrink-0 text-(--c) transition-transform duration-200 ease-smooth " +
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
        {skills.map(({ name, key }) => (
          <Fragment key={name}>
            <li
              className={chip}
              style={{ "--c": `var(--lang-${key})` } as CSSProperties}
            >
              <CustomIcon name={key} size={18} className={icon} aria-hidden />
              {name}
            </li>{" "}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
