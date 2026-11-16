# TP 3.1 : Concevoir une architecture DevOps complète pour un projet réel

## Contexte

Votre organisation souhaite généraliser à plusieurs équipes l'approche
GitLab CI/CD pratiquée sur `taskflow-api` pendant les deux premiers jours.
Vous devez formaliser une proposition d'architecture DevOps qui pourra servir
de référence commune.

## Ce que vous devez faire

1. Choisissez un contexte applicatif réaliste : le vôtre si possible, ou l'un
   des deux scénarios décrits dans `scenarios.md`.
2. Répondez par écrit aux 4 questions structurantes vues en théorie (Module
   3.1) : nombre d'environnements, rythme de livraison, validations humaines
   obligatoires, outils existants à intégrer.
3. Schématisez les environnements retenus et les règles de promotion de l'un
   à l'autre.
4. Indiquez, pour chaque transition, l'événement GitLab déclencheur et si une
   validation manuelle est requise.
5. Identifiez au moins une intégration externe pertinente.
6. Esquissez une structure de groupes/sous-groupes GitLab avec un exemple de
   configuration héritée au niveau du groupe.
7. Rédigez le tout dans un fichier `ARCHITECTURE.md` à la racine de votre
   projet `taskflow-api` (ou dans une page du Wiki du projet), comme s'il
   devait être publié dans un Wiki GitLab.

Un schéma simple (rectangles en texte, ou dessiné à la main puis pris en
photo) suffit largement — la clarté prime sur l'esthétique.

## Livrable attendu

Un fichier `ARCHITECTURE.md` (ou une page Wiki) répondant à l'ensemble des points ci-dessus,
présentable à l'oral en 3 minutes maximum. Un exemple corrigé (sur le
scénario B) est fourni dans `solution/README.md` de ce dépôt pédagogique à
titre d'illustration — comparez-le à votre propre production après
l'exercice, ne le consultez pas avant.
