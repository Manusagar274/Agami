import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "./index";
import { adminUsers, categories, productCategories, productImages, products } from "./schema";
import type {
  Product,
  ProductAvailability,
  ProductCategory,
  ProductImage,
  ProductListItem,
  ProductStatus,
} from "@/types/product";

type ProductRow = typeof products.$inferSelect;
type ProductImageRow = typeof productImages.$inferSelect;

function toProductImage(row: ProductImageRow): ProductImage {
  return {
    id: row.id,
    productId: row.productId,
    imageUrl: row.imageUrl,
    altText: row.altText,
    sortOrder: row.sortOrder,
    isPrimary: row.isPrimary,
  };
}

function toProduct(
  row: ProductRow,
  images: ProductImageRow[],
  secondaryCategories: ProductCategory[] = []
): Product {
  return {
    id: row.id,
    sku: row.sku,
    slug: row.slug,
    name: row.name,
    shortDescription: row.shortDescription,
    description: row.description,
    category: row.category,
    secondaryCategories,
    price: row.price ? Number(row.price) : null,
    priceLabel: row.priceLabel,
    currency: row.currency,
    material: row.material,
    finish: row.finish,
    color: row.color,
    dimensions: row.dimensions,
    occasion: row.occasion,
    customNotes: row.customNotes,
    availability: row.availability,
    featured: row.featured,
    status: row.status,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    images: images
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(toProductImage),
  };
}

function toListItem(row: ProductRow, primaryImage: ProductImageRow | null): ProductListItem {
  return {
    id: row.id,
    sku: row.sku,
    slug: row.slug,
    name: row.name,
    category: row.category,
    price: row.price ? Number(row.price) : null,
    priceLabel: row.priceLabel,
    currency: row.currency,
    availability: row.availability,
    featured: row.featured,
    status: row.status,
    primaryImage: primaryImage ? toProductImage(primaryImage) : null,
  };
}

export type ProductFilters = {
  category?: ProductCategory;
  search?: string;
  sort?: "newest" | "price-asc" | "price-desc" | "name-asc";
  onlyPublished?: boolean;
};

export async function getProducts(filters: ProductFilters = {}): Promise<ProductListItem[]> {
  const { category, search, sort = "newest", onlyPublished = true } = filters;

  const conditions = [];
  if (onlyPublished) conditions.push(eq(products.status, "published"));
  if (category) conditions.push(eq(products.category, category));
  if (search) {
    conditions.push(
      or(ilike(products.name, `%${search}%`), ilike(products.sku, `%${search}%`))
    );
  }

  const orderBy =
    sort === "price-asc"
      ? [asc(products.price)]
      : sort === "price-desc"
        ? [desc(products.price)]
        : sort === "name-asc"
          ? [asc(products.name)]
          : [desc(products.featured), desc(products.createdAt)];

  const rows = await db
    .select()
    .from(products)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(...orderBy);

  if (rows.length === 0) return [];

  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.isPrimary, true));

  const primaryByProduct = new Map(images.map((img) => [img.productId, img]));

  return rows.map((row) => toListItem(row, primaryByProduct.get(row.id) ?? null));
}

export async function getFeaturedProducts(limit = 8): Promise<ProductListItem[]> {
  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.status, "published"), eq(products.featured, true)))
    .orderBy(desc(products.createdAt))
    .limit(limit);

  if (rows.length === 0) return [];

  const images = await db.select().from(productImages).where(eq(productImages.isPrimary, true));
  const primaryByProduct = new Map(images.map((img) => [img.productId, img]));

  return rows.map((row) => toListItem(row, primaryByProduct.get(row.id) ?? null));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const [row] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!row) return null;

  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, row.id));

  const secondary = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.productId, row.id));

  return toProduct(row, images, secondary.map((s) => s.category));
}

export async function getAllCategories() {
  return db.select().from(categories).orderBy(asc(categories.sortOrder));
}

// ---------------------------------------------------------------------------
// Admin-only queries (no status filtering — admin sees drafts too)
// ---------------------------------------------------------------------------

export async function getAllProductsAdmin(): Promise<Product[]> {
  const rows = await db.select().from(products).orderBy(desc(products.updatedAt));
  if (rows.length === 0) return [];

  const images = await db.select().from(productImages);
  const imagesByProduct = new Map<string, ProductImageRow[]>();
  for (const img of images) {
    imagesByProduct.set(img.productId, [...(imagesByProduct.get(img.productId) ?? []), img]);
  }

  return rows.map((row) => toProduct(row, imagesByProduct.get(row.id) ?? []));
}

export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  const [row] = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!row) return null;

  const images = await db.select().from(productImages).where(eq(productImages.productId, id));
  const secondary = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.productId, id));

  return toProduct(row, images, secondary.map((s) => s.category));
}

export type ProductInput = {
  sku: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  category: ProductCategory;
  secondaryCategories?: ProductCategory[];
  price?: number | null;
  priceLabel?: string | null;
  currency?: string;
  material?: string | null;
  finish?: string | null;
  color?: string | null;
  dimensions?: string | null;
  occasion?: string | null;
  customNotes?: string | null;
  availability: ProductAvailability;
  featured?: boolean;
  status: ProductStatus;
  sortOrder?: number;
  images: { imageUrl: string; altText?: string | null; isPrimary?: boolean }[];
};

export async function createProduct(input: ProductInput): Promise<string> {
  const [row] = await db
    .insert(products)
    .values({
      sku: input.sku,
      slug: input.slug,
      name: input.name,
      shortDescription: input.shortDescription ?? null,
      description: input.description ?? null,
      category: input.category,
      price: input.price != null ? String(input.price) : null,
      priceLabel: input.priceLabel ?? null,
      currency: input.currency ?? "INR",
      material: input.material ?? null,
      finish: input.finish ?? null,
      color: input.color ?? null,
      dimensions: input.dimensions ?? null,
      occasion: input.occasion ?? null,
      customNotes: input.customNotes ?? null,
      availability: input.availability,
      featured: input.featured ?? false,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
    })
    .returning({ id: products.id });

  await syncSecondaryCategories(row.id, input.secondaryCategories ?? []);
  await syncImages(row.id, input.images);

  return row.id;
}

export async function updateProduct(id: string, input: ProductInput): Promise<void> {
  await db
    .update(products)
    .set({
      sku: input.sku,
      slug: input.slug,
      name: input.name,
      shortDescription: input.shortDescription ?? null,
      description: input.description ?? null,
      category: input.category,
      price: input.price != null ? String(input.price) : null,
      priceLabel: input.priceLabel ?? null,
      currency: input.currency ?? "INR",
      material: input.material ?? null,
      finish: input.finish ?? null,
      color: input.color ?? null,
      dimensions: input.dimensions ?? null,
      occasion: input.occasion ?? null,
      customNotes: input.customNotes ?? null,
      availability: input.availability,
      featured: input.featured ?? false,
      status: input.status,
      sortOrder: input.sortOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));

  await syncSecondaryCategories(id, input.secondaryCategories ?? []);
  await syncImages(id, input.images);
}

async function syncSecondaryCategories(productId: string, cats: ProductCategory[]) {
  await db.delete(productCategories).where(eq(productCategories.productId, productId));
  if (cats.length > 0) {
    await db
      .insert(productCategories)
      .values(cats.map((category) => ({ productId, category })));
  }
}

async function syncImages(
  productId: string,
  images: { imageUrl: string; altText?: string | null; isPrimary?: boolean }[]
) {
  await db.delete(productImages).where(eq(productImages.productId, productId));
  if (images.length > 0) {
    await db.insert(productImages).values(
      images.map((img, index) => ({
        productId,
        imageUrl: img.imageUrl,
        altText: img.altText ?? null,
        sortOrder: index,
        isPrimary: img.isPrimary ?? index === 0,
      }))
    );
  }
}

export async function deleteProduct(id: string): Promise<void> {
  await db.delete(products).where(eq(products.id, id));
}

export async function duplicateProduct(id: string): Promise<string | null> {
  const original = await getProductByIdAdmin(id);
  if (!original) return null;

  const newSku = `${original.sku}-COPY-${Date.now().toString().slice(-4)}`;
  const newSlug = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;

  return createProduct({
    ...original,
    sku: newSku,
    slug: newSlug,
    name: `${original.name} (Copy)`,
    status: "draft",
    featured: false,
    images: original.images.map((img) => ({
      imageUrl: img.imageUrl,
      altText: img.altText,
      isPrimary: img.isPrimary,
    })),
  });
}

export async function setProductStatus(id: string, status: ProductStatus): Promise<void> {
  await db.update(products).set({ status, updatedAt: new Date() }).where(eq(products.id, id));
}

export async function setProductFeatured(id: string, featured: boolean): Promise<void> {
  await db.update(products).set({ featured, updatedAt: new Date() }).where(eq(products.id, id));
}

export async function getDashboardStats() {
  const [row] = await db
    .select({
      total: sql<number>`count(*)`,
      published: sql<number>`count(*) filter (where ${products.status} = 'published')`,
      featured: sql<number>`count(*) filter (where ${products.featured} = true)`,
    })
    .from(products);

  const cats = await getAllCategories();
  const recent = await db
    .select()
    .from(products)
    .orderBy(desc(products.updatedAt))
    .limit(5);

  return {
    total: Number(row?.total ?? 0),
    published: Number(row?.published ?? 0),
    featured: Number(row?.featured ?? 0),
    categoryCount: cats.length,
    recent,
  };
}

export async function getAdminUserByEmail(email: string) {
  const [row] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.toLowerCase()))
    .limit(1);
  return row ?? null;
}
