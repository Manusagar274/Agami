import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { ToastTrigger } from "@/components/admin/ToastTrigger";
import { Button } from "@/components/ui/Button";
import { getAllProductsAdmin } from "@/lib/db/queries";

export const metadata: Metadata = { title: "Products" };

type AdminProductsPageProps = {
  searchParams: Promise<{ created?: string }>;
};

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const { created } = await searchParams;
  const products = await getAllProductsAdmin();

  return (
    <div>
      <ToastTrigger message={created ? `"${created}" has been added.` : undefined} />
      <AdminHeader
        title="Products"
        description={`${products.length} product${products.length === 1 ? "" : "s"} in your catalogue.`}
        actions={<Button href="/admin/products/new" size="sm">Add Product</Button>}
      />
      <ProductsTable products={products} />
    </div>
  );
}
