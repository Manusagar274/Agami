import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { Button } from "@/components/ui/Button";
import { getAllProductsAdmin } from "@/lib/db/queries";

export const metadata: Metadata = { title: "Products" };

export default async function AdminProductsPage() {
  const products = await getAllProductsAdmin();

  return (
    <div>
      <AdminHeader
        title="Products"
        description={`${products.length} product${products.length === 1 ? "" : "s"} in your catalogue.`}
        actions={<Button href="/admin/products/new" size="sm">Add Product</Button>}
      />
      <ProductsTable products={products} />
    </div>
  );
}
