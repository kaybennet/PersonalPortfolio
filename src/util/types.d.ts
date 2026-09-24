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
  | "Bash";

type PersonalProject = {
  id: string;
  title: string;
  languages: ProgrammingLanguage[];
  is_pub: boolean;
  started: Date;
  summary: string;
  comment: string;
};
