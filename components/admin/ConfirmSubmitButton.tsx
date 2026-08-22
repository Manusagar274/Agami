"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ConfirmSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  confirmMessage: string;
};

/** Submit button that asks for confirmation before firing a destructive form action. */
export function ConfirmSubmitButton({ confirmMessage, className, children, ...props }: ConfirmSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={cn("text-xs font-sans", className)}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
