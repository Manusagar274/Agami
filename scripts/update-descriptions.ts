/**
 * One-off: repoints existing seeded products' shortDescription/description
 * text to match the current (em-dash-free) copy in scripts/seed.ts's
 * PRODUCTS array. Safe to re-run.
 *
 * Usage: npm run db:update-descriptions
 */
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { PRODUCTS } from "./seed";

async function main() {
  for (const product of PRODUCTS) {
    const result = await db
      .update(products)
      .set({
        shortDescription: product.shortDescription,
        description: product.description,
        updatedAt: new Date(),
      })
      .where(eq(products.sku, product.sku))
      .returning({ id: products.id });

    if (result.length === 0) {
      console.log(`  - ${product.sku} not found, skipping.`);
      continue;
    }
    console.log(`  - Updated ${product.name}`);
  }

  console.log("Done.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
