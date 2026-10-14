import type { ComponentType, CSSProperties } from "react";
import {
  Calendar,
  Database,
  HelpCircle,
  Mail,
  Menu,
  Moon,
  Sparkle,
  Sun,
  X,
} from "lucide-react";
import {
  FaAws,
  FaCss3Alt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaLinkedin,
  FaReact,
  FaRust,
} from "react-icons/fa6";
import { FaPython } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiGnubash,
  SiGo,
  SiJavascript,
  SiKotlin,
  SiSwift,
  SiLatex,
  SiTypescript,
  SiPytorch,
  SiPandas,
  SiNodedotjs,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { IoBulbSharp } from "react-icons/io5";

type IconProps = {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
};

// The Go mark is a wide wordmark that only fills a thin band of its 24x24 box,
// so crop the box around it and widen the icon to make it as prominent as the others.
function GoIcon({ size = 18, style, ...rest }: IconProps) {
  return (
    <SiGo
      {...rest}
      size={size}
      viewBox="0 2.75 24 14.5"
      style={{ width: size * 1.65, ...style }}
    />
  );
}

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
  go: GoIcon,
  kotlin: SiKotlin,
  swift: SiSwift,
  sql: Database,
  bash: SiGnubash,
  css: FaCss3Alt,
  html: FaHtml5,
  react: FaReact,
  aws: FaAws,
  latex: SiLatex,
  idea: IoBulbSharp,
  calendar: Calendar,
  pytorch: SiPytorch,
  pandas: SiPandas,
  node: SiNodedotjs,
  sparkles: Sparkle,
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
