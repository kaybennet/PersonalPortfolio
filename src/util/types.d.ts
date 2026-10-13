type ProgrammingLanguage =
  | "Rust"
  | "Python"
  | "TypeScript"
  | "JavaScript"
  | "Java"
  | "C"
  | "C++"
  | "C#"
  | "Go"
  | "Kotlin"
  | "Swift"
  | "SQL"
  | "Bash"
  | "CSS"
  | "HTML"
  | "React"
  | "AWS"
  | "LaTeX";

type ProjectImage = {
  alt: string;
  src: string;
  name: string;
  /** tiny blurred placeholder, inlined as a data URL */
  blur?: string;
  /** large variant for the lightbox */
  full?: string;
  /** intrinsic size of the displayed variant, to reserve space before load */
  width?: number;
  height?: number;
};
type ProjectCardSize = "w-xl" | "w-md" | "w-sm" | "h-xl" | "h-md" | "h-sm";

type PersonalProject = {
  id: string;
  title: string;
  languages: ProgrammingLanguage[];
  github_link: string;
  started: Date;
  summary: string;
  description: string;
  learnings: string[];
  time_spent: float;
  difficulty: float;
  ai_use: float;
  collapseStdEntry?: boolean = false;
};

type TimelineEvent = {
  date: Date;
  title: string;
  place?: string;
  description: string;
  label?: string;
};

declare module "*.toml" {
  const data: Record<string, unknown>;
  export default data;
}

type Skill = {
  name: string;
  key: import("../CustomIcon").IconName;
  info?: { description: string; tags: string[] };
};
type SkillGroup = { group: string; items: string[] };
type Proficiency = { lang: ProgrammingLanguage; level: number };
type Course = { name: string; detail: string; color: string };
type Grade = { label: string; grade: number };
type Hobby = {
  name: string;
  text: string;
  images: string;
  aspect: "1:1" | "16:9" | "2:3";
  width: string;
};
