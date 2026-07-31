import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

/* ────────────────────────────────────────────────────────────────────────────
   Motor de análisis público. Es la versión web del auditor que usamos en
   prospección, con la misma regla de oro: si el sitio bloquea la revisión
   (403 / 429 / muro anti-bot), NO se afirma nada. Decir "tu sitio está muerto"
   cuando está vivo destruye la credibilidad de todo el diagnóstico.
   Y el marco es siempre sumar: primero lo que ya está bien, luego lo que falta.
   ──────────────────────────────────────────────────────────────────────────── */

const NAV = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "es-MX,es;q=0.9,en;q=0.8",
};

// Códigos que significan "no me dejó ver", nunca "está caído".
const BLOQUEO = new Set([401, 403, 405, 406, 409, 418, 429, 502, 503, 504, 520, 521, 522, 523, 524]);

type Hallazgo = { titulo: string; detalle: string };

function limpiaDominio(entrada: string): string | null {
  let s = (entrada || "").trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "").trim();
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(s)) return null;
  // Nunca dejar que el analizador toque red interna (SSRF).
  if (
    /^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.|\[?::1)/.test(s) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(s) ||
    s.endsWith(".local") || s.endsWith(".internal")
  ) return null;
  return s;
}

function plataforma(low: string): string {
  if (/wp-content|wp-includes/.test(low)) return "WordPress";
  if (/wix\.com|wixstatic/.test(low)) return "Wix";
  if (/cdn\.shopify|shopify/.test(low)) return "Shopify";
  if (/squarespace/.test(low)) return "Squarespace";
  if (/webflow/.test(low)) return "Webflow";
  if (/godaddy|starfield/.test(low)) return "GoDaddy";
  return "a la medida";
}

async function traer(url: string, ms = 15000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  const t0 = Date.now();
  try {
    const r = await fetch(url, { headers: NAV, redirect: "follow", signal: ctrl.signal });
    const html = (await r.text()).slice(0, 400000);
    return { ok: true as const, status: r.status, url: r.url, html, seg: (Date.now() - t0) / 1000 };
  } catch {
    return { ok: false as const, status: 0, url, html: "", seg: (Date.now() - t0) / 1000 };
  } finally {
    clearTimeout(t);
  }
}

export async function POST(req: NextRequest) {
  let cuerpo: { sitio?: string };
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida." }, { status: 400 });
  }

  const dom = limpiaDominio(cuerpo.sitio || "");
  if (!dom) {
    return NextResponse.json(
      { error: "Escribe una dirección válida, por ejemplo: minegocio.com.mx" },
      { status: 400 }
    );
  }

  let res = await traer(`https://${dom}`);
  if (!res.ok || res.status >= 400) {
    const alt = await traer(`https://www.${dom}`);
    if (alt.ok && alt.status < 400) res = alt;
    else if (!res.ok) {
      const http = await traer(`http://${dom}`);
      if (http.ok && http.status < 400) res = http;
    }
  }

  if (!res.ok) {
    return NextResponse.json({
      estado: "sin_respuesta",
      dominio: dom,
      mensaje:
        "No pudimos abrir el sitio desde aquí. Puede ser que el dominio esté en proceso, que el servidor esté tardando, o que bloquee revisiones automáticas. Si quieres, lo revisamos a mano y te decimos qué encontramos.",
    });
  }

  const low = res.html.toLowerCase();
  const muro = /just a moment|attention required|checking your browser|cf-browser-verification/.test(low);

  if (muro || BLOQUEO.has(res.status)) {
    return NextResponse.json({
      estado: "protegido",
      dominio: dom,
      mensaje:
        "Tu sitio tiene una protección que bloquea las revisiones automáticas. Eso en sí no es malo — significa que hay un escudo activo —, pero desde aquí no podemos medirlo con honestidad. Con gusto lo revisamos a mano.",
    });
  }

  const m = {
    seg: Math.round(res.seg * 10) / 10,
    https: res.url.startsWith("https"),
    movil: /name=["']viewport/.test(low),
    video: /<video\b|youtube\.com\/embed|player\.vimeo/.test(low),
    whatsapp: /wa\.me|api\.whatsapp|whatsapp:\/\//.test(low),
    og: /property=["']og:image/.test(low),
    desc: /name=["']description/.test(low),
    schema: /application\/ld\+json/.test(low),
    analytics: /googletagmanager|google-analytics|gtag\(|fbq\(/.test(low),
    forma: /<form\b/.test(low),
    redes: /instagram\.com|facebook\.com|linkedin\.com/.test(low),
    imgs: (low.match(/<img\b/g) || []).length,
    plataforma: plataforma(low),
    anio: (() => {
      // Sin matchAll: el tsconfig del proyecto apunta a un target por debajo de ES2015.
      const crudos = low.match(/(?:©|&copy;|copyright)\D{0,25}(20[0-2]\d)/g) || [];
      let max: number | null = null;
      for (const c of crudos) {
        const y = Number((c.match(/20[0-2]\d/) || [])[0]);
        if (y && (max === null || y > max)) max = y;
      }
      return max;
    })(),
    titulo: (res.html.match(/<title[^>]*>([^<]{0,90})/i)?.[1] || "").trim(),
  };

  const bueno: Hallazgo[] = [];
  const opor: Hallazgo[] = [];

  if (m.https) bueno.push({ titulo: "Conexión segura", detalle: "Tu sitio usa HTTPS: el navegador muestra el candado y no marca advertencias." });
  else opor.push({ titulo: "Certificado de seguridad", detalle: "Sin HTTPS, los navegadores muestran un aviso de “sitio no seguro” antes de que la gente vea nada. Se resuelve en un día." });

  if (m.movil) bueno.push({ titulo: "Se adapta al celular", detalle: "El sitio está preparado para pantallas chicas." });
  else opor.push({ titulo: "Experiencia en celular", detalle: "Hoy la mayoría de quien te busca lo hace desde el teléfono. Dejar el sitio pensado primero para móvil suele ser el cambio que más se nota." });

  if (m.seg < 3) bueno.push({ titulo: "Carga rápido", detalle: `Respondió en ${m.seg}s, dentro de lo que la gente tolera.` });
  else opor.push({ titulo: "Velocidad", detalle: `Tardó ${m.seg}s en responder. Optimizando imágenes y carga se puede llevar debajo de 2s, que es donde la gente ya no se va antes de ver nada.` });

  if (m.imgs >= 8) bueno.push({ titulo: "Material visual propio", detalle: `Encontramos ${m.imgs} imágenes: hay con qué contar tu historia.` });
  if (m.forma) bueno.push({ titulo: "Captura contactos", detalle: "Tienes formulario para que la gente te deje sus datos." });
  if (m.redes) bueno.push({ titulo: "Conectado a tus redes", detalle: "El sitio liga tus perfiles sociales." });
  if (m.schema) bueno.push({ titulo: "Datos estructurados", detalle: "Le explicas a Google qué tipo de negocio eres. Pocos lo tienen." });

  if (m.whatsapp) bueno.push({ titulo: "WhatsApp directo", detalle: "La gente te puede escribir con un toque." });
  else opor.push({ titulo: "Contacto directo por WhatsApp", detalle: "Un botón flotante que abra el chat con mensaje precargado. En México convierte mucho mejor que un formulario." });

  if (m.video) bueno.push({ titulo: "Usa video", detalle: "El movimiento retiene mucho más que el texto." });
  else opor.push({ titulo: "Movimiento y video", detalle: "Un video de tu negocio, producto o equipo transmite en tres segundos lo que al texto le toma párrafos." });

  if (m.analytics) bueno.push({ titulo: "Ya mides visitas", detalle: "Tienes analítica instalada." });
  else opor.push({ titulo: "Medición", detalle: "Sin analítica no hay forma de saber cuánta gente llega ni qué busca, y por lo tanto tampoco qué está funcionando." });

  if (!m.og) opor.push({ titulo: "Vista previa al compartir", detalle: "Cuando alguien pega tu liga en WhatsApp o LinkedIn aparece sin imagen ni descripción. Se configura una vez y luce profesional para siempre." });
  if (!m.desc) opor.push({ titulo: "Presentación en Google", detalle: "Falta la descripción que aparece bajo el título en los resultados de búsqueda." });
  if (m.anio && m.anio <= new Date().getFullYear() - 3)
    opor.push({ titulo: "Señal de actualidad", detalle: `El pie de página aún marca ${m.anio}. Refrescar contenido comunica que el negocio está activo y creciendo.` });

  // Salud del sitio 0-100 (más alto es mejor, como PageSpeed).
  const total = bueno.length + opor.length;
  const salud = total ? Math.max(5, Math.min(100, Math.round((bueno.length / total) * 100))) : 50;

  return NextResponse.json({
    estado: "ok",
    dominio: dom,
    url: res.url,
    titulo: m.titulo,
    plataforma: m.plataforma,
    salud,
    carga: m.seg,
    movil: m.movil,
    bueno,
    oportunidades: opor,
  });
}
