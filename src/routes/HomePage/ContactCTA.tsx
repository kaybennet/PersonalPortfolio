import CustomIcon from "../../CustomIcon"; // adjust path
import { LINK_EMAIL, LINK_LINKEDIN } from "../../util/consts";

const btn =
  "flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold backdrop-blur-xl backdrop-saturate-150 " +
  "transition-[translate,background-color,box-shadow] duration-300 ease-smooth hover:-translate-y-0.5 " +
  "active:translate-y-0 motion-reduce:transition-none";

export function ContactCTA() {
  return (
    <section className="relative pt-8 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-40 w-96 max-w-full -translate-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      {/* MOCK: adjust to what you're actually open to */}
      <p className="font-mono text-xs tracking-wider text-muted uppercase">
        Open to working-student roles & internships
      </p>
      <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">
        Let's connect.
      </h2>
      <p className="mt-3 text-foreground/80">
        Always happy to dive into new issues.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href={"mailto:" + LINK_EMAIL}
          className={`${btn} bg-primary/85 text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_8px_24px_-8px_var(--primary)] hover:bg-primary`}
        >
          <CustomIcon name="email" size={18} className="" />
          Get in touch
        </a>
        <a
          href={LINK_LINKEDIN}
          target="_blank"
          rel="noreferrer"
          className={`${btn} bg-surface/50 shadow-glass hover:shadow-glass-hover`}
        >
          <CustomIcon name="linkedin" size={18} className="" />
          LinkedIn
        </a>
      </div>
    </section>
  );
}
