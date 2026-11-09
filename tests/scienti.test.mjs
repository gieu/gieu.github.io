import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/pages/api/publicaciones.json.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const code = outputText.replace('"cheerio"', JSON.stringify(import.meta.resolve('cheerio')));
const originalFetch = globalThis.fetch;
const originalError = console.error;
let requests = 0;
let fail = false;
globalThis.fetch = async () => {
  requests++;
  if (fail) throw new Error('Simulated outage');
  return new Response('<table><tr><td class="celdaEncabezado">Libros publicados</td></tr><tr><td>1</td><td class="celdas1">1.- Libro: Test Colombia, 2024, ISBN: 1234567890 Autores: Autor</td></tr></table>');
};
console.error = () => {};
try {
  const api = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  const [first, concurrent] = await Promise.all([api.obtenerSeccionesScienti(), api.obtenerSeccionesScienti()]);
  assert.equal(requests, 1);
  assert.strictEqual(first, concurrent);
  assert.equal(first.librosPublicados.length, 1);
  assert.strictEqual(await api.obtenerSeccionesScienti(), first);
  assert.equal(requests, 1);
  fail = true;
  assert.strictEqual(await api.obtenerSeccionesScienti(true), first);
  assert.equal(requests, 2);
  assert.strictEqual(await api.obtenerSeccionesScienti(), first);
  assert.equal(requests, 2);
  console.log('Scienti: extraction, concurrent requests, cache, refresh and outage fallback passed.');
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalError;
}
