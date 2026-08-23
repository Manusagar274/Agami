"use client";

const TOAST_EVENT = "admin-toast";

export function dispatchAdminToast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: { message } }));
}

export function subscribeToAdminToast(callback: (message: string) => void) {
  function handler(event: Event) {
    const { message } = (event as CustomEvent<{ message: string }>).detail;
    callback(message);
  }
  window.addEventListener(TOAST_EVENT, handler);
  return () => window.removeEventListener(TOAST_EVENT, handler);
}
