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

## Reservas (Cal.com)

**Estado (API v2 verificada, mayo 2026):** cuenta **configurada**. Usuario `maria-vega`. Tipos de evento activos:

| Slug | Título | Horario (Europe/Madrid) |
|------|--------|-------------------------|
| `terapia-presencial` | Terapia presencial | Lunes 17:00–20:00 |
| `terapia-online` | Terapia online | Martes–domingo 16:00–21:00 |

Horarios enlazados a schedules en Cal.com: «Consulta presencial - lunes tarde» y «Terapia online - tardes».

- [x] Cuenta Cal.com creada y configurada (`maria-vega`)
- [x] Tipos de evento creados (`terapia-online`, `terapia-presencial`)
- [x] Horarios de disponibilidad definidos en Cal.com (coinciden con `site.ts` → `booking.availability`)
- [ ] Google Calendar sincronizado con Cal.com (verificar en dashboard Cal.com)
- [x] Página `/reserva` con embed de Cal.com (`CalEmbed` → `maria-vega`)
- [x] Enlaces directos a `https://cal.com/maria-vega/terapia-online` y `.../terapia-presencial`
- [ ] Emails de confirmación revisados
- [ ] Política de cancelación definida en Cal.com

**Vercel:** el sitio funciona sin `PUBLIC_CALCOM_URL` gracias al valor por defecto en `src/lib/config/site.ts` (`https://cal.com/maria-vega`). Recomendado definir en producción:

`PUBLIC_CALCOM_URL=https://cal.com/maria-vega`

---

## Pagos (Stripe)

**Estado (Stripe MCP verificado, mayo 2026):** cuenta conectada al MCP; **0 Payment Links** en el dashboard. El botón de pago en `/curso-duelo` solo aparece si hay URL en `PUBLIC_STRIPE_COURSE_PAYMENT_LINK` (o en frontmatter `paymentLink` del curso).

- [ ] Crear Stripe Payment Link en https://dashboard.stripe.com/payment-links (curso de duelo)
- [ ] Añadir URL en Vercel: `PUBLIC_STRIPE_COURSE_PAYMENT_LINK=https://buy.stripe.com/...`
- [ ] Verificar que el botón «Inscribirme en la formación» aparece en `/curso-duelo` (ahora muestra «Solicitar información» → contacto)
- [ ] Probar el flujo de pago completo

No incluir claves secretas de Stripe en el repo ni en variables `PUBLIC_*`.

---

## Deploy

- [x] Repo vinculado a Vercel — `darmmars-projects/maria-vega-psicologa`
- [x] Deploy de producción completado — https://maria-vega-psicologa.vercel.app
- [ ] Variables de entorno en Vercel dashboard:

| Variable | Obligatoria | Valor / notas |
|----------|-------------|---------------|
| `PUBLIC_SITE_URL` | Recomendada | URL final del sitio (dominio propio cuando exista) |
| `PUBLIC_CALCOM_URL` | Opcional* | `https://cal.com/maria-vega` (*ya hay default en `site.ts`) |
| `PUBLIC_STRIPE_COURSE_PAYMENT_LINK` | Sí, para pagos | URL del Payment Link cuando exista en Stripe |
| `PUBLIC_CONTACT_EMAIL` | Recomendada | Email visible en contacto y legales |
| `PUBLIC_WHATSAPP_URL` | Opcional | `https://wa.me/...` |
| `PUBLIC_INSTAGRAM_URL` | Opcional | Perfil Instagram |
| `TINA_PUBLIC_CLIENT_ID` | Solo TinaCMS | Cuando se configure edición remota |
| `TINA_TOKEN` | Solo TinaCMS | Cuando se configure edición remota |

- [ ] Dominio personalizado conectado en Vercel (cuando esté disponible)
- [ ] GitHub: crear repo darmmar/maria-vega-psicologa y hacer push (requiere GitHub token)

---

## Datos pendientes que María debe completar

| Dato | Dónde va |
|------|----------|
| Email de contacto | `PUBLIC_CONTACT_EMAIL` en Vercel o `site.ts` → `contact.email` + páginas legales |
| Teléfono / WhatsApp | `PUBLIC_WHATSAPP_URL` + `site.ts` → `contact.phone` / `contact.whatsapp` |
| Número de colegiada | `site.ts` → `legal.collegiateNumber` + aviso legal |
| NIF/CIF | `src/pages/legal/aviso-legal.astro` |
| Dirección exacta de consulta | `site.ts` → `legal.address` |
| Stripe Payment Link (curso) | `PUBLIC_STRIPE_COURSE_PAYMENT_LINK` en Vercel (lee `site.ts` → `payments.courseDueloPaymentLink`) |
| TINA_PUBLIC_CLIENT_ID | Variables de entorno Vercel |
| TINA_TOKEN | Variables de entorno Vercel |
| Instagram / TikTok / Telegram / WhatsApp URLs | `src/components/layout/Footer.astro` → `socialLinks` |
| Foto retrato (María) | Reemplazar placeholder en `/conoceme` |
| Foto despacho | Añadir en secciones relevantes |
| Dominio propio (si diferente de vercel.app) | Vercel dashboard → Domains |
