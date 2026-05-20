# Cómo editar el contenido de la web

## Edición local

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta `pnpm cms`
3. Abre http://localhost:4321/admin en tu navegador
4. Edita el contenido y guarda

## Edición remota (Tina Cloud)

Próximamente se configurará Tina Cloud para editar directamente desde el navegador sin necesidad de tener el proyecto instalado.

## Qué puedes editar

- **Servicios terapéuticos**: título, descripción, contenido, SEO
- **Recursos psicoeducativos**: artículos, etiquetas, estado publicado/borrador
- **Cursos**: información del curso, enlace de pago
- **Preguntas frecuentes**: añadir, editar u ocultar preguntas

## Importante

- No incluyas información clínica de pacientes en ningún campo
- Los cambios generan un commit en GitHub automáticamente
- El sitio se actualiza en Vercel cuando se sube el commit
