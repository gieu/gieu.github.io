import * as cheerio from "cheerio";
import type { Element } from "domhandler";

// URL del grupo de investigación en Scienti.
const SCIENTI_URL =
  "https://scienti.minciencias.gov.co/gruplac/jsp/visualiza/visualizagr.jsp?nro=00000000008079";

type Publicacion = {
  numero: string;
  titulo: string;
  revistaPais: string;
  anio: string | null;
  autores: string | null;
};

// Normaliza texto para poder comparar publicaciones sin duplicados por título + año.
function normalizarClave(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const prerender = false;

export async function GET() {
  // 1) Descargamos el HTML de Scienti con la codificación ISO-8859-1.
  const response = await fetch(SCIENTI_URL);
  if (!response.ok) {
    throw new Error(`Error al consultar Scienti: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  const html = new TextDecoder("iso-8859-1").decode(buffer);
  const $ = cheerio.load(html);

  // 2) Recorremos todas las celdas de encabezado para localizar la sección de publicaciones.
  const publicaciones: Publicacion[] = [];
  const clavesVistas = new Set<string>();

  $("td.celdaEncabezado").each((_index: number, headerTd: Element) => {
    const encabezado = $(headerTd).text().toLowerCase();
    if (!encabezado.includes("publicad")) {
      return;
    }

    // 3) La tabla de publicaciones está justo después del encabezado de esa sección.
    const filaEncabezado = $(headerTd).closest("tr");
    const filasSeccion = filaEncabezado.nextAll("tr");

    filasSeccion.each((_rowIndex: number, tr: Element) => {
      const fila = $(tr);

      // Si encontramos otro bloque de encabezado, detenemos la sección.
      if (fila.find("td.celdaEncabezado").length > 0) {
        return false;
      }

      const celdas = fila.children("td");
      if (celdas.length < 2) {
        return;
      }

      // 4) Cada publicación parece llegar con 2 columnas: icono y contenido útil.
      const celdaContenido = celdas.eq(1);
      if (!celdaContenido.hasClass("celdas1") && !celdaContenido.hasClass("celdas0")) {
        return;
      }

      // 5) Los nodos de texto relevantes siguen el formato:
      // textNodes[0] = número, [1] = título, [2] = revista/país.
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

      // 6) El año se toma como el último año del texto completo, usando el patrón 19xx/20xx.
      const textoCompleto = celdaContenido.text().replace(/\s+/g, " ").trim();
      const years = textoCompleto.match(/\b(?:19|20)\d{2}\b/g);
      const anio = years && years.length > 0 ? years[years.length - 1] : null;

      // 7) Los autores siempre aparecen al final con el prefijo "Autores:".
      const autoresMatch = textoCompleto.match(/Autores:\s*(.*)/i);
      const autores = autoresMatch ? autoresMatch[1].trim() : null;

      // 8) Duplicados: si el mismo título aparece en el mismo año repetido, se ignora.
      const clave = `${normalizarClave(titulo)}|${normalizarClave(anio ?? "")}`;
      if (clavesVistas.has(clave)) {
        return;
      }

      clavesVistas.add(clave);
      publicaciones.push({ numero, titulo, revistaPais, anio, autores });
    });

    return false;
  });

  const data = { publicaciones };
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
