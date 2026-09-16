# taskflow-api — TP 2.2 : Déployer une application web sur un environnement de test

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Contexte

Le pipeline CI de `taskflow-api` fonctionne (Module 2.1). Il est temps de
déployer automatiquement l'application sur un environnement de test à chaque
fusion sur `main`.

## Contenu de ce dossier

```
starter/
  server.js, public/, test/, package.json, package-lock.json
  Dockerfile              <- fourni, construit l'image de taskflow-api
  scripts/deployer.sh     <- fourni, simule un déploiement (aucune infra réelle)
  .gitlab-ci.yml          <- pipeline du TP 2.1 (stages build + test uniquement)
```

## Ce que vous devez faire

1. Repartez du `.gitlab-ci.yml` fourni (stages `build` et `test`) et ajoutez
   deux stages : `package` puis `deploy`.
2. Ajoutez un job `construire_image` (stage `package`) :

```yaml
construire_image:
  stage: package
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA
```

3. Dans **Settings > CI/CD > Variables**, créez une variable
   `DEPLOY_ENV_LABEL` (valeur libre, ex. `staging-formation`), cochez
   **Masked**.
4. Ajoutez un job `deployer_staging` (stage `deploy`) :
   - `environment: { name: staging, url: ... }`
   - affiche `$DEPLOY_ENV_LABEL` (pour vérifier qu'elle est bien masquée dans
     les logs)
   - exécute `./scripts/deployer.sh staging $CI_COMMIT_SHORT_SHA`
   - restreint via `rules:` à la branche `main` uniquement.
5. Poussez, ouvrez une MR, fusionnez sur `main`, vérifiez le déclenchement
   automatique du déploiement.
6. Consultez **Deployments > Environments**, faites un second déploiement
   puis testez le **rollback** vers le déploiement précédent.

## Tester `deployer.sh` en local

```bash
chmod +x scripts/deployer.sh
DEPLOY_ENV_LABEL=staging-formation ./scripts/deployer.sh staging abc1234
cat statut-deploiement-staging.txt
```
