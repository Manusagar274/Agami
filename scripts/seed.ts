/**
 * Seeds demo/sample catalogue data — 6 categories, one admin user, and 12
 * demo products (clearly placeholder content). Safe to re-run: existing
 * rows are matched by unique key and left untouched.
 *
 * Usage: npm run db:seed
 */

import { db } from "@/lib/db";
import { adminUsers, categories, productImages, products } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";

const CATEGORY_SEED = [
  { slug: "earrings", name: "Earrings", sortOrder: 1 },
  { slug: "necklaces", name: "Necklaces", sortOrder: 2 },
  { slug: "bangles", name: "Bangles", sortOrder: 3 },
  { slug: "rings", name: "Rings", sortOrder: 4 },
  { slug: "sets", name: "Sets", sortOrder: 5 },
  { slug: "other", name: "Other", sortOrder: 6 },
] as const;

export const PHOTO = (name: string) => `/images/photos/${name}.webp`;

type SeedProduct = {
  sku: string;
  slug: string;
  name: string;
  category: (typeof CATEGORY_SEED)[number]["slug"];
  shortDescription: string;
  description: string;
  price: number | null;
  priceLabel: string | null;
  material: string;
  finish: string;
  color: string;
  dimensions: string;
  occasion: string;
  availability: "in_stock" | "made_to_order" | "out_of_stock";
  featured: boolean;
  images: string[];
};

export const PRODUCTS: SeedProduct[] = [
  {
    sku: "AG-ER-001",
    slug: "kundan-jhumka-earrings",
    name: "Kundan Jhumka Earrings",
    category: "earrings",
    shortDescription: "Timeless Kundan-inspired jhumkas with delicate drops.",
    description:
      "A timeless pair of Kundan-inspired jhumkas detailed with delicate drops, created for festive occasions and elegant everyday styling.",
    price: 25,
    priceLabel: null,
    material: "Kundan, Alloy",
    finish: "Antique Gold",
    color: "Gold + Red + Green",
    dimensions: "6.5 cm drop",
    occasion: "Festive, Wedding",
    availability: "in_stock",
    featured: true,
    images: ["product-ag-er-001-1", "product-ag-er-001-2"],
  },
  {
    sku: "AG-ER-002",
    slug: "emerald-drop-earrings",
    name: "Emerald Drop Earrings",
    category: "earrings",
    shortDescription: "Elegant emerald-tone drops for evening wear.",
    description:
      "Emerald-hued stone drops set in a warm gold finish, designed to catch the light with every movement, a graceful choice for evening occasions.",
    price: 18,
    priceLabel: null,
    material: "Alloy, Glass Stones",
    finish: "Gold Plated",
    color: "Gold + Green",
    dimensions: "5 cm drop",
    occasion: "Party, Evening Wear",
    availability: "in_stock",
    featured: false,
    images: ["product-ag-er-002-1"],
  },
  {
    sku: "AG-ER-003",
    slug: "floral-statement-earrings",
    name: "Floral Statement Earrings",
    category: "earrings",
    shortDescription: "Bold floral motifs for a modern festive look.",
    description:
      "Oversized floral-motif earrings that bring a contemporary edge to traditional design, a statement piece for those who love to stand out.",
    price: null,
    priceLabel: "Enquire for Price",
    material: "Alloy, Kundan",
    finish: "Antique Gold",
    color: "Gold + Multicolour",
    dimensions: "7 cm drop",
    occasion: "Festive, Sangeet",
    availability: "made_to_order",
    featured: false,
    images: ["product-ag-er-003-1"],
  },
  {
    sku: "AG-NK-001",
    slug: "temple-necklace",
    name: "Temple Necklace",
    category: "necklaces",
    shortDescription: "Classic temple-motif necklace for bridal styling.",
    description:
      "Inspired by South Indian temple architecture, this necklace layers intricate goddess motifs with a rich antique gold finish, perfect for bridal and festive wear.",
    price: 40,
    priceLabel: null,
    material: "Alloy, Kundan",
    finish: "Antique Gold",
    color: "Gold",
    dimensions: "16 inch + 2 inch extender",
    occasion: "Wedding, Festive",
    availability: "in_stock",
    featured: true,
    images: ["product-ag-nk-001-1", "product-ag-nk-001-2"],
  },
  {
    sku: "AG-NK-002",
    slug: "pearl-choker",
    name: "Pearl Choker",
    category: "necklaces",
    shortDescription: "Delicate pearl choker for understated elegance.",
    description:
      "A dainty pearl choker that layers beautifully with sarees and lehengas alike: understated, versatile, and effortlessly elegant.",
    price: 16,
    priceLabel: null,
    material: "Shell Pearls, Alloy",
    finish: "Rhodium",
    color: "White + Silver",
    dimensions: "14 inch",
    occasion: "Festive, Daily Wear",
    availability: "in_stock",
    featured: false,
    images: ["product-ag-nk-002-1"],
  },
  {
    sku: "AG-NK-003",
    slug: "gold-finish-necklace",
    name: "Gold Finish Necklace",
    category: "necklaces",
    shortDescription: "Versatile gold-finish necklace for daily elegance.",
    description:
      "A lightweight, gold-finish necklace designed for everyday wear, subtle enough for the office and festive enough for celebrations.",
    price: null,
    priceLabel: "Enquire for Price",
    material: "Alloy",
    finish: "Gold Plated",
    color: "Gold",
    dimensions: "18 inch",
    occasion: "Daily Wear, Office",
    availability: "made_to_order",
    featured: false,
    images: ["product-ag-nk-003-1"],
  },
  {
    sku: "AG-BG-001",
    slug: "antique-gold-bangles",
    name: "Antique Gold Bangles",
    category: "bangles",
    shortDescription: "Set of antique-finish bangles with etched detailing.",
    description:
      "A set of antique-finish bangles featuring etched traditional detailing, designed to be stacked or worn individually.",
    price: 20,
    priceLabel: null,
    material: "Alloy",
    finish: "Antique Gold",
    color: "Gold",
    dimensions: "Set of 4, 2.6 inch inner diameter",
    occasion: "Festive, Wedding",
    availability: "in_stock",
    featured: true,
    images: ["product-ag-bg-001-1"],
  },
  {
    sku: "AG-BG-002",
    slug: "meenakari-bangles",
    name: "Meenakari Bangles",
    category: "bangles",
    shortDescription: "Colourful enamel-work bangles inspired by Rajasthan.",
    description:
      "Vivid enamel (meenakari) work bangles inspired by Rajasthani craftsmanship, a pop of colour for festive dressing.",
    price: 19,
    priceLabel: null,
    material: "Alloy, Enamel",
    finish: "Gold Plated",
    color: "Gold + Multicolour",
    dimensions: "Set of 2, 2.4 inch inner diameter",
    occasion: "Festive",
    availability: "in_stock",
    featured: false,
    images: ["product-ag-bg-002-1"],
  },
  {
    sku: "AG-RG-001",
    slug: "kundan-cocktail-ring",
    name: "Kundan Cocktail Ring",
    category: "rings",
    shortDescription: "Statement Kundan cocktail ring with adjustable band.",
    description:
      "An eye-catching Kundan cocktail ring on an adjustable band, designed to be the finishing touch on a festive outfit.",
    price: 14,
    priceLabel: null,
    material: "Kundan, Alloy",
    finish: "Antique Gold",
    color: "Gold + White",
    dimensions: "Adjustable band",
    occasion: "Party, Festive",
    availability: "in_stock",
    featured: false,
    images: ["product-ag-rg-001-1"],
  },
  {
    sku: "AG-ST-001",
    slug: "bridal-jewellery-set",
    name: "Bridal Jewellery Set",
    category: "sets",
    shortDescription: "Complete bridal set: necklace, earrings and maang tikka.",
    description:
      "A complete bridal jewellery set pairing a statement necklace, matching jhumka earrings and a maang tikka, designed for the bride who wants it all coordinated.",
    price: null,
    priceLabel: "Enquire for Price",
    material: "Kundan, Alloy",
    finish: "Antique Gold",
    color: "Gold + Red",
    dimensions: "Necklace 16 inch, adjustable tikka chain",
    occasion: "Wedding, Bridal",
    availability: "made_to_order",
    featured: true,
    images: ["product-ag-st-001-1"],
  },
  {
    sku: "AG-ST-002",
    slug: "polki-choker-set",
    name: "Polki Choker Set",
    category: "sets",
    shortDescription: "Polki-inspired choker set with matching earrings.",
    description:
      "A Polki-inspired choker and earring set with a raw, uncut-diamond look, a refined choice for receptions and festive evenings.",
    price: 36,
    priceLabel: null,
    material: "Polki-style Stones, Alloy",
    finish: "Antique Gold",
    color: "Gold + White",
    dimensions: "Choker length, adjustable",
    occasion: "Reception, Festive",
    availability: "in_stock",
    featured: false,
    images: ["product-ag-st-002-1"],
  },
  {
    sku: "AG-OT-001",
    slug: "maang-tikka",
    name: "Maang Tikka",
    category: "other",
    shortDescription: "Classic gold-finish maang tikka for festive styling.",
    description:
      "A classic maang tikka with an adjustable chain, designed to complement both traditional and fusion festive looks.",
    price: 9,
    priceLabel: null,
    material: "Alloy",
    finish: "Antique Gold",
    color: "Gold + Red",
    dimensions: "Adjustable chain",
    occasion: "Festive, Wedding",
    availability: "in_stock",
    featured: false,
    images: ["product-ag-ot-001-1"],
  },
];

async function main() {
  console.log("Seeding categories...");
  for (const category of CATEGORY_SEED) {
    await db
      .insert(categories)
      .values(category)
      .onConflictDoNothing({ target: categories.slug });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    console.log(`Seeding admin user (${adminEmail})...`);
    const passwordHash = await hashPassword(adminPassword);
    await db
      .insert(adminUsers)
      .values({ email: adminEmail.toLowerCase(), passwordHash, name: "Haritha" })
      .onConflictDoNothing({ target: adminUsers.email });
  } else {
    console.warn("Skipping admin user seed — set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local to create one.");
  }

  console.log(`Seeding ${PRODUCTS.length} demo products...`);
  for (const [index, product] of PRODUCTS.entries()) {
    const [{ id } = { id: undefined }] = await db
      .insert(products)
      .values({
        sku: product.sku,
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        category: product.category,
        price: product.price != null ? String(product.price) : null,
        priceLabel: product.priceLabel,
        currency: "GBP",
        material: product.material,
        finish: product.finish,
        color: product.color,
        dimensions: product.dimensions,
        occasion: product.occasion,
        availability: product.availability,
        featured: product.featured,
        status: "published",
        sortOrder: index,
      })
      .onConflictDoNothing({ target: products.slug })
      .returning({ id: products.id });

    if (!id) {
      console.log(`  - ${product.name} already exists, skipping images.`);
      continue;
    }

    await db.insert(productImages).values(
      product.images.map((image, imgIndex) => ({
        productId: id,
        imageUrl: PHOTO(image),
        altText: product.name,
        sortOrder: imgIndex,
        isPrimary: imgIndex === 0,
      }))
    );
    console.log(`  - Created ${product.name}`);
  }

  console.log("Done.");
}

const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
