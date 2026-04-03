import {
  AriaChatRequest,
  AriaChatRequestSchema,
} from "@erp/contracts";
import { createAuditLogEntry, createLogger } from "@erp/logging";
import { ZodValidationPipe } from "./common/zod-validation.pipe";
import { buildTenantContext } from "./common/tenant-context";
import { Body, Controller, Headers, MessageEvent, Post, Sse } from "./nest-shim";

const logger = createLogger("api.aria");

@Controller("aria")
export class AriaController {
  @Post("chat")
  chat(
    @Body(new ZodValidationPipe(AriaChatRequestSchema))
    body: AriaChatRequest,
    @Headers("x-request-id") requestId?: string,
  ) {
    const context = buildTenantContext({ requestId });

    logger.info("aria chat request", {
      requestId: context.requestId,
      currentScreen: body.currentScreen,
    });

    logger.info(
      "audit prepared",
      createAuditLogEntry({
        id: `audit_${Date.now()}`,
        companyId: context.companyId,
        userId: context.userId,
        requestId: context.requestId,
        origin: "api",
        action: "chat",
        entity: "aria",
        params: body,
        resultStatus: "success",
      }),
    );

    return {
      conversationId: body.conversationId ?? `conv_${Date.now()}`,
      assistantMessage:
        "Entendi. Posso te mostrar os dados mais relevantes da tela atual.",
      quickChips: ["Ver resumo", "Abrir pendencias", "Ir para financeiro"],
    };
  }

  @Sse("chat/stream")
  stream(): MessageEvent[] {
    return [
      {
        data: {
          type: "message_start",
          content: "Aria iniciando leitura do contexto da tela.",
        },
      },
      {
        data: {
          type: "tool_call_started",
          tool: "buscar_dados_financeiros",
          content: "Buscando dados financeiros.",
        },
      },
      {
        data: {
          type: "message_delta",
          content: "Resumo pronto. Quer abrir o painel financeiro?",
        },
      },
    ];
  }
}
