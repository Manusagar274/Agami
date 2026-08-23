/**
 * One-off: removes leftover test products (created while verifying the
 * admin CRUD flow) from the database. Matches by SKU/slug prefix only,
 * so it can never touch real catalogue data.
 *
 * Usage: npm run db:cleanup-test-data
 */
import { like, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

async function main() {
  const removed = await db
    .delete(products)
    .where(or(like(products.sku, "TEST-%"), like(products.slug, "test-%")))
    .returning({ sku: products.sku, name: products.name });

  if (removed.length === 0) {
    console.log("No test products found.");
  } else {
    for (const p of removed) {
      console.log(`  - Removed ${p.name} (${p.sku})`);
    }
  }

  console.log("Done.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
