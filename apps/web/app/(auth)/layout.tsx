import type { ReactNode } from "react";
import { AuthShell } from "@/components/shells";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AuthShell>{children}</AuthShell>;
}
