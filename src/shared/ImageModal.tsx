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

        <ul className="columns-2 gap-3 p-4 sm:columns-3 lg:columns-4">
          {images.map((img, i) => (
            <li key={img.src} className="mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`Open image ${i + 1} full size`}
                className="group/img image-tile"
              >
                <BlurImage img={img} className="block w-full" />
                <span
                  aria-hidden
                  className="image-scrim"
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
