import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminProductForm } from "@/components/admin/AdminProductForm";
import { createProductAction } from "@/lib/products/actions";

export const metadata: Metadata = { title: "Add Product" };

export default function NewProductPage() {
  return (
    <div>
      <AdminHeader title="Add Product" description="Create a new catalogue piece." />
      <AdminProductForm action={createProductAction} submitLabel="Create Product" />
    </div>
  );
}
