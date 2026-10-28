# Cloudflare Pages y pendientes de lanzamiento

Producción: https://mariavegagarcia.es — rama main.
Preview: https://dev.maria-vega-psicologa.pages.dev — rama dev.

## Despliegue

- Build: pnpm build. Directorio de salida: dist.
- public/_routes.json reserva /admin y los recursos estáticos para Pages; /tina-island/* y las API siguen ejecutándose en el Worker. Evita generar una regla por cada bundle del admin.
- Node 24; pnpm 11.3.0; instalar con el lockfile.
- Mantener nodejs_compat en la configuración de Preview y Production del proyecto de Pages, para node:async_hooks. Las variables se gestionan allí; un archivo Wrangler sin migrarlas haría que el build las ignorase.
- Definir PUBLIC_SITE_URL, PUBLIC_TINA_CLIENT_ID (o su alias NEXT_PUBLIC_TINA_CLIENT_ID), TINA_TOKEN y, opcionalmente, TINA_SEARCH_TOKEN en las variables de build de ambos entornos.
- No fijar GITHUB_BRANCH=main ni PUBLIC_TINA_BRANCH=main en Preview. Cloudflare proporciona CF_PAGES_BRANCH. Workers Builds proporciona WORKERS_CI_BRANCH.
- Configurar GITHUB_DISPATCH_TOKEN únicamente como secreto de runtime en dev si se mantiene la publicación desde Tina. El acceso al entorno y a /api/publish debe estar protegido con Cloudflare Access.
- El proyecto no usa sesiones de Astro; si se incorporan, configurar el binding KV SESSION que solicita el adaptador.
- Verificar /admin, /admin/bridge.js y los POST /tina-island/* en el runtime de Cloudflare, además del build.
- Mantener tina/tina-lock.json alineado con todas las colecciones. Si Tina Cloud aún indexa un esquema anterior, reindexar la rama en Tina Cloud antes de editar. Omitir checks no corrige un esquema remoto desactualizado.

## Pendientes de negocio (sin inventar datos)

- [ ] Sustituir legal.taxId = 12345678A por el DNI/NIF real de María, facilitado por ella.
- [ ] Confirmar si llamadas (+34 659345540) y WhatsApp (+34 672837904) conservan números distintos.
- [ ] Implementar envío real de email en /api/contact hacia contacto@mariavegagarcia.es. Actualmente solo valida y registra en logs, y devuelve éxito sin entregar correo. Revisar también los datos personales que registra.
- [ ] Elegir proveedor de correo, verificar el dominio y añadir sus secretos en Cloudflare; probar la entrega antes de dar el formulario por operativo.
- [ ] Verificar calendarios, disponibilidad y pagos de Cal.com (ver stripe-calcom-setup.md).
- [ ] Verificar propiedad y enviar https://mariavegagarcia.es/sitemap-index.xml a Google Search Console.
- [ ] Configurar Google Business Profile y confirmar dirección, teléfonos y horarios.
- [ ] Revisar móviles, accesibilidad y rendimiento con mediciones del despliegue real. No hay resultados certificados de Lighthouse en este documento.

Las configuraciones externas de Cal.com, Stripe, Search Console y Business Profile quedan pendientes de una tarea específica después de estabilizar el editor.
