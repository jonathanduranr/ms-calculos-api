const test = require('node:test');
const assert = require('node:assert');
const { sumar, restar, multiplicar } = require('../src/math');

test('Prueba Unitaria 1: Suma correcta de dos valores', () => {
  const resultado = sumar(2, 3);
  assert.strictEqual(resultado, 5, '2 + 3 debe ser igual a 5');
});

test('Prueba Unitaria 2: Resta correcta de dos valores', () => {
  const resultado = restar(10, 4);
  assert.strictEqual(resultado, 6, '10 - 4 debe ser igual a 6');
});

test('Prueba Unitaria 3: Multiplicación correcta de dos valores', () => {
  const resultado = multiplicar(3, 4);
  assert.strictEqual(resultado, 12, '3 * 4 debe ser igual a 12');
});
