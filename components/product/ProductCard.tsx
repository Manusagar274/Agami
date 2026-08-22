import Image from "next/image";
import Link from "next/link";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { CATEGORY_LABEL, type ProductListItem } from "@/types/product";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductListItem }) {
  const priceDisplay = product.priceLabel
    ? product.priceLabel
    : product.price != null
      ? formatPrice(product.price, product.currency)
      : "Enquire for Price";

  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group flex flex-col border border-sand/50 bg-ivory transition-shadow duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-gold"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand/20">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage.imageUrl}
            alt={product.primaryImage.altText || product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display italic text-brown/40">
            Agami
          </div>
        )}
        <span className="absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-gold" aria-hidden="true" />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-olive text-ivory text-[0.6rem] tracking-[0.2em] uppercase px-2 py-1 font-sans">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-terracotta">
          {CATEGORY_LABEL[product.category]}
        </span>
        <h3 className="font-display text-xl text-olive leading-snug">{product.name}</h3>
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="font-sans text-sm text-brown/85">{priceDisplay}</span>
          <AvailabilityBadge availability={product.availability} />
        </div>
      </div>
    </Link>
  );
}
