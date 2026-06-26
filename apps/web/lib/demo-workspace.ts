"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type WorkspaceDocumentType = "nfe" | "boleto" | "contrato" | "pedido";
export type WorkspaceEntryType = "pagar" | "receber";
export type WorkspaceEntryStatus = "pendente" | "vencido" | "pago" | "cancelado";
export type WorkspaceBankDirection = "debit" | "credit";
export type WorkspaceBankStatus = "imported" | "pending" | "reconciled" | "ignored";
export type WorkspaceMatchStatus = "suggested" | "confirmed" | "rejected";
export type WorkspaceAlertTone = "danger" | "warning" | "success" | "info";

export interface WorkspaceCompanyProfile {
  legalName: string;
  tradeName: string;
  segment: string;
  employees: string;
  fiscalRegime: string;
  cnae: string;
  certificate: string;
  activationGoal: string;
}

export interface WorkspaceDocument {
  id: string;
  type: WorkspaceDocumentType;
  fileName: string;
  status: "pendente" | "processando" | "validado" | "lancado" | "erro";
  source: "upload" | "email" | "importacao";
  counterparty: string;
  summary: string;
  amountCents: number;
  dueDate: string;
  entryType: WorkspaceEntryType;
  createdAt: string;
  linkedEntryId?: string;
}

export interface WorkspaceEntry {
  id: string;
  type: WorkspaceEntryType;
  description: string;
  counterparty: string;
  category: string;
  costCenter: string;
  status: WorkspaceEntryStatus;
  amountCents: number;
  dueDate: string;
  createdAt: string;
  source: "manual" | "documento";
  sourceDocumentId?: string;
}

export interface WorkspaceBankTransaction {
  id: string;
  description: string;
  amountCents: number;
  direction: WorkspaceBankDirection;
  occurredAt: string;
  status: WorkspaceBankStatus;
  suggestedEntryId?: string;
  confidencePercent?: number;
}

export interface WorkspaceMatch {
  id: string;
  bankTransactionId: string;
  entryId: string;
  status: WorkspaceMatchStatus;
  confidencePercent: number;
  confirmedAt?: string;
}

export interface WorkspaceAlert {
  id: string;
  tone: WorkspaceAlertTone;
  label: string;
  text: string;
}

export interface WorkspaceOnboarding {
  currentStep: number;
  completedSteps: number[];
  profile: WorkspaceCompanyProfile;
  bankName: string;
  bankAgency: string;
  bankAccount: string;
  firstImportFile: string;
  moduleFocus: string;
  notes: string;
}

export interface WorkspaceImportInput {
  type: WorkspaceDocumentType;
  fileName: string;
  counterparty: string;
  summary: string;
  amountCents: number;
  dueDate: string;
  entryType: WorkspaceEntryType;
}

interface DemoWorkspaceState {
  company: WorkspaceCompanyProfile;
  onboarding: WorkspaceOnboarding;
  documents: WorkspaceDocument[];
  entries: WorkspaceEntry[];
  bankTransactions: WorkspaceBankTransaction[];
  matches: WorkspaceMatch[];
  alerts: WorkspaceAlert[];
  updateOnboarding(
    input: Partial<WorkspaceCompanyProfile> & {
      currentStep?: number;
      completedStep?: number;
      bankName?: string;
      bankAgency?: string;
      bankAccount?: string;
      firstImportFile?: string;
      moduleFocus?: string;
      notes?: string;
    },
  ): void;
  importDocument(input: WorkspaceImportInput): void;
  postDocument(documentId: string): void;
  createManualEntry(input: {
    type: WorkspaceEntryType;
    description: string;
    counterparty: string;
    category: string;
    costCenter: string;
    amountCents: number;
    dueDate: string;
  }): void;
  confirmMatch(bankTransactionId: string): void;
  rejectMatch(bankTransactionId: string): void;
  dismissAlert(alertId: string): void;
  resetWorkspace(): void;
}

const now = new Date();

function addDays(days: number) {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function isoToday() {
  return new Date(now).toISOString().slice(0, 10);
}

function fromDateInput(value: string) {
  return new Date(`${value}T12:00:00.000Z`).toISOString();
}

function makeId(prefix: string) {
  const random =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);

  return `${prefix}_${random}`;
}

const defaultCompany: WorkspaceCompanyProfile = {
  legalName: "Horizonte Finance Ops Ltda",
  tradeName: "Horizonte",
  segment: "Serviços B2B",
  employees: "18",
  fiscalRegime: "Simples Nacional",
  cnae: "6201-5/01",
  certificate: "A1",
  activationGoal: "Fechar o financeiro com documentos, lançamentos e conciliação no mesmo fluxo.",
};

const initialState = {
  company: defaultCompany,
  onboarding: {
    currentStep: 4,
    completedSteps: [0, 1, 2, 3],
    profile: defaultCompany,
    bankName: "Banco do Brasil",
    bankAgency: "1234",
    bankAccount: "000123-4",
    firstImportFile: "contas_iniciais_abril.xlsx",
    moduleFocus: "Financeiro, Documentos, Conciliação, Aria",
    notes: "Operação enxuta com contador externo e prioridade total em caixa e compliance.",
  } satisfies WorkspaceOnboarding,
  documents: [
    {
      id: "doc_boleto_aws",
      type: "boleto",
      fileName: "boleto_aws_abril.pdf",
      status: "lancado",
      source: "email",
      counterparty: "Amazon Web Services",
      summary: "Boleto de infraestrutura já lido e lançado em contas a pagar.",
      amountCents: 1244000,
      dueDate: addDays(0),
      entryType: "pagar",
      createdAt: addDays(-2),
      linkedEntryId: "entry_aws",
    },
    {
      id: "doc_nfe_grupo",
      type: "nfe",
      fileName: "nfe_grupo_horizonte.xml",
      status: "lancado",
      source: "upload",
      counterparty: "Grupo Horizonte",
      summary: "NF-e de faturamento recorrente com vínculo no contas a receber.",
      amountCents: 1970000,
      dueDate: addDays(0),
      entryType: "receber",
      createdAt: addDays(-1),
      linkedEntryId: "entry_grupo",
    },
    {
      id: "doc_contrato_comex",
      type: "contrato",
      fileName: "contrato_comex_sul.pdf",
      status: "validado",
      source: "upload",
      counterparty: "Comex Sul",
      summary: "Contrato validado pela equipe e pronto para virar lançamento.",
      amountCents: 843000,
      dueDate: addDays(3),
      entryType: "receber",
      createdAt: addDays(-1),
    },
  ] satisfies WorkspaceDocument[],
  entries: [
    {
      id: "entry_aws",
      type: "pagar",
      description: "AWS abril",
      counterparty: "Amazon Web Services",
      category: "Infraestrutura",
      costCenter: "TI",
      status: "pendente",
      amountCents: 1244000,
      dueDate: addDays(0),
      createdAt: addDays(-2),
      source: "documento",
      sourceDocumentId: "doc_boleto_aws",
    },
    {
      id: "entry_frota",
      type: "pagar",
      description: "Combustível Frota A",
      counterparty: "Posto Shell",
      category: "Operacional",
      costCenter: "Logística",
      status: "pendente",
      amountCents: 25000,
      dueDate: addDays(1),
      createdAt: addDays(-1),
      source: "manual",
    },
    {
      id: "entry_grupo",
      type: "receber",
      description: "Mensalidade Grupo Horizonte",
      counterparty: "Grupo Horizonte",
      category: "Receita recorrente",
      costCenter: "Comercial",
      status: "pendente",
      amountCents: 1970000,
      dueDate: addDays(0),
      createdAt: addDays(-1),
      source: "documento",
      sourceDocumentId: "doc_nfe_grupo",
    },
    {
      id: "entry_alpha",
      type: "receber",
      description: "Projeto Alpha Serviços",
      counterparty: "Alpha Serviços",
      category: "Serviços",
      costCenter: "Consultoria",
      status: "pendente",
      amountCents: 2077000,
      dueDate: addDays(6),
      createdAt: addDays(-1),
      source: "manual",
    },
  ] satisfies WorkspaceEntry[],
  bankTransactions: [
    {
      id: "txn_aws",
      description: "AMAZON WEB SERVICES",
      amountCents: 1244000,
      direction: "debit",
      occurredAt: addDays(-1),
      status: "pending",
      suggestedEntryId: "entry_aws",
      confidencePercent: 96,
    },
    {
      id: "txn_frota",
      description: "POSTO SHELL FROTA A",
      amountCents: 25000,
      direction: "debit",
      occurredAt: addDays(-2),
      status: "pending",
      suggestedEntryId: "entry_frota",
      confidencePercent: 92,
    },
    {
      id: "txn_grupo",
      description: "PIX GRUPO HORIZONTE",
      amountCents: 1970000,
      direction: "credit",
      occurredAt: addDays(-1),
      status: "pending",
      suggestedEntryId: "entry_grupo",
      confidencePercent: 91,
    },
  ] satisfies WorkspaceBankTransaction[],
  matches: [
    {
      id: "match_aws",
      bankTransactionId: "txn_aws",
      entryId: "entry_aws",
      status: "suggested",
      confidencePercent: 96,
    },
    {
      id: "match_frota",
      bankTransactionId: "txn_frota",
      entryId: "entry_frota",
      status: "suggested",
      confidencePercent: 92,
    },
    {
      id: "match_grupo",
      bankTransactionId: "txn_grupo",
      entryId: "entry_grupo",
      status: "suggested",
      confidencePercent: 91,
    },
  ] satisfies WorkspaceMatch[],
  alerts: [
    {
      id: "alert_due_today",
      tone: "danger",
      label: "Crítico",
      text: "1 conta a pagar vence hoje e já tem boleto processado no inbox.",
    },
    {
      id: "alert_pending_match",
      tone: "warning",
      label: "Atenção",
      text: "3 matches aguardam confirmação para fechar o caixa com segurança.",
    },
    {
      id: "alert_ready_doc",
      tone: "info",
      label: "Próximo passo",
      text: "1 documento validado está pronto para virar lançamento.",
    },
  ] satisfies WorkspaceAlert[],
};

function sumCents(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function isWithinDays(date: string, days: number) {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + days);

  const target = new Date(date);
  return target >= start && target <= end;
}

function isOverdue(date: string, status: WorkspaceEntryStatus) {
  if (status === "pago" || status === "cancelado") {
    return false;
  }

  return new Date(date) < new Date();
}

function buildSuggestedMatch(
  entry: WorkspaceEntry,
  bankTransactions: WorkspaceBankTransaction[],
  existingMatches: WorkspaceMatch[],
) {
  const expectedDirection = entry.type === "pagar" ? "debit" : "credit";

  const candidate = bankTransactions.find((transaction) => {
    if (transaction.status === "reconciled" || transaction.status === "ignored") {
      return false;
    }

    if (transaction.direction !== expectedDirection || transaction.suggestedEntryId) {
      return false;
    }

    return transaction.amountCents === entry.amountCents;
  });

  if (!candidate) {
    return {
      bankTransactions,
      matches: existingMatches,
    };
  }

  const updatedTransactions = bankTransactions.map((transaction) =>
    transaction.id === candidate.id
      ? {
          ...transaction,
          suggestedEntryId: entry.id,
          confidencePercent: 88,
          status: "pending" as const,
        }
      : transaction,
  );

  const nextMatch: WorkspaceMatch = {
    id: makeId("match"),
    bankTransactionId: candidate.id,
    entryId: entry.id,
    status: "suggested",
    confidencePercent: 88,
  };

  return {
    bankTransactions: updatedTransactions,
    matches: [nextMatch, ...existingMatches],
  };
}

function uniqueCompletedSteps(completedSteps: number[], step?: number) {
  if (typeof step !== "number") {
    return completedSteps;
  }

  return Array.from(new Set([...completedSteps, step])).sort((a, b) => a - b);
}

export function formatCurrencyFromCents(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

export function selectWorkspaceSnapshot(state: DemoWorkspaceState) {
  const payables = state.entries.filter((entry) => entry.type === "pagar");
  const receivables = state.entries.filter((entry) => entry.type === "receber");
  const pendingMatches = state.matches.filter((match) => match.status === "suggested");
  const readyDocuments = state.documents.filter((document) => document.status === "validado");
  const overdueReceivables = receivables.filter((entry) => isOverdue(entry.dueDate, entry.status));
  const overdueShare =
    receivables.length === 0 ? 0 : (overdueReceivables.length / receivables.length) * 100;

  return {
    saldoCents: 14258000,
    contasPagar7dCents: sumCents(
      payables
        .filter((entry) => entry.status !== "pago" && isWithinDays(entry.dueDate, 7))
        .map((entry) => entry.amountCents),
    ),
    contasReceber7dCents: sumCents(
      receivables
        .filter((entry) => entry.status !== "pago" && isWithinDays(entry.dueDate, 7))
        .map((entry) => entry.amountCents),
    ),
    inadimplenciaPercent: overdueShare,
    pendingMatches: pendingMatches.length,
    readyDocuments: readyDocuments.length,
    confirmedMatches: state.matches.filter((match) => match.status === "confirmed").length,
  };
}

export function selectPayables(state: DemoWorkspaceState) {
  return state.entries
    .filter((entry) => entry.type === "pagar")
    .sort((left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime());
}

export function selectReceivables(state: DemoWorkspaceState) {
  return state.entries
    .filter((entry) => entry.type === "receber")
    .sort((left, right) => new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime());
}

export function selectPendingMatches(state: DemoWorkspaceState) {
  return state.matches
    .filter((match) => match.status === "suggested")
    .map((match) => {
      const bankTransaction = state.bankTransactions.find(
        (transaction) => transaction.id === match.bankTransactionId,
      );
      const entry = state.entries.find((item) => item.id === match.entryId);

      return {
        match,
        bankTransaction,
        entry,
      };
    })
    .filter(
      (
        value,
      ): value is {
        match: WorkspaceMatch;
        bankTransaction: WorkspaceBankTransaction;
        entry: WorkspaceEntry;
      } => Boolean(value.bankTransaction && value.entry),
    );
}

export function selectCashflowBreakdown(state: DemoWorkspaceState) {
  const payables = selectPayables(state);
  const receivables = selectReceivables(state);

  return [
    {
      label: "Contas a pagar 30 dias",
      valueCents: sumCents(
        payables
          .filter((entry) => entry.status !== "pago" && isWithinDays(entry.dueDate, 30))
          .map((entry) => entry.amountCents),
      ) * -1,
    },
    {
      label: "Contas a receber 30 dias",
      valueCents: sumCents(
        receivables
          .filter((entry) => entry.status !== "pago" && isWithinDays(entry.dueDate, 30))
          .map((entry) => entry.amountCents),
      ),
    },
    {
      label: "Documentos prontos para lançar",
      valueCents:
        sumCents(
          state.documents
            .filter((document) => document.status === "validado")
            .map((document) => document.amountCents),
        ) * 1,
    },
    {
      label: "Matches aguardando confirmação",
      valueCents:
        sumCents(
          selectPendingMatches(state).map(({ bankTransaction }) => bankTransaction.amountCents),
        ) * -1,
    },
  ];
}

export const useDemoWorkspace = create<DemoWorkspaceState>()(
  persist(
    (set) => ({
      ...initialState,
      updateOnboarding(input) {
        set((state) => {
          const nextProfile = {
            ...state.onboarding.profile,
            ...Object.fromEntries(
              Object.entries(input).filter(([key]) =>
                [
                  "legalName",
                  "tradeName",
                  "segment",
                  "employees",
                  "fiscalRegime",
                  "cnae",
                  "certificate",
                  "activationGoal",
                ].includes(key),
              ),
            ),
          } as WorkspaceCompanyProfile;

          const completedSteps = uniqueCompletedSteps(
            state.onboarding.completedSteps,
            input.completedStep,
          );

          const currentStep =
            typeof input.currentStep === "number"
              ? input.currentStep
              : state.onboarding.currentStep;

          return {
            company: nextProfile,
            onboarding: {
              ...state.onboarding,
              currentStep,
              completedSteps,
              profile: nextProfile,
              bankName: input.bankName ?? state.onboarding.bankName,
              bankAgency: input.bankAgency ?? state.onboarding.bankAgency,
              bankAccount: input.bankAccount ?? state.onboarding.bankAccount,
              firstImportFile: input.firstImportFile ?? state.onboarding.firstImportFile,
              moduleFocus: input.moduleFocus ?? state.onboarding.moduleFocus,
              notes: input.notes ?? state.onboarding.notes,
            },
          };
        });
      },
      importDocument(input) {
        set((state) => {
          const document: WorkspaceDocument = {
            id: makeId("doc"),
            type: input.type,
            fileName: input.fileName,
            status: "validado",
            source: "upload",
            counterparty: input.counterparty,
            summary: input.summary,
            amountCents: input.amountCents,
            dueDate: fromDateInput(input.dueDate),
            entryType: input.entryType,
            createdAt: new Date().toISOString(),
          };

          const alert: WorkspaceAlert = {
            id: makeId("alert"),
            tone: "info",
            label: "Inbox",
            text: `${document.fileName} foi validado e já pode virar lançamento.`,
          };

          return {
            documents: [document, ...state.documents],
            alerts: [alert, ...state.alerts].slice(0, 6),
          };
        });
      },
      postDocument(documentId) {
        set((state) => {
          const document = state.documents.find((item) => item.id === documentId);
          if (!document || document.linkedEntryId) {
            return state;
          }

          const entry: WorkspaceEntry = {
            id: makeId("entry"),
            type: document.entryType,
            description: `${document.type.toUpperCase()} • ${document.counterparty}`,
            counterparty: document.counterparty,
            category:
              document.entryType === "pagar" ? "Despesas operacionais" : "Receita operacional",
            costCenter: document.entryType === "pagar" ? "Financeiro" : "Comercial",
            status: "pendente",
            amountCents: document.amountCents,
            dueDate: document.dueDate,
            createdAt: new Date().toISOString(),
            source: "documento",
            sourceDocumentId: document.id,
          };

          const suggested = buildSuggestedMatch(entry, state.bankTransactions, state.matches);

          return {
            documents: state.documents.map((item) =>
              item.id === document.id
                ? {
                    ...item,
                    status: "lancado",
                    linkedEntryId: entry.id,
                  }
                : item,
            ),
            entries: [entry, ...state.entries],
            bankTransactions: suggested.bankTransactions,
            matches: suggested.matches,
            alerts: [
              {
                id: makeId("alert"),
                tone: "success" as const,
                label: "Lançado",
                text: `${document.fileName} agora faz parte do fluxo financeiro da operação.`,
              },
              ...state.alerts,
            ].slice(0, 6),
          };
        });
      },
      createManualEntry(input) {
        set((state) => {
          const entry: WorkspaceEntry = {
            id: makeId("entry"),
            type: input.type,
            description: input.description,
            counterparty: input.counterparty,
            category: input.category,
            costCenter: input.costCenter,
            status: "pendente",
            amountCents: input.amountCents,
            dueDate: fromDateInput(input.dueDate),
            createdAt: new Date().toISOString(),
            source: "manual",
          };

          const suggested = buildSuggestedMatch(entry, state.bankTransactions, state.matches);

          return {
            entries: [entry, ...state.entries],
            bankTransactions: suggested.bankTransactions,
            matches: suggested.matches,
          };
        });
      },
      confirmMatch(bankTransactionId) {
        set((state) => {
          const match = state.matches.find(
            (item) => item.bankTransactionId === bankTransactionId && item.status === "suggested",
          );

          if (!match) {
            return state;
          }

          return {
            matches: state.matches.map((item) =>
              item.id === match.id
                ? {
                    ...item,
                    status: "confirmed",
                    confirmedAt: new Date().toISOString(),
                  }
                : item,
            ),
            bankTransactions: state.bankTransactions.map((transaction) =>
              transaction.id === bankTransactionId
                ? {
                    ...transaction,
                    status: "reconciled",
                  }
                : transaction,
            ),
            entries: state.entries.map((entry) =>
              entry.id === match.entryId
                ? {
                    ...entry,
                    status: "pago",
                  }
                : entry,
            ),
            alerts: [
              {
                id: makeId("alert"),
                tone: "success" as const,
                label: "Conciliado",
                text: "O match foi confirmado e a trilha operacional foi atualizada.",
              },
              ...state.alerts,
            ].slice(0, 6),
          };
        });
      },
      rejectMatch(bankTransactionId) {
        set((state) => ({
          matches: state.matches.map((match) =>
            match.bankTransactionId === bankTransactionId
              ? {
                  ...match,
                  status: "rejected",
                }
              : match,
          ),
          bankTransactions: state.bankTransactions.map((transaction) =>
            transaction.id === bankTransactionId
              ? {
                  ...transaction,
                  status: "ignored",
                }
              : transaction,
          ),
        }));
      },
      dismissAlert(alertId) {
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== alertId),
        }));
      },
      resetWorkspace() {
        set(initialState);
      },
    }),
    {
      name: "horizonte-finance-ops",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

export function createDocumentTemplate(type: WorkspaceDocumentType) {
  const baseDueDate = isoToday();

  if (type === "boleto") {
    return {
      type,
      fileName: "boleto_fornecedor.pdf",
      counterparty: "Fornecedor prioritário",
      summary: "Boleto recebido por e-mail, pronto para lançamento em contas a pagar.",
      amountCents: 980000,
      dueDate: baseDueDate,
      entryType: "pagar" as const,
    };
  }

  if (type === "nfe") {
    return {
      type,
      fileName: "nfe_cliente.xml",
      counterparty: "Cliente recorrente",
      summary: "NF-e emitida para faturamento recorrente com cobrança em aberto.",
      amountCents: 1650000,
      dueDate: baseDueDate,
      entryType: "receber" as const,
    };
  }

  if (type === "contrato") {
    return {
      type,
      fileName: "contrato_servico.pdf",
      counterparty: "Conta enterprise em negociação",
      summary: "Contrato validado para gerar cobrança ou provisão inicial.",
      amountCents: 2400000,
      dueDate: baseDueDate,
      entryType: "receber" as const,
    };
  }

  return {
    type,
    fileName: "pedido_operacional.png",
    counterparty: "Parceiro comercial",
    summary: "Pedido interno pronto para virar lançamento e acompanhamento operacional.",
    amountCents: 420000,
    dueDate: baseDueDate,
    entryType: "pagar" as const,
  };
}
