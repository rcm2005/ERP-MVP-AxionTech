import type { ReactNode } from "react";
import { AppShell } from "@/components/shells";

export default function AppLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
