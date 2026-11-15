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
  # taskflow-api n'a aucune dépendance npm : npm ci vérifie la cohérence du
  # package-lock.json mais ne crée pas de node_modules/ (rien à transmettre).
  script:
    - npm ci

executer_tests:
  stage: test
  image: node:20-alpine
  script:
    # Deux rapports : lisible dans le journal (spec) et JUnit pour GitLab
    - npm test -- --test-reporter=spec --test-reporter-destination=stdout --test-reporter=junit --test-reporter-destination=rapport-tests.xml
  artifacts:
    when: always              # conserver le rapport même si un test échoue
    paths:
      - rapport-tests.xml
    reports:
      junit: rapport-tests.xml  # onglet Tests du pipeline + résumé dans la MR
    expire_in: 1 week
```

## Points clés

- `npm ci` (plutôt que `npm install`) garantit une installation reproductible
  à partir du `package-lock.json` versionné — indispensable en CI.
- `taskflow-api` n'a **aucune dépendance npm** : `npm ci` vérifie que le
  `package-lock.json` est cohérent mais ne crée pas de dossier
  `node_modules/`. Il n'y a donc rien à transmettre entre les deux jobs.
- L'**artifact** du pipeline est le rapport de tests `rapport-tests.xml`
  (format JUnit, produit par le test runner natif de Node). `when: always`
  le conserve même quand un test échoue — c'est justement là qu'il est
  utile. Déclaré aussi dans `reports: junit:`, il alimente l'onglet
  **Tests** du pipeline et le résumé des tests dans la Merge Request
  (disponible sur toutes les offres GitLab).
- L'image `node:20-alpine` est utilisée pour les deux jobs : légère et
  suffisante pour ce projet sans dépendance native.

## Vérification

1. Pipeline visible et automatique sur chaque push (**Build > Pipelines**).
2. L'artifact `rapport-tests.xml` est téléchargeable depuis le job
   `executer_tests`, et l'onglet **Tests** du pipeline affiche les 7 tests.
3. Un test volontairement cassé (par exemple modifier une assertion dans
   `test/tasks.test.js`) fait passer le job `executer_tests` — et donc tout le
   pipeline — au rouge.
4. Une fois corrigé, le pipeline repasse au vert et la Merge Request peut être
   fusionnée.

## Partie B — runner personnel (recommandée, au choix)

Le pipeline corrigé ne contient volontairement **aucun `tags:`** : il
fonctionne aussi bien sur les runners partagés de GitLab.com que sur le
runner personnel d'un participant, à condition que celui-ci soit configuré
pour la suite de la formation :

| Réglage | Où | Pourquoi |
|---|---|---|
| Run untagged jobs : coché | Settings > CI/CD > Runners (modifier le runner) | Le runner prend les jobs sans `tags:` des TP |
| Enable instance runners for this project : désactivé | Settings > CI/CD > Runners | Les jobs ne partent plus sur les runners partagés |
| `privileged = true` | `config.toml`, section `[runners.docker]` | Docker-in-Docker du job `construire_image` (TP 2.2) |
| `volumes = ["/certs/client", "/cache"]` | `config.toml`, section `[runners.docker]` | Partage des certificats TLS du service `docker:dind` avec le job (sinon `Cannot connect to the Docker daemon`) |
| `pull_policy = ["if-not-present"]` | `config.toml` (option `--docker-pull-policy` à l'enregistrement) | Réutiliser les images déjà sur la VM, éviter la limite Docker Hub |
| Un seul runner actif | Bouton Pause sur le second runner | Comportement prévisible pendant les TP |

Vérification : le journal d'un job sans `tags:` affiche « Running on … » avec
le nom du runner personnel. Si le runner est éteint et que les runners
partagés sont désactivés, les jobs restent `pending` : c'est attendu.

## Lancer en local

```bash
npm ci
npm test
```
