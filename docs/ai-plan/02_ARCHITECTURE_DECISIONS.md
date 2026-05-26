# Decisiones de arquitectura

## Stack

```txt
Astro + TypeScript + Tailwind CSS + MDX + TinaCMS + Cal.com + Stripe Payment Links + Vercel
```

## Por qué no backend propio al inicio

No hay necesidad real de API propia, base de datos, autenticación de pacientes, reservas propias ni pagos propios.

Además, una web de psicología debe minimizar datos sensibles. Es mejor no guardar datos clínicos en infraestructura propia.

## Qué gestiona cada pieza

| Necesidad | Solución |
|---|---|
| Web | Astro |
| Edición de contenido | TinaCMS |
| Contenido | MDX |
| Reservas | Cal.com |
| Pagos | Stripe Payment Links |
| Deploy | Vercel |
| Código | GitHub |
| SEO | Astro + sitemap + JSON-LD + Search Console |

## Futuro backend

Solo valorar si aparece necesidad real:

- área privada de cursos;
- CRM ligero;
- automatizaciones;
- gestión avanzada de alumnos;
- reservas propias.

Stack futuro posible:

```txt
FastAPI + PostgreSQL + SQLAlchemy + Alembic + Docker
```
