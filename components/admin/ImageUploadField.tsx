"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { UploadCloud } from "lucide-react";
import { uploadProductImageAction, type UploadImageState } from "@/lib/products/actions";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  onUploaded: (url: string) => void;
  className?: string;
};

const initialState: UploadImageState = {};

/** Uploads a single file to Vercel Blob via a server action, independent of the parent form. */
export function ImageUploadField({ onUploaded, className }: ImageUploadFieldProps) {
  const [state, formAction] = useActionState(uploadProductImageAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const lastHandledUrl = useRef<string | undefined>(undefined);
  const inputId = useId();

  useEffect(() => {
    if (state.url && state.url !== lastHandledUrl.current) {
      lastHandledUrl.current = state.url;
      onUploaded(state.url);
      formRef.current?.reset();
    }
  }, [state.url, onUploaded]);

  return (
    <form ref={formRef} action={formAction} className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={inputId}
        className="inline-flex w-fit cursor-pointer items-center gap-2 border border-olive px-3 py-2 font-sans text-xs uppercase tracking-wide text-olive hover:bg-olive hover:text-ivory transition-colors"
      >
        <UploadCloud className="h-3.5 w-3.5" aria-hidden="true" />
        <UploadLabel />
      </label>
      <input
        id={inputId}
        type="file"
        name="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) {
            formRef.current?.requestSubmit();
          }
        }}
      />
      {state.error && (
        <p role="alert" className="font-sans text-xs text-terracotta">
          {state.error}
        </p>
      )}
    </form>
  );
}

function UploadLabel() {
  const { pending } = useFormStatus();
  return <span>{pending ? "Uploading..." : "Upload Image"}</span>;
}
