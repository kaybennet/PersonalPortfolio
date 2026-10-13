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
