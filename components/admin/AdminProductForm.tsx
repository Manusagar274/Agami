"use client";

import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowDown, ArrowUp, Star, Trash2 } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { slugify } from "@/lib/products/validation";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import type { ProductFormState } from "@/lib/products/actions";
import { ImageUploadField } from "./ImageUploadField";

type AdminProductFormProps = {
  product?: Product;
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  submitLabel?: string;
};

type ImageDraft = { url: string; altText: string };

const availabilityOptions = [
  { value: "in_stock", label: "In Stock" },
  { value: "made_to_order", label: "Made to Order" },
  { value: "out_of_stock", label: "Out of Stock" },
];

export function AdminProductForm({ product, action, submitLabel = "Save Product" }: AdminProductFormProps) {
  const [state, formAction] = useActionState(action, {});
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product?.slug));
  const [images, setImages] = useState<ImageDraft[]>(
    product?.images.length
      ? product.images.map((img) => ({ url: img.imageUrl, altText: img.altText ?? "" }))
      : [{ url: "", altText: "" }]
  );
  const [primaryIndex, setPrimaryIndex] = useState(
    Math.max(0, product?.images.findIndex((img) => img.isPrimary) ?? 0)
  );
  const idBase = useId();

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function updateImage(index: number, patch: Partial<ImageDraft>) {
    setImages((prev) => prev.map((img, i) => (i === index ? { ...img, ...patch } : img)));
  }

  function addImage() {
    setImages((prev) => [...prev, { url: "", altText: "" }]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPrimaryIndex((prev) => (prev === index ? 0 : prev > index ? prev - 1 : prev));
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setPrimaryIndex((prev) => {
      if (prev === index) return index + direction;
      if (prev === index + direction) return index;
      return prev;
    });
  }

  return (
    <form action={formAction} className="flex flex-col gap-10">
      {state.error && (
        <p role="alert" className="border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {state.error}
        </p>
      )}

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <legend className="col-span-full font-display text-xl text-olive mb-2">Product Details</legend>

        <Field label="Product Name" htmlFor={`${idBase}-name`} required>
          <input
            id={`${idBase}-name`}
            name="name"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="SKU / Product Code" htmlFor={`${idBase}-sku`} required>
          <input
            id={`${idBase}-sku`}
            name="sku"
            required
            defaultValue={product?.sku}
            placeholder="AG-ER-001"
            className={inputClass}
          />
        </Field>

        <Field label="URL Slug" htmlFor={`${idBase}-slug`} required hint="Used in the product page URL.">
          <input
            id={`${idBase}-slug`}
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            className={inputClass}
          />
        </Field>

        <Field label="Category" htmlFor={`${idBase}-category`} required>
          <select id={`${idBase}-category`} name="category" required defaultValue={product?.category ?? "earrings"} className={inputClass}>
            {siteConfig.categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <span className="font-sans text-xs tracking-wide uppercase text-brown/60">
            Also show under (optional)
          </span>
          <div className="flex flex-wrap gap-4">
            {siteConfig.categories.map((cat) => (
              <label key={cat.slug} className="inline-flex items-center gap-2 font-sans text-sm text-brown">
                <input
                  type="checkbox"
                  name="secondaryCategories"
                  value={cat.slug}
                  defaultChecked={product?.secondaryCategories.includes(cat.slug)}
                  className="h-4 w-4 accent-terracotta"
                />
                {cat.label}
              </label>
            ))}
          </div>
        </div>

        <Field label="Short Description" htmlFor={`${idBase}-short`} className="sm:col-span-2" hint="Shown on product cards, up to 240 characters.">
          <input
            id={`${idBase}-short`}
            name="shortDescription"
            maxLength={240}
            defaultValue={product?.shortDescription ?? ""}
            className={inputClass}
          />
        </Field>

        <Field label="Full Description" htmlFor={`${idBase}-desc`} className="sm:col-span-2">
          <textarea
            id={`${idBase}-desc`}
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className={inputClass}
          />
        </Field>
      </fieldset>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <legend className="col-span-full font-display text-xl text-olive mb-2">Pricing &amp; Availability</legend>

        <Field label="Price (GBP)" htmlFor={`${idBase}-price`} hint="Leave blank to show enquiry-only pricing.">
          <input id={`${idBase}-price`} name="price" type="number" min="0" step="1" defaultValue={product?.price ?? ""} className={inputClass} />
        </Field>

        <Field label="Price Display Text" htmlFor={`${idBase}-priceLabel`} hint='e.g. "Enquire for Price" or "Starting at £45"'>
          <input id={`${idBase}-priceLabel`} name="priceLabel" defaultValue={product?.priceLabel ?? ""} className={inputClass} />
        </Field>

        <Field label="Availability" htmlFor={`${idBase}-availability`} required>
          <select id={`${idBase}-availability`} name="availability" required defaultValue={product?.availability ?? "in_stock"} className={inputClass}>
            {availabilityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Status" htmlFor={`${idBase}-status`} required>
          <select id={`${idBase}-status`} name="status" required defaultValue={product?.status ?? "draft"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </Field>

        <label className="inline-flex items-center gap-2 font-sans text-sm text-brown sm:col-span-2">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} className="h-4 w-4 accent-terracotta" />
          Feature on homepage
        </label>
      </fieldset>

      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <legend className="col-span-full font-display text-xl text-olive mb-2">Craft Details</legend>

        <Field label="Material" htmlFor={`${idBase}-material`}>
          <input id={`${idBase}-material`} name="material" defaultValue={product?.material ?? ""} className={inputClass} />
        </Field>
        <Field label="Finish" htmlFor={`${idBase}-finish`}>
          <input id={`${idBase}-finish`} name="finish" defaultValue={product?.finish ?? ""} className={inputClass} />
        </Field>
        <Field label="Colour" htmlFor={`${idBase}-color`}>
          <input id={`${idBase}-color`} name="color" defaultValue={product?.color ?? ""} className={inputClass} />
        </Field>
        <Field label="Dimensions" htmlFor={`${idBase}-dimensions`}>
          <input id={`${idBase}-dimensions`} name="dimensions" defaultValue={product?.dimensions ?? ""} className={inputClass} />
        </Field>
        <Field label="Occasion" htmlFor={`${idBase}-occasion`}>
          <input id={`${idBase}-occasion`} name="occasion" defaultValue={product?.occasion ?? ""} className={inputClass} />
        </Field>
        <Field label="Custom Notes" htmlFor={`${idBase}-notes`} hint="Care instructions, customisation options, etc.">
          <input id={`${idBase}-notes`} name="customNotes" defaultValue={product?.customNotes ?? ""} className={inputClass} />
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-xl text-olive mb-2">Images</legend>
        <p className="font-sans text-xs text-brown/60 -mt-2">
          Upload photos directly, or paste an image URL if you already have one hosted elsewhere. The starred
          image is the cover photo shown on product cards and first in the gallery.
        </p>

        <div className="flex flex-col gap-3">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3 border border-sand/50 p-3">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-sand/20">
                {image.url ? (
                  // Plain <img>: admin can paste any external URL, so this preview can't rely
                  // on next/image's remote-hostname allowlist.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center font-sans text-[0.6rem] text-brown/40">
                    No image
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setPrimaryIndex(index)}
                  aria-label={index === primaryIndex ? "Cover image" : "Set as cover image"}
                  aria-pressed={index === primaryIndex}
                  className={cn(
                    "absolute top-1 left-1 rounded-full bg-ivory/90 p-1",
                    index === primaryIndex ? "text-gold" : "text-brown/40 hover:text-gold"
                  )}
                >
                  <Star className="h-3.5 w-3.5" fill={index === primaryIndex ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <ImageUploadField onUploaded={(url) => updateImage(index, { url })} />
                  <span className="font-sans text-xs text-brown/40">or</span>
                  <input
                    type="url"
                    name="imageUrl"
                    required
                    value={image.url}
                    onChange={(e) => updateImage(index, { url: e.target.value })}
                    placeholder="Paste an image URL"
                    className={cn(inputClass, "flex-1 min-w-[10rem]")}
                  />
                </div>
                <input
                  type="text"
                  value={image.altText}
                  onChange={(e) => updateImage(index, { altText: e.target.value })}
                  placeholder="Alt text (describes the photo)"
                  className={inputClass}
                />
              </div>

              <div className="flex sm:flex-col items-center gap-1 shrink-0 self-start">
                <button type="button" onClick={() => moveImage(index, -1)} aria-label="Move image up" className="p-1.5 text-brown/50 hover:text-olive disabled:opacity-30" disabled={index === 0}>
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => moveImage(index, 1)} aria-label="Move image down" className="p-1.5 text-brown/50 hover:text-olive disabled:opacity-30" disabled={index === images.length - 1}>
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => removeImage(index)} aria-label="Remove image" className="p-1.5 text-brown/50 hover:text-terracotta">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <input type="hidden" name="primaryImageIndex" value={primaryIndex} />

        <button
          type="button"
          onClick={addImage}
          className="self-start border border-olive px-4 py-2 font-sans text-xs uppercase tracking-wide text-olive hover:bg-olive hover:text-ivory transition-colors"
        >
          + Add Another Image
        </button>
      </fieldset>

      <SubmitButton label={submitLabel} />
    </form>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="self-start bg-olive text-ivory px-8 py-3 font-sans text-sm uppercase tracking-wide hover:bg-gold hover:text-olive transition-colors disabled:opacity-60"
    >
      {pending ? "Saving..." : label}
    </button>
  );
}

const inputClass =
  "w-full border border-sand bg-ivory px-3 py-2.5 font-sans text-sm text-brown focus-visible:outline-2 focus-visible:outline-gold";

function Field({
  label,
  htmlFor,
  children,
  required,
  hint,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="font-sans text-xs tracking-wide uppercase text-brown/60">
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      {children}
      {hint && <p className="font-sans text-xs text-brown/45">{hint}</p>}
    </div>
  );
}
