import { useEffect, useRef, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlurImage, { preloadImage } from "./BlurImage";
import { canPrefetch } from "../util/images";

const darkGlass =
  "bg-white/10 text-white backdrop-blur-xl backdrop-saturate-150 " +
  "ring-1 ring-inset ring-white/20 inset-shadow-[0_1px_0_rgb(255_255_255/0.25)] " +
  "shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)]";

const darkGlassButton =
  `${darkGlass} cursor-pointer grid place-items-center rounded-full ` +
  "transition-[background-color,scale] duration-200 ease-smooth " +
  "hover:scale-105 hover:bg-white/20 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white " +
  "motion-reduce:transition-none motion-reduce:hover:scale-100";

export default function ImageMasonry({ images }: { images: ProjectImage[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");
  const cols = Math.max(1, Math.min(images.length, isLg ? 3 : isSm ? 2 : 1));

  return (
    <>
      <ImageList
        variant="masonry"
        cols={cols}
        gap={18}
        sx={{ m: 0, overflow: "visible" }}
      >
        {images.map((img, i) => (
          <ImageListItem key={img.src}>
            <button
              type="button"
              onClick={() => setSelected(i)}
              onPointerEnter={() =>
                canPrefetch() && void preloadImage(img.full ?? img.src)
              }
              aria-label={`Open image ${i + 1} full size`}
              className="group/img relative isolate block w-full transform-gpu cursor-pointer overflow-hidden rounded-lg bg-surface
                elevate transition-[translate,box-shadow] duration-500 ease-smooth
                hover:-translate-y-1 hover:shadow-glass-hover
                focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]
                after:ring-2 after:ring-inset after:ring-white/25 dark:after:ring-white/10
                motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <BlurImage
                img={img}
                className="block w-full transition-[scale] duration-700 ease-smooth motion-reduce:transition-none"
              />

              {/* Scrim */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent
                  opacity-0 transition-opacity duration-500 ease-smooth group-hover/img:opacity-100 group-focus-visible/img:opacity-100"
              />
            </button>
          </ImageListItem>
        ))}
      </ImageList>

      <Lightbox
        images={images}
        index={selected}
        onChange={setSelected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

type LightboxProps = {
  images: ProjectImage[];
  index: number | null;
  onChange: (i: number) => void;
  onClose: () => void;
};

export function Lightbox({ images, index, onChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const multiple = images.length > 1;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // warm the large variants of this image and its neighbours
  useEffect(() => {
    if (index === null || !canPrefetch()) return;
    const n = images.length;
    for (const d of [0, 1, -1]) {
      const img = images[(index + d + n) % n];
      if (img) void preloadImage(img.full ?? img.src);
    }
  }, [index, images]);

  const go = (dir: number) => {
    if (index === null) return;
    onChange((index + dir + images.length) % images.length);
  };

  return (
    <dialog
      ref={ref}
      // Stop close/click from bubbling up to the ProjectModal's <dialog>
      onClose={(e) => {
        e.stopPropagation();
        onClose();
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-transparent p-4 sm:p-10 open:flex
        opacity-0 transition-[opacity,display,overlay] transition-discrete duration-200
        open:opacity-100 starting:open:opacity-0
        backdrop:bg-black/85 backdrop:backdrop-blur-md"
    >
      {index !== null && (
        <img
          key={index}
          src={images[index].full ?? images[index].src}
          className="max-h-full max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10
            transition-[opacity,scale] duration-300 ease-smooth starting:opacity-0 starting:scale-[0.98]
            motion-reduce:transition-none"
        />
      )}

      {multiple && (
        <>
          <LightboxNav side="left" onClick={() => go(-1)} />
          <LightboxNav side="right" onClick={() => go(1)} />
          {index !== null && (
            <span
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3.5 py-1.5 text-sm font-medium tabular-nums ${darkGlass}`}
            >
              {index + 1} / {images.length}
            </span>
          )}
        </>
      )}
    </dialog>
  );
}

function LightboxNav({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-4" : "right-4"
      } size-12 ${darkGlassButton}`}
    >
      <Icon size={24} strokeWidth={2.5} />
    </button>
  );
}
