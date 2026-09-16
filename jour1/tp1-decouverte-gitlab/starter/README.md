# taskflow-api — TP 1.1 : Créer un projet GitLab et explorer ses fonctionnalités

## Objectif du projet

*(à compléter par vous — voir consigne 6 du TP)*

## Contenu de ce dossier

Ce dossier contient le code de départ de **`taskflow-api`**, l'application fil
rouge de toute la formation : une API REST minimaliste de gestion de tâches,
écrite en Node.js natif (aucune dépendance npm à installer).

```
starter/
  server.js       API HTTP (routes /api/health, /api/tasks)
  public/         page front statique de démonstration
  test/           suite de tests (node --test)
  package.json
```

## Lancer l'application

```bash
node server.js
# → taskflow-api démarrée sur http://localhost:3000
```

Puis ouvrez `http://localhost:3000` dans un navigateur, ou testez l'API
directement :

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/tasks
```

## Lancer les tests

```bash
node --test
```

## Ce que vous devez faire

Ce TP ne demande **aucune modification de code**. Il consiste à :

1. Créer votre compte / vous connecter sur GitLab.
2. Créer le groupe `formation-gitlab-cicd` puis le projet `taskflow-api` à
   l'intérieur.
3. **Pousser le contenu de ce dossier** comme premier commit du projet
   (ou recréer l'arborescence en clonant le dépôt vide puis en y copiant ces
   fichiers).
4. Suivre les consignes détaillées du support de cours (Module 1.1 — TP 1.1).

Consultez le support apprenant (PDF) ou demandez au formateur si vous avez un
doute sur une consigne.
