import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
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
  { label: "LinkedIn", href: LINK_LINKEDIN, icon: "linkedin" },
  { label: "Email", href: "mailto:" + LINK_EMAIL, icon: "email" },
];

const iconButton =
  "grid size-10 place-items-center rounded-xl text-muted transition-colors duration-200 " +
  "hover:bg-foreground/[0.06] hover:text-foreground " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// Desktop: no background here — the sliding pill draws the active state.
const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative z-10 block rounded-xl px-3 py-2 text-base font-medium transition-colors duration-200 ` +
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
    isActive ? "text-foreground" : "text-muted hover:text-foreground"
  }`;

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  localStorage.theme = dark ? "dark" : "light";
}

type Pill = { left: number; width: number } | null;

export default function Topbar({
  title = "My App",
  links = defaultLinks,
  socials = defaultSocials,
}) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // --- sliding selection pill -------------------------------------------
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<Pill>(null);
  const [hover, setHover] = useState<Pill>(null);
  const [animate, setAnimate] = useState(false); // skip the very first slide-in

  useLayoutEffect(() => {
    const measure = () => {
      const active = listRef.current?.querySelector<HTMLElement>(
        'a[aria-current="page"]',
      );
      setPill(
        active ? { left: active.offsetLeft, width: active.offsetWidth } : null,
      );
    };
    measure();
    document.fonts?.ready.then(measure); // web fonts can change link widths
    window.addEventListener("resize", measure);
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(id);
    };
  }, [pathname]);

  const onHover = (e: React.MouseEvent<HTMLElement>) => {
    const a = e.currentTarget.querySelector("a");
    if (a) setHover({ left: a.offsetLeft, width: a.offsetWidth });
  };

  const pillTransition = animate
    ? "transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none"
    : "";

  // --- links -------------------------------------------------------------
  const desktopLinks = links.map((link) => (
    <li key={link.to} onMouseEnter={onHover}>
      <NavLink to={link.to} end className={desktopLinkClass}>
        {link.label}
      </NavLink>
    </li>
  ));

  const socialLinks = (focusable = true) =>
    socials.map(({ label, href, icon }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={label}
        title={label}
        className={iconButton}
        tabIndex={focusable ? undefined : -1}
      >
        <CustomIcon name={icon} size={20} className="" />
      </a>
    ));

  return (
    <header
      className={
        "sticky top-0 z-16 border-b border-foreground/10 " +
        "bg-background/55 backdrop-blur-xl backdrop-saturate-150 " +
        // hairline highlight on the top edge + soft drop shadow = glass slab
        "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.35),0_8px_24px_-12px_rgb(0_0_0/0.15)] " +
        "dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06),0_8px_24px_-12px_rgb(0_0_0/0.6)]"
      }
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          {title}
        </Link>

        {/* Desktop nav with sliding indicator */}
        <ul
          ref={listRef}
          onMouseLeave={() => setHover(null)}
          className="relative hidden gap-3 rounded-2xl p-1 md:flex"
        >
          {/* hover ghost */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-y-1 left-0 rounded-xl bg-foreground/4 ${pillTransition}`}
            style={{
              transform: `translateX(${(hover ?? pill)?.left ?? 0}px)`,
              width: (hover ?? pill)?.width ?? 0,
              opacity: hover && (!pill || hover.left !== pill.left) ? 1 : 0,
            }}
          />
          {/* active pill */}
          <span
            aria-hidden
            className={
              "pointer-events-none absolute inset-y-1 left-0 rounded-xl " +
              "bg-foreground/[0.07] backdrop-blur-sm " +
              "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.4),0_1px_3px_0_rgb(0_0_0/0.08)] " +
              "dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.08),0_1px_3px_0_rgb(0_0_0/0.4)] " +
              pillTransition
            }
            style={{
              transform: `translateX(${pill?.left ?? 0}px)`,
              width: pill?.width ?? 0,
              opacity: pill ? 1 : 0,
            }}
          />
          {desktopLinks}
        </ul>

        <div className="ml-auto hidden items-center gap-1 border-r border-foreground/10 pr-3 md:flex">
          {socialLinks()}
        </div>

        {/* Theme toggle: icons rotate/scale into each other */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`${iconButton} ml-auto md:ml-0`}
        >
          <span className="grid *:col-start-1 *:row-start-1">
            <CustomIcon
              name="moon"
              size={20}
              className="transition-all duration-300 motion-reduce:transition-none dark:rotate-90 dark:scale-0 dark:opacity-0"
            />
            <CustomIcon
              name="sun"
              size={20}
              className="-rotate-90 scale-0 opacity-0 transition-all duration-300 motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100"
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`${iconButton} md:hidden`}
        >
          <CustomIcon name={open ? "close" : "menu"} size={20} className="" />
        </button>
      </nav>
    </header>
  );
}
