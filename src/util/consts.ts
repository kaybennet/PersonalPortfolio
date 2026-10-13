export {
  LINK_GITHUB,
  LINK_LINKEDIN,
  LINK_EMAIL,
  LINK_LETTERBOXD,
  LINK_BACKLOGGD,
} from "../content";

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
