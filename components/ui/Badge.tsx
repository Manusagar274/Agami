import { cn } from "@/lib/utils";
import { Circle, Clock, XCircle } from "lucide-react";
import type { ProductAvailability } from "@/types/product";
import { AVAILABILITY_LABEL } from "@/types/product";

const availabilityStyles: Record<ProductAvailability, string> = {
  in_stock: "bg-sage/25 text-olive border-sage",
  made_to_order: "bg-gold/15 text-terracotta border-gold",
  out_of_stock: "bg-brown/10 text-brown/60 border-brown/30",
};

const availabilityIcon: Record<ProductAvailability, typeof Circle> = {
  in_stock: Circle,
  made_to_order: Clock,
  out_of_stock: XCircle,
};

export function AvailabilityBadge({ availability }: { availability: ProductAvailability }) {
  const Icon = availabilityIcon[availability];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[0.65rem] font-sans font-medium tracking-wide uppercase",
        availabilityStyles[availability]
      )}
    >
      <Icon className="h-2.5 w-2.5" aria-hidden="true" />
      {AVAILABILITY_LABEL[availability]}
    </span>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-terracotta/40 bg-terracotta/10 px-2 py-0.5 text-[0.65rem] font-sans tracking-wide uppercase text-terracotta",
        className
      )}
    >
      {children}
    </span>
  );
}
