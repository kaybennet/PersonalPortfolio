import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import CustomIcon, { type IconName } from "../CustomIcon";
import { warmRoute } from "../util/images";
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

const BOUNCE = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";
const SMOOTH = "ease-[cubic-bezier(.3,.7,.2,1)]";

const iconButton =
  `grid size-11 cursor-pointer place-items-center rounded-xl text-muted ` +
  `transition-[color,background-color,scale,translate] duration-300 ${BOUNCE} ` +
  "hover:bg-foreground/[0.06] hover:text-foreground active:scale-90 motion-reduce:transition-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative z-10 block rounded-xl px-4 py-2 text-[1.0625rem] font-medium ` +
  `transition-colors duration-300 motion-reduce:transition-none ` +
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
  const { pathname } = useLocation();
  // menu is tied to the route it was opened on, so navigating closes it
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  // --- frosted only once the page scrolls under it -----------------------
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // active pill bounces into place; the hover ghost glides
  const pillTransition = animate
    ? `transition-[transform,width,opacity] duration-500 ${BOUNCE} motion-reduce:transition-none`
    : "";
  const ghostTransition = animate
    ? `transition-[transform,width,opacity] duration-300 ${SMOOTH} motion-reduce:transition-none`
    : "";

  // --- links -------------------------------------------------------------
  const desktopLinks = links.map((link) => (
    <li key={link.to} onMouseEnter={onHover}>
      <NavLink
        to={link.to}
        end
        className={desktopLinkClass}
        onPointerEnter={() => warmRoute(link.to)}
        onFocus={() => warmRoute(link.to)}
        onPointerDown={() => warmRoute(link.to)}
      >
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
        className={`${iconButton} hover:-translate-y-0.5`}
        tabIndex={focusable ? undefined : -1}
      >
        <CustomIcon name={icon} size={22} className="" />
      </a>
    ));

  return (
    <header
      className={
        "sticky top-0 z-16 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out " +
        "motion-reduce:transition-none " +
        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 " +
        "after:bg-linear-to-r after:from-transparent after:via-foreground/15 after:to-transparent " +
        "after:transition-opacity after:duration-500 " +
        (scrolled
          ? "after:opacity-100 bg-(--glass-tint) backdrop-blur-[24px] backdrop-saturate-[1.9] " +
            // hairline highlight on the top edge + soft drop shadow = glass slab
            "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.4),0_10px_30px_-14px_rgb(0_0_0/0.2)] " +
            "dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.07),0_10px_30px_-14px_rgb(0_0_0/0.7)]"
          : "after:opacity-60 bg-transparent")
      }
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center gap-8 max-md:gap-2 max-md:px-4">
        <Link
          to="/"
          className={`font-display text-[2rem] font-bold tracking-tight max-md:text-2xl max-sm:min-w-0 max-sm:truncate`}
        >
          {title}
        </Link>

        {/* Desktop nav: recessed glass track with sliding indicator */}
        <ul
          ref={listRef}
          onMouseLeave={() => setHover(null)}
          className="relative hidden gap-1 rounded-2xl p-1
             md:flex"
        >
          {/* hover ghost */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-y-1 left-0 rounded-xl bg-foreground/5 ${ghostTransition}`}
            style={{
              transform: `translateX(${(hover ?? pill)?.left ?? 0}px)`,
              width: (hover ?? pill)?.width ?? 0,
              opacity: hover && (!pill || hover.left !== pill.left) ? 1 : 0,
            }}
          />
          {/* active pill: frosted chip */}
          <span
            aria-hidden
            className={
              "pointer-events-none absolute inset-y-1 left-0 rounded-xl " +
              "bg-(--glass-tint-hover) backdrop-blur-[24px] backdrop-saturate-[1.9] dark:bg-foreground/9 " +
              "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.7),0_2px_8px_-2px_rgb(0_0_0/0.12)] " +
              "dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.1),0_2px_8px_-2px_rgb(0_0_0/0.5)] " +
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

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {socialLinks()}
          {/* soft fading divider instead of a hard border */}
          <span
            aria-hidden
            className="ml-2 h-6 w-px bg-linear-to-b from-transparent via-foreground/15 to-transparent"
          />
        </div>

        {/* Theme toggle: icons rotate/scale into each other */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`${iconButton} ml-auto md:-ml-6`}
        >
          <span className="grid *:col-start-1 *:row-start-1">
            <CustomIcon
              name="moon"
              size={22}
              className={`transition-[rotate,scale,opacity] duration-500 ${BOUNCE} motion-reduce:transition-none dark:rotate-90 dark:scale-0 dark:opacity-0`}
            />
            <CustomIcon
              name="sun"
              size={22}
              className={`-rotate-90 scale-0 opacity-0 transition-[rotate,scale,opacity] duration-500 ${BOUNCE} motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100`}
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOpenAt(open ? null : pathname)}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`${iconButton} md:hidden`}
        >
          <CustomIcon name={open ? "close" : "menu"} size={22} className="" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`px-4 pb-4 ${
              scrolled ? "" : "bg-background/90 backdrop-blur-xl"
            }`}
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end
                    onClick={() => setOpenAt(null)}
                    onPointerDown={() => warmRoute(link.to)}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                        isActive
                          ? "bg-foreground/[0.07] text-foreground"
                          : "text-muted active:bg-foreground/5"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-1 border-t border-border pt-3">
              {socialLinks()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
