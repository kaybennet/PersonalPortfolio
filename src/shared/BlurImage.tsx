import { useCallback, useState, type ImgHTMLAttributes } from "react";
import { preload } from "react-dom";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  wrapperClassName?: string;
  img: ProjectImage;
  priority?: boolean;
};

const cache = new Map<string, Promise<void>>();
const ready = new Set<string>();

export const isImageReady = (src: string) => ready.has(src);
export const markImageReady = (src: string) => void ready.add(src);

export function preloadImage(src: string): Promise<void> {
  let p = cache.get(src);
  if (!p) {
    const img = new Image();
    img.src = src;
    p = img.decode().then(
      () => markImageReady(src),
      () => {},
    );
    cache.set(src, p);
  }
  return p;
}

export default function BlurImage({
  img,
  priority = false,
  className = "",
  wrapperClassName = "",
  onLoad,
  ...rest
}: Props) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === img.src || isImageReady(img.src);

  if (priority) preload(img.src, { as: "image", fetchPriority: "high" });

  const markLoaded = useCallback(() => {
    markImageReady(img.src);
    setLoadedSrc(img.src);
  }, [img.src]);

  // Stable ref: only handles images that were already cached/complete
  const ref = useCallback(
    (el: HTMLImageElement | null) => {
      if (el?.complete && el.naturalWidth > 0) markLoaded();
    },
    [markLoaded],
  );

  return (
    <span
      className={`relative block overflow-hidden bg-surface ${wrapperClassName}`}
    >
      {img.alt && (
        <img
          src={img.alt} // tiny LQIP (e.g. 20px wide / data URL), NOT img.alt
          alt=""
          aria-hidden
          className="absolute inset-0 size-full scale-110 object-cover blur-md"
        />
      )}

      <img
        ref={ref}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        {...rest}
        src={img.src}
        alt={img.alt}
        onLoad={(e) => {
          markLoaded();
          onLoad?.(e);
        }}
        className={`relative transition-opacity duration-500 ease-smooth motion-reduce:transition-none
          ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </span>
  );
}
