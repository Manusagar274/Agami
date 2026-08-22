import type { Metadata } from "next";
import Link from "next/link";
import { Package, CheckCircle2, Star, Tags } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/StatCard";
import { getDashboardStats } from "@/lib/db/queries";
import { CATEGORY_LABEL } from "@/types/product";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <AdminHeader title="Overview" description="A quick snapshot of your catalogue." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Products" value={stats.total} icon={Package} />
        <StatCard label="Published" value={stats.published} icon={CheckCircle2} />
        <StatCard label="Featured" value={stats.featured} icon={Star} />
        <StatCard label="Categories" value={stats.categoryCount} icon={Tags} />
      </div>

      <div className="border border-sand/50 bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-sand/50">
          <h2 className="font-display text-xl text-olive">Recently Updated</h2>
          <Link href="/admin/products" className="font-sans text-xs uppercase tracking-wide text-terracotta hover:text-olive">
            View All
          </Link>
        </div>
        {stats.recent.length === 0 ? (
          <p className="px-5 py-8 text-center font-serif text-brown/60">
            Your catalogue is empty. <Link href="/admin/products/new" className="text-terracotta underline">Add your first piece.</Link>
          </p>
        ) : (
          <ul className="divide-y divide-sand/40">
            {stats.recent.map((product) => (
              <li key={product.id} className="flex items-center justify-between px-5 py-3 font-sans text-sm">
                <Link href={`/admin/products/${product.id}`} className="text-olive hover:text-terracotta">
                  {product.name}
                </Link>
                <span className="text-brown/50 text-xs uppercase tracking-wide">{CATEGORY_LABEL[product.category]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
