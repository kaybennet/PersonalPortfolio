import { useState, type ImgHTMLAttributes } from "react";
import { blurredFor } from "../util/images";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  placeholder?: string;
  wrapperClassName?: string;
};

export default function BlurImage({
  placeholder,
  wrapperClassName = "",
  className = "",
  onLoad,
  ...img
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const bg = placeholder ?? blurredFor(img.src);

  return (
    <span
      className={`block overflow-hidden bg-cover bg-center ${wrapperClassName}`}
      style={bg ? { backgroundImage: `url("${bg}")` } : undefined}
    >
      <img
        {...img}
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) setLoaded(true);
        }}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`transition-[opacity,filter] duration-500 ease-smooth motion-reduce:transition-none
          ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </span>
  );
}
