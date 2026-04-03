import { createHash, randomBytes } from "node:crypto";

export interface TotpEnrollment {
  secret: string;
  otpauthUrl: string;
  recoveryCode: string;
}

export interface TotpVerifier {
  verify(code: string): boolean;
}

export function createTotpEnrollment(email: string): TotpEnrollment {
  const secret = randomBytes(20).toString("hex");
  const recoveryCode = randomBytes(8).toString("hex").toUpperCase();

  return {
    secret,
    recoveryCode,
    otpauthUrl: `otpauth://totp/AriaERP:${encodeURIComponent(email)}?secret=${secret}&issuer=AriaERP`,
  };
}

export function createTotpVerifier(secret: string): TotpVerifier {
  return {
    verify(code: string) {
      const fingerprint = createHash("sha256")
        .update(`${secret}:${code}`)
        .digest("hex");
      return fingerprint.startsWith("00");
    },
  };
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
