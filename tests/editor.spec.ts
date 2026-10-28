import { test, expect } from "@playwright/test";

test("visual forms survive iframe navigation and unsaved changes render", async ({ page }) => {
  await page.goto("/admin/index.html#/~/");
  const localLogin = page.getByRole("button", { name: /enter edit mode/i });
  await localLogin.click();
  const preview = page.locator("iframe").first().contentFrame();
  const previewErrors: string[] = [];
  page.on("response", (response) => {
    if (response.url().includes("/tina-island/") && response.status() >= 400) {
      previewErrors.push(`${response.status()} ${response.url()}`);
    }
  });

  for (const [href, field, document] of [
    ["/cursos", "coursesPage.title", "settings"],
    ["/recursos", "resourcesPage.title", "settings"],
    ["/conoceme", "hero.title", "profile"],
    ["/servicios", "hero.title", "services"],
    ["/contacto", "hero.title", "contact"],
    ["/", "hero.title", "settings"],
  ]) {
    await preview.locator(`header a[href="${href}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`#/~${href === "/" ? "/?" : href}$`));
    await expect(preview.locator("[data-tina-form]")).not.toHaveCount(0);
    await expect(page.getByText("TinaCMS form fields will appear here.")).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "breadcrumb" }).getByRole("link", { name: document, exact: true })).toBeVisible();
    const heading = preview.locator(`[data-tina-field$="${field}"]`).first();
    await expect(heading).toBeVisible();
    await heading.click();
    await expect(page.locator(`input[name="${field}"]`)).toBeVisible();
  }

  // Exercise the real sidebar -> updateData -> island POST -> DOM path.
  const title = page.locator('input[name="hero.title"]');
  await title.fill("Título de prueba sin guardar");
  await expect(preview.locator('h1[data-tina-field$="siteSettings.hero.title"]')).toHaveText("Título de prueba sin guardar");
  expect(previewErrors).toEqual([]);
  // No save: the test never writes to content files or Tina Cloud.
});

test("public pages and bridge ship without a CMS session", async ({ request }) => {
  for (const path of ["/", "/cursos", "/recursos", "/conoceme", "/servicios", "/contacto", "/curso-duelo", "/terapia-online", "/recursos/ansiedad-no-es-el-enemigo"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html.includes("data-tina-form="), path).toBe(false);
  }
  const bridge = await request.get("/admin/bridge.js");
  expect(bridge.status()).toBe(200);
  expect(bridge.headers()["content-type"]).toContain("javascript");
});
