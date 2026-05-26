# Reservas de pago: Stripe + Cal.com

Guía para María — **5 minutos**, sin tutoriales de Stripe Workbench.

---

## Lo que ya está hecho (no tienes que tocarlo)

- **Catálogo Stripe** (cuenta *María Vega Psicóloga*): productos y precios de referencia creados/verificados.
- **Web** (`/reserva`): enlaza al calendario de Cal.com; el pago ocurre **dentro** de Cal.com, no en la web.
- **Tipos de cita en Cal.com**: *Terapia online* y *Terapia presencial* ya existen y están enlazados desde la web.

> **Importante:** Cal.com **no usa** los IDs de producto de Stripe. El importe lo configuras tú en cada tipo de evento. Los productos en Stripe son solo catálogo/contabilidad opcional.

---

## Productos Stripe (referencia)

| Servicio            | Product ID              | Price ID (EUR)                    | Importe placeholder |
|---------------------|-------------------------|-----------------------------------|---------------------|
| Sesión online       | `prod_UaAS5xpV50hDqB`   | `price_1Tb07w98HO6PKIMCAFiIuOMo`  | **60,00 €**         |
| Sesión presencial   | `prod_UaASBXk1whorXC`   | `price_1Tb07w98HO6PKIMCjSQpbQwW`  | **60,00 €**         |

### ⚠️ Cambia el precio placeholder

Los **60 €** son un valor orientativo (sesión estándar de psicología). **Debes poner tu tarifa real** en Cal.com (pasos 2 y 3 abajo). Si tu tarifa es distinta, ignora la cifra de Stripe y usa la tuya en Cal.com.

> Nota técnica: si creaste un producto manualmente en Workbench (`prod_UaAOrbxeYPUAhP`), no apareció en la cuenta conectada; se recreó el catálogo con los IDs de arriba.

---

## Qué tienes que hacer tú (solo Cal.com)

### Paso 1 — Conectar Stripe en Cal.com (OAuth)

1. Entra en **[Cal.com → Apps → Stripe](https://app.cal.com/apps/stripe)**.
2. Pulsa **Connect** / **Conectar** e inicia sesión con la cuenta Stripe de *María Vega Psicóloga*.
3. Autoriza la conexión.

Sin este paso, Cal.com no puede cobrar aunque el resto esté bien.

---

### Paso 2 — Cobro en *Terapia online*

1. Cal.com → **Event types** → **Terapia online** (`terapia-online`).
2. Pestaña **Payments** / **Pagos**.
3. Activa **Require payment** (exigir pago).
4. Moneda: **EUR (€)**.
5. Importe: **tu tarifa real** (ej. 60 € si coincide con el placeholder).
6. Guarda.

---

### Paso 3 — Cobro en *Terapia presencial*

Repite el paso 2 en **Terapia presencial** (`terapia-presencial`): EUR + tu tarifa + guardar.

---

### Paso 4 (opcional) — Google Calendar

Si el calendario de destino está vacío:

1. Cal.com → **Settings** → **Calendars**.
2. Conecta **Google Calendar** y elige el calendario donde quieres las citas.

---

## Cómo probar que funciona

1. Abre [cal.com/maria-vega/terapia-online](https://cal.com/maria-vega/terapia-online) (modo incógnito).
2. Elige un hueco libre.
3. Deberías ver **pago con tarjeta** antes de confirmar.
4. Tarjeta de prueba Stripe (modo test) o real (modo live):

   | Campo   | Valor              |
   |---------|--------------------|
   | Número  | `4242 4242 4242 4242` |
   | Fecha   | Cualquier futura   |
   | CVC     | Cualquier 3 dígitos |
   | CP      | Cualquier válido   |

5. Tras pagar, recibes email de confirmación (y enlace de videollamada si es online).

---

## Lo que **NO** necesitas hacer

| No hagas esto                         | Por qué                                      |
|---------------------------------------|----------------------------------------------|
| Tutorial **Planos** de Stripe Workbench | Es para suscripciones/planes, no para citas |
| Crear **Payment Links** para sesiones | Cal.com cobra con su integración nativa      |
| Checkout personalizado en la web      | La web solo embebe Cal.com                   |
| Webhooks ni código Stripe en el repo | Cal.com gestiona el cobro al reservar        |

---

## Resumen del flujo

```
Paciente → Web /reserva o cal.com/maria-vega/…
        → Elige día y hora en Cal.com
        → Paga con Stripe (conectado vía Cal.com)
        → Cita confirmada + email
```

**Cuenta Stripe:** `acct_1TYwnb98HO6PKIMC` (*María Vega Psicóloga*)

Si algo falla al pagar, revisa primero el paso 1 (Stripe conectado en Cal.com) y que ambos event types tengan pago activado en EUR.
