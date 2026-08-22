import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(2, "Product name is required."),
  sku: z
    .string()
    .trim()
    .min(2, "SKU is required.")
    .regex(/^[A-Za-z0-9-]+$/, "SKU may only contain letters, numbers and hyphens."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers and hyphens."),
  category: z.enum(["earrings", "necklaces", "bangles", "rings", "sets", "other"]),
  secondaryCategories: z.array(
    z.enum(["earrings", "necklaces", "bangles", "rings", "sets", "other"])
  ),
  shortDescription: z.string().trim().max(240).optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  price: z
    .union([z.string().trim().length(0), z.coerce.number().nonnegative()])
    .optional(),
  priceLabel: z.string().trim().max(80).optional().or(z.literal("")),
  currency: z.string().trim().default("INR"),
  material: z.string().trim().optional().or(z.literal("")),
  finish: z.string().trim().optional().or(z.literal("")),
  color: z.string().trim().optional().or(z.literal("")),
  dimensions: z.string().trim().optional().or(z.literal("")),
  occasion: z.string().trim().optional().or(z.literal("")),
  customNotes: z.string().trim().optional().or(z.literal("")),
  availability: z.enum(["in_stock", "made_to_order", "out_of_stock"]),
  status: z.enum(["draft", "published"]),
  featured: z.coerce.boolean().optional(),
  imageUrls: z.array(z.string().trim().url("Each image must be a valid URL.")).default([]),
  primaryImageIndex: z.coerce.number().int().nonnegative().default(0),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
