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

type PersonalProject = {
  id: string;
  title: string;
  languages: ProgrammingLanguage[];
  github_link: string;
  started: Date;
  summary: string;
  description: string;
  learnings: string[];
};
