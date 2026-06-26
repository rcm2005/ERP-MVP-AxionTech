"use client";

import { useState } from "react";
import { Badge, Button, SurfacePanel, TableShell } from "@erp/ui";
import { useShallow } from "zustand/react/shallow";
import { Icon } from "./icons";
import { cn } from "@erp/ui";
import {
  formatCurrencyFromCents,
  formatShortDate,
  selectPendingMatches,
  useDemoWorkspace,
} from "@/lib/demo-workspace";

const columns = [
  {
    title: "Extrato bancário",
    label: "Open Finance",
    tone: "base" as const,
    icon: "bank" as const,
    render: (item: {
      bankTransaction: { description: string; occurredAt: string; amountCents: number };
    }) => ({
      title: item.bankTransaction.description,
      subtitle: formatShortDate(item.bankTransaction.occurredAt),
      meta: "Movimento",
      badge: "Bancário",
      amount: formatCurrencyFromCents(item.bankTransaction.amountCents),
      variant: "info" as const,
    }),
  },
  {
    title: "Sugestão da IA",
    label: "Confiança",
    tone: "glass" as const,
    icon: "sparkles" as const,
    render: (item: { entry: { description: string; amountCents: number }; match: { confidencePercent: number } }) => ({
      title: item.entry.description,
      subtitle: `${item.match.confidencePercent}% confiança`,
      meta: "Match sugerido",
      badge: "Aria",
      amount: formatCurrencyFromCents(item.entry.amountCents),
      variant:
        item.match.confidencePercent >= 90 ? ("success" as const) : ("warning" as const),
    }),
  },
  {
    title: "Lançamento ERP",
    label: "Status",
    tone: "base" as const,
    icon: "receipt-text" as const,
    render: (item: { entry: { description: string; counterparty: string; amountCents: number; status: string } }) => ({
      title: item.entry.description,
      subtitle: `Contraparte: ${item.entry.counterparty}`,
      meta: "ERP interno",
      badge: item.entry.status,
      amount: formatCurrencyFromCents(item.entry.amountCents),
      variant: "neutral" as const,
    }),
  },
] as const;

export function ConciliationBoard() {
  const suggestions = useDemoWorkspace(useShallow(selectPendingMatches));
  const confirmMatch = useDemoWorkspace((state) => state.confirmMatch);
  const rejectMatch = useDemoWorkspace((state) => state.rejectMatch);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCard = suggestions[selectedIndex] ?? suggestions[0];

  if (!selectedCard) {
    return (
      <SurfacePanel className="p-8" tone="base">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
          Conciliação
        </p>
        <h1 className="mt-2 text-2xl font-bold text-text">Caixa conciliado</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          Nenhum match pendente no momento. O próximo passo é alimentar o inbox
          com novos documentos ou acompanhar o fluxo de caixa.
        </p>
        <div className="mt-6 flex gap-3">
          <Button href="/documentos/inbox">
            <Icon name="upload-cloud" className="h-4 w-4" />
            Abrir inbox
          </Button>
          <Button href="/financeiro/fluxo-caixa" variant="secondary">
            Ver fluxo de caixa
          </Button>
        </div>
      </SurfacePanel>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            Tesouraria inteligente
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-text">
            Conciliação Bancária
          </h1>
          <p className="mt-1 text-sm text-muted">
            Compare extrato, sugestão e lançamento real antes de fechar o caixa.
          </p>
        </div>
        <Badge variant="success">{suggestions.length} match(es) sugerido(s)</Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <SurfacePanel className="p-4" key={column.title} tone={column.tone}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  {column.title}
                </p>
                <p className="mt-1 text-xs text-muted">{column.label}</p>
              </div>
              <Icon name={column.icon} className="h-5 w-5 text-secondary" />
            </div>

            <div className="space-y-3">
              {suggestions.map((item, index) => {
                const entry = column.render(item);
                const active = selectedIndex === index;

                return (
                  <button
                    className={cn(
                      "w-full rounded-lg border p-3 text-left transition-all",
                      active
                        ? "border-secondary/30 bg-surfaceHigh"
                        : "border-outline/15 bg-surfaceLow hover:bg-surfaceHigh/60",
                    )}
                    key={`${column.title}-${item.bankTransaction.id}-${index}`}
                    onClick={() => setSelectedIndex(index)}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-text">{entry.title}</p>
                        <p className="mt-1 text-xs text-muted">{entry.subtitle}</p>
                      </div>
                      <p className="text-sm font-black text-text">{entry.amount}</p>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <Badge variant={entry.variant}>{entry.badge}</Badge>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                        {entry.meta}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </SurfacePanel>
        ))}
      </div>

      <SurfacePanel className="p-5" tone="base">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Match selecionado
            </p>
            <h2 className="mt-1 text-lg font-bold text-text">
              {selectedCard.bankTransaction.description}
            </h2>
            <p className="mt-1 text-sm text-muted">{selectedCard.entry.description}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => rejectMatch(selectedCard.bankTransaction.id)}
              variant="ghost"
            >
              <Icon name="x" className="h-4 w-4" />
              Rejeitar
            </Button>
            <Button onClick={() => confirmMatch(selectedCard.bankTransaction.id)}>
              <Icon name="check-circle" className="h-4 w-4" />
              Confirmar match
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[1.2fr_0.8fr] gap-4">
          <TableShell>
            <table className="w-full text-left text-sm">
              <tbody>
                <tr className="border-t border-outline/10">
                  <td className="px-4 py-3 text-muted">Audit trail</td>
                  <td className="px-4 py-3 font-semibold text-text">
                    Confirmação, rejeição e ajuste são refletidos no fluxo operacional
                  </td>
                </tr>
                <tr className="border-t border-outline/10">
                  <td className="px-4 py-3 text-muted">Lançamento ERP</td>
                  <td className="px-4 py-3 font-semibold text-text">
                    {selectedCard.entry.description} • {selectedCard.entry.status}
                  </td>
                </tr>
                <tr className="border-t border-outline/10">
                  <td className="px-4 py-3 text-muted">Próximo passo</td>
                  <td className="px-4 py-3 font-semibold text-text">
                    Confirmar manualmente antes de encerrar o ciclo do caixa
                  </td>
                </tr>
              </tbody>
            </table>
          </TableShell>

          <SurfacePanel className="p-4" tone="glass">
            <div className="flex items-center gap-2">
              <Icon name="sparkles" className="h-4 w-4 text-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Dica do copilot
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-text">
              Comece confirmando os matches com maior confiança. O objetivo é
              reduzir incerteza operacional antes de sofisticar automações.
            </p>
          </SurfacePanel>
        </div>
      </SurfacePanel>
    </div>
  );
}
