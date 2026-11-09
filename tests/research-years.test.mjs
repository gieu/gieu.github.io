import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../src/pages/research.astro', import.meta.url), 'utf8');
const rangeCode = source.slice(source.indexOf('const aniosValidos ='), source.indexOf('const anioMax =')) + source.match(/const anioMax = [^;]+;/)[0];
const yearCode = source.match(/const anio = parseInt\(tarjeta.dataset.anio[^;]+;/)[0];
const normalizedYear = source.match(/anio: (Number.isFinite\(anio\)[^,]+),/)[1];
const filterCode = source.match(/const coincideAnio = [^;]+;/)[0];
const years = ['1985', '1990', '2001', '2010', '2024', '2099', 'Sin año', '', '0'];
const { min, max } = runInNewContext(`${rangeCode}\n({ min: anioMin, max: anioMax })`, {
  publicaciones: years.map((anio) => ({ anio })),
});
assert.equal(min, 2001);
assert.equal(max, 2024);
for (const year of years) {
  const anio = runInNewContext(`${yearCode}\n${normalizedYear}`, { tarjeta: { dataset: { anio: year } } });
  const matches = (desde, hasta) => runInNewContext(`${filterCode}\ncoincideAnio`, {
    item: { anio }, anioDesde: desde, anioHasta: hasta,
    sinLimiteInferior: desde === min, sinLimiteSuperior: hasta === max,
  });
  assert.equal(matches(min, max), true, `Initial range must include ${year}`);
  if (anio !== null) {
    assert.equal(matches(2005, 2020), anio >= 2005 && anio <= 2020);
    assert.equal(matches(min, 2010), anio <= 2010);
    assert.equal(matches(2010, max), anio >= 2010);
  }
}
console.log('Publication years: full initial range, missing years and narrowed filters passed.');
