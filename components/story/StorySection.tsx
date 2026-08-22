import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

type StorySectionProps = {
  kicker?: string;
  title: string;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  className?: string;
};

export function StorySection({
  kicker,
  title,
  children,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  className,
}: StorySectionProps) {
  return (
    <section className={cn("grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center", className)}>
      <div className={cn("relative aspect-[4/5] w-full overflow-hidden", imagePosition === "right" && "lg:order-2")}>
        <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>

      <div className={cn("flex flex-col gap-5", imagePosition === "right" && "lg:order-1")}>
        <SectionHeading kicker={kicker} title={title} align="left" />
        <div className="font-serif text-brown/85 leading-relaxed space-y-4 max-w-xl">{children}</div>
      </div>
    </section>
  );
}
