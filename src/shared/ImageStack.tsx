import type { CSSProperties, PointerEvent } from "react";
import BlurImage from "./BlurImage";

export type StackAspect = "1:1" | "16:9" | "2:3";

const ASPECT: Record<StackAspect, string> = {
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "2:3": "aspect-2/3",
};

/** Cover first, no duplicates, safe when there is no cover. */
export function buildGallery(
  cover: ProjectImage | null | undefined,
  images: ProjectImage[],
): ProjectImage[] {
  if (!cover) return images;
  return [cover, ...images.filter((img) => img.src !== cover.src)];
}

type Props = {
  images: ProjectImage[];
  title: string;
  onOpen: (index: number) => void;
  className?: string;
};

type StackProps = Props & {
  /** Shape of each card. The stack adds 2.5rem on the right for the fan. */
  aspect?: StackAspect;
};

/* ------------------------------------------------------------------ */
/* Stack                                                               */
/* ------------------------------------------------------------------ */

const MAX_CARDS = 3;

/** Cover in front at the left; the rest step out to the right and fan further on hover. */
function cardVars(i: number): CSSProperties {
  return {
    "--r": `${i * 1}deg`,
    "--x": `${i * 0.75}rem`,
    "--s": `${1 - i * 0.03}`,
    "--fr": `${i * 1.75}deg`,
    "--fx": `${i * 1.25}rem`,
    "--fy": i === 0 ? "-0.375rem" : "0rem",
    zIndex: MAX_CARDS - i,
    transitionDelay: `${i * 35}ms`,
  } as CSSProperties;
}

function trackPointer(e: PointerEvent<HTMLButtonElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
  el.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
}

function resetPointer(e: PointerEvent<HTMLButtonElement>) {
  e.currentTarget.style.setProperty("--tilt-x", "0deg");
  e.currentTarget.style.setProperty("--tilt-y", "0deg");
}

export default function ImageStack({
  images,
  title,
  onOpen,
  aspect = "1:1",
  className = "",
}: StackProps) {
  if (images.length === 0) return null;

  const extra = images.length - 1;

  return (
    <button
      type="button"
      onClick={() => onOpen(0)}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      aria-label={`Open ${title} (${images.length} ${images.length === 1 ? "image" : "images"})`}
      className={`group/stack relative z-10 block w-full cursor-pointer self-start rounded-xl py-3
        focus-visible:outline-none ${className}`}
    >
      {/* tilt layer: sized by the aspect, follows the mouse, off for reduced motion */}
      <span
        className={`relative block w-[calc(100%-2.5rem)] ${ASPECT[aspect]} transition-transform duration-300 ease-out
          motion-safe:[transform:perspective(900px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]`}
      >
        {images.slice(0, MAX_CARDS).map((img, i) => (
          <span
            key={img.src}
            style={cardVars(i)}
            className="absolute inset-0 origin-bottom-left overflow-hidden rounded-xl
              shadow-glass group-hover/stack:shadow-glass-hover
              [rotate:var(--r)] [translate:var(--x)_0] [scale:var(--s)]
              group-hover/stack:[rotate:var(--fr)] group-hover/stack:[translate:var(--fx)_var(--fy)]
              group-focus-visible/stack:[rotate:var(--fr)] group-focus-visible/stack:[translate:var(--fx)_var(--fy)]
              transition-[rotate,translate,scale,box-shadow] duration-500 ease-smooth motion-reduce:transition-none"
          >
            <BlurImage
              img={img}
              wrapperClassName="size-full"
              className={`size-full bg-surface object-cover object-top transition-[filter] duration-500 ease-smooth
                ${i > 0 ? "brightness-90 group-hover/stack:brightness-100 dark:brightness-70" : ""}`}
            />

            {i === 0 && (
              <>
                {/* glare that follows the cursor */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay
                    transition-opacity duration-300 group-hover/stack:opacity-100
                    bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,0%),rgb(255_255_255/0.2),transparent_60%)]"
                />
                {extra > 0 && (
                  <span
                    aria-hidden="true"
                    className="glass absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg
                      px-2 py-1 text-sm font-semibold tabular-nums text-foreground"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect
                        x="1.75"
                        y="4.25"
                        width="9.5"
                        height="9.5"
                        rx="1.75"
                      />
                      <path
                        d="M4.75 1.75h7.5a2 2 0 0 1 2 2v7.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    +{extra}
                  </span>
                )}
              </>
            )}
          </span>
        ))}
      </span>
    </button>
  );
}
