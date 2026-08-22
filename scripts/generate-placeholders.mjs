// Generates warm, on-brand SVG placeholder imagery for the Agami catalogue.
// Run with: node scripts/generate-placeholders.mjs
// These are NOT real product photography — replace them before launch.
// See README.md "Replacing demo images" for details.
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "public", "images", "placeholders");
mkdirSync(OUT_DIR, { recursive: true });

const PALETTE = {
  olive: "#292A1F",
  gold: "#D4A017",
  ivory: "#F3EDE2",
  sand: "#C7A982",
  terracotta: "#A85B3A",
  sage: "#A8B09B",
  brown: "#3B332B",
};

function wrapLabel(label, width) {
  const words = label.split(" ");
  const lines = [];
  let current = "";
  const maxChars = Math.floor(width / 11);
  for (const word of words) {
    if ((current + " " + word).trim().length > maxChars) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function baseCard({ width, height, bg1, bg2, label, caption, monogram = true }) {
  const lines = wrapLabel(label, width * 0.7);
  const lineHeight = 20;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  const monogramMark = monogram
    ? `
    <g transform="translate(${width / 2}, ${height * 0.32})" opacity="0.9">
      <circle r="46" fill="none" stroke="${PALETTE.gold}" stroke-width="1.2"/>
      <circle r="38" fill="none" stroke="${PALETTE.gold}" stroke-width="0.6" opacity="0.6"/>
      <path d="M0 -24 L18 24 M0 -24 L-18 24 M-11 12 H11" stroke="${PALETTE.olive}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>`
    : "";

  const textLines = lines
    .map(
      (line, i) =>
        `<text x="50%" y="${startY + i * lineHeight}" text-anchor="middle" font-family="Georgia, 'Cormorant Garamond', serif" font-style="italic" font-size="17" fill="${PALETTE.brown}">${line}</text>`
    )
    .join("\n");

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg1}"/>
      <stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
    <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="${PALETTE.olive}" opacity="0.05"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#dots)"/>
  <rect x="16" y="16" width="${width - 32}" height="${height - 32}" fill="none" stroke="${PALETTE.gold}" stroke-width="1" opacity="0.5"/>
  ${monogramMark}
  ${textLines}
  <text x="50%" y="${height - 28}" text-anchor="middle" font-family="'DM Sans', Helvetica, Arial, sans-serif" font-size="10" letter-spacing="2" fill="${PALETTE.terracotta}">${caption.toUpperCase()}</text>
</svg>`;
}

const items = [
  {
    file: "hero-woman-jewellery.svg",
    width: 1200,
    height: 1500,
    bg1: PALETTE.sand,
    bg2: PALETTE.terracotta,
    label: "Woman wearing gold jhumka earrings and silk saree, warm natural light",
    caption: "Replace — Hero Photograph",
  },
  {
    file: "category-earrings.svg",
    width: 800,
    height: 1000,
    bg1: PALETTE.ivory,
    bg2: PALETTE.sand,
    label: "Kundan jhumka earrings on warm neutral backdrop",
    caption: "Replace — Earrings",
  },
  {
    file: "category-necklaces.svg",
    width: 800,
    height: 1000,
    bg1: PALETTE.ivory,
    bg2: PALETTE.sand,
    label: "Temple-style necklace laid on textured silk",
    caption: "Replace — Necklaces",
  },
  {
    file: "category-bangles.svg",
    width: 800,
    height: 1000,
    bg1: PALETTE.ivory,
    bg2: PALETTE.sand,
    label: "Stacked antique-finish bangles, editorial crop",
    caption: "Replace — Bangles",
  },
  {
    file: "category-rings.svg",
    width: 800,
    height: 1000,
    bg1: PALETTE.ivory,
    bg2: PALETTE.sand,
    label: "Statement ring close-up on hand, soft light",
    caption: "Replace — Rings",
  },
  {
    file: "category-sets.svg",
    width: 800,
    height: 1000,
    bg1: PALETTE.ivory,
    bg2: PALETTE.sand,
    label: "Full bridal jewellery set styled on mannequin",
    caption: "Replace — Sets",
  },
  {
    file: "category-other.svg",
    width: 800,
    height: 1000,
    bg1: PALETTE.ivory,
    bg2: PALETTE.sand,
    label: "Hair accessories and maang tikka detail shot",
    caption: "Replace — Other",
  },
  {
    file: "story-cover.svg",
    width: 1200,
    height: 1500,
    bg1: PALETTE.sage,
    bg2: PALETTE.olive,
    label: "Haritha at her workbench, sketching a new design",
    caption: "Replace — Story Cover",
  },
  {
    file: "story-craft.svg",
    width: 1000,
    height: 1250,
    bg1: PALETTE.gold,
    bg2: PALETTE.terracotta,
    label: "Close-up of hands setting Kundan stones",
    caption: "Replace — Craftsmanship",
  },
  {
    file: "story-inspiration.svg",
    width: 1000,
    height: 1250,
    bg1: PALETTE.sand,
    bg2: PALETTE.sage,
    label: "Mood board of traditional motifs and fabric swatches",
    caption: "Replace — Inspiration",
  },
  {
    file: "contact-cover.svg",
    width: 1000,
    height: 800,
    bg1: PALETTE.terracotta,
    bg2: PALETTE.olive,
    label: "Gift-wrapped jewellery box with gold ribbon",
    caption: "Replace — Contact",
  },
];

// Generic reusable product placeholders (a handful of tasteful variants,
// reused across seed products where a specific photo isn't available yet).
const productVariants = [
  { key: "earrings", label: "Earrings product photography, front + detail angle" },
  { key: "necklace", label: "Necklace product photography, laid flat" },
  { key: "bangles", label: "Bangles product photography, stacked" },
  { key: "ring", label: "Ring product photography, macro shot" },
  { key: "set", label: "Jewellery set product photography, styled" },
  { key: "other", label: "Hair accessory product photography, detail shot" },
];

for (const item of items) {
  writeFileSync(join(OUT_DIR, item.file), baseCard(item));
}

for (const variant of productVariants) {
  for (const angle of [1, 2]) {
    const file = `product-${variant.key}-${angle}.svg`;
    writeFileSync(
      join(OUT_DIR, file),
      baseCard({
        width: 900,
        height: 1125,
        bg1: PALETTE.ivory,
        bg2: PALETTE.sand,
        label: `${variant.label} (angle ${angle})`,
        caption: "Sample Placeholder",
      })
    );
  }
}

writeFileSync(
  join(process.cwd(), "public", "images", "og-default.svg"),
  baseCard({
    width: 1200,
    height: 630,
    bg1: PALETTE.olive,
    bg2: PALETTE.terracotta,
    label: "Agami by Haritha — Handpicked fancy jewellery",
    caption: "Replace — Social Share Image",
    monogram: true,
  })
);

console.log(`Generated ${items.length + productVariants.length * 2 + 1} placeholder images in ${OUT_DIR}`);
