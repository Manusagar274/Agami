import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminProductForm } from "@/components/admin/AdminProductForm";
import { getProductByIdAdmin } from "@/lib/db/queries";
import { updateProductAction } from "@/lib/products/actions";

export const metadata: Metadata = { title: "Edit Product" };

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductByIdAdmin(id);
  if (!product) notFound();

  const boundAction = updateProductAction.bind(null, id);

  return (
    <div>
      <AdminHeader
        title={product.name}
        description={`SKU ${product.sku} · Last updated ${new Date(product.updatedAt).toLocaleDateString("en-GB")}`}
        actions={
          product.status === "published" ? (
            <Link
              href={`/collection/${product.slug}`}
              target="_blank"
              className="font-sans text-xs uppercase tracking-wide text-terracotta hover:text-olive"
            >
              View on site
            </Link>
          ) : undefined
        }
      />
      <AdminProductForm product={product} action={boundAction} submitLabel="Save Changes" />
    </div>
  );
}
