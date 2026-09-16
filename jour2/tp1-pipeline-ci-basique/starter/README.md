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
#   - artifacts : node_modules/, expire_in: 1 hour

# TODO : job "executer_tests" (stage test)
#   - image node:20-alpine
#   - script : npm test
```

3. Poussez la branche, ouvrez la Merge Request, observez le pipeline se
   déclencher (onglet **CI/CD > Pipelines**).
4. Cassez volontairement un test, observez le rouge, corrigez, observez le
   retour au vert.
5. Faites approuver et fusionnez.

## Lancer l'application / les tests en local

```bash
node server.js
npm test
```
