import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryButton } from "@/components/whatsapp/EnquiryButton";
import { GoldDivider } from "@/components/brand/GoldDivider";
import { siteConfig } from "@/lib/config/site";

const title = "Contact";
const description =
  "Get in touch with Agami by Haritha on WhatsApp or Instagram for enquiries about our jewellery collection.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            kicker="We'd Love to Hear From You"
            title="Get in Touch"
            description="The quickest way to reach us is on WhatsApp: send us a message about any piece, a custom request, or just to say hello."
          />

          <div className="flex flex-col gap-4 mt-2">
            <EnquiryButton size="lg" className="self-start" />

            <div className="flex flex-col gap-3 pt-4">
              <ContactRow icon={MessageCircle} label="WhatsApp" value="Available during business hours, UK time" />
              <ContactRow
                icon={InstagramIcon}
                label="Instagram"
                value={siteConfig.instagramUrl.replace("https://instagram.com/", "@")}
                href={siteConfig.instagramUrl}
              />
              <ContactRow icon={Mail} label="Email" value={siteConfig.contactEmail} href={`mailto:${siteConfig.contactEmail}`} />
            </div>
          </div>

          <GoldDivider variant="line" className="w-24 mt-4" />

          <div className="font-serif text-sm text-brown/70 leading-relaxed max-w-md">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-terracotta mb-2">Enquiry Guidance</p>
            <p>
              When enquiring about a piece, mention the product name and code (visible on each product
              page). It helps us confirm availability and pricing faster. For custom requests, let us
              know the occasion, preferred colours, and your timeline.
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden hidden lg:block">
          <Image
            src="/images/photos/contact-cover.webp"
            alt="Agami by Haritha jewellery photograph"
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MessageCircle | typeof InstagramIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-terracotta">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="font-sans text-xs tracking-wide uppercase text-brown/50">{label}</span>
        <span className="font-sans text-sm text-brown">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-3">{content}</div>;
}
