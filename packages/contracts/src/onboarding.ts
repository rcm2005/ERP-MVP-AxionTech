import { z } from "zod";
import { CnpjSchema, FiscalRegimeSchema, ModuleKeySchema } from "./common";

export const OnboardingStepKeySchema = z.enum([
  "perfil_empresa",
  "regime_fiscal",
  "conta_bancaria",
  "dados_iniciais",
  "modulos_ativos",
]);

export const OnboardingProfileStepSchema = z.object({
  razaoSocial: z.string().min(1),
  segmento: z.string().min(1),
  numeroFuncionarios: z.number().int().nonnegative(),
  cnpj: CnpjSchema,
});

export const OnboardingFiscalStepSchema = z.object({
  regimeFiscal: FiscalRegimeSchema,
  cnae: z.array(z.string().min(4)).min(1),
  certificadoDigital: z
    .object({
      tipo: z.enum(["A1", "A3"]),
      validade: z.string().datetime({ offset: true }).optional(),
    })
    .optional(),
});

export const OnboardingBankStepSchema = z.object({
  mode: z.enum(["open_finance", "manual"]),
  bankName: z.string().min(1).optional(),
  agency: z.string().min(1).optional(),
  account: z.string().min(1).optional(),
  consentId: z.string().min(1).optional(),
});

export const OnboardingInitialDataStepSchema = z.object({
  importType: z.enum(["csv", "xlsx", "manual"]),
  hasExistingLedger: z.boolean().default(false),
});

export const OnboardingModulesStepSchema = z.object({
  activeModules: z.array(ModuleKeySchema).min(1),
  recommendationAccepted: z.boolean().default(false),
});

export const OnboardingWizardStateSchema = z.object({
  companyId: z.string(),
  currentStep: OnboardingStepKeySchema,
  completedSteps: z.array(OnboardingStepKeySchema),
});

export const OnboardingStepPayloadSchema = z.discriminatedUnion("step", [
  z.object({ step: z.literal("perfil_empresa"), data: OnboardingProfileStepSchema }),
  z.object({ step: z.literal("regime_fiscal"), data: OnboardingFiscalStepSchema }),
  z.object({ step: z.literal("conta_bancaria"), data: OnboardingBankStepSchema }),
  z.object({ step: z.literal("dados_iniciais"), data: OnboardingInitialDataStepSchema }),
  z.object({ step: z.literal("modulos_ativos"), data: OnboardingModulesStepSchema }),
]);

export type OnboardingStepKey = z.infer<typeof OnboardingStepKeySchema>;
export type OnboardingWizardState = z.infer<typeof OnboardingWizardStateSchema>;
export type OnboardingStepPayload = z.infer<typeof OnboardingStepPayloadSchema>;
