# taskflow-api — TP 2.3 : Optimiser un pipeline existant pour un projet complexe

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Contexte

Le pipeline de `taskflow-api` fonctionne, mais un collègue a ajouté plusieurs
jobs sans se soucier de la performance d'ensemble : tout s'exécute strictement
en séquence, y compris des jobs totalement indépendants les uns des autres,
et un job d'analyse de style expérimental fait parfois échouer tout le
pipeline pour des raisons mineures.

## Contenu de ce dossier

Le fichier `.gitlab-ci.yml` fourni contient **6 jobs répartis sur 4 stages**,
strictement séquentiels. Les `sleep` simulent des traitements réels pour
rendre la démonstration reproductible. Les jobs marqués `INDÉPENDANT` dans
les commentaires n'ont aucune dépendance réelle sur le stage qui les précède.

```
starter/
  .gitlab-ci.yml    <- pipeline de départ, volontairement inefficace
  docs/api.md       <- utilisé pour tester la règle rules: changes
  server.js, public/, test/, package.json, package-lock.json
```

## Ce que vous devez faire

1. Exécutez ce pipeline tel quel une première fois et notez sa durée totale
   (visible en haut de la vue du pipeline).
2. Identifiez les jobs indépendants (voir commentaires du fichier) et ajoutez
   les `needs:` appropriés pour permettre leur exécution en parallèle.
3. Ajoutez `allow_failure: true` au job `verification_style_experimental`,
   avec un commentaire justifiant ce choix.
4. Ajoutez une règle `rules: changes:` sur `tests_documentation` pour qu'il
   ne se déclenche que si un fichier de `docs/` a été modifié.
5. Poussez, relancez le pipeline, comparez la nouvelle durée totale.
6. Vérifiez le comportement conditionnel de `tests_documentation` en modifiant
   d'abord un fichier hors `docs/`, puis un fichier dans `docs/`.

## Durée théorique de départ

Sans optimisation, la durée totale attendue est d'environ **45 secondes**
(5 + max(15,10) + max(20,8) + 5), les stages s'enchaînant strictement.
