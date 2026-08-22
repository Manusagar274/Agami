import "server-only";

/**
 * Image storage abstraction. Product images are always referenced by URL in
 * Postgres — never as binary data. This module is the single place that
 * knows how to turn an uploaded file into a durable URL, so the backing
 * provider (Vercel Blob, Cloudinary, S3) can be swapped without touching
 * the product schema or admin UI.
 */
export type UploadResult = {
  url: string;
};

export async function isUploadConfigured(): Promise<boolean> {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export async function uploadProductImage(file: File): Promise<UploadResult> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Image upload is not configured. Set BLOB_READ_WRITE_TOKEN, or paste an image URL instead."
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Please upload a JPG, PNG, WebP, AVIF or GIF image.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image is too large — please upload a file under 10MB.");
  }

  const { put } = await import("@vercel/blob");
  const filename = `products/${Date.now()}-${sanitizeFilename(file.name)}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return { url: blob.url };
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}
