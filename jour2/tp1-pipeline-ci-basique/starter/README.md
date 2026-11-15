# taskflow-api — TP 2.1 : Créer un pipeline CI basique avec tests automatiques

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Contexte

`taskflow-api` ne dispose encore d'aucune vérification automatique. Chaque
Merge Request est aujourd'hui relue « à l'œil », sans filet de sécurité. Vous
allez mettre en place le tout premier pipeline CI du projet.

## Contenu de ce dossier

L'application et sa suite de tests `node --test` sont déjà présentes et
fonctionnelles. **Aucun fichier `.gitlab-ci.yml` n'existe encore** — c'est ce
que vous devez créer.

```
starter/
  server.js
  public/
  test/
  package.json      <- scripts.test = "node --test"
```

## Ce que vous devez faire

1. Créez une branche `feature/pipeline-ci-basique` et une issue décrivant
   l'objectif.
2. Créez un fichier `.gitlab-ci.yml` à la racine du projet, avec deux stages
   `build` et `test` :

```yaml
stages:
  - build
  - test

# TODO : job "installer_dependances" (stage build)
#   - image node:20-alpine
#   - script : npm ci

# TODO : job "executer_tests" (stage test)
#   - image node:20-alpine
#   - script : npm test, en produisant aussi un rapport JUnit :
#       npm test -- --test-reporter=spec --test-reporter-destination=stdout --test-reporter=junit --test-reporter-destination=rapport-tests.xml
#   - artifacts : rapport-tests.xml (when: always, reports: junit, expire_in: 1 week)
```

3. Poussez la branche, ouvrez la Merge Request, observez le pipeline se
   déclencher (onglet **Build > Pipelines**).
4. Cassez volontairement un test, observez le rouge, corrigez, observez le
   retour au vert.
5. Faites approuver et fusionnez.

## Partie B (30 min, recommandée) — Installer votre propre runner

Tous les participants sont invités à réaliser cette partie, mais **le choix
vous revient**. Sans runner personnel, les runners partagés de GitLab.com
exécutent tous les pipelines de la formation. Avec votre runner, toute la
suite est plus simple : jobs immédiats, aucune dépendance au quota de
minutes ni à la vérification du compte GitLab.com, et un runner concret à
dépanner au Module 2.3.

1. *Settings > CI/CD > Runners > New project runner* : tag `taskflow-local`,
   « Run untagged jobs » décoché. Copiez le token `glrt-…` dans une variable
   de votre terminal (`export RUNNER_TOKEN=...`), jamais dans un fichier.
2. Installez le runner sur votre VM (commandes Docker du support de cours,
   avec `--docker-pull-policy "if-not-present"` à l'enregistrement) et vérifiez qu'il est « en ligne » dans l'interface.
3. Ajoutez `tags: [taskflow-local]` au job `executer_tests`, poussez, et
   repérez « Running on … » dans le journal du job.
4. (Facultatif) Installez un second runner avec le paquet `apt` et comparez
   les deux `config.toml`.
5. Éteignez le runner (`docker stop gitlab-runner`), observez le job rester
   `pending`, rallumez-le.
6. **Si vous gardez votre runner pour la suite** :
   - cochez **Run untagged jobs** sur le runner et désactivez **Enable
     instance runners for this project** (*Settings > CI/CD > Runners*) ;
   - retirez le `tags:` de test du pipeline ;
   - préparez le Docker-in-Docker du TP 2.2 : `privileged = true` **et**
     volume `/certs/client` (sans ce volume, le job échoue avec
     `Cannot connect to the Docker daemon at tcp://docker:2375`) :

```bash
docker exec gitlab-runner sed -i \
  -e 's/privileged = false/privileged = true/' \
  -e 's|volumes = \["/cache"\]|volumes = ["/certs/client", "/cache"]|' \
  /etc/gitlab-runner/config.toml
docker exec gitlab-runner grep -E 'privileged|volumes' /etc/gitlab-runner/config.toml
docker restart gitlab-runner
```

   Si vous avez deux runners, mettez-en un en pause.
7. **Si vous ne le gardez pas** : retirez le `tags:` de test avant la
   fusion ; les runners partagés prennent le relais.

## Lancer l'application / les tests en local

```bash
node server.js
npm test
```
