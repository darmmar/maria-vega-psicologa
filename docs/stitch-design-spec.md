# Especificación visual — María Vega Psicología

## Estado del MCP de Stitch

El servidor MCP de Google Stitch **no está configurado** en este proyecto (no aparece en la carpeta mcps/ del workspace). Por tanto, el diseño visual se ha derivado del brief del proyecto (`docs/ai-plan/01_PROJECT_BRIEF.md`) y de la estética apropiada para una psicóloga sanitaria española.

---

## Diseño aplicado: Warm-Neutral Serenity System

### Principios visuales

| Principio | Decisión |
|-----------|----------|
| Tono emocional | Sereno, cálido, cercano. No corporativo ni clínico. |
| Paleta | Sage green + warm cream + stone neutrals |
| Tipografía | Lora (serif, headings) + Inter (sans, body) |
| Espaciado | Generoso. Secciones respiran. Gap system 4/8/12/16/24/32 |
| Imágenes | Placeholder, sin fotos reales hasta disponer de ellas |
| Bordes | Redondeados (rounded-2xl) para calidez |
| Sombras | Sutiles (shadow-sm, hover: shadow-md) |

---

## Paleta de colores

### sage — Color primario de marca
Sage green. Calma, crecimiento, naturaleza, salud mental.

| Token | Hex | Uso |
|-------|-----|-----|
| sage-50 | #f4f8f5 | Fondos de sección muy claros |
| sage-100 | #e4f0e8 | Fondos de cards en hover |
| sage-200 | #c5dece | Bordes sutiles |
| sage-300 | #98c3a7 | Iconos, decorativos |
| sage-400 | #6aa383 | Elementos secundarios |
| sage-500 | #4a8665 | Interactivo accesible |
| sage-600 | #39704f | Color primario principal (buttons, links) |
| sage-700 | #2e5a3f | Hover primario |
| sage-800 | #264a34 | Active/pressed |
| sage-900 | #1e3c2b | Texto en fondos claros |
| sage-950 | #102018 | Oscuro máximo |

### cream — Fondos cálidos
Warm cream/beige. Calidez, acogimiento.

| Token | Hex | Uso |
|-------|-----|-----|
| cream-50 | #fdfaf5 | Fondo base del sitio |
| cream-100 | #f8f1e4 | Fondos alternativos de sección |
| cream-200 | #f0e0c4 | Bordes warm |
| cream-300 | #e4c898 | Acentos decorativos |
| cream-400 | #d4a96a | Acentos activos |
| cream-500 | #c08c48 | Accent color |
| cream-600 | #a57338 | Hover accent |
| cream-700 | #875d2e | Dark accent |
| cream-800 | #6e4b27 | Very dark accent |
| cream-900 | #5a3d21 | Max dark |
| cream-950 | #302010 | Deepest |

### stone — Neutrales cálidos
Warm stone gray. Texto, bordes, fondos neutros.

| Token | Hex | Uso |
|-------|-----|-----|
| stone-50 | #faf9f7 | Fondo alternativo neutro |
| stone-100 | #f2f0ec | Cards/secciones alternativas |
| stone-200 | #e6e2db | Bordes generales |
| stone-300 | #d0c9bf | Dividers |
| stone-400 | #b4aa9e | Texto placeholder |
| stone-500 | #99907f | Texto secundario |
| stone-600 | #7d7366 | Texto terciario |
| stone-700 | #635c52 | Texto secundario legible |
| stone-800 | #524e46 | Texto principal suave |
| stone-900 | #44413a | Texto principal |
| stone-950 | #252220 | Texto más oscuro |

---

## Tipografías

### Headings: Lora (Google Fonts, serif)
- Warm, elegante, legible. Evoca calidez y profundidad sin ser anticuada.
- H1: font-lora, 3xl–6xl, font-bold, tracking-tight
- H2: font-lora, 2xl–4xl, font-semibold
- H3: font-lora, xl–2xl, font-medium

### Body: Inter (Google Fonts, sans-serif)
- Clean, moderna, muy legible en pantalla.
- Body: font-inter, base–lg, text-stone-700
- Labels/overlines: font-inter, sm, uppercase, tracking-wider, text-sage-600

---

## Sistema de espaciado (gap system)

El sistema usa múltiplos de 4 (Tailwind defaults):
- Padding de sección: `py-16 lg:py-24`
- Gap entre elementos: `gap-4`, `gap-6`, `gap-8`, `gap-12`
- Márgenes internos de card: `p-6`
- Max-width de contenido centrado: `max-w-2xl` (texto) / `max-w-3xl` (texto+CTA) / `max-w-screen-xl` (layout)

---

## Páginas del sitio

| Ruta | Descripción |
|------|-------------|
| `/` | Home — Hero + TherapyApproach + ServicesGrid + ExperienceBlock + TrainingBlock + CourseHighlight + ResourcesPreview + FAQSection + CTASection |
| `/conoceme` | Sobre María — bio extendida, formación, valores |
| `/psicologa-malaga` | Página de servicio: terapia presencial Málaga |
| `/terapia-online` | Página de servicio: terapia online |
| `/terapia-duelo` | Página de servicio: duelo |
| `/terapia-ansiedad` | Página de servicio: ansiedad |
| `/terapia-adicciones` | Página de servicio: adicciones |
| `/terapia-infantil-juvenil` | Página de servicio: infanto-juvenil |
| `/terapia-contextual-act` | Página enfoque: ACT |
| `/curso-duelo` | Página del curso de duelo |
| `/recursos` | Listado de recursos psicoeducativos |
| `/recursos/[slug]` | Artículo de recurso individual |
| `/reserva` | Reserva de cita (Cal.com embed) |
| `/contacto` | Formulario de contacto |
| `/legal/privacidad` | Política de privacidad |
| `/legal/cookies` | Política de cookies |
| `/legal/aviso-legal` | Aviso legal |

---

## Componentes identificados

### Layout
- `Layout.astro` — Wrapper global con head, header, footer
- `Header.astro` — Nav con logo + enlaces + CTA "Pedir cita"
- `Footer.astro` — Links legales, redes sociales, créditos

### UI base
- `Button.astro` — 3 variantes: primary (sage-600 bg), secondary (outline), ghost (texto)
- `Card.astro` — Container con borde, shadow, hover
- `Badge.astro` — Etiqueta pequeña
- `Container.astro` — Max-width wrapper

### Secciones (Home)
- `Hero.astro` — Primera sección visible, headline H1, tagline, CTAs
- `TherapyApproach.astro` — Enfoque terapéutico con valores
- `ServicesGrid.astro` — Grid 3 cols de servicios
- `ExperienceBlock.astro` — Áreas de experiencia clínica
- `TrainingBlock.astro` — Formación académica timeline
- `CourseHighlight.astro` — Bloque destacado del curso de duelo
- `ResourcesPreview.astro` — Preview artículos recientes
- `FAQSection.astro` — Acordeón de preguntas frecuentes
- `CTASection.astro` — Llamada a acción final

### Islands (React)
- `MobileMenu.tsx` — Menú hamburguesa móvil
- `FAQAccordion.tsx` — Acordeón interactivo accesible

---

## Estructura de la home

```
[Header sticky]
[Hero] — gradient sage-50→cream-50, full-width, centrado, headline grande
[TherapyApproach] — bg white, max-w-3xl centrado + grid de valores
[ServicesGrid] — bg stone-50, 3 cols, cards con iconos SVG inline
[ExperienceBlock] — bg white, lista visual de áreas clínicas
[TrainingBlock] — bg sage-50, timeline de formación
[CourseHighlight] — bg cream-100, banner del curso de duelo
[ResourcesPreview] — bg white, grid de artículos recientes
[FAQSection] — bg stone-50, acordeón
[CTASection] — bg sage-700, texto blanco, CTA a /reserva
[Footer]
```

---

## Responsive (breakpoints)

| Breakpoint | Comportamiento |
|------------|----------------|
| Mobile (< 640px) | Single column, hero centrado, grid 1 col, nav hamburguesa |
| Tablet (640–1024px) | Grid 2 cols para servicios, nav visible parcial |
| Desktop (≥ 1024px) | Grid 3 cols, hero split o centrado grande |

---

## Carencias (elementos no definidos)

- Sin foto de María (placeholder o ilustración SVG mientras tanto)
- Sin colores OG/brand exactos (se asumen a partir del brief)
- Sin iconos de brand definitivos (se usan SVGs inline simples)
- Sin precio del curso (no inventar)
- Sin número de colegiada (no inventar)
- Sin enlace real de Cal.com (placeholder)
- Sin enlace de Stripe (placeholder)
- Tipografía final pendiente de aprobación del cliente

---

*Documento generado el 2026-05-20 por agente visual. Stitch MCP no disponible en este workspace.*
