import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site";

type CategoryFilterProps = {
  activeCategory?: string;
  searchQuery?: string;
  sort?: string;
};

function buildHref(category?: string, searchQuery?: string, sort?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (searchQuery) params.set("q", searchQuery);
  if (sort) params.set("sort", sort);
  const query = params.toString();
  return query ? `/collection?${query}` : "/collection";
}

export function CategoryFilter({ activeCategory, searchQuery, sort }: CategoryFilterProps) {
  return (
    <nav aria-label="Filter by category" className="flex flex-wrap gap-2">
      <Link
        href={buildHref(undefined, searchQuery, sort)}
        className={cn(
          "px-4 py-2 text-xs font-sans tracking-wide uppercase border transition-colors",
          !activeCategory
            ? "bg-olive text-ivory border-olive"
            : "bg-transparent text-olive/80 border-sand hover:border-olive"
        )}
      >
        All
      </Link>
      {siteConfig.categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={buildHref(cat.slug, searchQuery, sort)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "px-4 py-2 text-xs font-sans tracking-wide uppercase border transition-colors",
              isActive
                ? "bg-olive text-ivory border-olive"
                : "bg-transparent text-olive/80 border-sand hover:border-olive"
            )}
          >
            {cat.label}
          </Link>
        );
      })}
    </nav>
  );
}
