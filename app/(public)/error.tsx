"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function PublicError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-display text-4xl text-olive">Something went wrong.</h1>
      <p className="font-serif text-brown/70 max-w-md">
        We&rsquo;re sorry — please try again in a moment, or reach out to us on WhatsApp if this keeps happening.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
