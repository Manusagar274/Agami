import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "@/components/ui/icons";
import { GoldDivider } from "@/components/brand/GoldDivider";
import { siteConfig } from "@/lib/config/site";
import { generateGeneralEnquiryUrl } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-olive text-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <Image
              src="/brand/agami-lockup-dark.webp"
              alt="Agami by Haritha"
              width={1324}
              height={1189}
              className="h-24 w-24"
            />
            <p className="font-serif text-sm text-ivory/75 max-w-xs leading-relaxed">
              {siteConfig.brandStatement}
            </p>
          </div>

          <div className="flex flex-col gap-3 font-sans text-sm">
            <span className="text-xs tracking-[0.25em] uppercase text-gold mb-1">Explore</span>
            {siteConfig.footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-ivory/80 hover:text-gold transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 font-sans text-sm">
            <span className="text-xs tracking-[0.25em] uppercase text-gold mb-1">Connect</span>
            <a
              href={generateGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/80 hover:text-gold transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-ivory/80 hover:text-gold transition-colors">
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>

        <GoldDivider className="my-10 opacity-60" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-xs text-ivory/60">
          <p>
            {siteConfig.name}: {siteConfig.brandStatement}
          </p>
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
