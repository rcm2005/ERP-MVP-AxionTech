import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/shells";
import {
  DEMO_SESSION_COOKIE_NAME,
  DEMO_SESSION_COOKIE_VALUE,
} from "@/lib/auth/mock-auth";

export default function AppLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const has_demo_session =
    cookies().get(DEMO_SESSION_COOKIE_NAME)?.value === DEMO_SESSION_COOKIE_VALUE;

  if (!has_demo_session) {
    redirect("/login");
  }

  return <AppShell>{children}</AppShell>;
}
