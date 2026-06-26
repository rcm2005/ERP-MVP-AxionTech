"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  FieldGroup,
  Input,
  Label,
  SectionHeader,
  Select,
  SurfacePanel,
  TableShell,
  Textarea,
} from "@erp/ui";
import { Icon } from "@/components/icons";
import {
  createDocumentTemplate,
  formatCurrencyFromCents,
  formatShortDate,
  type WorkspaceImportInput,
  type WorkspaceDocumentType,
  useDemoWorkspace,
} from "@/lib/demo-workspace";
import { cn } from "@erp/ui";

const documentTypeLabels: Record<WorkspaceDocumentType, string> = {
  nfe: "NF-e",
  boleto: "Boleto",
  contrato: "Contrato",
  pedido: "Pedido",
};

const statusVariantMap = {
  pendente: "warning",
  processando: "info",
  validado: "success",
  lancado: "neutral",
  erro: "danger",
} as const;

export function DocumentInboxBoard({
  initialFilter = "all",
}: {
  initialFilter?: WorkspaceDocumentType | "all";
}) {
  const documents = useDemoWorkspace((state) => state.documents);
  const entries = useDemoWorkspace((state) => state.entries);
  const matches = useDemoWorkspace((state) => state.matches);
  const importDocument = useDemoWorkspace((state) => state.importDocument);
  const postDocument = useDemoWorkspace((state) => state.postDocument);

  const [activeFilter, setActiveFilter] = useState<WorkspaceDocumentType | "all">(initialFilter);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [draft, setDraft] = useState<WorkspaceImportInput>(() => createDocumentTemplate("boleto"));

  const filteredDocuments = useMemo(
    () =>
      documents.filter((document) =>
        activeFilter === "all" ? true : document.type === activeFilter,
      ),
    [activeFilter, documents],
  );

  const selectedDocument =
    filteredDocuments.find((document) => document.id === selectedDocumentId) ??
    filteredDocuments[0] ??
    documents[0];
  const linkedEntry = entries.find((entry) => entry.id === selectedDocument?.linkedEntryId);
  const relatedMatch = matches.find((match) => match.entryId === linkedEntry?.id);

  const readyToPost = documents.filter((document) => document.status === "validado").length;
  const launched = documents.filter((document) => document.status === "lancado").length;

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="Fluxo de documentos"
        title="Inbox operacional"
        description="Capture, revise e transforme documentos em lançamentos sem sair do mesmo workspace."
        action={
          <div className="flex gap-2">
            <Button href="/financeiro/pagar" variant="secondary">
              <Icon name="wallet" className="h-4 w-4" />
              Ver financeiro
            </Button>
            <Button href="/financeiro/conciliacao">
              <Icon name="bank" className="h-4 w-4" />
              Abrir conciliação
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <SurfacePanel className="p-5" tone="base">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            Documentos lançados
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-text">{launched}</p>
          <p className="mt-1 text-sm text-muted">Já fazem parte da operação financeira.</p>
        </SurfacePanel>
        <SurfacePanel className="p-5" tone="base">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            Prontos para lançar
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-text">{readyToPost}</p>
          <p className="mt-1 text-sm text-muted">Validados e aguardando decisão humana.</p>
        </SurfacePanel>
        <SurfacePanel className="p-5" tone="glass">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            Time to value
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-text">1 fluxo</p>
          <p className="mt-1 text-sm text-muted">
            Documento entra, vira lançamento e alimenta conciliação.
          </p>
        </SurfacePanel>
      </div>

      <div className="grid grid-cols-[1.15fr_0.85fr] gap-4">
        <SurfacePanel className="p-4" tone="base">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                Fila operacional
              </p>
              <h2 className="mt-1 text-lg font-bold text-text">
                Documentos em processamento e revisão
              </h2>
            </div>
            <div className="flex rounded-lg bg-surfaceHigh p-1">
              {(["all", "boleto", "nfe", "contrato"] as const).map((filter) => (
                <button
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    filter === activeFilter
                      ? "bg-surface text-text shadow-sm"
                      : "text-muted hover:text-text"
                  }`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                >
                  {filter === "all" ? "Todos" : documentTypeLabels[filter]}
                </button>
              ))}
            </div>
          </div>

          <TableShell>
            <table className="w-full text-left">
              <thead className="border-b border-outline/10 bg-surfaceLow">
                <tr>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Arquivo
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Tipo
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Contraparte
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Vencimento
                  </th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Status
                  </th>
                  <th className="px-4 py-2.5 text-right text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/8">
                {filteredDocuments.map((document) => (
                  <tr
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-surfaceLow/50",
                      selectedDocument?.id === document.id ? "bg-surfaceLow/60" : "",
                    )}
                    key={document.id}
                    onClick={() => setSelectedDocumentId(document.id)}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-text">{document.fileName}</p>
                      <p className="text-[11px] text-muted">{document.summary}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {documentTypeLabels[document.type]}
                    </td>
                    <td className="px-4 py-3 text-sm text-text">{document.counterparty}</td>
                    <td className="px-4 py-3 text-sm text-muted">
                      {formatShortDate(document.dueDate)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariantMap[document.status]}>
                        {document.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-text">
                      {formatCurrencyFromCents(document.amountCents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableShell>
        </SurfacePanel>

        <div className="space-y-4">
          <SurfacePanel className="p-4" tone="glass">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
              Importar novo documento
            </p>
            <div className="mt-4 space-y-3">
              <FieldGroup>
                <Label htmlFor="doc-type">Tipo</Label>
                <Select
                  id="doc-type"
                  onChange={(event) =>
                    setDraft(createDocumentTemplate(event.target.value as WorkspaceDocumentType))
                  }
                  value={draft.type}
                >
                  <option value="boleto">Boleto</option>
                  <option value="nfe">NF-e</option>
                  <option value="contrato">Contrato</option>
                  <option value="pedido">Pedido</option>
                </Select>
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="doc-file">Arquivo</Label>
                <Input
                  id="doc-file"
                  onChange={(event) => setDraft({ ...draft, fileName: event.target.value })}
                  value={draft.fileName}
                />
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="doc-counterparty">Contraparte</Label>
                <Input
                  id="doc-counterparty"
                  onChange={(event) => setDraft({ ...draft, counterparty: event.target.value })}
                  value={draft.counterparty}
                />
              </FieldGroup>

              <FieldGroup>
                <Label htmlFor="doc-summary">Resumo</Label>
                <Textarea
                  id="doc-summary"
                  onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
                  value={draft.summary}
                />
              </FieldGroup>

              <div className="grid grid-cols-2 gap-3">
                <FieldGroup>
                  <Label htmlFor="doc-amount">Valor (R$)</Label>
                  <Input
                    id="doc-amount"
                    min={0}
                    onChange={(event) =>
                      setDraft({
                        ...draft,
                        amountCents: Math.round(Number(event.target.value || 0) * 100),
                      })
                    }
                    step="0.01"
                    type="number"
                    value={(draft.amountCents / 100).toFixed(2)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <Label htmlFor="doc-due">Vencimento</Label>
                  <Input
                    id="doc-due"
                    onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })}
                    type="date"
                    value={draft.dueDate}
                  />
                </FieldGroup>
              </div>

              <FieldGroup>
                <Label htmlFor="doc-entry-type">Destino</Label>
                <Select
                  id="doc-entry-type"
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      entryType: event.target.value as "pagar" | "receber",
                    })
                  }
                  value={draft.entryType}
                >
                  <option value="pagar">Contas a pagar</option>
                  <option value="receber">Contas a receber</option>
                </Select>
              </FieldGroup>

              <Button
                className="w-full"
                onClick={() => {
                  importDocument(draft);
                  setDraft(createDocumentTemplate(draft.type));
                }}
              >
                <Icon name="upload-cloud" className="h-4 w-4" />
                Validar e enviar para o inbox
              </Button>
            </div>
          </SurfacePanel>

          {selectedDocument ? (
            <SurfacePanel className="p-4" tone="base">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                Documento em foco
              </p>
              <h3 className="mt-2 text-lg font-bold text-text">{selectedDocument.fileName}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{selectedDocument.summary}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-surfaceLow p-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Contraparte
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text">
                    {selectedDocument.counterparty}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Valor
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text">
                    {formatCurrencyFromCents(selectedDocument.amountCents)}
                  </p>
                </div>
              </div>

              {linkedEntry ? (
                <div className="mt-4 rounded-lg bg-surfaceLow p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Já lançado
                  </p>
                  <p className="mt-1 text-sm font-semibold text-text">{linkedEntry.description}</p>
                  <p className="mt-1 text-xs text-muted">
                    {linkedEntry.type === "pagar" ? "Contas a pagar" : "Contas a receber"} •{" "}
                    {linkedEntry.status}
                  </p>
                  {relatedMatch ? (
                    <Badge className="mt-3" variant="info">
                      Match {relatedMatch.status}
                    </Badge>
                  ) : null}
                </div>
              ) : (
                <Button className="mt-4 w-full" onClick={() => postDocument(selectedDocument.id)}>
                  <Icon name="receipt-text" className="h-4 w-4" />
                  Gerar lançamento a partir do documento
                </Button>
              )}
            </SurfacePanel>
          ) : null}
        </div>
      </div>
    </div>
  );
}
