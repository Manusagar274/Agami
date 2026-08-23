import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryFilter } from "@/components/product/CategoryFilter";
import { SearchSort } from "@/components/product/SearchSort";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/db/queries";
import type { ProductCategory } from "@/types/product";
import { CATEGORY_LABEL } from "@/types/product";
import { siteConfig } from "@/lib/config/site";

const title = "Collection";
const description =
  "Browse the full Agami by Haritha catalogue of fancy jewellery: earrings, necklaces, bangles, rings and sets.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/collection" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/collection`,
  },
};

const VALID_CATEGORIES: ProductCategory[] = ["earrings", "necklaces", "bangles", "rings", "sets", "other"];
const VALID_SORTS = ["newest", "price-asc", "price-desc", "name-asc"] as const;

type CollectionPageProps = {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
};

export default async function CollectionPage({ searchParams }: CollectionPageProps) {
  const params = await searchParams;
  const category = VALID_CATEGORIES.includes(params.category as ProductCategory)
    ? (params.category as ProductCategory)
    : undefined;
  const sort = VALID_SORTS.includes(params.sort as (typeof VALID_SORTS)[number])
    ? (params.sort as (typeof VALID_SORTS)[number])
    : "newest";
  const search = params.q?.trim() || undefined;

  const products = await getProducts({ category, search, sort });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collection" }]} />

      <SectionHeading
        align="left"
        kicker="The Catalogue"
        title={category ? CATEGORY_LABEL[category] : "Full Collection"}
        description="Every piece is available to enquire about directly on WhatsApp. No checkout, no waiting."
        className="mt-6 mb-10"
      />

      <div className="flex flex-col gap-6 mb-10">
        <CategoryFilter activeCategory={category} searchQuery={search} sort={sort} />
        <SearchSort category={category} searchQuery={search} sort={sort} />
      </div>

      {search && (
        <p className="font-sans text-sm text-brown/60 mb-6">
          {products.length > 0
            ? `Showing ${products.length} result${products.length === 1 ? "" : "s"} for "${search}"`
            : `We couldn't find pieces matching "${search}".`}
        </p>
      )}

      <ProductGrid
        products={products}
        emptyTitle={search ? "We couldn't find pieces matching your search." : "Our collection is being refreshed."}
        emptyMessage={search ? "Try a different keyword or browse by category." : "Please check back soon."}
      />
    </div>
  );
}
