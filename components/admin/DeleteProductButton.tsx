"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteProductAction } from "@/lib/products/actions";
import { dispatchAdminToast } from "@/lib/admin/toast";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    startTransition(async () => {
      await deleteProductAction(id);
      dispatchAdminToast(`"${name}" has been deleted.`);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label="Delete product"
      className="text-brown/60 hover:text-terracotta disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
