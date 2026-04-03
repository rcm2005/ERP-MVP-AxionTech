import { test, expect } from "@playwright/test";

test("carrega login e mostra CTA principal", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Bem-vindo de volta" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Acessar sistema" })).toBeVisible();
});
