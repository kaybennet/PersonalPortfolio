import { useState } from "react";
import { Link, NavLink } from "react-router";
import CustomIcon, { type IconName } from "../CustomIcon";
import { LINK_LINKEDIN, LINK_GITHUB, LINK_EMAIL } from "../util/consts";

type NavItem = { label: string; to: string };
type SocialItem = { label: string; href: string; icon: IconName };

const defaultLinks: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
];

const defaultSocials: SocialItem[] = [
  { label: "GitHub", href: LINK_GITHUB, icon: "github" },
  {
    label: "LinkedIn",
    href: LINK_LINKEDIN,
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:" + LINK_EMAIL, icon: "email" },
];

const iconButton =
  "grid size-9 place-items-center rounded-lg text-muted hover:bg-surface hover:text-foreground";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-3 py-1.5 text-sm ${
    isActive
      ? "bg-surface font-medium text-foreground"
      : "text-muted hover:bg-surface hover:text-foreground"
  }`;

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  localStorage.theme = dark ? "dark" : "light";
}

export default function Topbar({
  title = "My App",
  links = defaultLinks,
  socials = defaultSocials,
}) {
  const [open, setOpen] = useState(false);

  const navLinks = links.map((link) => (
    <li key={link.to}>
      <NavLink
        to={link.to}
        end
        className={linkClass}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </NavLink>
    </li>
  ));

  const socialLinks = socials.map(({ label, href, icon }) => (
    <a
      key={label}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={iconButton}
    >
      <CustomIcon name={icon} size={18} className="" />
    </a>
  ));

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
        <Link to="/" className="mr-4 text-lg font-black tracking-tight">
          {title}
        </Link>
        <ul className="hidden gap-1 md:flex">{navLinks}</ul>

        <div className="ml-auto hidden items-center gap-1 border-r border-border pr-2 md:flex">
          {socialLinks}
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`${iconButton} ml-auto md:ml-0`}
        >
          <CustomIcon name="moon" size={20} className="dark:hidden" />
          <CustomIcon name="sun" size={20} className="hidden dark:block" />
        </button>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          className={`${iconButton} md:hidden`}
        >
          <CustomIcon name={open ? "close" : "menu"} size={20} className="" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">{navLinks}</ul>
          <div className="mt-3 flex gap-1 border-t border-border pt-3">
            {socialLinks}
          </div>
        </div>
      )}
    </header>
  );
}
