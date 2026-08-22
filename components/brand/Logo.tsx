import { cn } from "@/lib/utils";
import { Monogram } from "./Monogram";

type LogoProps = {
  className?: string;
  tone?: "olive" | "ivory";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
};

const sizeMap = {
  sm: { mark: "h-9 w-9", text: "text-lg" },
  md: { mark: "h-12 w-12", text: "text-2xl" },
  lg: { mark: "h-20 w-20", text: "text-4xl" },
};

/** Primary Agami logo lockup: monogram + wordmark. */
export function Logo({ className, tone = "olive", size = "md", showWordmark = true }: LogoProps) {
  const textColor = tone === "olive" ? "text-olive" : "text-ivory";
  const subColor = tone === "olive" ? "text-terracotta" : "text-sand";
  const { mark, text } = sizeMap[size];

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className={mark}>
        <Monogram tone={tone} />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display italic font-semibold tracking-wide", textColor, text)}>
            Agami
          </span>
          <span className={cn("font-sans text-[0.55rem] tracking-[0.25em] uppercase mt-1", subColor)}>
            by Haritha
          </span>
        </span>
      )}
    </span>
  );
}
