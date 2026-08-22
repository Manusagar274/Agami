import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductMeta } from "@/components/product/ProductMeta";
import { EnquiryButton } from "@/components/whatsapp/EnquiryButton";
import { GoldDivider } from "@/components/brand/GoldDivider";
import { getProductBySlug } from "@/lib/db/queries";
import { CATEGORY_LABEL } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site";

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const description =
    product.shortDescription || product.description || `${product.name} — ${CATEGORY_LABEL[product.category]} from Agami by Haritha.`;
  const image = product.images[0]?.imageUrl;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/collection/${product.slug}` },
    openGraph: {
      title: product.name,
      description,
      url: `${siteConfig.url}/collection/${product.slug}`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const priceDisplay = product.priceLabel
    ? product.priceLabel
    : product.price != null
      ? formatPrice(product.price, product.currency)
      : "Enquire for Price";

  const productUrl = `${siteConfig.url}/collection/${product.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription || product.description || undefined,
    sku: product.sku,
    category: CATEGORY_LABEL[product.category],
    image: product.images.map((img) => img.imageUrl),
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price ?? undefined,
      availability:
        product.availability === "in_stock"
          ? "https://schema.org/InStock"
          : product.availability === "made_to_order"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/OutOfStock",
      url: productUrl,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Collection", href: "/collection" },
          { label: CATEGORY_LABEL[product.category], href: `/collection?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={product.images} productName={product.name} />

        <div className="flex flex-col gap-6">
          <div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-terracotta">
              {CATEGORY_LABEL[product.category]}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-olive mt-2 leading-tight">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-sans text-xl text-brown">{priceDisplay}</span>
            <AvailabilityBadge availability={product.availability} />
          </div>

          <GoldDivider variant="line" className="w-24" />

          {product.shortDescription && (
            <p className="font-serif text-lg text-brown/85 leading-relaxed">{product.shortDescription}</p>
          )}
          {product.description && (
            <p className="font-serif text-brown/75 leading-relaxed">{product.description}</p>
          )}

          <ProductMeta product={product} />

          {product.customNotes && (
            <p className="font-sans text-sm text-brown/60 italic border-l-2 border-gold pl-4">
              {product.customNotes}
            </p>
          )}

          <div className="pt-2">
            <EnquiryButton productName={product.name} sku={product.sku} productUrl={productUrl} size="lg" />
            <p className="font-sans text-xs text-brown/50 mt-3">
              We typically respond within a few hours. Availability is confirmed over WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
