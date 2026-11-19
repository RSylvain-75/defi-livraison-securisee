const valid = require('semver/functions/valid');

function releaseLabel(version) {
  const normalized = valid(version);

  if (normalized === null) {
    throw new Error('Version de livraison invalide');
  }

  return `Livraison ${normalized}`;
}

module.exports = { releaseLabel };

if (require.main === module) {
  const { version } = require('../package.json');
  console.log(releaseLabel(version));
}
