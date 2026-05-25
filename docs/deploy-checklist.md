# Deploy Checklist — María Vega Psicología

Checklist de verificación antes de cada deploy a producción.  
Basado en `docs/ai-plan/14_CHECKLIST_PRE_LAUNCH.md`.

**URL de producción:** https://maria-vega-psicologa.vercel.app  
**Proyecto Vercel:** darmmars-projects/maria-vega-psicologa  
**Último deploy:** Mayo 2026

---

## Técnica

- [x] Build funciona sin errores (`pnpm build`) — ✅ verified en Vercel build logs
- [x] No hay errores TypeScript (`pnpm typecheck`) — ✅ Mayo 2026
- [ ] No hay errores de lint/format (`pnpm check`)
- [x] No hay secretos en el repo (CI lo verifica automáticamente)
- [x] Sitemap generado (`/sitemap-index.xml`) — generado por @astrojs/sitemap
- [x] Robots.txt configurado — `public/robots.txt` creado
- [x] Canonical correcto en todas las páginas — en SeoHead.astro
- [x] OpenGraph correcto (título, descripción, imagen) — og:title, og:description, og:image en SeoHead
- [ ] Diseño mobile revisado en dispositivos reales o DevTools
- [ ] Lighthouse score revisado (Performance, Accessibility, SEO)
- [x] Página 404 accesible (`/404`)
- [x] Curso de duelo reorientado como formación profesional para terapeutas (no psicoeducación para pacientes)
- [x] Headers de seguridad activos — configurados en vercel.json (X-Frame-Options, CSP, HSTS, etc.)

---

## SEO

- [x] Title único por página
- [x] Description meta única por página
- [x] H1 único por página
- [x] JSON-LD de `LocalBusiness` validado — añadido en SeoHead.astro
- [x] Sitemap generado automáticamente con @astrojs/sitemap
- [ ] **PENDIENTE: Actualizar siteUrl** — configurar `PUBLIC_SITE_URL` en Vercel cuando esté disponible el dominio propio (por defecto: maria-vega-psicologa.vercel.app)
- [ ] Google Search Console preparado y dominio verificado
- [ ] Sitemap enviado a Search Console
- [x] Página `/psicologa-malaga` publicada y optimizada
- [x] Página `/terapia-online` publicada y optimizada
- [x] Página `/terapia-duelo` publicada y optimizada
- [x] Página `/terapia-ansiedad` publicada y optimizada
- [x] Recursos iniciales (3) publicados

---

## Legal y Privacidad

- [x] Aviso legal publicado en `/legal/aviso-legal`
- [x] Política de privacidad publicada en `/legal/privacidad`
- [x] Política de cookies publicada en `/legal/cookies`
- [x] Checkbox de aceptación de privacidad en formulario de contacto
- [x] Aviso de no incluir información clínica sensible en formularios
- [ ] **PENDIENTE:** Rellenar email, número de colegiada, NIF/CIF y dirección en páginas legales

---

## Reservas

- [ ] Cuenta de Cal.com creada y configurada (username: maria-vega configurado en site.ts)
- [ ] Tipos de evento creados en Cal.com (primera-consulta, seguimiento, online)
- [ ] Google Calendar sincronizado con Cal.com
- [x] Página `/reserva` con embed de Cal.com
- [ ] Emails de confirmación revisados
- [ ] Política de cancelación definida en Cal.com

---

## Pagos

- [ ] **PENDIENTE:** Crear Stripe Payment Link en https://dashboard.stripe.com/payment-links
- [ ] Añadir URL en `src/lib/config/site.ts` (campo `payments.courseDueloPaymentLink`)
- [ ] Verificar que el botón de pago aparece en `/curso-duelo`
- [ ] Probar el flujo de pago completo

---

## Deploy

- [x] Repo vinculado a Vercel — `darmmars-projects/maria-vega-psicologa`
- [x] Deploy de producción completado — https://maria-vega-psicologa.vercel.app
- [ ] Variables de entorno pendientes en Vercel dashboard:
  - `PUBLIC_SITE_URL` (dominio final cuando esté disponible)
  - `PUBLIC_CALCOM_URL` (https://cal.com/maria-vega)
  - `TINA_PUBLIC_CLIENT_ID` (cuando se configure TinaCMS)
  - `TINA_TOKEN` (cuando se configure TinaCMS)
- [ ] Dominio personalizado conectado en Vercel (cuando esté disponible)
- [ ] GitHub: crear repo darmmar/maria-vega-psicologa y hacer push (requiere GitHub token)

---

## Datos pendientes que María debe completar

| Dato | Dónde va |
|------|----------|
| Email de contacto | `src/lib/config/site.ts` → `contact.email` + páginas legales |
| Teléfono / WhatsApp | `src/lib/config/site.ts` → `contact.phone` y `contact.whatsapp` |
| Número de colegiada | `src/lib/config/site.ts` → `legal.collegiateNumber` + aviso legal |
| NIF/CIF | `src/pages/legal/aviso-legal.astro` |
| Dirección exacta de consulta | `src/lib/config/site.ts` → `legal.address` |
| Stripe Payment Link (curso) | `src/lib/config/site.ts` → `payments.courseDueloPaymentLink` |
| TINA_PUBLIC_CLIENT_ID | Variables de entorno Vercel |
| TINA_TOKEN | Variables de entorno Vercel |
| Instagram / TikTok / Telegram / WhatsApp URLs | `src/components/layout/Footer.astro` → `socialLinks` |
| Foto retrato (María) | Reemplazar placeholder en `/conoceme` |
| Foto despacho | Añadir en secciones relevantes |
| Dominio propio (si diferente de vercel.app) | Vercel dashboard → Domains |
