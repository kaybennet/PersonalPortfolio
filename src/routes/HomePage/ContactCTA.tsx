import CustomIcon from "../../CustomIcon"; // adjust path
import { CTA, LINK_EMAIL, LINK_LINKEDIN } from "../../content";

const btn =
  "flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold backdrop-blur-xl backdrop-saturate-150 " +
  "transition-[translate,background-color,box-shadow] duration-300 ease-smooth hover:-translate-y-0.5 " +
  "active:translate-y-0 motion-reduce:transition-none";

export function ContactCTA() {
  return (
    <section className="relative pt-8 max-md:pt-0 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-40 w-96 max-w-full -translate-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      <p className="font-mono text-xs tracking-wider text-muted uppercase max-md:text-[11px]">
        {CTA.eyebrow}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight max-md:text-2xl">
        {CTA.title}
      </h2>
      <p className="mt-3 text-foreground/80 max-md:mt-1 max-md:text-sm">
        {CTA.text}
      </p>

      <div className="mt-6 max-md:mt-4 flex flex-wrap justify-center gap-3">
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
          className={`${btn} glass relative hover:[--glass-drop:0_14px_30px_-10px_var(--glass-shadow-color)]`}
        >
          <CustomIcon name="linkedin" size={18} className="" />
          LinkedIn
        </a>
      </div>
    </section>
  );
}
