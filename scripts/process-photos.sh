#!/usr/bin/env bash
# Compresses the uploaded real photography (public/"Other images", public/"Cover image")
# into web-friendly WebP masters at public/images/photos/.
# Longest side capped at 1600px; Next.js Image optimization handles further
# per-use resizing at request time. Re-run any time new source photos are added.
set -euo pipefail

SRC_OTHER="public/Other images"
SRC_COVER="public/Cover image"
OUT="public/images/photos"
TMP="$(mktemp -d)"
MAX_DIM=1600
QUALITY=78

mkdir -p "$OUT"

convert_one () {
  local src="$1"
  local name="$2"
  local tmp_jpg="$TMP/$name.jpg"
  sips -Z "$MAX_DIM" "$src" --out "$tmp_jpg" >/dev/null
  cwebp -quiet -q "$QUALITY" "$tmp_jpg" -o "$OUT/$name.webp"
  echo "  $name.webp <- $(basename "$src")"
}

echo "Cover / hero:"
convert_one "$SRC_COVER/DSC06240.JPG" "hero"

echo "Categories:"
convert_one "$SRC_OTHER/DSC07566.JPG" "category-earrings"
convert_one "$SRC_OTHER/DSC07625.JPG" "category-necklaces"
convert_one "$SRC_OTHER/DSC07630.JPG" "category-bangles"
convert_one "$SRC_OTHER/DSC09694.JPG" "category-rings"
convert_one "$SRC_OTHER/DSC09701.JPG" "category-sets"
convert_one "$SRC_OTHER/DSC09703.JPG" "category-other"

echo "Story:"
convert_one "$SRC_OTHER/DSC09710.JPG" "story-cover"
convert_one "$SRC_OTHER/DSC09715.JPG" "story-craft"
convert_one "$SRC_OTHER/DSC09720.JPG" "story-inspiration"

echo "Contact:"
convert_one "$SRC_OTHER/DSC09730.JPG" "contact-cover"

echo "Products:"
convert_one "$SRC_OTHER/DSC09819.JPG" "product-ag-er-001-1"
convert_one "$SRC_OTHER/DSC09984.JPG" "product-ag-er-001-2"
convert_one "$SRC_OTHER/DSC09840.JPG" "product-ag-er-002-1"
convert_one "$SRC_OTHER/DSC09892.JPG" "product-ag-er-003-1"
convert_one "$SRC_OTHER/DSC09917.JPG" "product-ag-nk-001-1"
convert_one "$SRC_OTHER/DSC09997.JPG" "product-ag-nk-001-2"
convert_one "$SRC_OTHER/DSC09941.JPG" "product-ag-nk-002-1"
convert_one "$SRC_OTHER/DSC09959.JPG" "product-ag-nk-003-1"
convert_one "$SRC_OTHER/DSC09970.JPG" "product-ag-bg-001-1"
convert_one "$SRC_OTHER/DSC09979.JPG" "product-ag-bg-002-1"
convert_one "$SRC_OTHER/DSC09982.JPG" "product-ag-rg-001-1"
convert_one "$SRC_OTHER/DSC09920.JPG" "product-ag-st-001-1"
convert_one "$SRC_OTHER/DSC09978.JPG" "product-ag-st-002-1"
convert_one "$SRC_OTHER/DSC09820.JPG" "product-ag-ot-001-1"

echo "OG / social share (JPEG, most platforms don't support WebP previews):"
sips --resampleWidth 1200 "$SRC_COVER/DSC06240.JPG" --out "$TMP/og.jpg" >/dev/null
sips -c 630 1200 "$TMP/og.jpg" --out "public/images/og-default.jpg" >/dev/null

rm -rf "$TMP"

echo ""
echo "Done. Output sizes:"
du -sh "$OUT" public/images/og-default.jpg
