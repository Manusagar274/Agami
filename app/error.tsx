"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#F3EDE2] px-4 text-center font-sans">
        <h1 className="text-3xl text-[#292A1F]">Something went wrong.</h1>
        <p className="text-[#3B332B]/70 max-w-md">
          We&rsquo;re sorry. Please try again in a moment. If the problem continues, reach out to us on WhatsApp.
        </p>
        <button
          onClick={reset}
          className="border border-[#292A1F] px-6 py-3 text-sm uppercase tracking-wide text-[#292A1F] hover:bg-[#292A1F] hover:text-[#F3EDE2] transition-colors"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
