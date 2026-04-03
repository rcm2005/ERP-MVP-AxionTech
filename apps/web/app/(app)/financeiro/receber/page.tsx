import { Badge, Button, SurfacePanel } from "@erp/ui";
import { FinanceLedger } from "@/components/finance-ledger";
import { Icon } from "@/components/icons";
import { arRows } from "@/lib/mock-data";

export default function AccountsReceivablePage() {
  return (
    <FinanceLedger
      actionHref="/crm/cotacoes"
      actionLabel="Nova cobrança"
      description="Acompanhe recebimentos, score de inadimplência e gatilhos automáticos de cobrança."
      eyebrow="Financeiro"
      title="Contas a Receber"
      summary={[
        { label: "Recebível 7d", value: "R$ 48.900,00", delta: "85% confirmado", tone: "success" },
        { label: "Score médio", value: "89%", delta: "carteira saudável", tone: "info" },
        { label: "Inadimplência", value: "3,8%", delta: "abaixo da média", tone: "warning" },
      ]}
      rows={arRows.map((row) => ({
        name: row.client,
        doc: row.doc,
        due: row.due,
        category: "Cobrança",
        costCenter: "Comercial",
        status: row.status,
        value: row.value,
        score: row.score,
        scoreTone: row.scoreTone,
      }))}
      scoreLabel="Inadimplência"
      sideCard={
        <>
          <SurfacePanel className="p-5" tone="glass">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Recebimento estimado
            </p>
            <h3 className="mt-2 text-2xl font-black text-text">R$ 142.500,00</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Baseado no score da carteira e na régua automática de cobrança.
            </p>
          </SurfacePanel>
          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Cobrança automática
            </p>
            <div className="mt-4 rounded-[1.5rem] bg-surfaceLow p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-text">WhatsApp / e-mail</p>
                  <p className="mt-1 text-xs text-muted">Régua configurável</p>
                </div>
                <Badge variant="success">Ativo</Badge>
              </div>
            </div>
            <Button className="mt-4 w-full justify-between" variant="secondary">
              <span>Reenviar lembretes</span>
              <Icon name="send" className="h-4 w-4" />
            </Button>
          </SurfacePanel>
        </>
      }
    />
  );
}
