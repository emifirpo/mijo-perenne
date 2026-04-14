import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(2),
  zona: z.string().min(2),
  contacto: z.string().min(6),
  mensaje: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Configuración con Resend
    // Para activar: npm install resend y agregar RESEND_API_KEY en .env.local
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "Sitio Mijo Grand <noreply@tudominio.com>",
    //   to: "sandro@tumail.com",
    //   subject: `Nueva consulta de ${data.nombre} — ${data.zona}`,
    //   text: `
    //     Nombre: ${data.nombre}
    //     Zona: ${data.zona}
    //     Contacto: ${data.contacto}
    //     Mensaje: ${data.mensaje || "(sin mensaje)"}
    //   `,
    // });

    // Por ahora: log de la consulta (reemplazar con Resend en producción)
    console.log("[Consulta recibida]", {
      nombre: data.nombre,
      zona: data.zona,
      contacto: data.contacto,
      mensaje: data.mensaje,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Error contacto]", err);
    return NextResponse.json({ error: "Error al procesar la consulta" }, { status: 400 });
  }
}
