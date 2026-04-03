import { z } from "zod";

export const CnpjSchema = z
  .string()
  .regex(/^\d{14}$/, "cnpj deve conter 14 digitos");

export const MoneyCentsSchema = z.number().int().nonnegative();

export const UtcDateTimeSchema = z
  .string()
  .datetime({ offset: true })
  .or(z.date());

export const CompanyRoleSchema = z.enum([
  "administrador",
  "financeiro",
  "comercial",
  "contador",
  "visualizador",
]);

export const FiscalRegimeSchema = z.enum([
  "simples_nacional",
  "lucro_presumido",
  "lucro_real",
]);

export const ModuleKeySchema = z.enum([
  "financeiro",
  "documentos",
  "crm",
  "bi",
  "fiscal",
  "integracoes",
  "aria",
]);

export type CompanyRole = z.infer<typeof CompanyRoleSchema>;
export type FiscalRegime = z.infer<typeof FiscalRegimeSchema>;
export type ModuleKey = z.infer<typeof ModuleKeySchema>;
