/**
 * One-off: repoints existing seeded products' images from the old SVG
 * placeholders to the real, compressed photos in public/images/photos/.
 * Safe to re-run — replaces each product's image rows from scratch.
 *
 * Usage: npm run db:update-images
 */
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { productImages, products } from "@/lib/db/schema";
import { PRODUCTS, PHOTO } from "./seed";

async function main() {
  for (const product of PRODUCTS) {
    const [row] = await db.select().from(products).where(eq(products.sku, product.sku)).limit(1);
    if (!row) {
      console.log(`  - ${product.sku} not found, skipping.`);
      continue;
    }

    await db.delete(productImages).where(eq(productImages.productId, row.id));
    await db.insert(productImages).values(
      product.images.map((image, index) => ({
        productId: row.id,
        imageUrl: PHOTO(image),
        altText: product.name,
        sortOrder: index,
        isPrimary: index === 0,
      }))
    );
    console.log(`  - Updated images for ${product.name}`);
  }

  console.log("Done.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
