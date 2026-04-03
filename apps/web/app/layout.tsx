import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebProviders } from "./providers";
import { brandTokens } from "@erp/ui";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: brandTokens.brand.name,
  description: brandTokens.brand.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} bg-background text-text antialiased`}>
        <WebProviders>{children}</WebProviders>
      </body>
    </html>
  );
}
