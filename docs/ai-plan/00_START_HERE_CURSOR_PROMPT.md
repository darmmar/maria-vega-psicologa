# Prompt inicial para Cursor

Copia este prompt en Cursor al empezar.

---

Actúa como arquitecto frontend senior y technical lead del proyecto.

Antes de programar, lee toda la documentación incluida en:

```txt
docs/ai-plan/
```

Si esta carpeta está en otra ruta, localízala y úsala como fuente principal.

## Contexto

Vamos a construir una web profesional para una psicóloga sanitaria en Málaga llamada **María Vega**.

La web debe servir para:

- captar pacientes de terapia presencial en Málaga;
- captar pacientes de terapia online;
- mostrar formación, experiencia y enfoque terapéutico;
- publicar recursos psicoeducativos;
- promocionar un curso de duelo;
- permitir reservas mediante Cal.com;
- permitir pagos mediante Stripe Payment Links;
- tener contenido editable mediante TinaCMS;
- desplegar en Vercel desde GitHub.

## Stack obligatorio

- Astro
- TypeScript
- Tailwind CSS
- MDX
- React islands solo cuando sea necesario
- TinaCMS
- Cal.com embed
- Stripe Payment Links
- Vercel
- GitHub

## Herramientas disponibles

- Tienes acceso al repositorio de GitHub.
- Tienes acceso al MCP de Stitch de Google, ya configurado con API key.
- Usa Stitch como fuente visual para analizar diseño, layout, componentes, paleta, jerarquía visual y responsive.
- No pegues código bruto de Stitch si no respeta la arquitectura.
- Convierte la especificación visual de Stitch en componentes Astro + Tailwind limpios.

## Reglas de Git

- No trabajes directamente sobre `main`.
- Crea una rama:

```txt
feat/initial-astro-website
```

- Haz commits pequeños y claros con Conventional Commits.
- No subas secretos, API keys ni tokens.
- Si el repo está conectado a Vercel, asume que `main` despliega producción y que las ramas generan previews.

## Primera tarea: SOLO planificación

1. Inspecciona el repositorio.
2. Lee todos los archivos de `docs/ai-plan/`.
3. Consulta el diseño disponible mediante el MCP de Stitch.
4. Resume lo que existe en el repo.
5. Resume lo que detectas del diseño de Stitch:
   - páginas;
   - componentes;
   - paleta;
   - tipografías;
   - secciones;
   - responsive;
   - carencias.
6. Propón arquitectura de carpetas.
7. Propón fases de implementación.
8. Propón archivos a crear/modificar en la Fase 1.
9. Espera confirmación antes de modificar archivos.

## Restricciones

- No crear backend propio.
- No crear base de datos.
- No implementar reservas propias.
- No implementar pagos propios.
- No crear login de pacientes.
- No guardar datos clínicos sensibles.
- No inventar número de colegiada, dirección exacta, teléfono, precios ni URLs reales si no están definidos.
- No usar claims comerciales agresivos ni promesas terapéuticas.
- Priorizar rendimiento, SEO, accesibilidad, privacidad y mantenibilidad.

## Criterios de aceptación de la Fase 1

- Proyecto Astro + TypeScript operativo.
- Tailwind, MDX, React y sitemap configurados.
- Layout global creado.
- Header y Footer creados.
- Home inicial siguiendo la dirección visual de Stitch.
- Rutas principales creadas aunque sea como placeholders.
- `siteConfig` centralizado.
- SEO base funcionando.
- Build sin errores.
- Commit creado.
