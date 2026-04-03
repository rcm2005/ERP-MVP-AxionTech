"use client";

import { useMemo, useState } from "react";
import { Badge, Button, KpiCard, SurfacePanel, TableShell } from "@erp/ui";
import { Icon } from "./icons";
import { cashflowItems } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";

const horizons = [30, 60, 90] as const;

export function CashflowBoard() {
  const [days, setDays] = useState<(typeof horizons)[number]>(60);

  const chart = useMemo(() => {
    const points = days === 30 ? [58, 52, 56, 49, 44, 38, 45] : days === 60 ? [55, 50, 48, 54, 46, 42, 49] : [52, 49, 44, 48, 40, 37, 41];
    const projected = days === 30 ? [58, 61, 64, 66, 69, 72, 75] : days === 60 ? [55, 58, 62, 65, 68, 72, 77] : [52, 56, 59, 63, 67, 72, 78];
    return { points, projected };
  }, [days]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
            Visão de tesouraria
          </p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-text">
            Fluxo de Caixa
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            Compare realizado e projetado, simule um atraso de pagamento e veja
            a leitura da Aria sobre o maior risco próximo.
          </p>
        </div>
        <div className="flex rounded-full bg-surfaceHigh p-1.5">
          {horizons.map((value) => (
            <button
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                value === days ? "bg-surface text-text shadow-sm" : "text-muted"
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

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Saldo projetado" value="R$ 218.420,00" delta="+12,4%" deltaTone="success" />
        <KpiCard label="Ponto de atenção" value="15 de junho" delta="folha e impostos" deltaTone="warning" />
        <KpiCard label="Reserva segura" value="R$ 96.000,00" delta="14 dias" deltaTone="info" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_380px]">
        <SurfacePanel className="p-5" tone="base">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Projeção vs realizado
              </p>
              <h2 className="mt-1 text-2xl font-black text-text">Horizonte de {days} dias</h2>
            </div>
            <Badge variant="aria">Aria Insight</Badge>
          </div>
          <div className="mt-6 overflow-hidden rounded-[1.5rem] bg-surfaceLow p-4">
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
          <SurfacePanel className="p-5" tone="glass">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Aria alerta
            </p>
            <p className="mt-2 text-lg font-semibold leading-8 text-text">
              O maior risco de caixa acontece quando folha e impostos se
              concentram no mesmo dia.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Se você adiar o pagamento X por 3 dias, o saldo mínimo sobe de R${" "}
              {days === 30 ? "38 mil" : days === 60 ? "44 mil" : "41 mil"} para
              aproximadamente R$ 56 mil.
            </p>
          </SurfacePanel>

          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Simulador
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-surfaceLow p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-text">Adiar pagamento X</p>
                  <Badge variant="warning">-3 dias</Badge>
                </div>
                <div className="mt-3 h-2 rounded-full bg-surfaceHigh">
                  <div className="h-2 w-2/3 rounded-full bg-secondary" />
                </div>
                <p className="mt-2 text-xs text-muted">
                  Ajuste o calendário e observe o impacto no saldo mínimo.
                </p>
              </div>
              <Button className="w-full" variant="secondary">
                <Icon name="sparkles" className="h-4 w-4" />
                Simular cenário
              </Button>
            </div>
          </SurfacePanel>

          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Breakdown
            </p>
            <TableShell className="mt-4">
              <table className="w-full text-left text-sm">
                <tbody>
                  {cashflowItems.map((item) => (
                    <tr className="border-t border-outline/10" key={item.label}>
                      <td className="px-4 py-3 text-muted">{item.label}</td>
                      <td className="px-4 py-3 text-right font-black text-text">
                        {formatCurrency(item.value)}
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
