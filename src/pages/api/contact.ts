export const prerender = false;

import type { APIRoute } from "astro";

interface ContactPayload {
  nombre?: string;
  email?: string;
  mensaje?: string;
  botField?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    let payload: ContactPayload = {};

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      payload = (await request.json()) as ContactPayload;
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      payload = {
        nombre: formData.get("nombre")?.toString(),
        email: formData.get("email")?.toString(),
        mensaje: formData.get("mensaje")?.toString(),
        botField: formData.get("botField")?.toString(),
      };
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Tipo de contenido no soportado.",
        }),
        {
          status: 415,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const nombre = (payload.nombre || "").trim();
    const email = (payload.email || "").trim();
    const mensaje = (payload.mensaje || "").trim();
    const botField = (payload.botField || "").trim();

    // Honeypot anti-spam verification: if filled, quietly succeed without executing side effects
    if (botField) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Mensaje recibido correctamente.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Input validations
    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Por favor, completa todos los campos requeridos.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "La dirección de correo electrónico introducida no es válida.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // In Cloudflare Worker environment, this log is preserved in Worker Logs & Dashboard
    console.info(
      `[Contacto Web - Mensaje Recibido] De: ${nombre} <${email}>. Mensaje: ${mensaje.slice(0, 100)}...`
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "¡Tu mensaje ha sido enviado correctamente! Responderé a la mayor brevedad posible.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    console.error("[Contacto Web - Error]", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Se produjo un error al procesar el mensaje. Por favor, inténtalo de nuevo más tarde.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
