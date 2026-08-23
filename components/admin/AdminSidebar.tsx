import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Package, PlusCircle, LogOut, ExternalLink } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/products/new", label: "Add Product", icon: PlusCircle },
];

export function AdminSidebar({ email }: { email: string }) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-olive text-ivory">
      <div className="px-6 py-6 border-b border-ivory/10">
        <Image
          src="/brand/agami-lockup-dark.webp"
          alt="Agami by Haritha"
          width={1324}
          height={1189}
          className="h-16 w-16"
        />
      </div>

      <nav aria-label="Admin" className="flex-1 px-3 py-6 flex flex-col gap-1 font-sans text-sm">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-ivory/80 hover:bg-ivory/10 hover:text-gold transition-colors"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          );
        })}

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-ivory/60 hover:bg-ivory/10 hover:text-gold transition-colors mt-6"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          View site
        </Link>
      </nav>

      <div className="border-t border-ivory/10 px-4 py-4 flex flex-col gap-3">
        <p className="font-sans text-xs text-ivory/50 truncate" title={email}>
          {email}
        </p>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 font-sans text-xs tracking-wide uppercase text-ivory/70 hover:text-gold transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
