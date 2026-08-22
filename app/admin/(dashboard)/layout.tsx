import { requireAdminSession } from "@/lib/auth/guard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar email={session.email} />
      <main className="flex-1 px-6 sm:px-10 py-10 overflow-x-hidden">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
