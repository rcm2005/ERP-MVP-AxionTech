"use client";

import Link from "next/link";
import { brandTokens, SurfacePanel } from "@erp/ui";
import { Icon } from "./icons";
import { AriaPanel } from "./aria-panel";
import { cn } from "@erp/ui";
import { quickActions } from "@/lib/mock-data";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// ─── Auth Shell ────────────────────────────────────────────────────────────────

export function AuthShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0b1c30]">
      {/* Left — branding panel */}
      <aside className="relative flex w-[480px] flex-shrink-0 flex-col justify-between overflow-hidden p-10">
        <div className="absolute inset-0 soft-grid opacity-20" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-indigo-500/12 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-white">
            <Icon name="building" className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
              ERP com Aria
            </p>
            <h1 className="text-base font-bold text-white">
              {brandTokens.brand.name}
            </h1>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white">
            A arquitetura inteligente para sua operação financeira.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/65">
            Tudo em português do Brasil, com foco em caixa, fiscal e
            produtividade. A Aria acompanha cada tela como copilot global.
          </p>
          <div className="mt-8 space-y-2.5">
            {[
              { icon: "lock" as const, text: "Login com Google e fallback seguro" },
              { icon: "settings" as const, text: "Onboarding assistido em 5 passos" },
              { icon: "chart" as const, text: "Telas financeiras fiéis ao Stitch" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/6 px-4 py-2.5 text-sm text-white/80"
              >
                <Icon name={item.icon} className="h-4 w-4 flex-shrink-0 text-secondary-soft" />
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
            Aria Intelligence
          </p>
          <p className="mt-2 text-sm leading-6 text-white/85">
            &quot;Você tem 3 boletos vencendo hoje. Quer revisar o impacto no caixa agora?&quot;
          </p>
        </div>
      </aside>

      {/* Right — form area */}
      <main className="flex flex-1 items-center justify-center overflow-y-auto bg-[#f8f9ff] p-10">
        <div className="w-full max-w-[460px]">
          {children}
        </div>
      </main>
    </div>
  );
}

// ─── Onboarding Shell ──────────────────────────────────────────────────────────

export function OnboardingShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-[#f8f9ff]">
      <aside className="sticky top-0 h-screen w-[280px] flex-shrink-0 border-r border-outline/10 bg-surface p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-white">
            <Icon name="building" className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              Configuração guiada
            </p>
            <h1 className="text-sm font-bold text-text">
              {brandTokens.brand.name}
            </h1>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-surfaceLow p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
            Aria Intelligence
          </p>
          <p className="mt-2 text-xs leading-5 text-text">
            Vamos configurar sua empresa em menos de 5 minutos.
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted">
            Passos
          </p>
          <div className="space-y-1">
            {[
              "Perfil da empresa",
              "Regime fiscal",
              "Conta bancária",
              "Dados iniciais",
              "Módulos ativos",
            ].map((label, index) => (
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2",
                  index === 0 ? "bg-secondary/8 text-secondary" : "text-muted",
                )}
                key={label}
              >
                <div className={cn(
                  "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                  index === 0 ? "bg-secondary text-white" : "bg-surfaceHigh text-muted"
                )}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-10">
        <div className="mx-auto max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  );
}

// ─── App Shell ─────────────────────────────────────────────────────────────────

const navItems = [
  { href: "/dashboard", label: "Início", icon: "home" as const },
  { href: "/financeiro/pagar", label: "Financeiro", icon: "wallet" as const },
  { href: "/documentos/inbox", label: "Documentos", icon: "file" as const },
  { href: "/crm/pipeline", label: "CRM", icon: "layout" as const },
  { href: "/bi/dashboard", label: "BI", icon: "chart" as const },
  { href: "/config/empresa", label: "Config", icon: "settings" as const },
];

function NavLink({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: Parameters<typeof Icon>[0]["name"];
  active: boolean;
}) {
  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-white/10 text-white"
          : "text-white/50 hover:bg-white/6 hover:text-white/80",
      )}
      href={href}
    >
      <Icon name={icon} className="h-4 w-4 flex-shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff]">
      {/* Sidebar */}
      <aside className="flex w-[220px] flex-shrink-0 flex-col border-r border-white/8 bg-[#0f1e33]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-white/8 px-4 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-white">
            <Icon name="building" className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">{brandTokens.brand.name}</p>
            <p className="text-[10px] text-white/40">Empresa Demo</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                active={pathname === item.href || pathname.startsWith(item.href + "/")}
                href={item.href}
                icon={item.icon}
                key={item.href}
                label={item.label}
              />
            ))}
          </div>
        </nav>

        {/* Aria hint */}
        <div className="border-t border-white/8 p-3">
          <div className="rounded-lg bg-white/6 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Aria
            </p>
            <p className="mt-1 text-xs leading-5 text-white/65">
              3 boletos vencem hoje.
            </p>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-12 flex-shrink-0 items-center justify-between border-b border-outline/10 bg-surface px-6">
          <div>
            <h2 className="text-sm font-semibold text-text">Painel principal</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surfaceLow hover:text-text"
              type="button"
            >
              <Icon name="bell" className="h-4 w-4" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-aria text-xs font-bold text-white">
              H
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>

      <AriaPanel />
    </div>
  );
}

// ─── Quick Action Bar ──────────────────────────────────────────────────────────

export function QuickActionBar() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {quickActions.map((action) => (
        <Link
          className="group flex items-center justify-between rounded-xl border border-outline/10 bg-surface px-4 py-3 shadow-[0_2px_8px_rgba(11,28,48,0.05)] transition-all hover:border-secondary/20 hover:shadow-[0_4px_16px_rgba(0,108,73,0.08)]"
          href={action.href}
          key={action.label}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/8 text-secondary">
              <Icon name={action.icon} className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text">{action.label}</p>
              <p className="text-xs text-muted">Atalho rápido</p>
            </div>
          </div>
          <Icon
            className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5"
            name="arrow-right"
          />
        </Link>
      ))}
    </div>
  );
}
