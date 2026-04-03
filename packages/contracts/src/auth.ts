import { z } from "zod";
import {
  CnpjSchema,
  CompanyRoleSchema,
  FiscalRegimeSchema,
  ModuleKeySchema,
} from "./common";

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  totpCode: z.string().min(6).max(8).optional(),
});

export const MagicLinkRequestSchema = z.object({
  email: z.string().email(),
});

export const VerifyTwoFactorRequestSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6).max(8),
});

export const CompanyMemberSchema = z.object({
  id: z.string(),
  userId: z.string(),
  companyId: z.string(),
  role: CompanyRoleSchema,
  active: z.boolean().default(true),
});

export const AuthSessionSchema = z.object({
  userId: z.string(),
  companyId: z.string(),
  companyName: z.string(),
  role: CompanyRoleSchema,
  requiresTwoFactor: z.boolean().default(false),
  expiresAt: z.string().datetime({ offset: true }),
});

export const CompanySchema = z.object({
  id: z.string(),
  cnpj: CnpjSchema,
  razaoSocial: z.string().min(1),
  nomeFantasia: z.string().min(1).optional(),
  regimeFiscal: FiscalRegimeSchema,
  cnae: z.array(z.string()).default([]),
  plan: z.enum(["trial", "starter", "pro"]),
  activeModules: z.array(ModuleKeySchema).default([]),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type MagicLinkRequest = z.infer<typeof MagicLinkRequestSchema>;
export type VerifyTwoFactorRequest = z.infer<typeof VerifyTwoFactorRequestSchema>;
export type AuthSession = z.infer<typeof AuthSessionSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type CompanyMember = z.infer<typeof CompanyMemberSchema>;
