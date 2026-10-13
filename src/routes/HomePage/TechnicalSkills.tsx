import { Fragment, type CSSProperties } from "react";
import CustomIcon from "../../CustomIcon";
import SkillHover from "./SkillHover";
import { HOME, HOME_SKILLS } from "../../content";

const chip =
  "group relative isolate inline-flex items-center gap-2.5 outline-none " +
  "rounded-xl py-2 pl-4 pr-5 text-base font-semibold text-foreground " +
  "max-md:gap-1.5 max-md:rounded-lg max-md:py-1 max-md:pr-3 max-md:pl-2.5 max-md:text-sm max-md:ring-2 " +
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
    <section className="max-md:text-center">
      <h2 className="font-display text-3xl font-bold tracking-tight max-md:text-2xl">
        Technical Skills
      </h2>
      <p className="mt-3 text-lg text-muted max-md:hidden">
        {HOME.skillsIntro}
      </p>
      <ul className="mt-6 -mb-3 text-justify [text-align-last:justify] [word-spacing:0.6rem] max-md:mt-4 max-md:mb-0 max-md:flex max-md:flex-wrap max-md:justify-center max-md:gap-2 max-md:[word-spacing:0]">
        {HOME_SKILLS.map(({ name, key, info }) => {
          const tipId = `skill-${key}`;
          return (
            <Fragment key={name}>
              <li
                className="group/skill relative mb-3 inline-block [word-spacing:normal] max-md:static max-md:mb-0"
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
