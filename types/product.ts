export type ProductCategory =
  | "earrings"
  | "necklaces"
  | "bangles"
  | "rings"
  | "sets"
  | "other";

export type ProductAvailability = "in_stock" | "made_to_order" | "out_of_stock";

export type ProductStatus = "draft" | "published";

export type ProductImage = {
  id: string;
  productId: string;
  imageUrl: string;
  altText: string | null;
  sortOrder: number;
  isPrimary: boolean;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  category: ProductCategory;
  secondaryCategories: ProductCategory[];
  price: number | null;
  priceLabel: string | null;
  currency: string;
  material: string | null;
  finish: string | null;
  color: string | null;
  dimensions: string | null;
  occasion: string | null;
  customNotes: string | null;
  availability: ProductAvailability;
  featured: boolean;
  status: ProductStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
};

export type ProductListItem = Pick<
  Product,
  | "id"
  | "sku"
  | "slug"
  | "name"
  | "category"
  | "price"
  | "priceLabel"
  | "currency"
  | "availability"
  | "featured"
  | "status"
> & {
  primaryImage: ProductImage | null;
};

export const AVAILABILITY_LABEL: Record<ProductAvailability, string> = {
  in_stock: "In Stock",
  made_to_order: "Made to Order",
  out_of_stock: "Out of Stock",
};

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  earrings: "Earrings",
  necklaces: "Necklaces",
  bangles: "Bangles",
  rings: "Rings",
  sets: "Sets",
  other: "Other",
};
