"use client";

import { useMemo, useState } from "react";
import { Badge, Button, KpiCard, SurfacePanel, TableShell } from "@erp/ui";
import { useShallow } from "zustand/react/shallow";
import { Icon } from "./icons";
import {
  formatCurrencyFromCents,
  selectCashflowBreakdown,
  selectWorkspaceSnapshot,
  useDemoWorkspace,
} from "@/lib/demo-workspace";

const horizons = [30, 60, 90] as const;

export function CashflowBoard() {
  const [days, setDays] = useState<(typeof horizons)[number]>(60);
  const snapshot = useDemoWorkspace(useShallow(selectWorkspaceSnapshot));
  const breakdown = useDemoWorkspace(useShallow(selectCashflowBreakdown));

  const chart = useMemo(() => {
    const pendingWeight = Math.max(1, snapshot.pendingMatches);
    const base = days === 30 ? 58 : days === 60 ? 55 : 52;
    const points =
      days === 30
        ? [base, 53, 56, 50, 46 - pendingWeight, 42, 47]
        : days === 60
          ? [base, 51, 49, 55, 48 - pendingWeight, 45, 52]
          : [base, 50, 46, 49, 44 - pendingWeight, 40, 44];
    const projected =
      days === 30
        ? [base, 62, 64, 66, 69, 71, 74]
        : days === 60
          ? [base, 59, 62, 65, 68, 72, 76]
          : [base, 57, 60, 64, 67, 71, 75];
    return { points, projected };
  }, [days, snapshot.pendingMatches]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            Visão de tesouraria
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-text">
            Fluxo de Caixa
          </h1>
          <p className="mt-1 text-sm text-muted">
            Compare o impacto dos lançamentos e das conciliações pendentes antes de fechar a semana.
          </p>
        </div>
        <div className="flex rounded-lg bg-surfaceHigh p-1">
          {horizons.map((value) => (
            <button
              className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-all ${
                value === days ? "bg-surface text-text shadow-sm" : "text-muted hover:text-text"
              }`}
              key={value}
              onClick={() => setDays(value)}
              type="button"
            >
              {value} dias
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <KpiCard
          label="Saldo projetado"
          value={formatCurrencyFromCents(snapshot.saldoCents + snapshot.contasReceber7dCents - snapshot.contasPagar7dCents)}
          delta="documentos e caixa conectados"
          deltaTone="success"
        />
        <KpiCard
          label="Ponto de atenção"
          value={`${snapshot.pendingMatches} match(es)`}
          delta="podem distorcer a leitura do caixa"
          deltaTone="warning"
        />
        <KpiCard
          label="Reserva segura"
          value={formatCurrencyFromCents(Math.max(snapshot.saldoCents - snapshot.contasPagar7dCents, 0))}
          delta="após compromissos críticos"
          deltaTone="info"
        />
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-4">
        <SurfacePanel className="p-5" tone="base">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                Projeção vs realizado
              </p>
              <h2 className="mt-1 text-lg font-bold text-text">Horizonte de {days} dias</h2>
            </div>
            <Badge variant="aria">Aria Insight</Badge>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg bg-surfaceLow p-4">
            <svg className="h-[260px] w-full" viewBox="0 0 700 260">
              <defs>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,108,73,0.28)" />
                  <stop offset="100%" stopColor="rgba(0,108,73,0.02)" />
                </linearGradient>
              </defs>
              <path
                d={`M 30 ${chart.points[0]} ${chart.points
                  .map((point, index) => `L ${30 + index * 100} ${point + 30}`)
                  .join(" ")}`}
                fill="none"
                stroke="#006c49"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d={`M 30 ${chart.projected[0] + 20} ${chart.projected
                  .map((point, index) => `L ${30 + index * 100} ${point + 20}`)
                  .join(" ")}`}
                fill="none"
                stroke="#7c3aed"
                strokeDasharray="8 6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d={`M 30 ${chart.points[0] + 60} ${chart.points
                  .map((point, index) => `L ${30 + index * 100} ${point + 60}`)
                  .join(" ")} L 630 220 L 30 220 Z`}
                fill="url(#area)"
                opacity="0.9"
              />
            </svg>
          </div>
        </SurfacePanel>

        <div className="space-y-4">
          <SurfacePanel className="p-4" tone="glass">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Aria alerta
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-text">
              O maior risco de caixa acontece quando folha e impostos se
              concentram no mesmo dia.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Se você confirmar os créditos conciliados e lançar o documento
              que já está validado, o saldo projetado melhora sem maquiagem de
              dashboard.
            </p>
          </SurfacePanel>

          <SurfacePanel className="p-4" tone="base">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Simulador
            </p>
            <div className="mt-3 space-y-3">
              <div className="rounded-lg bg-surfaceLow p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-text">Adiar pagamento X</p>
                  <Badge variant="warning">cenário manual</Badge>
                </div>
                <div className="mt-3 h-2 rounded-full bg-surfaceHigh">
                  <div className="h-2 w-3/4 rounded-full bg-secondary" />
                </div>
                <p className="mt-2 text-xs text-muted">
                  Use a conciliação e o inbox para reduzir incerteza antes de empurrar datas.
                </p>
              </div>
              <Button className="w-full" href="/financeiro/conciliacao" variant="secondary">
                <Icon name="bank" className="h-4 w-4" />
                Revisar conciliações
              </Button>
            </div>
          </SurfacePanel>

          <SurfacePanel className="p-4" tone="base">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Breakdown
            </p>
            <TableShell className="mt-3">
              <table className="w-full text-left text-sm">
                <tbody>
                  {breakdown.map((item) => (
                    <tr className="border-t border-outline/10" key={item.label}>
                      <td className="px-4 py-3 text-muted">{item.label}</td>
                      <td className="px-4 py-3 text-right font-black text-text">
                        {formatCurrencyFromCents(item.valueCents)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableShell>
          </SurfacePanel>
        </div>
      </div>
    </div>
  );
}
