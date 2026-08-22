import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-olive text-ivory hover:bg-gold hover:text-olive border border-olive hover:border-gold",
  secondary:
    "bg-transparent text-olive border border-olive hover:bg-olive hover:text-ivory",
  ghost: "bg-transparent text-olive hover:text-terracotta underline-offset-4 hover:underline",
  "outline-light":
    "bg-transparent text-ivory border border-ivory/60 hover:border-gold hover:text-gold",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none";

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps | LinkProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href) {
    const { href, target, rel } = props as LinkProps;
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
