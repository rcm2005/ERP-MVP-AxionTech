export function maskCnpj(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, "");

  if (digits.length !== 14) {
    return cnpj;
  }

  return `${digits.slice(0, 2)}.***.***/****-${digits.slice(-2)}`;
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) {
    return email;
  }

  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}
