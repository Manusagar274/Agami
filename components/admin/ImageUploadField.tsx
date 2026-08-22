"use client";

import { useId, useState } from "react";
import { upload } from "@vercel/blob/client";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  onUploaded: (url: string) => void;
  className?: string;
};

/**
 * Uploads a file straight from the browser to Vercel Blob using a short-lived
 * signed token from /api/admin/upload. The file bytes never pass through our
 * own server, which is what keeps large photos from hitting Next's/Vercel's
 * request body size limits (unlike a server-action multipart submission).
 */
export function ImageUploadField({ onUploaded, className }: ImageUploadFieldProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setError(null);

    try {
      const pathname = `${Date.now()}-${sanitizeFilename(file.name)}`;
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      onUploaded(blob.url);
      setStatus("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
      setStatus("error");
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={inputId}
        className={cn(
          "inline-flex w-fit cursor-pointer items-center gap-2 border border-olive px-3 py-2 font-sans text-xs uppercase tracking-wide text-olive transition-colors",
          status === "uploading" ? "opacity-60" : "hover:bg-olive hover:text-ivory"
        )}
      >
        <UploadCloud className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{status === "uploading" ? "Uploading..." : "Upload Image"}</span>
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        disabled={status === "uploading"}
        onChange={handleChange}
      />
      {error && (
        <p role="alert" className="font-sans text-xs text-terracotta">
          {error}
        </p>
      )}
    </div>
  );
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-").toLowerCase();
}
