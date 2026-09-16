# taskflow-api — TP 2.1 : Créer un pipeline CI basique avec tests automatiques (corrigé)

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Pipeline `.gitlab-ci.yml`

```yaml
stages:
  - build
  - test

installer_dependances:
  stage: build
  image: node:20-alpine
  script:
    - npm ci
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour

executer_tests:
  stage: test
  image: node:20-alpine
  script:
    - npm test
```

## Points clés

- `npm ci` (plutôt que `npm install`) garantit une installation reproductible
  à partir du `package-lock.json` versionné — indispensable en CI.
- `node_modules/` est exporté en **artifact** avec une expiration d'une heure :
  le job `executer_tests` du stage suivant le récupère automatiquement (les
  artifacts des stages précédents sont disponibles par défaut, sans `needs:`
  explicite).
- L'image `node:20-alpine` est utilisée pour les deux jobs : légère et
  suffisante pour ce projet sans dépendance native.

## Vérification

1. Pipeline visible et automatique sur chaque push (**CI/CD > Pipelines**).
2. Un test volontairement cassé (par exemple modifier une assertion dans
   `test/tasks.test.js`) fait passer le job `executer_tests` — et donc tout le
   pipeline — au rouge.
3. Une fois corrigé, le pipeline repasse au vert et la Merge Request peut être
   fusionnée.

## Lancer en local

```bash
npm ci
npm test
```
