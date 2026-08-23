"use client";

import { useEffect } from "react";
import { dispatchAdminToast } from "@/lib/admin/toast";

/**
 * Fires an admin toast once on mount when `message` is present (e.g. after a
 * redirect that carries a `?created=...` query param), then strips the query
 * param so refreshing the page doesn't re-show it.
 */
export function ToastTrigger({ message }: { message?: string }) {
  useEffect(() => {
    if (!message) return;
    window.history.replaceState(null, "", window.location.pathname);
    // Deferred: ToastHost (mounted as a layout sibling) may not have
    // subscribed yet in this same commit — a macrotask guarantees it has.
    const timer = setTimeout(() => dispatchAdminToast(message), 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
