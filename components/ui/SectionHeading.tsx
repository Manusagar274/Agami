import { cn } from "@/lib/utils";
import { GoldDivider } from "@/components/brand/GoldDivider";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "olive" | "ivory";
  className?: string;
  divider?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  tone = "olive",
  className,
  divider = true,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const textColor = tone === "olive" ? "text-olive" : "text-ivory";
  const descColor = tone === "olive" ? "text-brown/80" : "text-ivory/75";

  return (
    <div className={cn("flex flex-col gap-4", isCenter ? "items-center text-center" : "items-start text-left", className)}>
      {kicker && (
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-terracotta">
          {kicker}
        </span>
      )}
      <h2 className={cn("font-display text-4xl sm:text-5xl leading-tight", textColor)}>{title}</h2>
      {divider && <GoldDivider className={isCenter ? "w-40" : "w-24 justify-start"} />}
      {description && (
        <p className={cn("font-serif text-base sm:text-lg max-w-2xl leading-relaxed", descColor)}>
          {description}
        </p>
      )}
    </div>
  );
}
