# Deploy Checklist — María Vega Psicología

Checklist de verificación antes de cada deploy a producción.  
Basado en `docs/ai-plan/14_CHECKLIST_PRE_LAUNCH.md`.

---

## Técnica

- [ ] Build funciona sin errores (`pnpm build`)
- [ ] No hay errores TypeScript (`pnpm typecheck`)
- [ ] No hay errores de lint/format (`pnpm check`)
- [ ] No hay secretos en el repo (CI lo verifica automáticamente)
- [ ] Sitemap generado (`/sitemap-index.xml`)
- [ ] Robots.txt configurado
- [ ] Canonical correcto en todas las páginas
- [ ] OpenGraph correcto (título, descripción, imagen)
- [ ] Diseño mobile revisado en dispositivos reales o DevTools
- [ ] Lighthouse score revisado (Performance, Accessibility, SEO)
- [ ] Accesibilidad básica revisada (contraste, alt texts, focus visible)
- [ ] Headers de seguridad activos (verificar con [securityheaders.com](https://securityheaders.com))

---

## SEO

- [ ] Title único por página
- [ ] Description meta única por página
- [ ] H1 único por página
- [ ] Enlaces internos entre páginas de servicios y recursos
- [ ] Página `/psicologa-malaga` publicada y optimizada
- [ ] Página `/terapia-online` publicada y optimizada
- [ ] Página `/terapia-duelo` publicada y optimizada
- [ ] Página `/terapia-ansiedad` publicada y optimizada
- [ ] Recursos iniciales (mínimo 2-3) publicados
- [ ] JSON-LD de `LocalBusiness`/`Person` validado ([schema.org validator](https://validator.schema.org))
- [ ] Google Search Console preparado y dominio verificado
- [ ] Sitemap enviado a Search Console

---

## Legal y Privacidad

- [ ] Aviso legal publicado en `/legal/aviso-legal`
- [ ] Política de privacidad publicada en `/legal/privacidad`
- [ ] Política de cookies publicada en `/legal/cookies`
- [ ] Checkbox de aceptación de privacidad en formulario de contacto
- [ ] Aviso de no incluir información clínica sensible en formularios
- [ ] Los formularios no recogen datos clínicos (solo nombre, email, motivo genérico)
- [ ] Sin analytics invasivo activo sin consentimiento explícito

---

## Reservas

- [ ] Cuenta de Cal.com creada y configurada
- [ ] Tipos de evento creados (sesión individual, primera consulta, etc.)
- [ ] Google Calendar sincronizado con Cal.com
- [ ] Página `/reserva` funcionando con el embed de Cal.com
- [ ] Emails de confirmación revisados (remitente, contenido, idioma)
- [ ] Política de cancelación definida en Cal.com

---

## Pagos

- [ ] Stripe Payment Link creado para el curso de duelo
- [ ] Variable `PUBLIC_STRIPE_COURSE_PAYMENT_LINK` configurada en Vercel
- [ ] CTA del curso apunta al Payment Link correcto
- [ ] Flujo de pago probado en modo test (tarjeta `4242 4242 4242 4242`)
- [ ] Email de confirmación de compra revisado (Stripe o email propio)

---

## Deploy

- [ ] Repo conectado a Vercel (`vercel link`)
- [ ] Variables de entorno configuradas en Vercel (todas las de `.env.example`)
- [ ] Secret `VERCEL_TOKEN` configurado en GitHub Actions (para previews)
- [ ] Dominio personalizado conectado en Vercel
- [ ] HTTPS activo y certificado SSL válido
- [ ] DNS propagado correctamente (verificar con [dnschecker.org](https://dnschecker.org))
- [ ] Preview de rama `feat/**` revisada antes de merge
- [ ] Deploy de producción en `main` revisado tras merge
- [ ] URL canónica en `PUBLIC_SITE_URL` apunta al dominio definitivo
