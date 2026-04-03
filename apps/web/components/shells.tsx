"use client";

import Link from "next/link";
import { brandTokens, SurfacePanel } from "@erp/ui";
import { Icon } from "./icons";
import { AriaPanel } from "./aria-panel";
import { cn } from "@erp/ui";
import { quickActions } from "@/lib/mock-data";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function AuthShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="min-h-screen bg-hero-gradient">
      <div className="grid min-h-screen lg:grid-cols-12">
        <section className="relative hidden overflow-hidden bg-primary p-10 text-white lg:col-span-7 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute inset-0 soft-grid opacity-30" />
          <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white shadow-lg shadow-secondary/20">
                <Icon name="building" className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                  ERP brasileiro com Aria
                </p>
                <h1 className="text-2xl font-black tracking-tight">
                  {brandTokens.brand.name}
                </h1>
              </div>
            </div>
            <h2 className="max-w-2xl text-5xl font-black leading-[1.02] tracking-tight xl:text-6xl">
              A arquitetura inteligente para a sua operação financeira.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
              Tudo em português do Brasil, com foco em caixa, fiscal e
              produtividade. A Aria acompanha cada tela como copilot global.
            </p>
            <div className="mt-10 grid max-w-2xl gap-4 md:grid-cols-3">
              {[
                "Login com Google e fallback seguro",
                "Onboarding assistido em 5 passos",
                "Telas financeiras fiéis ao Stitch",
              ].map((item) => (
                <div
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white/90 backdrop-blur-md"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 max-w-md rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
              Insight da Aria
            </p>
            <p className="mt-2 text-lg font-medium leading-8">
              &quot;Voce tem 3 boletos vencendo hoje. Quer revisar o impacto no
              caixa agora?&quot;
            </p>
          </div>
        </section>
        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:col-span-5 lg:px-10">
          <div className="w-full max-w-md">{children}</div>
        </section>
      </div>
    </main>
  );
}

export function OnboardingShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="min-h-screen bg-hero-gradient px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-start gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="sticky top-6 space-y-6">
          <SurfacePanel className="p-6" tone="glass">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-white">
                <Icon name="building" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                  Configuração guiada
                </p>
                <h1 className="text-xl font-black tracking-tight text-text">
                  {brandTokens.brand.name}
                </h1>
              </div>
            </div>
            <div className="mt-6 rounded-[1.25rem] bg-white/70 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                Aria Intelligence
              </p>
              <p className="mt-2 text-sm leading-6 text-text">
                Vamos configurar sua empresa em menos de 5 minutos. A Aria
                valida cada passo e sugere a melhor base inicial.
              </p>
            </div>
          </SurfacePanel>
          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Passos do wizard
            </p>
            <div className="mt-4 space-y-3">
              {[
                "Perfil da empresa",
                "Regime fiscal",
                "Conta bancária",
                "Dados iniciais",
                "Módulos ativos",
              ].map((label, index) => (
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2",
                    index === 0 ? "bg-surfaceHigh" : "bg-surfaceLow",
                  )}
                  key={label}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="text-sm font-medium text-text">{label}</div>
                </div>
              ))}
            </div>
          </SurfacePanel>
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}

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
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
        active
          ? "bg-secondary/10 text-secondary"
          : "text-white/60 hover:bg-white/10 hover:text-white",
      )}
      href={href}
    >
      <Icon name={icon} className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-hero-gradient">
      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[292px] flex-col border-r border-white/10 bg-primary/98 px-4 py-5 text-white shadow-[20px_0_60px_rgba(11,28,48,0.16)] lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-white">
              <Icon name="building" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                Empresa Demo
              </p>
              <h1 className="text-lg font-black tracking-tight">
                {brandTokens.brand.name}
              </h1>
            </div>
          </div>
          <div className="mt-8 space-y-2">
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
          <div className="mt-auto rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
              Aria AI
            </p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              3 boletos vencem hoje. Deseja programar lembretes e revisar o
              impacto no fluxo?
            </p>
          </div>
        </aside>

        <div className="flex w-full flex-1 flex-col lg:pl-[292px]">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-surface/90 px-4 backdrop-blur-xl lg:px-7">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surfaceHigh text-text lg:hidden"
                type="button"
              >
                <Icon name="menu" className="h-5 w-5" />
              </button>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  Horizonte operacional
                </p>
                <h2 className="text-lg font-black tracking-tight text-text">
                  Painel principal
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surfaceHigh text-text"
                type="button"
              >
                <Icon name="bell" className="h-5 w-5" />
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-aria text-white shadow-lg">
                H
              </div>
            </div>
          </header>

          <div className="px-4 py-5 pb-28 lg:px-7">
            <div className="mx-auto max-w-[1600px]">{children}</div>
          </div>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-surface/92 px-2 py-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-6 gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                className={cn(
                  "flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[10px] font-semibold transition-all",
                  active ? "bg-secondary/10 text-secondary" : "text-muted",
                )}
                href={item.href}
                key={item.href}
              >
                <Icon name={item.icon} className="h-5 w-5" />
                <span className="mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <AriaPanel />
    </main>
  );
}

export function QuickActionBar() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {quickActions.map((action) => (
        <Link
          className="group flex items-center justify-between rounded-[1.25rem] bg-surface px-4 py-4 shadow-[0_16px_40px_rgba(11,28,48,0.07)] transition-transform hover:-translate-y-0.5"
          href={action.href}
          key={action.label}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-white">
              <Icon name={action.icon} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-text">{action.label}</p>
              <p className="text-[11px] text-muted">Atalho rápido</p>
            </div>
          </div>
          <Icon
            className="h-5 w-5 text-muted transition-transform group-hover:translate-x-0.5"
            name="arrow-right"
          />
        </Link>
      ))}
    </div>
  );
}
