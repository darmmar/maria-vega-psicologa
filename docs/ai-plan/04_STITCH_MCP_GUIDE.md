# Uso de Stitch MCP en Cursor

## Objetivo

Usar Stitch como fuente de verdad visual, no como fuente de código final.

Cursor debe consultar Stitch para entender:

- layout;
- jerarquía visual;
- paleta;
- tipografías;
- componentes;
- espaciados;
- diseño responsive;
- intención de cada sección.

Después debe implementar manualmente en Astro + Tailwind.

## Prompt interno para Cursor

```txt
Usa el MCP de Stitch para consultar el diseño actual de la web de María Vega Psicología.

Extrae:
- páginas disponibles;
- componentes visuales;
- estructura de la home;
- estructura de página de servicio;
- estructura de página de recurso/blog;
- estructura de curso de duelo;
- estructura de reserva/contacto;
- paleta de colores;
- tipografías;
- espaciados;
- responsive mobile;
- patrones reutilizables.

No pegues código bruto de Stitch. Convierte el diseño en una especificación implementable con Astro, TypeScript y Tailwind.
```

## Qué debe devolver Cursor antes de implementar

1. Resumen visual del diseño.
2. Componentes identificados.
3. Tokens visuales propuestos.
4. Mapeo Stitch → componentes Astro.
5. Carencias del diseño.
6. Propuesta por fases.
