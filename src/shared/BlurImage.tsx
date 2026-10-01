import { useState, type ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  wrapperClassName?: string;
  img: ProjectImage;
};

export default function BlurImage({
  img,
  className = "",
  wrapperClassName = "",
  onLoad,
  ...rest
}: Props) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === img.src;

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      <img
        src={img.alt}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full scale-110 object-cover blur-md
          transition-opacity duration-500 motion-reduce:transition-none
          ${loaded ? "opacity-0" : "opacity-100"}`}
      />

      <img
        {...rest}
        src={img.src}
        alt=""
        decoding="async"
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) setLoadedSrc(img.src);
        }}
        onLoad={(e) => {
          setLoadedSrc(img.src);
          onLoad?.(e);
        }}
        className={`relative transition-[opacity,filter] duration-500 ease-smooth motion-reduce:transition-none
          ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"} ${className}`}
      />
    </span>
  );
}
