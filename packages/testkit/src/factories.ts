import {
  AuthSession,
  Company,
  CompanyRole,
  DashboardKpi,
  Lancamento,
  OnboardingWizardState,
  ReconciliationSuggestion,
} from "@erp/contracts";

let nextId = 1;

function makeId(prefix: string): string {
  const id = String(nextId).padStart(4, "0");
  nextId += 1;
  return `${prefix}_${id}`;
}

export function makeCompany(overrides: Partial<Company> = {}): Company {
  return {
    id: makeId("company"),
    cnpj: "12345678000199",
    razaoSocial: "Empresa Demo Ltda",
    nomeFantasia: "Empresa Demo",
    regimeFiscal: "simples_nacional",
    cnae: ["6201-5/01"],
    plan: "trial",
    activeModules: ["financeiro", "aria"],
    ...overrides,
  };
}

export function makeAuthSession(
  role: CompanyRole = "administrador",
): AuthSession {
  return {
    userId: makeId("user"),
    companyId: makeId("company"),
    companyName: "Empresa Demo",
    role,
    requiresTwoFactor: false,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  };
}

export function makeLancamento(overrides: Partial<Lancamento> = {}): Lancamento {
  return {
    id: makeId("lanc"),
    companyId: makeId("company"),
    tipo: "pagar",
    descricao: "Fornecedor Demo",
    valorCents: 125000,
    vencimento: new Date().toISOString(),
    status: "pendente",
    criadoPor: "aria",
    ...overrides,
  };
}

export function makeDashboardKpi(overrides: Partial<DashboardKpi> = {}): DashboardKpi {
  return {
    saldoCents: 500000,
    contasPagar7dCents: 125000,
    contasReceber7dCents: 250000,
    inadimplenciaPercent: 4.2,
    ...overrides,
  };
}

export function makeReconciliationSuggestion(
  overrides: Partial<ReconciliationSuggestion> = {},
): ReconciliationSuggestion {
  return {
    bankTransactionId: makeId("bank_tx"),
    lancamentoId: makeId("lanc"),
    confidencePercent: 96,
    status: "sugerido",
    ...overrides,
  };
}

export function makeOnboardingState(
  overrides: Partial<OnboardingWizardState> = {},
): OnboardingWizardState {
  return {
    companyId: makeId("company"),
    currentStep: "perfil_empresa",
    completedSteps: [],
    ...overrides,
  };
}
