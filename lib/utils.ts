import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Resolves a possibly-relative URL (e.g. "/images/photos/x.webp") against
 * the site's base URL. Structured data (JSON-LD) requires absolute URLs —
 * unlike OpenGraph tags, it isn't resolved automatically by Next's metadata
 * system.
 */
export function absoluteUrl(url: string, baseUrl: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}
