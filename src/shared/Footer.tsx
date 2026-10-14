import CustomIcon from "../CustomIcon";
import { SOCIALS } from "../content";

export default function Footer() {
  return (
    <footer className="mt-16 max-md:mt-8 border-t border-border">
      <div className="mx-auto grid max-w-screen-3xl items-center gap-4 px-4 py-3 text-sm text-muted sm:grid-cols-3">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Kay Bennet Staeding
        </p>

        <nav aria-label="Social links" className="flex justify-center gap-1">
          {SOCIALS.map((s) => (
            <a
              key={s.icon}
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={s.label}
              className="rounded-lg p-2 transition-colors hover:bg-foreground/6 hover:text-foreground"
            >
              <CustomIcon name={s.icon} size={18} className="" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
