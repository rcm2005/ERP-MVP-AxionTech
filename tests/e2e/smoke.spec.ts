import { test, expect } from "@playwright/test";

const demo_email = "admin@empresaexemplo.com.br";
const demo_password = "Teste@123";
const login_url_pattern = /\/login\/?(\?.*)?$/;
const dashboard_url_pattern = /\/dashboard\/?(\?.*)?$/;

async function wait_for_login_ready(page: import("@playwright/test").Page) {
  await expect(page.getByRole("heading", { name: "Bem-vindo de volta" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Acessar sistema" })).toBeEnabled();
}

test("carrega login e mostra CTA principal", async ({ page }) => {
  await page.goto("/login");
  await wait_for_login_ready(page);
  await expect(page.getByRole("heading", { name: "Bem-vindo de volta" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Acessar sistema" })).toBeVisible();
});

test("faz login com credencial válida e abre dashboard", async ({ page }) => {
  await page.goto("/login");
  await wait_for_login_ready(page);
  await page.locator("#email").fill(demo_email);
  await page.locator("#password").fill(demo_password);
  await page.getByRole("button", { name: "Acessar sistema" }).click();

  await expect(page).toHaveURL(dashboard_url_pattern);
  await expect(page.getByRole("heading", { name: "Painel principal" })).toBeVisible();
});

test("mostra erro e permanece em login com credencial inválida", async ({ page }) => {
  await page.goto("/login");
  await wait_for_login_ready(page);
  await page.locator("#email").fill(demo_email);
  await page.locator("#password").fill("senha-incorreta");
  await page.getByRole("button", { name: "Acessar sistema" }).click();

  await expect(page).toHaveURL(login_url_pattern);
  await expect(page.getByText("E-mail ou senha inválidos.")).toBeVisible();
});

test("protege rota privada sem sessão", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(login_url_pattern);
  await wait_for_login_ready(page);
  await expect(page.getByRole("heading", { name: "Bem-vindo de volta" })).toBeVisible();
});

test("redireciona para dashboard ao abrir login com sessão ativa", async ({ page }) => {
  await page.goto("/login");
  await wait_for_login_ready(page);
  await page.locator("#email").fill(demo_email);
  await page.locator("#password").fill(demo_password);
  await page.getByRole("button", { name: "Acessar sistema" }).click();
  await expect(page).toHaveURL(dashboard_url_pattern);

  await page.goto("/login");
  await expect(page).toHaveURL(dashboard_url_pattern);
});
