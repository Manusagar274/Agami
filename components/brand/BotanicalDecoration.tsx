import Image from "next/image";
import { cn } from "@/lib/utils";

type BotanicalDecorationProps = {
  side?: "left" | "right";
  className?: string;
};

/** Purely decorative botanical sprig motif; hidden from assistive tech. */
export function BotanicalDecoration({ side = "left", className }: BotanicalDecorationProps) {
  const src = side === "left" ? "/brand/botanical-left.svg" : "/brand/botanical-right.svg";

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={160}
      height={220}
      className={cn("pointer-events-none select-none opacity-70", className)}
    />
  );
}
