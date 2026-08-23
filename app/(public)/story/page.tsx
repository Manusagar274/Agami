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
  "Agami by Haritha is a UK-based brand offering authentic South Indian traditional ornaments, inspired by designs passed down through generations.";

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
          kicker="Who We Are"
          title="Rooted in South Indian Tradition"
          imageSrc="/images/photos/story-craft.webp"
          imageAlt="Agami by Haritha jewellery photograph"
        >
          <p>
            Agami by Haritha is a UK-based brand offering authentic South Indian traditional
            ornaments, from temple jewellery to timeless everyday pieces, all inspired by designs
            passed down through generations.
          </p>
        </StorySection>

        <StorySection
          kicker="Meet Haritha"
          title="The Woman Behind Agami"
          imageSrc="/images/photos/story-inspiration.webp"
          imageAlt="Agami by Haritha jewellery photograph"
          imagePosition="right"
        >
          <p>
            Behind the brand is Haritha, who has always loved South Indian jewellery. Two things
            fascinate her most: picturing who a piece would suit, and wondering about the skill
            and patience behind making it. That&rsquo;s why every piece at Agami is chosen with
            care, honouring tradition while fitting easily into everyday life.
          </p>
        </StorySection>

        <PullQuote attribution="Haritha, Founder">
          Styling you is her favourite part.
        </PullQuote>

        <GoldDivider className="max-w-xs mx-auto" />

        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <SectionHeading
            kicker="More Than a Business"
            title="A Bridge Between Heritage and Today"
            description="For Haritha, this isn&rsquo;t just a business. It&rsquo;s a bridge between heritage and today. And if you&rsquo;re ever unsure what to pick, she&rsquo;s always happy to help."
          />
          <Button href="/collection" variant="primary" size="lg">
            Explore the Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
