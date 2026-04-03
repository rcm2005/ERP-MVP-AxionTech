export const QUEUE_NAMES = {
  documentIntake: "document-intake",
  nfeParse: "nfe-parse",
  nfeValidate: "nfe-validate",
  boletoExtract: "boleto-extract",
  bankSync: "bank-sync",
  alerts: "alerts",
  auditDispatch: "audit-dispatch",
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];
