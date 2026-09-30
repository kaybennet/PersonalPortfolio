import argparse
import shutil
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif", ".tiff"}


def blur_image(src: Path, dst: Path, radius: float) -> None:
    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img)  # respect phone rotation
        # Blur strength relative to image size, so small and large images look alike.
        img.thumbnail((48, 48))  # tiny is enough, the browser upscales smoothly
        blurred = img.filter(ImageFilter.GaussianBlur(1))
        if dst.suffix.lower() in (".jpg", ".jpeg") and blurred.mode == "RGBA":
            blurred = blurred.convert("RGB")
        blurred.save(dst, quality=85)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Mirror a directory into a sibling <name>_blurred directory with blurred images."
    )
    parser.add_argument("src", type=Path, help="directory to read")
    parser.add_argument(
        "--radius",
        type=float,
        default=0.03,
        help="blur radius as a fraction of the longer side (default 0.03)",
    )
    args = parser.parse_args()

    src: Path = args.src.resolve()
    if not src.is_dir():
        parser.error(f"{src} is not a directory")
    dst = src.with_name(f"{src.name}_blurred")

    blurred = copied = 0
    for file in sorted(src.rglob("*")):
        if not file.is_file():
            continue
        target = dst / file.relative_to(src)
        target.parent.mkdir(parents=True, exist_ok=True)

        if file.suffix.lower() in IMAGE_EXTS:
            try:
                blur_image(file, target, args.radius)
                blurred += 1
                continue
            except OSError as e:
                print(f"! could not blur {file.name} ({e}), copying instead")
        shutil.copy2(file, target)
        copied += 1

    print(f"✓ {blurred} blurred, {copied} copied → {dst}")


if __name__ == "__main__":
    main()
