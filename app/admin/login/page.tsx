import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-olive px-4">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <Logo tone="ivory" size="lg" />
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold">Admin</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
