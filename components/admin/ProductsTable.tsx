import Image from "next/image";
import Link from "next/link";
import { Copy, Pencil, Star, Trash2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { CATEGORY_LABEL, type Product } from "@/types/product";
import {
  deleteProductAction,
  duplicateProductAction,
  toggleFeaturedAction,
  toggleStatusAction,
} from "@/lib/products/actions";
import { ConfirmSubmitButton } from "./ConfirmSubmitButton";

export function ProductsTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 border border-sand/50 bg-white py-20 text-center">
        <p className="font-display text-2xl text-olive">Your catalogue is empty.</p>
        <p className="font-serif text-brown/70">Add your first piece to get started.</p>
        <Link href="/admin/products/new" className="mt-3 text-sm text-terracotta underline underline-offset-4">
          Add Product
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-sand/50 bg-white">
      <table className="w-full min-w-[900px] font-sans text-sm">
        <thead className="border-b border-sand/50 bg-ivory text-left text-xs uppercase tracking-wide text-brown/60">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">SKU</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sand/40">
          {products.map((product) => {
            const primary = product.images.find((img) => img.isPrimary) ?? product.images[0];
            return (
              <tr key={product.id} className="hover:bg-ivory/60">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-10 overflow-hidden bg-sand/20">
                    {primary && (
                      <Image src={primary.imageUrl} alt="" fill sizes="40px" className="object-cover" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${product.id}`} className="font-medium text-olive hover:text-terracotta">
                    {product.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-brown/70">{product.sku}</td>
                <td className="px-4 py-3 text-brown/70">{CATEGORY_LABEL[product.category]}</td>
                <td className="px-4 py-3 text-brown/70">
                  {product.priceLabel || (product.price != null ? formatPrice(product.price, product.currency) : "Enquire")}
                </td>
                <td className="px-4 py-3">
                  <form action={toggleStatusAction.bind(null, product.id, product.status === "published" ? "draft" : "published")}>
                    <button
                      type="submit"
                      className={cn(
                        "rounded-sm border px-2 py-1 text-[0.65rem] uppercase tracking-wide",
                        product.status === "published"
                          ? "border-sage bg-sage/20 text-olive"
                          : "border-brown/30 bg-brown/5 text-brown/60"
                      )}
                    >
                      {product.status === "published" ? "Published" : "Draft"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleFeaturedAction.bind(null, product.id, !product.featured)}>
                    <button
                      type="submit"
                      aria-label={product.featured ? "Unfeature product" : "Feature product"}
                      className={cn("transition-colors", product.featured ? "text-gold" : "text-brown/30 hover:text-gold")}
                    >
                      <Star className="h-4 w-4" fill={product.featured ? "currentColor" : "none"} />
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-brown/60">
                  {new Date(product.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/products/${product.id}`} aria-label="Edit product" className="text-brown/60 hover:text-olive">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={duplicateProductAction.bind(null, product.id)}>
                      <button type="submit" aria-label="Duplicate product" className="text-brown/60 hover:text-olive">
                        <Copy className="h-4 w-4" />
                      </button>
                    </form>
                    <form action={deleteProductAction.bind(null, product.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`Delete "${product.name}"? This cannot be undone.`}
                        aria-label="Delete product"
                        className="text-brown/60 hover:text-terracotta"
                      >
                        <Trash2 className="h-4 w-4" />
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
