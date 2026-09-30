import { useEffect, useRef } from "react";
import type { GalleryImage } from "./ImageStack";
import BlurImage from "./BlurImage";

type Props = {
  images: GalleryImage[];
  open: boolean;
  title: string;
  onClose: () => void;
};

export default function ImageModal({ images, open, title, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[min(72rem,94vw)] rounded-2xl border border-border bg-background p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[88vh] overflow-y-auto">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-5 py-3 backdrop-blur">
          <h2 className="font-display text-xl font-bold">
            {title}
            <span className="ml-2 text-sm font-normal text-muted tabular-nums">
              {images.length}
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 cursor-pointer place-items-center rounded-full text-xl text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            ×
          </button>
        </header>

        <ul className="columns-2 gap-3 p-4 sm:columns-3">
          {images.map((img) => (
            <li key={img.src} className="mb-3 break-inside-avoid">
              <BlurImage
                src={img.src}
                alt={img.name}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg bg-surface ring-1 ring-border"
              />
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
