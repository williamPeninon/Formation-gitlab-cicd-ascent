# taskflow-api — TP 3.2 : Configurer des permissions pour sécuriser un projet GitLab (corrigé)

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Protection de la branche `main`

| Règle | Où la configurer | Offre |
|---|---|---|
| Autoriser à pousser : Personne (No one) | Settings > Repository > Protected branches | Toutes |
| Autoriser à fusionner : Maintainers | Settings > Repository > Protected branches | Toutes |
| Approbation des Code Owners (*Code owner approval*) | Settings > Repository > Protected branches | Premium |
| Pipeline réussi obligatoire (*Pipelines must succeed*) | Settings > Merge requests | Toutes |
| Discussions résolues obligatoires | Settings > Merge requests | Toutes |
| 1 approbation minimum (règle d'approbation) | Settings > Merge requests | Premium |

## `CODEOWNERS`

Voir le fichier `CODEOWNERS` : propriétaires désignés pour `.gitlab-ci.yml`,
`/scripts/` et `/Dockerfile`. Combiné à l'option **Code owner approval**
de la branche protégée `main` (Settings > Repository > Protected branches,
offre Premium), toute Merge Request modifiant
l'un de ces chemins exige l'approbation explicite du Code Owner désigné avant
que le bouton de fusion ne s'active.

## Détection de secret

Le pipeline inclut un job `detection_secrets_grep` (stage `securite`) qui
recherche le motif `FORMATION_FAKE_SECRET_[A-Za-z0-9]{16,}` dans le code
source et fait échouer le pipeline s'il le trouve — voir `INSTRUCTIONS.md`
pour la chaîne de test fictive utilisée pour valider ce mécanisme.

Le template officiel `Security/Secret-Detection.gitlab-ci.yml` (en
commentaire dans le pipeline) peut être activé **en complément** : il
couvre les vrais formats de secrets (jetons GitLab, clés AWS, clés
privées…) mais ne reconnaît pas la chaîne fictive de la formation. Il ne
remplace donc pas le job de substitution pour la consigne 6.

## Vérification de bout en bout

1. Une Merge Request modifiant `.gitlab-ci.yml` exige bien l'approbation du
   Code Owner désigné avant que "Merge" ne soit cliquable.
2. Le commit de test contenant `FORMATION_FAKE_SECRET_7f3a9c2e1b8d4f60` fait
   échouer le job `detection_secrets_grep` avec un message explicite.
3. Une fois la chaîne retirée et la MR approuvée par le Code Owner, la fusion
   se déroule normalement, sans contournement des règles.

## Lancer en local

```bash
npm ci
npm test
```
