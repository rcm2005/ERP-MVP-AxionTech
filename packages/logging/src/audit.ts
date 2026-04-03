import { createHash } from "node:crypto";
import type { AriaToolName, CompanyRole } from "@erp/contracts";

export interface AuditLogEntry {
  id: string;
  companyId: string;
  userId: string;
  requestId: string;
  origin: "api" | "worker" | "aria";
  action: string;
  entity: string;
  paramsHash: string;
  resultStatus: "success" | "error" | "cancelled";
  timestamp: string;
  tool?: AriaToolName;
  role?: CompanyRole;
}

export function hashAuditParams(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value ?? {})).digest("hex");
}

export function createAuditLogEntry(input: {
  id: string;
  companyId: string;
  userId: string;
  requestId: string;
  origin: AuditLogEntry["origin"];
  action: string;
  entity: string;
  params: unknown;
  resultStatus: AuditLogEntry["resultStatus"];
  tool?: AriaToolName;
  role?: CompanyRole;
}): AuditLogEntry {
  return {
    id: input.id,
    companyId: input.companyId,
    userId: input.userId,
    requestId: input.requestId,
    origin: input.origin,
    action: input.action,
    entity: input.entity,
    paramsHash: hashAuditParams(input.params),
    resultStatus: input.resultStatus,
    timestamp: new Date().toISOString(),
    tool: input.tool,
    role: input.role,
  };
}
