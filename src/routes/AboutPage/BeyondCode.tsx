import { useRef, useState, type ReactNode } from "react";
import ImageStack, { type StackAspect } from "../../shared/ImageStack";
import ImageModal from "../../shared/ImageModal";
import { getImages, warmHobbyImages } from "../../util/images";
import { useNearViewport } from "../../util/helpers";
import { LINK_BACKLOGGD, LINK_LETTERBOXD } from "../../util/consts";
import { preloadImage } from "../../shared/BlurImage";

type Hobby = {
  name: string;
  text: ReactNode;
  images: ReturnType<typeof getImages>;
  aspect: StackAspect;
  width: string;
};

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-foreground underline decoration-border underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
    >
      {children}
    </a>
  );
}

const hobbies: Hobby[] = [
  {
    name: "Hiking",
    text: "I appreciate a good holiday in a city or at the beach. But nothing's better than a trip to the mountains. It's also probably the best form of intense physical activity maybe ever.",
    images: getImages("hobbies/hiking"),
    aspect: "16:9",
    width: "w-90",
  },
  {
    name: "Cinema",
    text: (
      <>
        Watching a movie does not feel like procrastination, but productive
        spiritual instead. See my{" "}
        <TextLink href={LINK_LETTERBOXD}>Letterboxd</TextLink> for more.
      </>
    ),
    images: getImages("hobbies/movies"),
    aspect: "2:3",
    width: "w-40",
  },
  {
    name: "Story Games",
    text: (
      <>
        The greatest stories I ever experienced were through the medium of
        gaming. See my <TextLink href={LINK_BACKLOGGD}>Backloggd</TextLink> for
        more.
      </>
    ),
    images: getImages("hobbies/games"),
    aspect: "2:3",
    width: "w-40",
  },
];

export default function BeyondCode() {
  const [openName, setOpenName] = useState<string | null>(null);
  const active = hobbies.find((h) => h.name === openName);
  const sectionRef = useRef<HTMLElement>(null);
  useNearViewport(sectionRef, warmHobbyImages);

  return (
    <section ref={sectionRef} className="py-4 max-md:py-2">
      <h2 className="font-display text-3xl font-bold tracking-tight max-md:text-2xl max-md:text-center">
        Beyond Code
      </h2>
      <p className="mt-3 text-lg text-muted max-md:text-center">
        What I'm up to when I'm not at the keyboard.
      </p>

      <div className="mt-8 max-md:mt-5 grid items-center gap-14 max-md:gap-8 lg:grid-cols-[2fr_1fr_1fr]">
        {hobbies.map((h) => (
          <div key={h.name} className="flex items-center -gap-1 max-md:flex-col max-md:items-center max-md:gap-4 max-md:text-center">
            <div
              className={`${h.width} shrink-0 max-md:max-w-full`}
              onPointerEnter={() =>
                h.images.slice(0, 6).forEach((i) => preloadImage(i.src))
              }
            >
              <ImageStack
                images={h.images}
                title={h.name}
                aspect={h.aspect}
                onOpen={() => setOpenName(h.name)}
              />
            </div>
            <div className="flex min-w-0 flex-col">
              <h3 className="font-display text-xl font-semibold max-md:text-lg">{h.name}</h3>
              <p className="mt-1 text-sm text-foreground/70">{h.text}</p>
            </div>
          </div>
        ))}
      </div>
      <ImageModal
        images={active?.images ?? []}
        open={active !== undefined}
        title={active?.name ?? ""}
        onClose={() => setOpenName(null)}
      />
    </section>
  );
}
