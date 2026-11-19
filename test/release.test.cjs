const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { join } = require('node:path');
const { test } = require('node:test');

const { version } = require('../package.json');

test('normalise la version dans le libellé de livraison', () => {
  const { releaseLabel } = require('../src/release.cjs');

  assert.equal(releaseLabel('v1.2.3'), 'Livraison 1.2.3');
});

test('rejette une version de livraison invalide', () => {
  const { releaseLabel } = require('../src/release.cjs');

  assert.throws(() => releaseLabel('invalide'), {
    message: 'Version de livraison invalide',
  });
});

test('affiche la version du paquet en ligne de commande', () => {
  const script = join(__dirname, '../src/release.cjs');
  const output = execFileSync(process.execPath, [script], { encoding: 'utf8' });

  assert.equal(output, `Livraison ${version}\n`);
});
