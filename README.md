# TP — Livraison continue et sécurité de la chaîne logicielle

Vous reprenez un projet Node.js minimal qui fonctionne déjà. Un faux jeton est stocké en clair, les dépendances ne sont pas auditées et aucune image Docker n’est publiée. Votre objectif est d’intégrer des contrôles de sécurité à la livraison continue. C’est une mise en pratique du SSDLC (*Secure Software Development Life Cycle*) : intégrer la sécurité tout au long du cycle de développement, plutôt que de la vérifier seulement au moment de livrer.

## Prérequis

- Un dépôt GitHub sur lequel vous pouvez pousser sur `main`, exécuter GitHub Actions, créer un secret Actions et publier une image dans GitHub Packages.
- Node.js 24 et npm en local. Docker est facultatif : l’image sera construite par GitHub Actions.

Importez tous les fichiers du projet dans votre dépôt, y compris les fichiers et dossiers masqués comme `.github/`. Faites un premier push sur `main`, puis ouvrez l’onglet **Actions** pour observer les vérifications déjà en place.

Vérifiez ensuite le fonctionnement du projet en local :

```sh
npm ci --ignore-scripts --no-audit
npm test
npm start
```

## Travail demandé

1. **Retirer le faux jeton des fichiers.** Repérez le faux jeton en clair et remplacez-le par un secret GitHub Actions configuré dans votre dépôt, avec une valeur inventée. Vérifiez que le secret est disponible sans afficher sa valeur dans les journaux. N’utilisez jamais de véritable identifiant d’accès pour ce TP. Expliquez pourquoi, en cas de fuite réelle, il faut révoquer le jeton exposé et le remplacer par un nouveau : le retirer des fichiers ne suffit pas.
2. **Auditer et corriger les dépendances.** Lancez `npm audit`, identifiez l’avis de sécurité initial, corrigez la dépendance concernée et incluez le fichier de verrouillage mis à jour dans votre commit. Ajoutez à la CI un audit npm bloquant. Sa politique doit bloquer les avis d’une gravité égale ou supérieure à celle de l’avis initial. Ne contournez pas ce contrôle.
3. **Construire et analyser l’image.** Après la réussite des tests et de l’audit npm, construisez l’image Docker dans GitHub Actions et analysez cette même image avec Trivy. Une vulnérabilité de gravité élevée (*high*) ou critique (*critical*) pour laquelle un correctif est disponible, ou une erreur de Trivy, doit empêcher la publication.
4. **Publier uniquement l’image analysée.** Publiez l’image sur `ghcr.io` uniquement lors d’un push sur `main`, après la réussite de tous les contrôles. Les pull requests exécutent les vérifications sans pouvoir utiliser le secret de l’exercice ni publier d’image. Pour publier, utilisez l’authentification fournie par GitHub avec les seuls droits nécessaires, indépendamment du faux jeton.

## Critères de validation

1. Le faux jeton n’apparaît plus en clair dans les fichiers actuels. Le workflow utilise le secret Actions sans afficher sa valeur dans les journaux.
2. L’audit npm en CI est bloquant, l’avis initial est corrigé et aucun contournement ne neutralise le contrôle.
3. Les tests passent et GitHub Actions construit l’image Docker.
4. Trivy analyse l’image construite. Toute vulnérabilité bloquante selon la règle de l’étape 3 ou toute erreur du scanner empêche la publication.
5. Seul un push sur `main` dont tous les contrôles ont réussi publie l’image analysée. Une pull request ne publie rien.
6. Un lien pointe vers une exécution GitHub Actions réussie, et la référence complète de l’image permet de la rattacher à cette exécution. L’évaluateur a accès au dépôt et au paquet.

## Rendu

- L’URL de votre dépôt GitHub.
- Le lien vers l’exécution GitHub Actions réussie qui a publié l’image.
- La référence complète de l’image sur `ghcr.io`, avec son tag ou son digest.
- Une brève description de l’avis de sécurité initial et de la correction apportée, sans aucune valeur secrète.

Le paquet peut rester privé si l’évaluateur y a accès.
