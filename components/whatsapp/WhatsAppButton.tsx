import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

type WhatsAppButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "text";
  size?: "sm" | "md" | "lg";
};

const variantClasses = {
  solid: "bg-terracotta text-ivory hover:bg-olive border border-terracotta hover:border-olive",
  outline: "bg-transparent text-olive border border-olive hover:bg-olive hover:text-ivory",
  text: "bg-transparent text-terracotta hover:text-olive underline-offset-4 hover:underline",
};

const sizeClasses = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/** Reusable WhatsApp deep-link CTA. Opens wa.me in a new tab. */
export function WhatsAppButton({ href, children, className, variant = "solid", size = "md" }: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-gold",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}
