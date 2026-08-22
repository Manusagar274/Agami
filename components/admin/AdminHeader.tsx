import type { ReactNode } from "react";

export function AdminHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-3xl text-olive">{title}</h1>
        {description && <p className="font-sans text-sm text-brown/60 mt-1">{description}</p>}
      </div>
      {actions}
    </div>
  );
}
