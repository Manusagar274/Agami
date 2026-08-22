import { ProductCard } from "./ProductCard";
import type { ProductListItem } from "@/types/product";

type ProductGridProps = {
  products: ProductListItem[];
  emptyTitle?: string;
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  emptyTitle = "Our collection is being refreshed.",
  emptyMessage = "Please check back soon.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-24 text-center">
        <p className="font-display text-2xl text-olive">{emptyTitle}</p>
        <p className="font-serif text-brown/70">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
