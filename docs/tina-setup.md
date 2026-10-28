# Editor visual: Astro + TinaCMS

La integración se registra una vez en astro.config.mjs. Ella inyecta los formularios y sirve /admin/bridge.js. El plugin oficial tinaAdminDevRedirect hace accesible /admin en desarrollo.

## Flujo

1. La ruta pública renderiza un componente de src/components/tina/ (o ServicePage).
2. Los loaders leen archivos locales para visitantes; en modo editor consultan el cliente generado y llaman a requestWithMetadata con prioridad explícita para el documento principal.
3. TinaIsland envuelve el contenido editable. La configuración correspondiente vive en src/lib/tina/islands.ts.
4. El bridge comunica open / updateData / field:selected con el admin. Los cambios sin guardar se envían al endpoint oficial /tina-island/[name].
5. El endpoint vuelve a renderizar el mismo componente con el overlay. El contenido enriquecido conserva los metadatos que tinaField necesita.

Los cuerpos MDX se renderizan con TinaMarkdown durante la edición, y con el renderer de Astro para visitantes. Esto permite previsualizar texto enriquecido y bloques personalizados sin guardar.

Solo se registran documentos que aportan campos editables a la página. Los datos de respaldo que quedan sustituidos por listas dentro de settings.json o profile.json se leen localmente: registrarlos también creaba formularios que no correspondían a los elementos visibles y respuestas tardías capaces de cambiar la selección del panel.

## Por qué se perdían los formularios

ClientRouter convierte los enlaces en fetch, con Sec-Fetch-Dest: empty. La detección oficial de Tina conserva el modo editor en navegaciones de iframe. El código anterior mezclaba ambos mecanismos y los sustituía por parches de cookies y node_modules. También faltaban regiones TinaIsland y un registro completo de renderers para los cambios en vivo.

La navegación normal de Astro mantiene el protocolo oficial. Tina observa la URL del iframe y sincroniza su router; la aplicación no modifica window.parent.location.hash.

## Mantenimiento

- No editar tina/__generated__ ni public/admin. Son resultados del CLI.
- pnpm build usa --no-client-build-cache: evita rutas de caché locales y acceso al filesystem en Workers.
- Versionar tina/tina-lock.json. pnpm tina:sync regenera esquema y tipos a partir de las colecciones; CI compara el lock siempre.
- ui.router debe apuntar a rutas existentes: servicios /<slug>, recursos /recursos/<slug>, cursos /cursos/<slug>. El curso histórico mantiene /curso-duelo.
- Inicio, cursos y recursos tienen como documento principal settings.json. Conóceme usa profile.json; Servicios, services.json; Contacto, contact.json.
- En Astro 5, reiniciar pnpm dev al añadir documentos nuevos si no aparecen: la invalidación automática de rutas de Tina requiere Astro 6+. No se ha migrado de versión mayor en esta reparación.

## Diagnóstico

Si faltan campos, comprueba que el HTML del iframe contiene data-tina-form y que /admin/bridge.js responde JavaScript. En peticiones del editor, el documento principal lleva data-tina-primary. Los errores de consultas ya no se ocultan con catch vacíos.

El test tests/editor.spec.ts abre el admin local, navega con los enlaces del iframe y cambia un título sin guardar. Nunca pulsa Save ni publica contenido.

API experimental: experimental_createIslandRoute y el Container API de Astro pueden cambiar. Mantener el lockfile y ejecutar las pruebas antes de actualizar dependencias.

Fuentes: [edición visual oficial](https://tina.io/docs/contextual-editing/astro), [archivos generados y lock](https://tina.io/docs/tina-folder/overview), [navegación de Astro 5](https://v5.docs.astro.build/en/guides/view-transitions/).
