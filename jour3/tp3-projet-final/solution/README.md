# taskflow-api

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab
CI/CD, versionné, testé, packagé et déployé automatiquement, avec branche
`main` protégée et scan de sécurité intégré.

## Lancer en local

```bash
npm ci
npm test
node server.js
```

## Architecture CI/CD

Le pipeline `.gitlab-ci.yml` comporte 5 stages exécutés à chaque push :

```
build → test → securite → package → deploy
```

- **`build`** : `installer_dependances` vérifie l'installation des
  dépendances via `npm ci` (le projet n'en a aucune).
- **`test`** : `executer_tests` exécute la suite `node --test` et publie le
  rapport JUnit `rapport-tests.xml` (onglet Tests du pipeline).
- **`securite`** : `detection_secrets_grep` recherche tout motif ressemblant
  à un secret committé par erreur, et fait échouer le pipeline le cas
  échéant.
- **`package`** : `construire_image` construit l'image Docker de l'API et la
  pousse dans le Container Registry du projet (restreint à `main`).
- **`deploy`** : `deployer_staging` déploie automatiquement sur
  l'environnement `staging` à chaque fusion sur `main`, via
  `scripts/deployer.sh` et une variable `DEPLOY_ENV_LABEL` masquée.

La branche `main` est protégée (push direct interdit, ≥1 approbation,
pipeline réussi obligatoire) et un fichier `CODEOWNERS` impose la revue du
propriétaire de plateforme sur `.gitlab-ci.yml`, `/scripts/` et `/Dockerfile`.

## Positionnement sur la grille de maturité

**Avancé.** Le projet dispose d'un pipeline CI/CD complet et automatisé
jusqu'au déploiement en environnement de test (`staging`), avec branches
protégées, revue obligatoire par Code Owners et détection de secrets
intégrée au pipeline. Il ne franchit pas encore le niveau "Mature" faute de
déploiement automatisé en production (celui-ci resterait, dans un contexte
réel, soumis à une validation manuelle `when: manual`) et faute de
parallélisation avancée des jobs (`needs:` n'est pas utilisé sur ce pipeline
consolidé, à la différence de l'exercice d'optimisation du Jour 2).

## Piste d'amélioration

Avec un jour de formation supplémentaire, l'amélioration prioritaire serait
d'ajouter un job de déploiement en `production` avec `when: manual` et
`environment.name: production`, accompagné d'un webhook de notification
automatique vers un outil de messagerie d'équipe en cas d'échec — afin de
compléter la chaîne complète "review → staging → production" évoquée au
Module 3.1, et de réduire encore le délai de détection d'un incident.
