/**
 * Single entry point for all site content. The .toml files next to this one are
 * parsed at build time (see the `toml` plugin in vite.config.ts); this module
 * validates them and exports typed constants for the UI.
 */
import siteRaw from "./site.toml";
import aboutRaw from "./about.toml";
import projectsRaw from "./projects.toml";
import timelineRaw from "./timeline.toml";
import skillsRaw from "./skills.toml";
import thesisPdf from "../assets/docs/bachelors_thesis_kay_bennet_staeding.pdf";
import cvPdf from "../assets/docs/Curriculum Vitae.pdf";
import type { IconName } from "../CustomIcon";

// The TOML is untyped JSON; every field is checked by the helpers below.
// oxlint-disable-next-line typescript/no-explicit-any
type Raw = Record<string, any>;

const LANGUAGES: readonly ProgrammingLanguage[] = [
  "Rust",
  "Python",
  "TypeScript",
  "JavaScript",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Kotlin",
  "Swift",
  "SQL",
  "Bash",
  "CSS",
  "HTML",
  "React",
  "AWS",
  "LaTeX",
];
const ASPECTS = ["1:1", "16:9", "2:3"] as const;

const fail = (where: string, msg: string): never => {
  throw new Error(`[content] ${where}: ${msg}`);
};
const str = (o: Raw, k: string, where: string): string =>
  typeof o[k] === "string" ? o[k] : fail(where, `"${k}" must be a string`);
const optStr = (o: Raw, k: string, where: string): string | undefined =>
  o[k] === undefined ? undefined : str(o, k, where);
const num = (o: Raw, k: string, where: string): number =>
  typeof o[k] === "number" ? o[k] : fail(where, `"${k}" must be a number`);
const strs = (o: Raw, k: string, where: string): string[] =>
  Array.isArray(o[k]) && o[k].every((x: unknown) => typeof x === "string")
    ? o[k]
    : fail(where, `"${k}" must be a list of strings`);
const list = (o: Raw, k: string): Raw[] =>
  Array.isArray(o[k]) ? o[k] : fail("file", `missing [[${k}]] table`);
/** "YYYY-MM-DD" from the TOML plugin → local Date */
const date = (o: Raw, k: string, where: string): Date => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(str(o, k, where));
  return m
    ? new Date(+m[1], +m[2] - 1, +m[3])
    : fail(where, `"${k}" must be a date`);
};
const pick = <T extends string>(
  v: string,
  allowed: readonly T[],
  where: string,
): T =>
  (allowed as readonly string[]).includes(v)
    ? (v as T)
    : fail(where, `"${v}" is not one of ${allowed.join(", ")}`);

// ---- site ---------------------------------------------------------------
const site = siteRaw as Raw;
const links = site.links as Record<string, string>;

/** Links usable from text via \href{@key}{label} */
export const LINKS: Record<string, string> = {
  ...links,
  thesis: thesisPdf,
  cv: cvPdf,
};
export const LINK_GITHUB = links.github;
export const LINK_LINKEDIN = links.linkedin;
export const LINK_EMAIL = links.email;
export const LINK_LETTERBOXD = links.letterboxd;
export const LINK_BACKLOGGD = links.backloggd;
export const THESIS_PDF = thesisPdf;
export const CV_PDF = cvPdf;

export const NAV: { label: string; to: string }[] = list(site, "nav").map(
  (n, i) => ({
    label: str(n, "label", `nav[${i}]`),
    to: str(n, "to", `nav[${i}]`),
  }),
);

export const SOCIALS: { label: string; icon: IconName; href: string }[] = list(
  site,
  "socials",
).map((s, i) => {
  const w = `socials[${i}]`;
  const key = str(s, "link", w);
  const url = LINKS[key] ?? fail(w, `unknown link "${key}"`);
  return {
    label: str(s, "label", w),
    icon: str(s, "icon", w) as IconName,
    href: key === "email" ? `mailto:${url}` : url,
  };
});

export const HERO = {
  role: str(site.hero, "role", "hero"),
  paragraph: str(site.hero, "paragraph", "hero"),
  thesis: str(site.hero, "thesis", "hero"),
};
export const PORTRAIT = {
  name: str(site.portrait, "name", "portrait"),
  subtitle: str(site.portrait, "subtitle", "portrait"),
  birthday: date(site.portrait, "birthday", "portrait"),
};
export const GRADES: Grade[] = list(site, "grades").map((g, i) => ({
  label: str(g, "label", `grades[${i}]`),
  grade: num(g, "grade", `grades[${i}]`),
}));
export const HOME = {
  featured: strs(site.home, "featured", "home"),
  skillsIntro: str(site.home, "skills_intro", "home"),
  featuredIntro: str(site.home, "featured_intro", "home"),
  featuredIntroShort: str(site.home, "featured_intro_short", "home"),
};
export const CTA = {
  eyebrow: str(site.cta, "eyebrow", "cta"),
  title: str(site.cta, "title", "cta"),
  text: str(site.cta, "text", "cta"),
};
export const PROJECTS_PAGE = {
  title: str(site.projects_page, "title", "projects_page"),
  intro: str(site.projects_page, "intro", "projects_page"),
};

// ---- projects & timeline ------------------------------------------------
export const Projects: PersonalProject[] = list(
  projectsRaw as Raw,
  "projects",
).map((p, i) => {
  const w = `projects[${i}] (${p.id ?? "?"})`;
  return {
    id: str(p, "id", w),
    title: str(p, "title", w),
    summary: str(p, "summary", w),
    github_link: str(p, "github_link", w),
    languages: strs(p, "languages", w).map((l) => pick(l, LANGUAGES, w)),
    started: date(p, "started", w),
    description: str(p, "description", w),
    learnings: strs(p, "learnings", w),
    time_spent: num(p, "time_spent", w),
    difficulty: num(p, "difficulty", w),
    ai_use: num(p, "ai_use", w),
    collapseStdEntry: p.collapseStdEntry === true,
  };
});
for (const id of HOME.featured)
  if (!Projects.some((p) => p.id === id))
    fail("home.featured", `unknown project id "${id}"`);

export const EVENTS: TimelineEvent[] = list(timelineRaw as Raw, "events").map(
  (e, i) => {
    const w = `events[${i}]`;
    return {
      date: date(e, "date", w),
      title: str(e, "title", w),
      place: optStr(e, "place", w),
      label: optStr(e, "label", w),
      description: str(e, "description", w),
    };
  },
);

// ---- skills -------------------------------------------------------------
const skillsFile = skillsRaw as Raw;
export const HOME_SKILLS: Skill[] = list(skillsFile, "home").map((s, i) => {
  const w = `home[${i}]`;
  const description = optStr(s, "description", w);
  return {
    name: str(s, "name", w),
    key: str(s, "key", w) as IconName,
    info: description
      ? { description, tags: s.tags ? strs(s, "tags", w) : [] }
      : undefined,
  };
});
export const SKILL_GROUPS: SkillGroup[] = list(skillsFile, "groups").map(
  (g, i) => ({
    group: str(g, "group", `groups[${i}]`),
    items: strs(g, "items", `groups[${i}]`),
  }),
);
export const PROFICIENCY: Proficiency[] = list(skillsFile, "proficiency").map(
  (p, i) => ({
    lang: pick(
      str(p, "lang", `proficiency[${i}]`),
      LANGUAGES,
      `proficiency[${i}]`,
    ),
    level: num(p, "level", `proficiency[${i}]`),
  }),
);

// ---- about --------------------------------------------------------------
const about = aboutRaw as Raw;
export const NOW_TEXT = str(about.now, "text", "now");
export const SKILLS_FOOTER = str(about.skills, "footer", "skills");
export const THESIS = {
  title: str(about.thesis, "title", "thesis"),
  place: str(about.thesis, "place", "thesis"),
  paragraphs: strs(about.thesis, "paragraphs", "thesis"),
  stats: list(about.thesis, "stats").map((s, i) => ({
    value: str(s, "value", `thesis.stats[${i}]`),
    label: str(s, "label", `thesis.stats[${i}]`),
  })),
};
export const EXPERIENCE_INTRO = str(about.experience, "intro", "experience");
export const COURSES: Course[] = list(about, "courses").map((c, i) => {
  const color = str(c, "color", `courses[${i}]`);
  return {
    name: str(c, "name", `courses[${i}]`),
    detail: str(c, "detail", `courses[${i}]`),
    color: color === "primary" ? "var(--primary)" : `var(--lang-${color})`,
  };
});
export const BEYOND_INTRO = str(about.beyond, "intro", "beyond");
export const HOBBIES: Hobby[] = list(about, "hobbies").map((h, i) => {
  const w = `hobbies[${i}]`;
  return {
    name: str(h, "name", w),
    text: str(h, "text", w),
    images: str(h, "images", w),
    aspect: pick(str(h, "aspect", w), ASPECTS, w),
    width: str(h, "width", w),
  };
});
