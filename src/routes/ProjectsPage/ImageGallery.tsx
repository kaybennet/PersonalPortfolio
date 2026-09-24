import { useState, type KeyboardEvent } from "react";

type GalleryImage = { src: string; name: string };

export default function ImageGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const current = images[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  if (count === 0) return null;

  return (
    <div className="space-y-3" onKeyDown={onKeyDown}>
      {/* Main image */}
      <figure className="group/gallery relative overflow-hidden rounded-xl bg-surface">
        <img
          key={current.src}
          src={current.src}
          alt={`${title}: ${current.name}`}
          className="aspect-video w-1/2 object-contain transition-opacity duration-300 starting:opacity-0"
        />

        {count > 1 && (
          <>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
            <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {index + 1} / {count}
            </span>
          </>
        )}
      </figure>

      <p className="text-sm text-muted">{current.name}</p>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}: ${img.name}`}
              aria-current={i === index}
              className={`shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-200 ${
                i === index
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt=""
                loading="lazy"
                className="h-16 w-28 bg-surface object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavButton({
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
      className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-3" : "right-3"}
        cursor-pointer rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200
        hover:bg-black/60 group-hover/gallery:opacity-100 focus-visible:opacity-100`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={side === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}
