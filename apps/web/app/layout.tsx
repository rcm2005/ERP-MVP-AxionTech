import type { Metadata } from "next";
import "./globals.css";
import { WebProviders } from "./providers";
import { brandTokens } from "@erp/ui";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: brandTokens.brand.name,
  description: brandTokens.brand.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-text antialiased">
        <WebProviders>{children}</WebProviders>
      </body>
    </html>
  );
}
