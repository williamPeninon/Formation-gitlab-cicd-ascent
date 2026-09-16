# taskflow-api — TP 2.3 : Optimiser un pipeline existant pour un projet complexe (corrigé)

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Optimisations appliquées

1. **`needs: []`** sur `verification_style_experimental` et
   `verification_licences` : ces deux jobs ne dépendent pas réellement de
   `installer_dependances`, ils peuvent démarrer dès le début du pipeline en
   parallèle du stage `installation`.
2. **`allow_failure: true`** sur `verification_style_experimental` : un job
   d'analyse encore expérimental ne doit jamais bloquer tout le pipeline pour
   un faux positif — l'échec reste visible (icône orange) mais n'empêche pas
   la suite.
3. **`rules: changes: [docs/**/*]`** sur `tests_documentation`, combiné à
   `needs: []` : ce job ne s'exécute que si la documentation a changé, et
   démarre immédiatement quand c'est le cas, sans attendre `installation`.
4. **`needs:`** explicite sur `executer_tests` (dépend réellement de
   `node_modules/`) et sur `notifier_resultat` (attend les résultats des
   jobs de vérification et de tests avant de publier le rapport).

## Gain de temps mesuré

| Version | Durée totale théorique | Détail |
|---|---|---|
| Départ (séquentiel) | ~45 s | 5 + max(15,10) + max(20,8) + 5 |
| Optimisée (avec `needs:`) | ~30 s | installer_dependances(5) ∥ licences(10) ∥ style(démarre à 0, finit à 15) ; tests démarre à 5, finit à 25 ; notifier démarre à max(15,25)=25, finit à 30 |

Soit un gain d'environ **33 %**, cohérent avec la fourchette de 30 à 50 %
annoncée en théorie pour ce pipeline d'exercice.

## Comportement conditionnel de `tests_documentation`

- Une modification de `server.js` seul → `tests_documentation` ne se
  déclenche pas.
- Une modification de `docs/api.md` → `tests_documentation` se déclenche.

## Lancer en local

```bash
npm ci
npm test
```
