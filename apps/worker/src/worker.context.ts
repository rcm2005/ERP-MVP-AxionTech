import type { CompanyRole } from "@erp/contracts";

export interface WorkerTenantContext {
  companyId: string;
  userId: string;
  requestId: string;
  role: CompanyRole;
}

export function buildWorkerTenantContext(
  input: Partial<WorkerTenantContext>,
): WorkerTenantContext {
  return {
    companyId: input.companyId ?? "company_demo",
    userId: input.userId ?? "system",
    requestId: input.requestId ?? `job_${Date.now()}`,
    role: input.role ?? "administrador",
  };
}
