export const LINK_GITHUB = "https://github.com/kaybennet";
export const LINK_LINKEDIN =
  "https://www.linkedin.com/in/kay-bennet-st%C3%A4ding-04ba08418/?locale=en";
export const LINK_EMAIL = "kaybennet.staeding@gmai.com";
export const LINK_LETTERBOXD = "https://boxd.it/4O1el";
export const LINK_BACKLOGGD = "https://bckl.gg/b4zs";

import noCoverSrc from "../assets/images_md/no_cover.webp";
import dimensions from "../assets/images_md/dimensions.json";
import noCoverBlur from "../assets/images_blurred/no_cover.png?inline";
export const ERR_IMG: ProjectImage = {
  alt: "no cover",
  src: noCoverSrc,
  blur: noCoverBlur,
  name: "no cover",
  width: (dimensions as Record<string, number[]>)["no_cover"]?.[0],
  height: (dimensions as Record<string, number[]>)["no_cover"]?.[1],
};
