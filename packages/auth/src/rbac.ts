import type { CompanyRole, ModuleKey } from "@erp/contracts";

export type PermissionAction = "read" | "create" | "update" | "delete" | "approve";

export interface PermissionGrant {
  module: ModuleKey;
  action: PermissionAction;
}

const ROLE_MATRIX: Record<CompanyRole, PermissionGrant[]> = {
  administrador: [
    { module: "financeiro", action: "read" },
    { module: "financeiro", action: "create" },
    { module: "financeiro", action: "update" },
    { module: "financeiro", action: "delete" },
    { module: "financeiro", action: "approve" },
    { module: "documentos", action: "read" },
    { module: "documentos", action: "create" },
    { module: "documentos", action: "update" },
    { module: "documentos", action: "approve" },
    { module: "crm", action: "read" },
    { module: "crm", action: "create" },
    { module: "crm", action: "update" },
    { module: "crm", action: "delete" },
    { module: "bi", action: "read" },
    { module: "fiscal", action: "read" },
    { module: "integracoes", action: "read" },
    { module: "integracoes", action: "create" },
    { module: "aria", action: "read" },
    { module: "aria", action: "create" },
  ],
  financeiro: [
    { module: "financeiro", action: "read" },
    { module: "financeiro", action: "create" },
    { module: "financeiro", action: "update" },
    { module: "financeiro", action: "approve" },
    { module: "documentos", action: "read" },
    { module: "bi", action: "read" },
    { module: "aria", action: "read" },
  ],
  comercial: [
    { module: "crm", action: "read" },
    { module: "crm", action: "create" },
    { module: "crm", action: "update" },
    { module: "financeiro", action: "read" },
    { module: "bi", action: "read" },
    { module: "aria", action: "read" },
  ],
  contador: [
    { module: "financeiro", action: "read" },
    { module: "documentos", action: "read" },
    { module: "bi", action: "read" },
    { module: "fiscal", action: "read" },
    { module: "aria", action: "read" },
  ],
  visualizador: [
    { module: "financeiro", action: "read" },
    { module: "documentos", action: "read" },
    { module: "crm", action: "read" },
    { module: "bi", action: "read" },
    { module: "fiscal", action: "read" },
    { module: "aria", action: "read" },
  ],
};

export function resolveRolePermissions(role: CompanyRole): PermissionGrant[] {
  return ROLE_MATRIX[role] ?? [];
}

export function canAccess(
  role: CompanyRole,
  module: ModuleKey,
  action: PermissionAction,
): boolean {
  return resolveRolePermissions(role).some(
    (grant) => grant.module === module && grant.action === action,
  );
}

export function requireAccess(
  role: CompanyRole,
  module: ModuleKey,
  action: PermissionAction,
): void {
  if (!canAccess(role, module, action)) {
    throw new Error(`access denied for ${module}:${action} on role ${role}`);
  }
}
