import {
  AuthSessionSchema,
  LoginRequest,
  LoginRequestSchema,
  MagicLinkRequest,
  MagicLinkRequestSchema,
  VerifyTwoFactorRequest,
  VerifyTwoFactorRequestSchema,
} from "@erp/contracts";
import { createAuditLogEntry, createLogger } from "@erp/logging";
import { ZodValidationPipe } from "./common/zod-validation.pipe";
import { buildTenantContext } from "./common/tenant-context";
import { Body, Controller, Get, Headers, Post } from "./nest-shim";

const logger = createLogger("api.auth");

@Controller("auth")
export class AuthController {
  @Post("login")
  login(
    @Body(new ZodValidationPipe(LoginRequestSchema))
    body: LoginRequest,
    @Headers("x-request-id") requestId?: string,
  ) {
    const context = buildTenantContext({ requestId });
    const requiresTwoFactor = !body.totpCode;

    const session = AuthSessionSchema.parse({
      userId: "user_demo",
      companyId: "company_demo",
      companyName: "Empresa Demo",
      role: "administrador",
      requiresTwoFactor,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    });

    logger.info("login processed", { requestId: context.requestId });
    logger.info(
      "audit prepared",
      createAuditLogEntry({
        id: `audit_${Date.now()}`,
        companyId: context.companyId,
        userId: context.userId,
        requestId: context.requestId,
        origin: "api",
        action: "login",
        entity: "auth",
        params: body,
        resultStatus: "success",
      }),
    );

    return {
      ok: true,
      requiresTwoFactor,
      session,
      nextStep: requiresTwoFactor ? "verify_2fa" : "dashboard",
    };
  }

  @Post("magic-link")
  sendMagicLink(
    @Body(new ZodValidationPipe(MagicLinkRequestSchema))
    body: MagicLinkRequest,
  ) {
    return {
      ok: true,
      delivered: true,
      email: body.email,
    };
  }

  @Post("2fa/verify")
  verifyTwoFactor(
    @Body(new ZodValidationPipe(VerifyTwoFactorRequestSchema))
    body: VerifyTwoFactorRequest,
  ) {
    return {
      ok: true,
      verified: body.code.length >= 6,
    };
  }

  @Get("me")
  me() {
    return AuthSessionSchema.parse({
      userId: "user_demo",
      companyId: "company_demo",
      companyName: "Empresa Demo",
      role: "administrador",
      requiresTwoFactor: false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    });
  }
}
