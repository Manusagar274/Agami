export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Agami by Haritha",
  shortName: "Agami",
  tagline: "Crafting Beauty, Celebrating You",
  description: "Handpicked fancy jewellery for the modern Indian woman.",
  brandStatement: "Jewellery for moments that matter.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://agamibyharitha.com",
  ogImage: "/images/og-default.svg",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/agamibyharitha",

  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@agamibyharitha.com",

  nav: [
    { label: "Home", href: "/" },
    { label: "Collection", href: "/collection" },
    { label: "Our Story", href: "/story" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  footerLinks: [
    { label: "Collection", href: "/collection" },
    { label: "Our Story", href: "/story" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  categories: [
    { slug: "earrings", label: "Earrings" },
    { slug: "necklaces", label: "Necklaces" },
    { slug: "bangles", label: "Bangles" },
    { slug: "rings", label: "Rings" },
    { slug: "sets", label: "Sets" },
    { slug: "other", label: "Other" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
