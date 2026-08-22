import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-4 border border-sand/50 bg-white p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-terracotta">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="font-sans text-2xl font-semibold text-olive leading-none">{value}</p>
        <p className="font-sans text-xs text-brown/60 mt-1">{label}</p>
      </div>
    </div>
  );
}
