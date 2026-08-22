import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StorySection } from "@/components/story/StorySection";
import { PullQuote } from "@/components/story/PullQuote";
import { GoldDivider } from "@/components/brand/GoldDivider";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config/site";

const title = "Our Story";
const description =
  "The story behind Agami by Haritha — Indian craftsmanship, personal style, and jewellery made to be worn and loved.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/story" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/story`,
    images: [{ url: "/images/photos/story-cover.webp", width: 1600, height: 900, alt: title }],
  },
};

export default function StoryPage() {
  return (
    <div>
      <section className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-olive">
        <Image
          src="/images/photos/story-cover.webp"
          alt="Agami by Haritha jewellery photograph"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-olive/40 flex items-center justify-center">
          <h1 className="font-display italic text-4xl sm:text-6xl text-ivory text-center px-4">
            Our Story
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col gap-20 sm:gap-28 py-12">
        <StorySection
          kicker="The Beginning"
          title="A Love for Jewellery, Passed Down"
          imageSrc="/images/photos/story-craft.webp"
          imageAlt="Agami by Haritha jewellery photograph"
        >
          <p>
            Agami by Haritha began with a simple idea: that fancy jewellery should feel personal,
            not mass-produced. <em>[Placeholder — replace with Haritha&rsquo;s real story: how she
            first fell in love with jewellery, and what led her to start Agami.]</em>
          </p>
          <p>
            Growing up surrounded by the rituals of Indian festivities — the clink of bangles, the
            careful pinning of a maang tikka before a wedding — jewellery was never just an
            accessory. It was memory, celebration, and identity, worn together.
          </p>
        </StorySection>

        <PullQuote attribution="Haritha, Founder">
          Jewellery should feel like it already belongs to you.
        </PullQuote>

        <StorySection
          kicker="Craftsmanship"
          title="Where Tradition Meets the Everyday"
          imageSrc="/images/photos/story-inspiration.webp"
          imageAlt="Agami by Haritha jewellery photograph"
          imagePosition="right"
        >
          <p>
            Each collection draws from traditional techniques — Kundan work, temple motifs, antique
            gold finishes — reinterpreted for the way modern Indian women actually get dressed.
            <em> [Placeholder — replace with specific details about sourcing, design process, or
            the artisans and workshops Agami collaborates with.]</em>
          </p>
          <p>
            The goal has never been to chase trends, but to build a wardrobe of fancy jewellery
            that moves easily from a wedding sangeet to a Tuesday that deserves a little sparkle.
          </p>
        </StorySection>

        <GoldDivider className="max-w-xs mx-auto" />

        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <SectionHeading
            kicker="Today"
            title="Modern Styling, Timeless Roots"
            description="Agami continues to grow, one collection at a time — always rooted in Indian craftsmanship, always designed for real, everyday women. [Placeholder — replace with current milestones, collaborations, or what's next for the brand.]"
          />
          <Button href="/collection" variant="primary" size="lg">
            Explore the Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
