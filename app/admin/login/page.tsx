import type { Metadata } from "next";
import Image from "next/image";
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
          <Image
            src="/brand/agami-lockup-dark.webp"
            alt="Agami by Haritha"
            width={1324}
            height={1189}
            priority
            className="h-24 w-24"
          />
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold">Admin</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
