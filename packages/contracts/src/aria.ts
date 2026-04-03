import { z } from "zod";
import { MoneyCentsSchema } from "./common";

export const AriaToolNameSchema = z.enum([
  "buscar_dados_financeiros",
  "processar_documento",
  "verificar_compliance",
  "navegar_para",
  "gerar_relatorio",
  "criar_alerta",
  "executar_acao_erp",
]);

export const AriaChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "tool"]),
  content: z.string().min(1),
  timestamp: z.string().datetime({ offset: true }),
});

export const AriaChatRequestSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1),
  currentScreen: z.string().min(1),
});

export const BuscarDadosFinanceirosInputSchema = z.object({
  tipo: z.enum(["cp", "cr", "fluxo", "dre", "saldo"]),
  periodo: z
    .object({
      start: z.string().datetime({ offset: true }).optional(),
      end: z.string().datetime({ offset: true }).optional(),
    })
    .optional(),
  filtros: z.record(z.string(), z.unknown()).optional(),
});

export const ProcessarDocumentoInputSchema = z.object({
  arquivoBase64: z.string().min(1),
  tipo: z.enum(["nfe", "boleto", "contrato", "pedido"]),
  acao: z.enum(["extrair", "validar", "lancar"]),
});

export const VerificarComplianceInputSchema = z.object({
  operacao: z.record(z.string(), z.unknown()),
  regime: z.string().min(1),
});

export const NavegarParaInputSchema = z.object({
  tela: z.string().min(1),
  params: z.record(z.string(), z.unknown()).optional(),
});

export const GerarRelatorioInputSchema = z.object({
  queryNl: z.string().min(1),
  formato: z.enum(["tabela", "grafico", "narrativa", "todos"]),
});

export const CriarAlertaInputSchema = z.object({
  tipo: z.string().min(1),
  threshold: z.unknown(),
  canal: z.enum(["push", "email", "whatsapp"]),
  acao: z.enum(["criar", "cancelar"]),
});

export const ExecutarAcaoErpInputSchema = z.object({
  acao: z.enum(["criar", "editar", "aprovar", "cancelar"]),
  entidade: z.string().min(1),
  dados: z.record(z.string(), z.unknown()),
  confirmado: z.boolean().default(false),
  idempotencyKey: z.string().optional(),
});

export const AriaToolCallSchema = z.discriminatedUnion("tool", [
  z.object({
    tool: z.literal("buscar_dados_financeiros"),
    input: BuscarDadosFinanceirosInputSchema,
  }),
  z.object({
    tool: z.literal("processar_documento"),
    input: ProcessarDocumentoInputSchema,
  }),
  z.object({
    tool: z.literal("verificar_compliance"),
    input: VerificarComplianceInputSchema,
  }),
  z.object({
    tool: z.literal("navegar_para"),
    input: NavegarParaInputSchema,
  }),
  z.object({
    tool: z.literal("gerar_relatorio"),
    input: GerarRelatorioInputSchema,
  }),
  z.object({
    tool: z.literal("criar_alerta"),
    input: CriarAlertaInputSchema,
  }),
  z.object({
    tool: z.literal("executar_acao_erp"),
    input: ExecutarAcaoErpInputSchema,
  }),
]);

export const AriaKpiSnapshotSchema = z.object({
  saldoCents: MoneyCentsSchema,
  contasPagar7dCents: MoneyCentsSchema,
  contasReceber7dCents: MoneyCentsSchema,
  alerts: z.array(z.string()).default([]),
});

export type AriaToolName = z.infer<typeof AriaToolNameSchema>;
export type AriaChatMessage = z.infer<typeof AriaChatMessageSchema>;
export type AriaChatRequest = z.infer<typeof AriaChatRequestSchema>;
export type AriaToolCall = z.infer<typeof AriaToolCallSchema>;
export type AriaKpiSnapshot = z.infer<typeof AriaKpiSnapshotSchema>;
