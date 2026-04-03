import { Button, SurfacePanel } from "@erp/ui";
import { FinanceLedger } from "@/components/finance-ledger";
import { Icon } from "@/components/icons";
import { apRows } from "@/lib/mock-data";

export default function AccountsPayablePage() {
  return (
    <FinanceLedger
      actionHref="/documentos/nfe"
      actionLabel="Nova NF-e"
      description="Gerencie obrigações, importações OCR e pagamentos pendentes com visão diária e automação assistida."
      eyebrow="Financeiro"
      title="Contas a Pagar"
      summary={[
        { label: "Total pendente", value: "R$ 142.500,00", delta: "12% maior", tone: "warning" },
        { label: "Vencendo hoje", value: "R$ 12.440,00", delta: "4 itens", tone: "danger" },
        { label: "Previsão 30d", value: "R$ 384.210,00", delta: "Aria estável", tone: "success" },
      ]}
      rows={apRows.map((row) => ({
        name: row.supplier,
        doc: row.doc,
        due: row.due,
        category: row.category,
        costCenter: row.costCenter,
        status: row.status,
        value: row.value,
      }))}
      sideCard={
        <>
          <SurfacePanel className="p-5" tone="glass">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Painel de risco
            </p>
            <h3 className="mt-2 text-2xl font-black text-text">R$ 12.440,00</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Vencimento crítico hoje. A Aria sugere priorizar os pagamentos
              ligados à operação.
            </p>
          </SurfacePanel>
          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              OCR / upload
            </p>
            <div className="mt-4 rounded-[1.5rem] border border-dashed border-outline/35 bg-surfaceLow p-5 text-center">
              <Icon className="mx-auto h-7 w-7 text-secondary" name="upload-cloud" />
              <p className="mt-3 text-sm font-bold text-text">
                Arraste XML, PDF ou imagem
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                A extração automática preenche fornecedor, valor e vencimento.
              </p>
            </div>
            <Button className="mt-4 w-full" variant="secondary">
              Anexar documento
            </Button>
          </SurfacePanel>
        </>
      }
    />
  );
}
