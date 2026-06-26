"use client";

import { Badge, Button, SurfacePanel } from "@erp/ui";
import { useShallow } from "zustand/react/shallow";
import { FinanceLedger } from "@/components/finance-ledger";
import { Icon } from "@/components/icons";
import {
  formatCurrencyFromCents,
  formatShortDate,
  selectReceivables,
  selectWorkspaceSnapshot,
  useDemoWorkspace,
} from "@/lib/demo-workspace";

export default function AccountsReceivablePage() {
  const receivables = useDemoWorkspace(useShallow(selectReceivables));
  const snapshot = useDemoWorkspace(useShallow(selectWorkspaceSnapshot));

  return (
    <FinanceLedger
      actionHref="/documentos/inbox"
      actionLabel="Gerar cobrança via documento"
      description="Acompanhe recebimentos, transforme contratos em lançamentos e reduza inadimplência com contexto operacional."
      eyebrow="Financeiro"
      title="Contas a Receber"
      summary={[
        {
          label: "Recebível 7d",
          value: formatCurrencyFromCents(snapshot.contasReceber7dCents),
          delta: `${receivables.length} título(s) ativos`,
          tone: "success",
        },
        {
          label: "Conciliações abertas",
          value: `${snapshot.pendingMatches}`,
          delta: "match(es) sugerido(s)",
          tone: "info",
        },
        {
          label: "Inadimplência",
          value: `${snapshot.inadimplenciaPercent.toFixed(1)}%`,
          delta: "medida sobre carteira aberta",
          tone: "warning",
        },
      ]}
      rows={receivables.map((row) => ({
        name: row.counterparty,
        doc: row.source === "documento" ? "Documento processado" : "Lançamento manual",
        due: formatShortDate(row.dueDate),
        category: row.category,
        costCenter: row.costCenter,
        status: row.status,
        value: formatCurrencyFromCents(row.amountCents),
        score: row.status === "vencido" ? "Risco" : "OK",
        scoreTone: row.status === "vencido" ? "warning" : "success",
      }))}
      scoreLabel="Saúde"
      sideCard={
        <>
          <SurfacePanel className="p-5" tone="glass">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Receita em foco
            </p>
            <h3 className="mt-2 text-2xl font-black text-text">
              {formatCurrencyFromCents(snapshot.contasReceber7dCents)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              O que entra nos próximos dias depende de transformar documentos em
              cobrança e confirmar os créditos conciliados.
            </p>
          </SurfacePanel>
          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Próxima ação
            </p>
            <div className="mt-4 rounded-[1.5rem] bg-surfaceLow p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-text">Contrato ou NF-e</p>
                  <p className="mt-1 text-xs text-muted">Leve para o inbox e gere a cobrança</p>
                </div>
                <Badge variant="success">Core</Badge>
              </div>
            </div>
            <Button className="mt-4 w-full justify-between" href="/documentos/inbox" variant="secondary">
              <span>Importar documento</span>
              <Icon name="upload-cloud" className="h-4 w-4" />
            </Button>
          </SurfacePanel>
        </>
      }
    />
  );
}
