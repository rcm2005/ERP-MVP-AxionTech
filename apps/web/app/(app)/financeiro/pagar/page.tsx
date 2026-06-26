"use client";

import { Button, SurfacePanel } from "@erp/ui";
import { useShallow } from "zustand/react/shallow";
import { FinanceLedger } from "@/components/finance-ledger";
import { Icon } from "@/components/icons";
import {
  formatCurrencyFromCents,
  formatShortDate,
  selectPayables,
  selectWorkspaceSnapshot,
  useDemoWorkspace,
} from "@/lib/demo-workspace";

export default function AccountsPayablePage() {
  const payables = useDemoWorkspace(useShallow(selectPayables));
  const snapshot = useDemoWorkspace(useShallow(selectWorkspaceSnapshot));

  return (
    <FinanceLedger
      actionHref="/documentos/inbox"
      actionLabel="Importar documento"
      description="Centralize obrigações, gere lançamentos a partir do inbox e confirme o que realmente vai para o caixa."
      eyebrow="Financeiro"
      title="Contas a Pagar"
      summary={[
        {
          label: "Total 7 dias",
          value: formatCurrencyFromCents(snapshot.contasPagar7dCents),
          delta: `${payables.length} título(s) em aberto`,
          tone: "warning",
        },
        {
          label: "Conciliar antes de pagar",
          value: `${snapshot.pendingMatches}`,
          delta: "match(es) pendente(s)",
          tone: "danger",
        },
        {
          label: "Inbox pronto",
          value: `${snapshot.readyDocuments}`,
          delta: "documento(s) validado(s)",
          tone: "success",
        },
      ]}
      rows={payables.map((row) => ({
        name: row.counterparty,
        doc: row.source === "documento" ? "Documento processado" : "Lançamento manual",
        due: formatShortDate(row.dueDate),
        category: row.category,
        costCenter: row.costCenter,
        status: row.status,
        value: formatCurrencyFromCents(row.amountCents),
      }))}
      sideCard={
        <>
          <SurfacePanel className="p-5" tone="glass">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Prioridade operacional
            </p>
            <h3 className="mt-2 text-2xl font-black text-text">
              {formatCurrencyFromCents(snapshot.contasPagar7dCents)}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Revise o que vence primeiro, confirme a conciliação e só então
              execute o pagamento.
            </p>
          </SurfacePanel>
          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Próximo passo
            </p>
            <div className="mt-4 rounded-[1.5rem] border border-dashed border-outline/35 bg-surfaceLow p-5 text-center">
              <Icon className="mx-auto h-7 w-7 text-secondary" name="upload-cloud" />
              <p className="mt-3 text-sm font-bold text-text">
                Leve novos boletos para o inbox
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Valide o documento e transforme em lançamento sem retrabalho.
              </p>
            </div>
            <Button className="mt-4 w-full" href="/documentos/inbox" variant="secondary">
              Abrir inbox
            </Button>
          </SurfacePanel>
        </>
      }
    />
  );
}
