import { useRef, useState } from "react";
import ImageStack from "../../shared/ImageStack";
import ImageModal from "../../shared/ImageModal";
import { getImages, warmHobbyImages } from "../../util/images";
import { fmtLatex, useNearViewport } from "../../util/helpers";
import { BEYOND_INTRO, HOBBIES } from "../../content";
import { preloadImage } from "../../shared/BlurImage";

const hobbies = HOBBIES.map((h) => ({ ...h, imgs: getImages(h.images) }));

export default function BeyondCode() {
  const [openName, setOpenName] = useState<string | null>(null);
  const active = hobbies.find((h) => h.name === openName);
  const sectionRef = useRef<HTMLElement>(null);
  useNearViewport(sectionRef, warmHobbyImages);

  return (
    <section ref={sectionRef} className="py-4 max-md:py-2">
      <h2 className="section-title-center">Beyond Code</h2>
      <p className="section-subtitle max-md:text-center">{BEYOND_INTRO}</p>

      <div className="mt-8 max-md:mt-5 grid items-center gap-14 max-md:gap-8 lg:grid-cols-[2fr_1fr_1fr]">
        {hobbies.map((h) => (
          <div
            key={h.name}
            className="flex items-center -gap-1 max-md:flex-col max-md:items-center max-md:gap-4 max-md:text-center"
          >
            <div
              className={`${h.width} shrink-0 max-md:max-w-full`}
              onPointerEnter={() =>
                h.imgs.slice(0, 6).forEach((i) => preloadImage(i.src))
              }
            >
              <ImageStack
                images={h.imgs}
                title={h.name}
                aspect={h.aspect}
                onOpen={() => setOpenName(h.name)}
              />
            </div>
            <div className="flex min-w-0 flex-col">
              <h3 className="font-display text-xl font-semibold max-md:text-lg">
                {h.name}
              </h3>
              <p className="mt-1 text-sm text-foreground/70">
                {fmtLatex(h.text)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ImageModal
        images={active?.imgs ?? []}
        open={active !== undefined}
        title={active?.name ?? ""}
        onClose={() => setOpenName(null)}
      />
    </section>
  );
}
