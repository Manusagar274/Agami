import {
  pgTable,
  text,
  integer,
  boolean,
  numeric,
  timestamp,
  uuid,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const productCategoryEnum = pgEnum("product_category", [
  "earrings",
  "necklaces",
  "bangles",
  "rings",
  "sets",
  "other",
]);

export const availabilityEnum = pgEnum("availability", [
  "in_stock",
  "made_to_order",
  "out_of_stock",
]);

export const productStatusEnum = pgEnum("product_status", ["draft", "published"]);

/** Fixed catalogue categories. Seeded once; rarely edited. */
export const categories = pgTable("categories", {
  slug: productCategoryEnum("slug").primaryKey(),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sku: text("sku").notNull(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    shortDescription: text("short_description"),
    description: text("description"),
    category: productCategoryEnum("category").notNull().default("other"),
    price: numeric("price", { precision: 10, scale: 2 }),
    priceLabel: text("price_label"),
    currency: text("currency").notNull().default("INR"),
    material: text("material"),
    finish: text("finish"),
    color: text("color"),
    dimensions: text("dimensions"),
    occasion: text("occasion"),
    customNotes: text("custom_notes"),
    availability: availabilityEnum("availability").notNull().default("in_stock"),
    featured: boolean("featured").notNull().default(false),
    status: productStatusEnum("status").notNull().default("draft"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("products_sku_idx").on(table.sku),
    uniqueIndex("products_slug_idx").on(table.slug),
  ]
);

/** Optional additional categories a product should also appear under. */
export const productCategories = pgTable(
  "product_categories",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    category: productCategoryEnum("category").notNull(),
  },
  (table) => [uniqueIndex("product_categories_pk").on(table.productId, table.category)]
);

export const productImages = pgTable("product_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  altText: text("alt_text"),
  sortOrder: integer("sort_order").notNull().default(0),
  isPrimary: boolean("is_primary").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    name: text("name"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("admin_users_email_idx").on(table.email)]
);

export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
  secondaryCategories: many(productCategories),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));

export const productCategoriesRelations = relations(productCategories, ({ one }) => ({
  product: one(products, { fields: [productCategories.productId], references: [products.id] }),
}));
