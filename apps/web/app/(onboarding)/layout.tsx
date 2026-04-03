import type { ReactNode } from "react";
import { OnboardingShell } from "@/components/shells";

export default function OnboardingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <OnboardingShell>{children}</OnboardingShell>;
}
