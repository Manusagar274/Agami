import { cn } from "@/lib/utils";

type MonogramProps = {
  className?: string;
  tone?: "olive" | "ivory";
};

/** Circular botanical monogram derived from the Agami logo mark. */
export function Monogram({ className, tone = "olive" }: MonogramProps) {
  const letterColor = tone === "olive" ? "#292A1F" : "#F3EDE2";

  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Agami monogram"
    >
      <circle cx="60" cy="60" r="55" stroke="#D4A017" strokeWidth="1.25" fill="none" />
      <circle cx="60" cy="60" r="47" stroke="#D4A017" strokeWidth="0.75" opacity="0.55" fill="none" />
      <g stroke="#D4A017" strokeWidth="1.1" fill="none" strokeLinecap="round">
        <path d="M28 78 C 24 68, 26 56, 34 48" />
        <path d="M30 62 C 26 60, 22 60, 19 63" opacity="0.85" />
        <path d="M31 53 C 27 52, 24 53, 22 56" opacity="0.85" />
        <path d="M34 70 C 30 70, 27 72, 25 75" opacity="0.85" />
        <path d="M92 78 C 96 68, 94 56, 86 48" />
        <path d="M90 62 C 94 60, 98 60, 101 63" opacity="0.85" />
        <path d="M89 53 C 93 52, 96 53, 98 56" opacity="0.85" />
        <path d="M86 70 C 90 70, 93 72, 95 75" opacity="0.85" />
      </g>
      <path
        d="M60 32 L80 82 M60 32 L40 82 M47.5 66 H72.5"
        stroke={letterColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="60" cy="32" r="2.5" fill="#D4A017" />
    </svg>
  );
}
