import * as cheerio from "cheerio";
import type { Element } from "domhandler";

// URL del grupo de investigaciÃ³n en Scienti.
export const SCIENTI_URL =
  "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000008079";

// Base de la API de Crossref para consultar metadata por DOI.
const CROSSREF_BASE = "https://api.crossref.org/works";

// ---------- tipos ----------------------------------------------------------

type PublicacionScienti = {
  numero: string;
  titulo: string;
  revistaPais: string;
  anio: string | null;
  autores: string | null;
  doi: string | null; // DOI en bruto extraÃ­do de Scienti (ej. "10.xxxx/yyyy")
};

// Estructura final que devuelve el endpoint, enriquecida con Crossref.
export type Publicacion = {
  numero: string;
  titulo: string;
  revista: string;
  editorial: string | null;
  anio: string | null;
  autores: string | null;
  doi: string | null;
  url: string | null; // enlace canÃ³nico: URL de Crossref o fallback a doi.org
};

// ---------- cachÃ© en memoria -----------------------------------------------
// Evita consultar Crossref mÃ¡s de una vez por DOI mientras el proceso estÃ¡ vivo.
// En producciÃ³n SSR, el proceso Node persiste entre peticiones, por lo que
// funciona como una cachÃ© "warm" entre usuarios.
const crossrefCache = new Map<string, Publicacion>();

// ---------- helpers ---------------------------------------------------------

// Normaliza texto para comparar publicaciones y deduplicar por tÃ­tulo + aÃ±o.
function normalizarClave(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Extrae el DOI de un enlace href de Scienti.
// Los enlaces pueden tener forma: https://doi.org/10.xxx/yyy o http://dx.doi.org/10.xxx/yyy
function extraerDoi(href: string): string | null {
  const match = href.match(/(?:doi\.org\/)?(10\.\d{4,}\/\S+)/i);
  return match ? match[1].replace(/[.,;)>\]]+$/, "") : null; // limpia trailing chars
}

// Construye el enlace doi.org canÃ³nico a partir del DOI en bruto.
function urlDoi(doi: string): string {
  return `https://doi.org/${doi}`;
}

// Consulta Crossref para un DOI dado y devuelve la publicaciÃ³n enriquecida.
// Retorna null si Crossref no tiene datos o falla la peticiÃ³n.
async function enriquecerConCrossref(
  scienti: PublicacionScienti
): Promise<Publicacion> {
  const { doi } = scienti;

  // Sin DOI no podemos consultar Crossref: devolvemos los datos de Scienti
  // y usamos la pÃ¡gina del grupo como enlace predeterminado.
  if (!doi) {
    return {
      numero: scienti.numero,
      titulo: scienti.titulo,
      revista: scienti.revistaPais,
      editorial: null,
      anio: scienti.anio,
      autores: scienti.autores,
      doi: null,
      url: SCIENTI_URL,
    };
  }

  // Revisamos cachÃ© antes de llamar a la API.
  if (crossrefCache.has(doi)) {
    return crossrefCache.get(doi)!;
  }

  try {
    const res = await fetch(`${CROSSREF_BASE}/${encodeURIComponent(doi)}`, {
      headers: {
        // Buena prÃ¡ctica: Crossref pide identificarse con un User-Agent descriptivo.
        "User-Agent": "GIEU-Site/1.0 (https://grupoinformaticaeducativa.uninorte.edu.co; mailto:cvieira@uninorte.edu.co)",
      },
    });

    if (!res.ok) {
      // Crossref respondiÃ³ con error (404 DOI no encontrado, 429 rate-limit, etc.).
      // Caemos al fallback con datos de Scienti.
      throw new Error(`Crossref ${res.status}`);
    }

    const json = await res.json() as {
      message: {
        title?: string[];
        author?: { given?: string; family?: string }[];
        "published-print"?: { "date-parts"?: number[][] };
        "published-online"?: { "date-parts"?: number[][] };
        "container-title"?: string[];
        publisher?: string;
        DOI?: string;
        URL?: string;
        resource?: { primary?: { URL?: string } };
      };
    };

    const msg = json.message;

    // TÃ­tulo: Crossref entrega un array de strings; tomamos el primero.
    const titulo = msg.title?.[0] ?? scienti.titulo;

    // Autores: concatenamos "Apellido, Nombre" separados por " ; ".
    const autores =
      msg.author && msg.author.length > 0
        ? msg.author
            .map((a) => [a.family, a.given].filter(Boolean).join(", "))
            .join(" ; ")
        : scienti.autores;

    // AÃ±o de publicaciÃ³n: preferimos impreso, sino online.
    const dateParts =
      msg["published-print"]?.["date-parts"]?.[0] ??
      msg["published-online"]?.["date-parts"]?.[0];
    const anio = dateParts ? String(dateParts[0]) : scienti.anio;

    // Revista (container-title) y editorial (publisher).
    const revista = msg["container-title"]?.[0] ?? scienti.revistaPais;
    const editorial = msg.publisher ?? null;

    // URL: primero resource.primary.URL, luego msg.URL, Ãºltimo fallback doi.org.
    const url =
      msg.resource?.primary?.URL ??
      msg.URL ??
      urlDoi(doi);

    const publicacion: Publicacion = {
      numero: scienti.numero,
      titulo,
      revista,
      editorial,
      anio,
      autores,
      doi,
      url,
    };

    crossrefCache.set(doi, publicacion);
    return publicacion;
  } catch {
    // Si Crossref falla por cualquier motivo, usamos los datos de Scienti como respaldo.
    const publicacion: Publicacion = {
      numero: scienti.numero,
      titulo: scienti.titulo,
      revista: scienti.revistaPais,
      editorial: null,
      anio: scienti.anio,
      autores: scienti.autores,
      doi,
      url: doi ? urlDoi(doi) : SCIENTI_URL,
    };

    crossrefCache.set(doi, publicacion);
    return publicacion;
  }
}

// ---------- endpoint --------------------------------------------------------

export const prerender = false;

export async function GET() {
  // 1) Descargamos el HTML de Scienti con la codificaciÃ³n ISO-8859-1.
  const response = await fetch(SCIENTI_URL);
  if (!response.ok) {
    throw new Error(`Error al consultar Scienti: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const html = new TextDecoder("iso-8859-1").decode(buffer);
  const $ = cheerio.load(html);

  // 2) Recorremos todas las celdas de encabezado para localizar la secciÃ³n de publicaciones.
  const publicacionesScienti: PublicacionScienti[] = [];
  const clavesVistas = new Set<string>();

  $("td.celdaEncabezado").each((_index: number, headerTd: Element) => {
    const encabezado = $(headerTd).text().toLowerCase();
    if (!encabezado.includes("publicad")) {
      return;
    }

    // 3) La tabla de publicaciones estÃ¡ justo despuÃ©s del encabezado de esa secciÃ³n.
    const filaEncabezado = $(headerTd).closest("tr");
    const filasSeccion = filaEncabezado.nextAll("tr");

    filasSeccion.each((_rowIndex: number, tr: Element) => {
      const fila = $(tr);

      // Si encontramos otro bloque de encabezado, detenemos la secciÃ³n.
      if (fila.find("td.celdaEncabezado").length > 0) {
        return false;
      }

      const celdas = fila.children("td");
      if (celdas.length < 2) {
        return;
      }

      // 4) Cada publicaciÃ³n viene con 2 columnas: icono y contenido Ãºtil.
      const celdaContenido = celdas.eq(1);
      if (!celdaContenido.hasClass("celdas1") && !celdaContenido.hasClass("celdas0")) {
        return;
      }

      // 5) Los nodos de texto relevantes siguen el formato:
      // textNodes[0] = nÃºmero, [1] = tÃ­tulo, [2] = revista/paÃ­s.
      const textNodes = celdaContenido
        .contents()
        .toArray()
        .filter((node) => node.type === "text")
        .map((node) => ("data" in node && typeof node.data === "string" ? node.data.trim() : ""))
        .filter(Boolean);

      const numero = textNodes[0] ?? "";
      const titulo = textNodes[1] ?? "";
      const revistaPais = textNodes[2] ?? "";

      if (!titulo) {
        return;
      }

      // 6) El aÃ±o se toma como el Ãºltimo aÃ±o del texto completo, usando el patrÃ³n 19xx/20xx.
      const textoCompleto = celdaContenido.text().replace(/\s+/g, " ").trim();
      const years = textoCompleto.match(/\b(?:19|20)\d{2}\b/g);
      const anio = years && years.length > 0 ? years[years.length - 1] : null;

      // 7) Los autores siempre aparecen al final con el prefijo "Autores:".
      const autoresMatch = textoCompleto.match(/Autores:\s*(.*)/i);
      const autores = autoresMatch ? autoresMatch[1].trim() : null;

      // 8) El DOI se extrae de cualquier enlace <a href> dentro de la celda
      // cuyo href contenga "doi.org" o empiece con "10." (formato DOI directo).
      let doi: string | null = null;
      celdaContenido.find("a[href]").each((_i, anchor) => {
        if (doi) return; // ya encontramos uno
        const href = $(anchor).attr("href") ?? "";
        const candidato = extraerDoi(href);
        if (candidato) doi = candidato;
      });
      if (!doi) {
        doi = extraerDoi(textoCompleto);
      }

      // 9) Duplicados: si el mismo tÃ­tulo aparece en el mismo aÃ±o, se ignora.
      const clave = `${normalizarClave(titulo)}|${normalizarClave(anio ?? "")}`;
      if (clavesVistas.has(clave)) {
        return;
      }

      clavesVistas.add(clave);
      publicacionesScienti.push({ numero, titulo, revistaPais, anio, autores, doi });
    });

    return false;
  });

  // 10) Enriquecemos cada publicaciÃ³n con Crossref (en paralelo, acotado a 5
  //     peticiones simultÃ¡neas para respetar el rate-limit de Crossref).
  const CONCURRENCIA = 5;
  const publicaciones: Publicacion[] = [];

  for (let i = 0; i < publicacionesScienti.length; i += CONCURRENCIA) {
    const lote = publicacionesScienti.slice(i, i + CONCURRENCIA);
    const resultados = await Promise.all(lote.map(enriquecerConCrossref));
    publicaciones.push(...resultados);
  }

  const data = { publicaciones };
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}


