import { cn } from "@/lib/utils";

type GoldDividerProps = {
  className?: string;
  variant?: "line" | "ornament";
};

/** Thin gold editorial section separator, with an optional diamond ornament. */
export function GoldDivider({ className, variant = "ornament" }: GoldDividerProps) {
  if (variant === "line") {
    return <div className={cn("rule-gold w-full", className)} role="presentation" />;
  }

  return (
    <div className={cn("flex items-center justify-center gap-4", className)} role="presentation" aria-hidden="true">
      <span className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-gold" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0 L11 8 L8 16 L5 8 Z" fill="#D4A017" />
        <circle cx="8" cy="8" r="2" fill="var(--color-ivory)" stroke="#D4A017" strokeWidth="1" />
      </svg>
      <span className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}
