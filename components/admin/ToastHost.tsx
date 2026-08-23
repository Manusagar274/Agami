"use client";

import { useEffect, useState } from "react";
import { Toast } from "./Toast";
import { subscribeToAdminToast } from "@/lib/admin/toast";

/** Mounted once per admin layout; renders whatever toast is dispatched via dispatchAdminToast(). */
export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => subscribeToAdminToast(setMessage), []);

  if (!message) return null;
  return <Toast message={message} onDismiss={() => setMessage(null)} />;
}
