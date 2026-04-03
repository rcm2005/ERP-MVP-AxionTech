import { z } from "zod";
import { MoneyCentsSchema, UtcDateTimeSchema } from "./common";

export const LancamentoTipoSchema = z.enum(["pagar", "receber"]);
export const LancamentoStatusSchema = z.enum([
  "pendente",
  "vencido",
  "pago",
  "cancelado",
]);

export const LancamentoSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  tipo: LancamentoTipoSchema,
  descricao: z.string().min(1),
  valorCents: MoneyCentsSchema,
  vencimento: UtcDateTimeSchema,
  status: LancamentoStatusSchema,
  fornecedorClienteId: z.string().optional(),
  documentoId: z.string().optional(),
  categoriaId: z.string().optional(),
  centroCustoId: z.string().optional(),
  criadoPor: z.string(),
});

export const LancamentoFilterSchema = z.object({
  status: LancamentoStatusSchema.optional(),
  tipo: LancamentoTipoSchema.optional(),
  search: z.string().optional(),
  minValorCents: MoneyCentsSchema.optional(),
  maxValorCents: MoneyCentsSchema.optional(),
  startDate: z.string().datetime({ offset: true }).optional(),
  endDate: z.string().datetime({ offset: true }).optional(),
});

export const DashboardKpiSchema = z.object({
  saldoCents: MoneyCentsSchema,
  contasPagar7dCents: MoneyCentsSchema,
  contasReceber7dCents: MoneyCentsSchema,
  inadimplenciaPercent: z.number().min(0).max(100),
});

export const CashFlowProjectionSchema = z.object({
  periodDays: z.union([z.literal(30), z.literal(60), z.literal(90)]),
  realizedCents: MoneyCentsSchema,
  projectedCents: MoneyCentsSchema,
  riskLabel: z.enum(["baixo", "medio", "alto"]),
});

export const ReconciliationSuggestionSchema = z.object({
  bankTransactionId: z.string(),
  lancamentoId: z.string().optional(),
  confidencePercent: z.number().min(0).max(100),
  status: z.enum(["sugerido", "confirmado", "rejeitado"]),
});

export type Lancamento = z.infer<typeof LancamentoSchema>;
export type LancamentoFilter = z.infer<typeof LancamentoFilterSchema>;
export type DashboardKpi = z.infer<typeof DashboardKpiSchema>;
export type CashFlowProjection = z.infer<typeof CashFlowProjectionSchema>;
export type ReconciliationSuggestion = z.infer<typeof ReconciliationSuggestionSchema>;
