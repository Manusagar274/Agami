"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { EnquiryButton } from "@/components/whatsapp/EnquiryButton";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu on navigation. Adjusted during render (per React's
  // guidance) rather than in an effect, to avoid an extra render pass.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-ivory/95 backdrop-blur-sm border-sand/60 py-2 shadow-sm"
          : "bg-ivory border-transparent py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" aria-label="Agami by Haritha home" className="shrink-0">
          <Logo size={scrolled ? "sm" : "md"} className="transition-all duration-300" />
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide uppercase">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 text-olive/80 hover:text-olive transition-colors",
                  isActive && "text-olive after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <EnquiryButton size="sm" />
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-olive"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-sand/50 bg-ivory px-4 pb-6 pt-4">
          <nav aria-label="Mobile" className="flex flex-col gap-4 font-sans text-sm tracking-wide uppercase">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1 text-olive/85 hover:text-olive"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5">
            <EnquiryButton className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
