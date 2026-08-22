import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ivory px-4 text-center">
      <Logo size="lg" />
      <h1 className="font-display text-4xl text-olive">Page Not Found</h1>
      <p className="font-serif text-brown/70 max-w-md">
        The page you&rsquo;re looking for doesn&rsquo;t exist.
      </p>
      <Link
        href="/"
        className="border border-olive px-6 py-3 font-sans text-sm uppercase tracking-wide text-olive hover:bg-olive hover:text-ivory transition-colors"
      >
        Back Home
      </Link>
    </div>
  );
}
