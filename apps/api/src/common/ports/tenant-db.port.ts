import {
  AriaChatRequest,
  AuthSession,
  CashFlowProjection,
  DashboardKpi,
  Lancamento,
  LancamentoFilter,
  OnboardingStepPayload,
  OnboardingWizardState,
  ReconciliationSuggestion,
} from "@erp/contracts";
import type { TenantContext } from "../tenant-context";

export interface TenantDbPort {
  healthCheck(context: TenantContext): Promise<{ ok: true }>;
  getAuthSession(context: TenantContext): Promise<AuthSession | null>;
  getOnboardingState(context: TenantContext): Promise<OnboardingWizardState>;
  upsertOnboardingStep(
    context: TenantContext,
    payload: OnboardingStepPayload,
  ): Promise<OnboardingWizardState>;
  getDashboardKpis(context: TenantContext): Promise<DashboardKpi>;
  listLancamentos(
    context: TenantContext,
    filter: LancamentoFilter,
  ): Promise<Lancamento[]>;
  createLancamento(
    context: TenantContext,
    payload: Partial<Lancamento>,
    idempotencyKey: string | undefined,
  ): Promise<Lancamento>;
  getCashFlowProjection(
    context: TenantContext,
    days: 30 | 60 | 90,
  ): Promise<CashFlowProjection>;
  listReconciliationSuggestions(
    context: TenantContext,
  ): Promise<ReconciliationSuggestion[]>;
  appendAriaConversation(
    context: TenantContext,
    payload: AriaChatRequest,
  ): Promise<{ conversationId: string }>;
}

export const TENANT_DB_PORT = Symbol("TENANT_DB_PORT");
