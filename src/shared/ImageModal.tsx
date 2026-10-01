import { useEffect, useRef, useState } from "react";
import BlurImage from "./BlurImage";
import { Lightbox } from "./ImageMasonry";

type Props = {
  images: ProjectImage[];
  open: boolean;
  title: string;
  onClose: () => void;
};

export default function ImageModal({ images, open, title, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) setSelected(null);
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[min(80rem,calc(100vw-2rem))] bg-transparent p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="max-h-[88vh] overflow-y-auto overscroll-contain">
        {/* your glass header here */}

        <ul className="columns-2 gap-3 p-4 sm:columns-3">
          {images.map((img, i) => (
            <li key={img.src} className="mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Open image ${i + 1} full size`}
                className="group/img relative isolate block w-full transform-gpu cursor-pointer overflow-hidden rounded-lg bg-surface
                  elevate transition-[translate,box-shadow] duration-500 ease-smooth
                  hover:-translate-y-1 hover:shadow-glass-hover
                  focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]
                  after:ring-2 after:ring-inset after:ring-white/25 dark:after:ring-white/10
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <BlurImage img={img} className="block w-full" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent
                    opacity-0 transition-opacity duration-500 ease-smooth group-hover/img:opacity-100 group-focus-visible/img:opacity-100"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        images={images}
        index={selected}
        onChange={setSelected}
        onClose={() => setSelected(null)}
      />
    </dialog>
  );
}
