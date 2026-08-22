import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldDivider } from "@/components/brand/GoldDivider";
import { BotanicalDecoration } from "@/components/brand/BotanicalDecoration";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { EnquiryButton } from "@/components/whatsapp/EnquiryButton";
import { getFeaturedProducts } from "@/lib/db/queries";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Handpicked Indian Fancy Jewellery",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export const revalidate = 60;

const categoryTiles = [
  { slug: "earrings", label: "Earrings", image: "/images/photos/category-earrings.webp" },
  { slug: "necklaces", label: "Necklaces", image: "/images/photos/category-necklaces.webp" },
  { slug: "bangles", label: "Bangles", image: "/images/photos/category-bangles.webp" },
  { slug: "sets", label: "Sets", image: "/images/photos/category-sets.webp" },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(8);
  const spotlight = featured.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-olive text-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 lg:py-0 lg:min-h-[85vh]">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold">
              Fancy Jewellery, Reimagined
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              Crafting Beauty,
              <br />
              <span className="italic text-gold">Celebrating You</span>
            </h1>
            <p className="font-serif text-lg text-ivory/80 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <EnquiryButton size="lg" />
              <Button href="/collection" variant="outline-light" size="lg">
                Explore Collection
              </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/photos/hero.webp"
              alt="Agami by Haritha jewellery, editorial photograph"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 border border-gold/40 m-4" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Featured collection — editorial spotlight */}
      {spotlight.length > 0 && (
        <section className="py-section-md px-4 sm:px-6 lg:px-8 texture-paper">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker="This Season" title="The Featured Collection" className="mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {spotlight.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand introduction */}
      <section className="py-section-md px-4 sm:px-6 lg:px-8 bg-ivory">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-6">
          <BotanicalDecoration side="left" className="w-16 h-auto opacity-60 hidden sm:block" />
          <SectionHeading
            kicker="Our Philosophy"
            title="Jewellery Rooted in Heritage"
            description="Agami by Haritha brings together the artistry of traditional Indian jewellery-making with a contemporary sense of ease. Each piece is chosen to feel personal — the kind of jewellery that moves effortlessly between a festive evening and an ordinary Tuesday made a little more special."
          />
          <Link href="/story" className="font-sans text-sm uppercase tracking-wide text-terracotta hover:text-olive underline underline-offset-4">
            Read Our Story
          </Link>
        </div>
      </section>

      {/* Product categories */}
      <section className="py-section-md px-4 sm:px-6 lg:px-8 bg-sand/15">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker="Browse" title="Shop by Category" className="mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {categoryTiles.map((tile) => (
              <Link
                key={tile.slug}
                href={`/collection?category=${tile.slug}`}
                className="group relative aspect-[4/5] overflow-hidden border border-sand/60"
              >
                <Image
                  src={tile.image}
                  alt={`${tile.label} category`}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-olive/25 group-hover:bg-olive/10 transition-colors" />
                <span className="absolute bottom-4 left-0 w-full text-center font-display text-2xl text-ivory">
                  {tile.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products grid */}
      <section className="py-section-md px-4 sm:px-6 lg:px-8 bg-ivory">
        <div className="mx-auto max-w-7xl">
          <SectionHeading kicker="Handpicked" title="Featured Pieces" className="mb-12" />
          <ProductGrid products={featured} />
          <div className="flex justify-center mt-12">
            <Button href="/collection" variant="secondary" size="lg">
              View Full Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Craftsmanship / story teaser */}
      <section className="relative py-section-lg px-4 sm:px-6 lg:px-8 bg-olive text-ivory overflow-hidden">
        <BotanicalDecoration side="right" className="absolute top-0 right-0 w-32 h-auto opacity-20 hidden lg:block" />
        <div className="mx-auto max-w-3xl flex flex-col items-center text-center gap-6">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold">Craftsmanship</span>
          <h2 className="font-display text-4xl sm:text-5xl italic">
            &ldquo;Every piece carries a little bit of story.&rdquo;
          </h2>
          <GoldDivider className="w-40" />
          <p className="font-serif text-ivory/75 leading-relaxed max-w-xl">
            From the first sketch to the final polish, our collections are chosen with care —
            honouring the techniques of Indian jewellery-making while staying true to how
            women actually want to wear their jewellery today.
          </p>
          <Button href="/story" variant="outline-light" size="md">
            Discover the Craft
          </Button>
        </div>
      </section>

      {/* WhatsApp enquiry CTA */}
      <section className="py-section-md px-4 sm:px-6 lg:px-8 bg-terracotta/10">
        <div className="mx-auto max-w-3xl flex flex-col items-center text-center gap-5">
          <SectionHeading
            kicker="Have a Question?"
            title="Let's Talk on WhatsApp"
            description="Whether you're curious about a piece, need styling advice, or want to check availability — we're just a message away."
          />
          <EnquiryButton size="lg" />
        </div>
      </section>
    </>
  );
}
