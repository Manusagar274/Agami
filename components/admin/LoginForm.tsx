"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/lib/auth/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.error && (
        <p role="alert" className="border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="font-sans text-xs tracking-wide uppercase text-ivory/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full border border-ivory/25 bg-ivory/10 px-3 py-2.5 font-sans text-sm text-ivory placeholder:text-ivory/40 focus-visible:outline-2 focus-visible:outline-gold"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="font-sans text-xs tracking-wide uppercase text-ivory/70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-ivory/25 bg-ivory/10 px-3 py-2.5 font-sans text-sm text-ivory placeholder:text-ivory/40 focus-visible:outline-2 focus-visible:outline-gold"
        />
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 bg-gold text-olive px-6 py-3 font-sans text-sm font-medium uppercase tracking-wide hover:bg-ivory transition-colors disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}
