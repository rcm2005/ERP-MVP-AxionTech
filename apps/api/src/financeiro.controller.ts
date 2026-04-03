import {
  Lancamento,
  CashFlowProjectionSchema,
  DashboardKpiSchema,
  LancamentoFilter,
  LancamentoFilterSchema,
  LancamentoSchema,
  ReconciliationSuggestionSchema,
} from "@erp/contracts";
import { createAuditLogEntry, createLogger } from "@erp/logging";
import { ZodValidationPipe } from "./common/zod-validation.pipe";
import { buildTenantContext } from "./common/tenant-context";
import { Body, Controller, Get, Headers, Param, Post, Query } from "./nest-shim";

const logger = createLogger("api.financeiro");
type CreateLancamentoInput = Omit<Lancamento, "id">;

@Controller("financeiro")
export class FinanceiroController {
  @Get("kpis")
  getKpis() {
    return DashboardKpiSchema.parse({
      saldoCents: 14258000,
      contasPagar7dCents: 1245000,
      contasReceber7dCents: 4890000,
      inadimplenciaPercent: 3.8,
    });
  }

  @Get("pagar")
  listContasPagar(
    @Query(new ZodValidationPipe(LancamentoFilterSchema))
    filter: LancamentoFilter,
  ) {
    return {
      tipo: "pagar",
      filter,
      items: [
        LancamentoSchema.parse({
          id: "lanc_0001",
          companyId: "company_demo",
          tipo: "pagar",
          descricao: "AWS",
          valorCents: 142000,
          vencimento: new Date().toISOString(),
          status: "pendente",
          criadoPor: "aria",
        }),
      ],
    };
  }

  @Get("receber")
  listContasReceber(
    @Query(new ZodValidationPipe(LancamentoFilterSchema))
    filter: LancamentoFilter,
  ) {
    return {
      tipo: "receber",
      filter,
      items: [
        LancamentoSchema.parse({
          id: "lanc_0101",
          companyId: "company_demo",
          tipo: "receber",
          descricao: "Cliente Demo",
          valorCents: 489000,
          vencimento: new Date().toISOString(),
          status: "pendente",
          criadoPor: "aria",
        }),
      ],
    };
  }

  @Get("fluxo-caixa")
  getCashFlow(@Query("days") days?: string) {
    const periodDays = Number(days) === 60 ? 60 : Number(days) === 90 ? 90 : 30;

    return CashFlowProjectionSchema.parse({
      periodDays,
      realizedCents: 14258000,
      projectedCents: 16543000,
      riskLabel: "medio",
    });
  }

  @Get("conciliacao")
  listReconciliationSuggestions() {
    return {
      suggestions: [
        ReconciliationSuggestionSchema.parse({
          bankTransactionId: "bank_tx_0001",
          lancamentoId: "lanc_0001",
          confidencePercent: 98,
          status: "sugerido",
        }),
      ],
      autoMatchTarget: 85,
    };
  }

  @Post("lancamentos")
  createLancamento(
    @Body(new ZodValidationPipe(LancamentoSchema.omit({ id: true })))
    payload: CreateLancamentoInput,
    @Headers("idempotency-key") idempotencyKey?: string,
    @Headers("x-request-id") requestId?: string,
  ) {
    const context = buildTenantContext({ requestId });

    logger.info("create lancamento requested", {
      companyId: context.companyId,
      idempotencyKey,
    });

    logger.info(
      "audit prepared",
      createAuditLogEntry({
        id: `audit_${Date.now()}`,
        companyId: context.companyId,
        userId: context.userId,
        requestId: context.requestId,
        origin: "api",
        action: "create",
        entity: "lancamento",
        params: payload,
        resultStatus: "success",
      }),
    );

    return LancamentoSchema.parse({
      id: `lanc_${Date.now()}`,
      ...payload,
    });
  }

  @Post("conciliacao/:id/confirmar")
  confirmConciliation(@Param("id") id: string) {
    return {
      ok: true,
      conciliacaoId: id,
      status: "confirmado",
    };
  }
}
