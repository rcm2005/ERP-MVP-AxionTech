import type { ReactNode } from "react";
import {
  Badge,
  Button,
  FieldGroup,
  Input,
  KpiCard,
  Label,
  SurfacePanel,
  TableShell,
} from "@erp/ui";
import { Icon } from "./icons";

export type LedgerRow = {
  name: string;
  doc: string;
  due: string;
  category: string;
  costCenter: string;
  status: string;
  value: string;
  score?: string;
  scoreTone?: "success" | "warning" | "danger" | "info";
};

export function FinanceLedger({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  rows,
  summary,
  sideCard,
  scoreLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  rows: LedgerRow[];
  summary: Array<{ label: string; value: string; delta?: string; tone?: "success" | "warning" | "danger" | "info" }>;
  sideCard: ReactNode;
  scoreLabel?: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
            {eyebrow}
          </p>
          <h1 className="mt-1 text-4xl font-black tracking-tight text-text">
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
            {description}
          </p>
        </div>
        <Button href={actionHref} size="lg">
          <Icon name="plus" className="h-4 w-4" />
          {actionLabel}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        {summary.map((item) => (
          <KpiCard
            delta={item.delta}
            deltaTone={item.tone}
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_360px]">
        <SurfacePanel className="p-4 md:p-5" tone="base">
          <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_150px_140px_140px]">
            <FieldGroup>
              <Label htmlFor="ledger-search">Buscar</Label>
              <Input id="ledger-search" placeholder="Fornecedor, cliente ou NF" />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="ledger-status">Status</Label>
              <div className="h-11 rounded-xl bg-surfaceHigh px-4 py-3 text-sm text-muted">
                Vencido / a vencer
              </div>
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="ledger-range">Período</Label>
              <div className="h-11 rounded-xl bg-surfaceHigh px-4 py-3 text-sm text-muted">
                Junho
              </div>
            </FieldGroup>
            <div className="flex items-end gap-2">
              <Button className="w-full" variant="secondary">
                <Icon name="filter" className="h-4 w-4" />
                Filtros
              </Button>
              <Button className="shrink-0" variant="ghost">
                <Icon name="download" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TableShell>
            <table className="w-full text-left">
              <thead className="bg-surfaceLow text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                <tr>
                  <th className="px-5 py-4">Fornecedor / Cliente</th>
                  <th className="px-5 py-4">Documento</th>
                  <th className="px-5 py-4">Vencimento</th>
                  <th className="px-5 py-4">Categoria</th>
                  <th className="px-5 py-4">Centro de custo</th>
                  <th className="px-5 py-4">Status</th>
                  {scoreLabel ? <th className="px-5 py-4">{scoreLabel}</th> : null}
                  <th className="px-5 py-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    className="border-t border-outline/10 transition-colors hover:bg-surfaceLow/70"
                    key={`${row.name}-${index}`}
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-text">{row.name}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted">{row.doc}</td>
                    <td className="px-5 py-4 text-sm text-text">{row.due}</td>
                    <td className="px-5 py-4 text-sm text-muted">{row.category}</td>
                    <td className="px-5 py-4 text-sm text-muted">{row.costCenter}</td>
                    <td className="px-5 py-4">
                      <Badge variant="info">{row.status}</Badge>
                    </td>
                    {scoreLabel ? (
                      <td className="px-5 py-4">
                        {row.score ? (
                          <Badge variant={row.scoreTone ?? "success"}>{row.score}</Badge>
                        ) : (
                          <Badge variant="neutral">-</Badge>
                        )}
                      </td>
                    ) : null}
                    <td className="px-5 py-4 text-right text-sm font-black text-text">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableShell>
        </SurfacePanel>

        <div className="space-y-4">
          {sideCard}
          <SurfacePanel className="p-5" tone="base">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
              Ações rápidas
            </p>
            <div className="mt-4 space-y-3">
              <Button className="w-full justify-between" variant="primary">
                <span>Importar via OCR</span>
                <Icon name="upload-cloud" className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between" variant="secondary">
                <span>Exportar CSV</span>
                <Icon name="download" className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between" variant="ghost">
                <span>Histórico</span>
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
            </div>
          </SurfacePanel>
        </div>
      </div>
    </div>
  );
}
