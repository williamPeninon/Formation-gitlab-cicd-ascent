# taskflow-api — TP 1.3 : Configurer un workflow Git collaboratif sur GitLab (corrigé)

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Implémentation

La route `PATCH /api/tasks/:id` a été ajoutée dans `server.js`, juste après la
route `DELETE` :

```js
// PATCH /api/tasks/:id — bascule (toggle) du statut "terminé" d'une tâche
// Implémente l'issue GitLab "Ajouter le marquage d'une tâche comme terminée".
const patchMatch = method === 'PATCH' && url.match(/^\/api\/tasks\/([^/]+)$/);
if (patchMatch) {
  const id = patchMatch[1];
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return sendJson(res, 404, { error: 'Tâche non trouvée' });
  }
  task.done = !task.done;
  return sendJson(res, 200, task);
}
```

Deux tests ont été ajoutés dans `test/tasks.test.js` : la bascule effective du
champ `done` (aller-retour), et le cas d'un identifiant inconnu (`404`).

## Cycle GitLab de référence

1. **Issue** « Ajouter le marquage d'une tâche comme terminée » — label
   `feature`, assignee : l'auteur du changement.
2. **Merge Request** générée depuis l'issue (branche
   `12-ajouter-le-marquage-d-une-tache-comme-terminee` par exemple),
   description contenant `Closes #12`.
3. **Revue croisée** : le binôme relit le diff, laisse un commentaire sur la
   ligne de la regex `/^\/api\/tasks\/([^/]+)$/`, l'auteur répond et résout la
   discussion.
4. **Approbation** du reviewer, puis **fusion** avec suppression de la branche
   source — l'issue #12 se ferme automatiquement.

## Vérifier

```bash
node server.js &
curl -X PATCH http://localhost:3000/api/tasks/<id-d-une-tache>
node --test
```
