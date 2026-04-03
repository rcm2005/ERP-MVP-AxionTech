import type { AuthSession, CompanyRole } from "@erp/contracts";

export interface TenantSessionContext {
  userId: string;
  companyId: string;
  role: CompanyRole;
  requestId: string;
  requiresTwoFactor: boolean;
}

export function createAuthSession(context: TenantSessionContext): AuthSession {
  return {
    userId: context.userId,
    companyId: context.companyId,
    companyName: "Empresa Demo",
    role: context.role,
    requiresTwoFactor: context.requiresTwoFactor,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
  };
}
