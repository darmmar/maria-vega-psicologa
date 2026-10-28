# Reservas y pagos: contexto pendiente

La web enlaza directamente con:

- https://cal.com/maria-vega/terapia-presencial
- https://cal.com/maria-vega/terapia-online

Los enlaces no demuestran que la disponibilidad, el calendario o el cobro estén configurados correctamente. La comprobación de esas cuentas queda pendiente.

Referencias de las notas locales anteriores, pendientes de verificar en la cuenta:

| Servicio | Producto Stripe | Precio Stripe |
| --- | --- | --- |
| Online | `prod_UaAS5xpV50hDqB` | `price_1Tb07w98HO6PKIMCAFiIuOMo` |
| Presencial | `prod_UaASBXk1whorXC` | `price_1Tb07w98HO6PKIMCjSQpbQwW` |

Los importes de 60 € de esas notas eran placeholders; María debe confirmar el precio real. Cal.com configura el importe dentro de cada evento.

## Comprobaciones posteriores

- Confirmar cuenta, disponibilidad, zona horaria, duración, precios y política de cancelación con María.
- Verificar la conexión con su calendario y que las reservas bloquean la franja horaria.
- Si se cobra al reservar, conectar Stripe desde Cal.com y confirmar el importe dentro de cada evento.
- Probar reserva, confirmación, cancelación y pago de prueba antes de activar cobros reales.
- Para cursos, confirmar si se usará un Payment Link y añadirlo al campo paymentLink del curso.

No se han cambiado precios, productos ni credenciales externas durante la reparación del editor.
