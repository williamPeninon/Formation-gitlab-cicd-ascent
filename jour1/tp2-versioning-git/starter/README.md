# taskflow-api — TP 1.2 : Configurer un dépôt Git local, collaborer et résoudre des conflits

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Contenu de ce dossier

Ce dossier reprend l'état de `taskflow-api` à l'issue du TP 1.1. Il contient
en plus `gitignore-modele.txt` : le contenu à utiliser pour créer le fichier
`.gitignore` du projet (consigne 3 du TP).

```
starter/
  server.js
  public/
  test/
  package.json
  gitignore-modele.txt   <- contenu à copier dans un fichier .gitignore
```

## Ce que vous devez faire

1. Clonez votre projet `taskflow-api` (créé au TP 1.1) sur votre machine.
2. Copiez le contenu de `gitignore-modele.txt` dans un nouveau fichier
   `.gitignore` à la racine du dépôt cloné, committez-le sur `main`.
3. Suivez ensuite pas-à-pas les consignes 4 à 9 du TP (support de cours,
   Module 1.2) pour créer deux branches, provoquer un conflit de fusion réel
   sur le `README.md`, puis le résoudre.

## Lancer l'application / les tests

```bash
node server.js
node --test
```
