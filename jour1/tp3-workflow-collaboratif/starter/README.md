# taskflow-api — TP 1.3 : Configurer un workflow Git collaboratif sur GitLab

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Contexte

L'équipe `taskflow-api` a besoin d'une nouvelle fonctionnalité : la
possibilité de marquer une tâche comme terminée. Vous allez traiter cette
demande en suivant un cycle GitLab complet : issue → branche → Merge Request
→ revue → fusion.

## Ce que vous devez implémenter

Le fichier à compléter est **`server.js`**. Repérez le commentaire `TODO`
dans la fonction `handleRequest` :

```js
// TODO (TP "Collaboration avec GitLab" — Jour 1) :
//   Ajouter ici la route PATCH /api/tasks/:id permettant de marquer une
//   tâche comme terminée (bascule du champ `done`). Voir l'issue GitLab
//   "Ajouter le marquage d'une tâche comme terminée" et la consigne du TP.
```

Vous devez ajouter une route `PATCH /api/tasks/:id` qui :

1. Recherche la tâche correspondant à l'`id` fourni dans l'URL.
2. Renvoie `404 { error: 'Tâche non trouvée' }` si elle n'existe pas.
3. Sinon, **bascule** (inverse) la valeur booléenne de son champ `done`.
4. Renvoie la tâche mise à jour avec un code `200`.

Inspirez-vous du style des routes déjà existantes (`GET`, `POST`, `DELETE`)
juste au-dessus dans le fichier.

## Étapes GitLab attendues (rappel des consignes du TP)

1. Invitez votre binôme dans votre projet (**Manage > Members**, rôle
   **Developer**) et acceptez son invitation.
2. Créez l'issue « Ajouter le marquage d'une tâche comme terminée » (label
   `feature`, vous-même en assignee).
3. Depuis l'issue, générez la branche et la Merge Request liées (bouton
   "Create merge request").
4. Récupérez la branche localement, complétez `server.js` comme décrit
   ci-dessus.
5. Committez, poussez, complétez la description de la MR (`Closes #<numéro>`),
   retirez le statut Draft.
6. Faites relire par votre binôme (discussion + résolution + approbation),
   puis fusionnez en supprimant la branche source.

## Vérifier votre implémentation

```bash
node server.js &
curl -X PATCH http://localhost:3000/api/tasks/<id-d-une-tache>
```

Un test est fourni dans `test/tasks.test.js` pour les routes existantes ;
n'hésitez pas à vous en inspirer pour écrire vos propres tests de la route
`PATCH` (non obligatoire pour ce TP, mais bonne pratique).

```bash
node --test
```
