import { Search } from "lucide-react";

type SearchSortProps = {
  category?: string;
  searchQuery?: string;
  sort?: string;
};

/** Progressive-enhancement GET form — works without JavaScript. */
export function SearchSort({ category, searchQuery, sort }: SearchSortProps) {
  return (
    <form action="/collection" method="get" className="flex flex-col sm:flex-row gap-3 sm:items-center">
      {category && <input type="hidden" name="category" value={category} />}

      <label className="relative flex-1">
        <span className="sr-only">Search products</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brown/50" aria-hidden="true" />
        <input
          type="search"
          name="q"
          defaultValue={searchQuery}
          placeholder="Search jewellery, e.g. Kundan, jhumka, bangles..."
          className="w-full border border-sand bg-ivory py-2.5 pl-9 pr-3 font-sans text-sm text-brown placeholder:text-brown/45 focus-visible:outline-2 focus-visible:outline-gold"
        />
      </label>

      <label className="flex items-center gap-2">
        <span className="sr-only">Sort products</span>
        <select
          name="sort"
          defaultValue={sort || "newest"}
          className="border border-sand bg-ivory py-2.5 px-3 font-sans text-sm text-brown focus-visible:outline-2 focus-visible:outline-gold"
        >
          <option value="newest">Newest &amp; Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </label>

      <button
        type="submit"
        className="border border-olive bg-olive text-ivory font-sans text-xs tracking-wide uppercase px-5 py-2.5 hover:bg-gold hover:border-gold hover:text-olive transition-colors"
      >
        Apply
      </button>
    </form>
  );
}
