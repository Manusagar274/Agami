"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-olive text-ivory px-4 py-3 shadow-lg font-sans text-sm animate-[fadeIn_0.2s_ease-out]"
    >
      <CheckCircle2 className="h-4 w-4 text-gold shrink-0" aria-hidden="true" />
      <span>{message}</span>
      <button onClick={onDismiss} aria-label="Dismiss notification" className="text-ivory/60 hover:text-ivory">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
