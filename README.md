# María Vega Psicología

Web de María Vega, Psicóloga General Sanitaria, con Astro 5, TinaCMS y Cloudflare Pages.

- Producción: https://mariavegagarcia.es
- Pruebas: https://dev.maria-vega-psicologa.pages.dev
- Editor: /admin/index.html#/~/ en cada entorno.

## Desarrollo

Node 24 y pnpm 11.3.0 (versiones fijadas en package.json).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Abre http://localhost:4321/admin y pulsa **Enter Edit Mode**. Tina local guarda en los archivos del repositorio; no necesita acceso de escritura a Tina Cloud.

| Comando | Uso |
| --- | --- |
| pnpm dev | Tina local y Astro. Genera primero el cliente y los tipos. |
| pnpm tina:sync | Regenera el esquema y el cliente sin mantener un servidor. |
| pnpm typecheck | Comprueba TypeScript y Astro, después de generar Tina. |
| pnpm build | Genera el admin de producción y compila para Cloudflare. Requiere credenciales de Tina. |
| pnpm preview | Ejecuta el build en el runtime local de Cloudflare. |
| pnpm test:editor | Comprueba navegación y cambios sin guardar en Chromium. |

Para las pruebas, instala antes el navegador con `pnpm exec playwright install chromium`.

## Arquitectura

El contenido versionado de `src/content/` sirve la web pública. Dentro del editor, los loaders de `src/lib/content/collections.ts` consultan Tina y consumen los cambios sin guardar mediante `requestWithMetadata`. Cada página tiene una región `TinaIsland` y un renderer compartido con su vista previa. La ruta oficial `/tina-island/[name]` usa `experimental_createIslandRoute` para devolver fragmentos HTML.

La navegación usa cargas de página normales de Astro. La integración oficial conserva la sesión del iframe y Tina sincroniza su propia URL. No hay modificaciones de node_modules, cookies manuales ni escrituras del hash del panel.

`tina/__generated__/`, `public/admin/`, cachés y `dist/` están ignorados. Sí se versiona `tina/tina-lock.json`: después de cambiar cualquier colección, ejecuta `pnpm tina:sync` y confirma el lock actualizado. CI lo comprueba en cada ejecución.

## Cloudflare y ramas

Cloudflare Pages compila con `pnpm build`, publica `dist/` y ejecuta el SSR en Pages Functions. `wrangler.jsonc` fija `nodejs_compat`, necesario para los contextos de petición de Tina.

Configura las variables de build de `.env.example` en Production y Preview. El ID y el token de lectura de Tina se incorporan al cliente durante el build. Los secretos de publicación de GitHub se configuran como bindings de runtime.

- `main`: producción.
- `dev`: contenido y cambios en pruebas.
- `CF_PAGES_BRANCH` / `WORKERS_CI_BRANCH`: Cloudflare decide la rama desplegada. Los overrides de Tina se usan fuera de Cloudflare, por ejemplo en builds locales.

La acción de publicación fusiona dev en main. El endpoint `/api/publish` debe quedar protegido por Cloudflare Access en el entorno dev.

## Documentación

- [Editor y diagnóstico](docs/tina-setup.md)
- [Despliegue y tareas pendientes](docs/deploy-checklist.md)
- [Reservas y pagos pendientes](docs/stripe-calcom-setup.md)

Referencias oficiales: [Tina + Astro](https://tina.io/docs/contextual-editing/astro), [Tina en Cloudflare](https://tina.io/docs/tinacloud/deployment-options/cloudflare-workers), [Astro 5 en Cloudflare](https://v5.docs.astro.build/en/guides/integrations-guide/cloudflare/).

Proyecto privado. Los contenidos y la identidad gráfica pertenecen a María del Rocío Vega García.
