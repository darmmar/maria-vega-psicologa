import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("mv_cookie_consent_v1", "necessary");
  });
});

async function expectMapContentToFit(page: import("@playwright/test").Page) {
  const map = page.locator("#maps-consent-wrapper");
  await expect(map).toBeVisible();
  await expect(map.locator("iframe")).toHaveCount(0);
  const clipped = await map.evaluate((wrapper) => {
    const bounds = wrapper.getBoundingClientRect();
    const elements = wrapper.querySelectorAll("#maps-consent-card, #maps-consent-card p, button, a");
    return Array.from(elements).filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top < bounds.top || rect.bottom > bounds.bottom ||
        rect.left < bounds.left || rect.right > bounds.right;
    }).map((element) => element.textContent?.trim());
  });
  expect(clipped, "Map consent content must fit without being cropped").toEqual([]);
}

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test(`contact map fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/contacto");
    await page.evaluate(() => document.fonts.ready);
    await expectMapContentToFit(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    for (const action of ["Cargar mapa", "Abrir fuera"]) {
      const bounds = await page.getByRole(action === "Cargar mapa" ? "button" : "link", { name: action }).boundingBox();
      expect(bounds?.height).toBeGreaterThanOrEqual(44);
    }
  });
}

test("map consent still fits with enlarged text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 });
  await page.goto("/contacto");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  await page.evaluate(() => document.fonts.ready);
  await expectMapContentToFit(page);
});

test("map loads after consent and keeps its height", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.route("https://www.google.com/maps/embed**", (route) =>
    route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Map preview</title>" }),
  );
  await page.goto("/contacto");
  const map = page.locator("#maps-consent-wrapper");
  await expect(map.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Cargar mapa" }).click();
  await expect(map.locator("iframe")).toBeVisible();
  await expect(page.locator("#maps-consent-card")).toBeHidden();
  const bounds = await map.locator("iframe").boundingBox();
  expect(bounds?.height).toBeGreaterThanOrEqual(250);
});

test("privacy consent links to the policy without losing the form", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto("/contacto");
  await page.locator("#nombre").fill("Consulta de prueba");
  const link = page.locator('label[for="privacidad"]').getByRole("link", { name: /política de privacidad/i });
  await expect(link).toHaveAttribute("href", "/legal/privacidad");
  const [policy] = await Promise.all([page.waitForEvent("popup"), link.click()]);
  await policy.waitForLoadState();
  await expect(policy).toHaveURL(/\/legal\/privacidad$/);
  await expect(policy.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#nombre")).toHaveValue("Consulta de prueba");
  await expect(page.locator("#privacidad")).not.toBeChecked();
});
