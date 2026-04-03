import type { CompanyRole } from "@erp/contracts";

export interface TenantContext {
  companyId: string;
  userId: string;
  requestId: string;
  role: CompanyRole;
}

export function buildTenantContext(input: Partial<TenantContext>): TenantContext {
  return {
    companyId: input.companyId ?? "company_demo",
    userId: input.userId ?? "user_demo",
    requestId: input.requestId ?? `req_${Date.now()}`,
    role: input.role ?? "administrador",
  };
}
