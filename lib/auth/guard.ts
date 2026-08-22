import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "./session";

/** Call at the top of any protected admin server component. */
export async function requireAdminSession() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
