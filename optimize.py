import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".webp"}

# name -> (max width, quality)
VARIANTS = {"md": (960, 80), "lg": (2000, 82)}


def convert(src: Path, dst: Path, max_w: int, quality: int) -> tuple[int, int]:
    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img)
        if img.width > max_w:
            img = img.resize(
                (max_w, round(img.height * max_w / img.width)), Image.LANCZOS
            )
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA" if "A" in img.mode else "RGB")
        img.save(dst, "WEBP", quality=quality, method=6)
        return img.size


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Mirror a directory into <name>_md and <name>_lg directories of resized WebP images."
    )
    parser.add_argument("src", type=Path, help="directory to read")
    args = parser.parse_args()

    src = args.src.resolve()
    if not src.is_dir():
        parser.error(f"{src} is not a directory")

    for name, (max_w, quality) in VARIANTS.items():
        dst = src.with_name(f"{src.name}_{name}")
        n = 0
        dims: dict[str, list[int]] = {}
        for file in sorted(src.rglob("*")):
            if not file.is_file() or file.suffix.lower() not in IMAGE_EXTS:
                continue
            target = (dst / file.relative_to(src)).with_suffix(".webp")
            target.parent.mkdir(parents=True, exist_ok=True)
            w, h = convert(file, target, max_w, quality)
            dims[target.relative_to(dst).with_suffix("").as_posix()] = [w, h]
            n += 1
        if name == "md":
            # intrinsic sizes, used to reserve space before images load
            (dst / "dimensions.json").write_text(json.dumps(dims, indent=0))
        print(f"ok {n} images -> {dst}")


if __name__ == "__main__":
    main()
