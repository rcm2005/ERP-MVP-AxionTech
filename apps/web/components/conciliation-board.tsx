"use client";

import { useState } from "react";
import { Badge, Button, SurfacePanel, TableShell } from "@erp/ui";
import { Icon } from "./icons";
import { conciliationCards } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/format";
import { cn } from "@erp/ui";

const columns = [
  {
    title: "Extrato bancário",
    label: "Open Finance",
    tone: "base" as const,
    icon: "bank" as const,
    render: (card: (typeof conciliationCards)[number]) => ({
      title: card.bank,
      subtitle: card.date,
      meta: "Movimento",
      badge: "Bancário",
      amount: formatCurrency(card.amount),
      variant: "info" as const,
    }),
  },
  {
    title: "Sugestão da IA",
    label: "Confiança",
    tone: "glass" as const,
    icon: "sparkles" as const,
    render: (card: (typeof conciliationCards)[number]) => ({
      title: card.suggestion,
      subtitle: `${card.confidence}% confiança`,
      meta: card.status,
      badge: "Aria",
      amount: formatCurrency(card.amount),
      variant:
        card.confidence >= 90 ? ("success" as const) : ("warning" as const),
    }),
  },
  {
    title: "Lançamento ERP",
    label: "Status",
    tone: "base" as const,
    icon: "receipt-text" as const,
    render: (card: (typeof conciliationCards)[number]) => ({
      title: card.suggestion,
      subtitle: `Vinculado a ${card.bank}`,
      meta: "ERP interno",
      badge: card.status,
      amount: formatCurrency(card.amount),
      variant: "neutral" as const,
    }),
  },
] as const;

export function ConciliationBoard() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCard = conciliationCards[selectedIndex];

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
            Compare extrato bancário, sugestão da Aria e lançamento do ERP em uma mesma tela.
          </p>
        </div>
        <Badge variant="success">85%+ auto-match</Badge>
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
              {conciliationCards.map((card, index) => {
                const entry = column.render(card);
                const active = selectedIndex === index;

                return (
                  <button
                    className={cn(
                      "w-full rounded-lg border p-3 text-left transition-all",
                      active
                        ? "border-secondary/30 bg-surfaceHigh"
                        : "border-outline/15 bg-surfaceLow hover:bg-surfaceHigh/60",
                    )}
                    key={`${column.title}-${card.bank}-${index}`}
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
              {selectedCard.bank}
            </h2>
            <p className="mt-1 text-sm text-muted">{selectedCard.suggestion}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost">
              <Icon name="x" className="h-4 w-4" />
              Rejeitar
            </Button>
            <Button>
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
                    Confirmação, rejeição e ajuste são registrados
                  </td>
                </tr>
                <tr className="border-t border-outline/10">
                  <td className="px-4 py-3 text-muted">Lançamento ERP</td>
                  <td className="px-4 py-3 font-semibold text-text">
                    NF-e #4502 • Pendente
                  </td>
                </tr>
                <tr className="border-t border-outline/10">
                  <td className="px-4 py-3 text-muted">Próximo passo</td>
                  <td className="px-4 py-3 font-semibold text-text">
                    Confirmação manual ou regra de auto-conciliação
                  </td>
                </tr>
              </tbody>
            </table>
          </TableShell>

          <SurfacePanel className="p-4" tone="glass">
            <div className="flex items-center gap-2">
              <Icon name="sparkles" className="h-4 w-4 text-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Dica da Aria
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-text">
              Detectei recorrência de lançamentos para combustível e SaaS.
              Deseja criar regra automática para os próximos itens iguais?
            </p>
          </SurfacePanel>
        </div>
      </SurfacePanel>
    </div>
  );
}
