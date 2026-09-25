import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";

type GalleryImage = { src: string; alt?: string };

type Props = { images: GalleryImage[]; title: string };

export default function ImageMasonry({ images, title }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");
  const cols = Math.max(1, Math.min(images.length, isLg ? 3 : isSm ? 2 : 1));

  const altFor = (img: GalleryImage, i: number) =>
    img.alt ?? `${title} screenshot ${i + 1}`;

  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Gallery
        </h3>
        <span className="text-xs text-muted tabular-nums">
          {images.length} {images.length === 1 ? "image" : "images"}
        </span>
      </div>

      <Box
        className="mt-4"
        sx={{
          width: "100%",
          maxHeight: 576,
          overflowY: "auto",
          overscrollBehavior: "contain",
          pr: 0.5,
        }}
      >
        <ImageList
          variant="masonry"
          cols={cols}
          gap={12}
          sx={{ m: 0, overflow: "visible" }}
        >
          {images.map((img, i) => (
            <ImageListItem key={img.src}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Open image ${i + 1} full size`}
                className="group block w-full cursor-pointer overflow-hidden rounded-lg bg-surface ring-1 ring-border
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <img
                  src={img.src}
                  alt={altFor(img, i)}
                  loading="lazy"
                  className="block w-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Lightbox
        images={images}
        index={selected}
        altFor={altFor}
        onChange={setSelected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}

type LightboxProps = {
  images: GalleryImage[];
  index: number | null;
  altFor: (img: GalleryImage, i: number) => string;
  onChange: (i: number) => void;
  onClose: () => void;
};

function Lightbox({ images, index, altFor, onChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const multiple = images.length > 1;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

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
        backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {index !== null && (
        <img
          src={images[index].src}
          alt={altFor(images[index], index)}
          className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        />
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {multiple && (
        <>
          <LightboxNav side="left" onClick={() => go(-1)} />
          <LightboxNav side="right" onClick={() => go(1)} />
          {index !== null && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white tabular-nums">
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
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-4" : "right-4"}
        cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={side === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}
