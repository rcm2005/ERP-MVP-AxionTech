export const DEMO_SESSION_COOKIE_NAME = "erp_demo_session";
export const DEMO_SESSION_COOKIE_VALUE = "1";
export const DEMO_SESSION_TTL_SECONDS = 60 * 60 * 8;

export const DEMO_TEST_PASSWORD = "Teste@123";
export const DEMO_TEST_EMAILS = [
  "admin@empresaexemplo.com.br",
  "financeiro@empresaexemplo.com.br",
  "comercial@empresaexemplo.com.br",
] as const;

const demo_email_set = new Set<string>(DEMO_TEST_EMAILS);

export function normalize_demo_email(email: string): string {
  return email.trim().toLowerCase();
}

export function validate_demo_credentials(email: string, password: string): boolean {
  const normalized_email = normalize_demo_email(email);
  return demo_email_set.has(normalized_email) && password === DEMO_TEST_PASSWORD;
}

function get_cookie_header(source?: string): string {
  if (typeof source === "string") {
    return source;
  }

  if (typeof document === "undefined") {
    return "";
  }

  return document.cookie;
}

function get_cookie_value(cookie_header: string, name: string): string | undefined {
  const entries = cookie_header.split(";");

  for (const entry of entries) {
    const trimmed = entry.trim();

    if (trimmed.length === 0) {
      continue;
    }

    const separator_index = trimmed.indexOf("=");
    if (separator_index === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator_index);
    if (key !== name) {
      continue;
    }

    return trimmed.slice(separator_index + 1);
  }

  return undefined;
}

export function is_demo_session_cookie_present(cookie_header?: string): boolean {
  const value = get_cookie_value(get_cookie_header(cookie_header), DEMO_SESSION_COOKIE_NAME);
  return value === DEMO_SESSION_COOKIE_VALUE;
}

export function set_demo_session_cookie(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = [
    `${DEMO_SESSION_COOKIE_NAME}=${DEMO_SESSION_COOKIE_VALUE}`,
    "Path=/",
    `Max-Age=${DEMO_SESSION_TTL_SECONDS}`,
    "SameSite=Lax",
  ].join("; ");
}

export function clear_demo_session_cookie(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = [
    `${DEMO_SESSION_COOKIE_NAME}=`,
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
  ].join("; ");
}
