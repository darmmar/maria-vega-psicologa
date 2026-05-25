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

| Slug | ID | Título | Horario (Europe/Madrid) | Pago |
|------|----|--------|-------------------------|------|
| `terapia-presencial` | 5750914 | Terapia presencial | Lunes 17:00–20:00 | ❌ `price: 0`, sin Stripe en metadata |
| `terapia-online` | 5750906 | Terapia online | Martes–domingo 16:00–21:00 | ❌ `price: 0`, sin Stripe en metadata |

Horarios enlazados a schedules en Cal.com: «Consulta presencial - lunes tarde» y «Terapia online - tardes».

### Google Calendar

**Estado:** ❌ **No conectado** (verificado vía `GET /v2/calendars`, mayo 2026).

Evidencia API:
```json
{ "connectedCalendars": [], "destinationCalendar": {} }
```

**María debe:**
1. Ir a [Cal.com → Settings → Calendars](https://app.cal.com/settings/my-calendars)
2. Conectar Google Calendar (OAuth)
3. Seleccionar el calendario de destino para nuevas reservas
4. Verificar que los eventos de prueba aparecen en Google Calendar

### Cal.com + Stripe (pagos nativos en reserva)

**Estado:** ❌ **Stripe no conectado para cobros de reservas** (la API no expone endpoint de integraciones; los event types tienen `price: 0`, `currency: usd`, `metadata: {}`).

La conexión Stripe ↔ Cal.com **no se puede hacer por API** — requiere OAuth en el dashboard:
1. [Cal.com → Settings → Apps → Stripe](https://app.cal.com/apps/stripe) → **Install** → **Connect with Stripe**
2. Autorizar con la cuenta Stripe de María (`acct_1TYwnb98HO6PKIMC`)
3. En cada event type ([terapia-online](https://app.cal.com/event-types/5750906), [terapia-presencial](https://app.cal.com/event-types/5750914)):
   - Sección **Payment** → activar **Require payment**
   - Procesador: **Stripe**
   - Moneda: **EUR**
   - Precio: importe en céntimos (ej. 60 € → `6000`) — **María debe definir el precio**
   - `paymentOption: ON` (pago obligatorio antes de confirmar)

**Nota:** La API v2 `PATCH /v2/event-types/{id}` no acepta `price`/`currency` en el body de actualización (solo en respuesta). Los pagos deben configurarse en el dashboard hasta que Cal.com exponga `paymentConfig` en la API.

- [x] Cuenta Cal.com creada y configurada (`maria-vega`)
- [x] Tipos de evento creados (`terapia-online`, `terapia-presencial`)
- [x] Horarios de disponibilidad definidos en Cal.com (coinciden con `site.ts` → `booking.availability`)
- [ ] **Google Calendar conectado** — pendiente (API: `connectedCalendars: []`)
- [ ] **Stripe conectado en Cal.com** — pendiente (Settings → Apps → Stripe)
- [ ] **Precio EUR configurado** en ambos event types (María define importe)
- [x] Página `/reserva` con embed de Cal.com (`CalEmbed` → `maria-vega`)
- [x] Copy en `/reserva` explica pago al reservar vía Cal.com (no Payment Link aparte)
- [x] Enlaces directos a `https://cal.com/maria-vega/terapia-online` y `.../terapia-presencial`
- [ ] Emails de confirmación revisados
- [ ] Política de cancelación definida en Cal.com

**Vercel:** `PUBLIC_CALCOM_URL` es **obligatoria** para que `/reserva` muestre el calendario y los enlaces de reserva. El username de Cal.com se deriva de esta URL en `src/lib/config/site.ts`:

`PUBLIC_CALCOM_URL=https://cal.com/maria-vega`

---

## Pagos (Stripe)

**Estado (Stripe MCP verificado, mayo 2026):**
- Cuenta conectada: **María Vega Psicóloga** (`acct_1TYwnb98HO6PKIMC`)
- Dashboard: https://dashboard.stripe.com/acct_1TYwnb98HO6PKIMC
- Productos: 0 | Payment Links: 0 | Payment Intents: 0

### Sesiones de terapia (online / presencial)

**Usar Cal.com + Stripe nativo** — NO Payment Links de Stripe para reservas de sesión.
El cliente paga en el checkout de Cal.com al reservar (ver sección Cal.com + Stripe arriba).

### Curso de duelo (formación profesional)

El botón de pago en `/curso-duelo` solo aparece si hay URL en `PUBLIC_STRIPE_COURSE_PAYMENT_LINK` (o en frontmatter `paymentLink` del curso). Actualmente muestra «Solicitar información» → contacto.

- [ ] Conectar Stripe en Cal.com para sesiones (Settings → Apps → Stripe)
- [ ] Definir precio EUR en event types de terapia (dashboard Cal.com)
- [ ] Probar reserva de sesión con tarjeta de test Stripe (4242 4242 4242 4242)
- [ ] (Opcional, curso) Crear Payment Link en dashboard si se desea cobro directo del curso
- [ ] (Opcional, curso) Añadir URL en Vercel: `PUBLIC_STRIPE_COURSE_PAYMENT_LINK=https://buy.stripe.com/...`

No incluir claves secretas de Stripe en el repo ni en variables `PUBLIC_*`.

---

## Deploy

- [x] Repo vinculado a Vercel — `darmmars-projects/maria-vega-psicologa`
- [x] Deploy de producción completado — https://maria-vega-psicologa.vercel.app
- [ ] Variables de entorno en Vercel dashboard:

| Variable | Obligatoria | Valor / notas |
|----------|-------------|---------------|
| `PUBLIC_SITE_URL` | Recomendada | URL final del sitio (dominio propio cuando exista) |
| `PUBLIC_CALCOM_URL` | Sí (reservas) | `https://cal.com/maria-vega` — username derivado de la URL |
| `PUBLIC_STRIPE_COURSE_PAYMENT_LINK` | Sí, para pagos | URL del Payment Link cuando exista en Stripe |
| `PUBLIC_CONTACT_EMAIL` | Recomendada | Email visible en contacto y legales |
| `PUBLIC_WHATSAPP_URL` | Opcional | `https://wa.me/...` |
| `PUBLIC_INSTAGRAM_URL` | Opcional | Perfil Instagram |
| `TINA_CLIENT_ID` | Sí (build + admin) | Client ID de Tina Cloud — alias; preferir `NEXT_PUBLIC_TINA_CLIENT_ID` |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Sí (build + admin) | Client ID de Tina Cloud (nombre recomendado por Tina) |
| `TINA_TOKEN` | Sí (build + admin) | Read-only / Content token de Tina Cloud |
| `GITHUB_BRANCH` | Recomendada | `main` — rama que indexa Tina Cloud |
| `TINA_SEARCH_TOKEN` | Opcional | Search token para búsqueda en el panel |

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
| Conectar Google Calendar en Cal.com | [Settings → Calendars](https://app.cal.com/settings/my-calendars) |
| Conectar Stripe en Cal.com | [Settings → Apps → Stripe](https://app.cal.com/apps/stripe) |
| Precio sesión online (EUR) | Event type [terapia-online](https://app.cal.com/event-types/5750906) → Payment |
| Precio sesión presencial (EUR) | Event type [terapia-presencial](https://app.cal.com/event-types/5750914) → Payment |
| Stripe Payment Link (curso, opcional) | `PUBLIC_STRIPE_COURSE_PAYMENT_LINK` en Vercel (lee `site.ts` → `payments.courseDueloPaymentLink`) |
| NEXT_PUBLIC_TINA_CLIENT_ID / TINA_CLIENT_ID | Variables de entorno Vercel (obligatorio para build) |
| TINA_TOKEN | Variables de entorno Vercel (obligatorio para build) |
| Instagram / TikTok / Telegram / WhatsApp URLs | `src/components/layout/Footer.astro` → `socialLinks` |
| Foto retrato (María) | Reemplazar placeholder en `/conoceme` |
| Foto despacho | Añadir en secciones relevantes |
| Dominio propio (si diferente de vercel.app) | Vercel dashboard → Domains |
