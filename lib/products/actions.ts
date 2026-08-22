"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth/guard";
import {
  createProduct,
  deleteProduct,
  duplicateProduct,
  setProductFeatured,
  setProductStatus,
  updateProduct,
  type ProductInput,
} from "@/lib/db/queries";
import { uploadProductImage } from "@/lib/storage";
import { productFormSchema, slugify } from "./validation";
import type { ProductCategory } from "@/types/product";

export type UploadImageState = {
  url?: string;
  error?: string;
};

export async function uploadProductImageAction(
  _prevState: UploadImageState,
  formData: FormData
): Promise<UploadImageState> {
  await requireAdminSession();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please choose an image to upload." };
  }

  try {
    const { url } = await uploadProductImage(file);
    return { url };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Upload failed. Please try again." };
  }
}

export type ProductFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function parseFormData(formData: FormData) {
  const imageUrls = formData
    .getAll("imageUrl")
    .map((v) => String(v).trim())
    .filter(Boolean);

  const secondaryCategories = formData.getAll("secondaryCategories").map((v) => String(v));

  const raw = {
    name: formData.get("name"),
    sku: formData.get("sku"),
    slug: formData.get("slug") || slugify(String(formData.get("name") || "")),
    category: formData.get("category"),
    secondaryCategories,
    shortDescription: formData.get("shortDescription") ?? "",
    description: formData.get("description") ?? "",
    price: formData.get("price") ?? "",
    priceLabel: formData.get("priceLabel") ?? "",
    currency: formData.get("currency") || "GBP",
    material: formData.get("material") ?? "",
    finish: formData.get("finish") ?? "",
    color: formData.get("color") ?? "",
    dimensions: formData.get("dimensions") ?? "",
    occasion: formData.get("occasion") ?? "",
    customNotes: formData.get("customNotes") ?? "",
    availability: formData.get("availability"),
    status: formData.get("status"),
    featured: formData.get("featured") === "on",
    imageUrls,
    primaryImageIndex: formData.get("primaryImageIndex") || 0,
  };

  return productFormSchema.safeParse(raw);
}

function toProductInput(values: ReturnType<typeof parseFormData>["data"]): ProductInput {
  if (!values) throw new Error("Invalid product data");

  return {
    sku: values.sku,
    slug: values.slug,
    name: values.name,
    shortDescription: values.shortDescription || null,
    description: values.description || null,
    category: values.category as ProductCategory,
    secondaryCategories: values.secondaryCategories as ProductCategory[],
    price: values.price === "" || values.price == null ? null : Number(values.price),
    priceLabel: values.priceLabel || null,
    currency: values.currency,
    material: values.material || null,
    finish: values.finish || null,
    color: values.color || null,
    dimensions: values.dimensions || null,
    occasion: values.occasion || null,
    customNotes: values.customNotes || null,
    availability: values.availability,
    featured: values.featured ?? false,
    status: values.status,
    images: values.imageUrls.map((url, index) => ({
      imageUrl: url,
      isPrimary: index === values.primaryImageIndex,
    })),
  };
}

export async function createProductAction(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdminSession();

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    const id = await createProduct(toProductInput(parsed.data));
    revalidatePath("/admin/products");
    revalidatePath("/collection");
    redirect(`/admin/products/${id}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return { error: "That SKU or slug is already in use. Please choose another." };
    }
    throw error;
  }
}

export async function updateProductAction(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdminSession();

  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form for errors." };
  }

  try {
    await updateProduct(id, toProductInput(parsed.data));
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/collection");
    revalidatePath(`/collection/${parsed.data.slug}`);
    return {};
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return { error: "That SKU or slug is already in use. Please choose another." };
    }
    throw error;
  }
}

export async function deleteProductAction(id: string) {
  await requireAdminSession();
  await deleteProduct(id);
  revalidatePath("/admin/products");
  revalidatePath("/collection");
}

export async function duplicateProductAction(id: string) {
  await requireAdminSession();
  await duplicateProduct(id);
  revalidatePath("/admin/products");
}

export async function toggleStatusAction(id: string, nextStatus: "draft" | "published") {
  await requireAdminSession();
  await setProductStatus(id, nextStatus);
  revalidatePath("/admin/products");
  revalidatePath("/collection");
}

export async function toggleFeaturedAction(id: string, nextFeatured: boolean) {
  await requireAdminSession();
  await setProductFeatured(id, nextFeatured);
  revalidatePath("/admin/products");
  revalidatePath("/");
}
