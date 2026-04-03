import {
  AriaKpiSnapshotSchema,
  CashFlowProjectionSchema,
  DashboardKpiSchema,
} from "@erp/contracts";
import { Controller, Get } from "./nest-shim";

@Controller("dashboard")
export class DashboardController {
  @Get("summary")
  getSummary() {
    const kpis = DashboardKpiSchema.parse({
      saldoCents: 14258000,
      contasPagar7dCents: 1245000,
      contasReceber7dCents: 4890000,
      inadimplenciaPercent: 3.8,
    });

    const forecast = CashFlowProjectionSchema.parse({
      periodDays: 30,
      realizedCents: 14258000,
      projectedCents: 16543000,
      riskLabel: "medio",
    });

    const ariaSnapshot = AriaKpiSnapshotSchema.parse({
      saldoCents: 14258000,
      contasPagar7dCents: 1245000,
      contasReceber7dCents: 4890000,
      alerts: ["Vencimentos hoje", "Conciliação pendente"],
    });

    return {
      kpis,
      forecast,
      ariaSnapshot,
      insightDoDia:
        "Você tem 3 boletos vencendo hoje. Recomendo priorizar o recebimento da fatura #4592.",
    };
  }
}
