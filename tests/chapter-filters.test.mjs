import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../src/pages/research.astro', import.meta.url), 'utf8');
const ts = await import('typescript');
const block = source.slice(source.indexOf('const capitulos ='), source.indexOf('const limpiarCapitulos ='));
const { outputText } = ts.default.transpileModule(block, { compilerOptions: { target: ts.default.ScriptTarget.ES2022 } });
const chapters = [
  { titulo: 'Educación inclusiva', autores: 'María Pérez', anio: '2001' },
  { titulo: 'Robótica', autores: 'Juan Díaz', anio: '2024' },
  { titulo: 'Anterior', autores: null, anio: '1900' },
  { titulo: 'Futuro', autores: null, anio: '2099' },
  { titulo: 'Sin fecha', autores: null, anio: null },
];
const filter = (query = '') => runInNewContext(`${outputText}\ncapitulosFiltrados`, {
  catalogoScienti: { capitulosLibro: chapters }, Astro: { url: new URL(`https://example.test/web/research?${query}`) },
  anioMin: 2001, anioMax: 2024,
});
assert.equal(filter().length, 5);
assert.equal(filter('capitulos-busqueda=educacion+perez')[0].titulo, chapters[0].titulo);
assert.equal(filter('capitulos-busqueda=inexistente').length, 0);
assert.equal(filter('capitulos-desde=2010&capitulos-hasta=2020').length, 1);
assert.equal(filter('capitulos-hasta=2010').length, 3);
assert.equal(filter('capitulos-desde=2010').length, 3);
assert.equal(filter('capitulos-desde=invalid').length, 5);
assert.equal(filter('capitulos-desde=2024&capitulos-hasta=2001').length, 3);
console.log('Chapter filters: title, author, accents, open bounds, empty results and invalid ranges passed.');
