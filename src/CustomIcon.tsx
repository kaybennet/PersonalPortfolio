import type { ComponentType, CSSProperties } from "react";
import { Database, HelpCircle, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { FaGithub, FaJava, FaLinkedin, FaRust } from "react-icons/fa6";
import { FaPython } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiGnubash,
  SiGo,
  SiJavascript,
  SiKotlin,
  SiSwift,
  SiTypescript,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

type IconProps = {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
};

const ICONS = {
  // UI (lucide)
  sun: Sun,
  moon: Moon,
  menu: Menu,
  close: X,
  help: HelpCircle,
  // Brands (react-icons)
  github: FaGithub,
  linkedin: FaLinkedin,
  email: Mail,
  rust: FaRust,
  python: FaPython,
  typescript: SiTypescript,
  javascript: SiJavascript,
  java: FaJava,
  c: SiC,
  "c++": SiCplusplus,
  "c#": TbBrandCSharp,
  go: SiGo,
  kotlin: SiKotlin,
  swift: SiSwift,
  sql: Database,
  bash: SiGnubash,
} satisfies Record<string, ComponentType<IconProps>> &
  Record<Lowercase<ProgrammingLanguage>, ComponentType<IconProps>>;

export type IconName = keyof typeof ICONS;

type Props = IconProps & {
  name: IconName;
  fallbackName?: IconName;
};

export default function CustomIcon({
  name,
  size = 18,
  className = "m-1",
  color,
  strokeWidth,
  fallbackName = "help",
  style,
}: Props) {
  const Icon: ComponentType<IconProps> = ICONS[name] ?? ICONS[fallbackName];
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      color={color}
      style={style}
    />
  );
}

type LangIconProps = IconProps & {
  lang: ProgrammingLanguage;
};

export function LangIcon({ lang, ...props }: LangIconProps) {
  const name = lang.toLowerCase() as Lowercase<ProgrammingLanguage>;
  return <CustomIcon name={name} {...props} />;
}
