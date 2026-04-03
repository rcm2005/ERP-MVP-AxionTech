import type { ReactNode } from "react";
import {
  Badge,
  Button,
  FieldGroup,
  Input,
  KpiCard,
  Label,
  SectionHeader,
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
    <div className="space-y-5">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          <Button href={actionHref}>
            <Icon name="plus" className="h-4 w-4" />
            {actionLabel}
          </Button>
        }
      />

      {/* KPI summary */}
      <div className="grid grid-cols-4 gap-4">
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

      {/* Main content + sidebar */}
      <div className="grid grid-cols-[1fr_300px] gap-4">
        {/* Table panel */}
        <SurfacePanel className="p-4" tone="base">
          {/* Filters */}
          <div className="mb-4 grid grid-cols-[1fr_140px_130px_auto] gap-3">
            <FieldGroup>
              <Label htmlFor="ledger-search">Buscar</Label>
              <Input id="ledger-search" placeholder="Fornecedor, cliente ou NF" />
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="ledger-status">Status</Label>
              <div className="flex h-9 items-center rounded-lg border border-outline/20 bg-surface px-3 text-sm text-muted">
                A vencer
              </div>
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="ledger-range">Período</Label>
              <div className="flex h-9 items-center rounded-lg border border-outline/20 bg-surface px-3 text-sm text-muted">
                Junho
              </div>
            </FieldGroup>
            <div className="flex items-end gap-2">
              <Button variant="secondary">
                <Icon name="filter" className="h-4 w-4" />
                Filtros
              </Button>
              <Button variant="ghost">
                <Icon name="download" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TableShell>
            <table className="w-full text-left">
              <thead className="border-b border-outline/10 bg-surfaceLow">
                <tr>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">Fornecedor / Cliente</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">Documento</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">Vencimento</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">Categoria</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">Centro de custo</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">Status</th>
                  {scoreLabel ? <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">{scoreLabel}</th> : null}
                  <th className="px-4 py-2.5 text-right text-[11px] font-semibold uppercase tracking-widest text-muted">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/8">
                {rows.map((row, index) => (
                  <tr
                    className="transition-colors hover:bg-surfaceLow/50"
                    key={`${row.name}-${index}`}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-text">{row.name}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">{row.doc}</td>
                    <td className="px-4 py-3 text-sm text-text">{row.due}</td>
                    <td className="px-4 py-3 text-sm text-muted">{row.category}</td>
                    <td className="px-4 py-3 text-sm text-muted">{row.costCenter}</td>
                    <td className="px-4 py-3">
                      <Badge variant="info">{row.status}</Badge>
                    </td>
                    {scoreLabel ? (
                      <td className="px-4 py-3">
                        {row.score ? (
                          <Badge variant={row.scoreTone ?? "success"}>{row.score}</Badge>
                        ) : (
                          <Badge variant="neutral">—</Badge>
                        )}
                      </td>
                    ) : null}
                    <td className="px-4 py-3 text-right text-sm font-bold text-text">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableShell>
        </SurfacePanel>

        {/* Sidebar */}
        <div className="space-y-4">
          {sideCard}
          <SurfacePanel className="p-4" tone="base">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Ações rápidas
            </p>
            <div className="mt-3 space-y-2">
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
