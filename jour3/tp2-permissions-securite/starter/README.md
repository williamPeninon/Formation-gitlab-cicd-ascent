# taskflow-api — TP 3.2 : Configurer des permissions pour sécuriser un projet GitLab

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.
`taskflow-api` est désormais un projet mature, outillé en CI/CD (Jour 2).
Avant de l'ouvrir à davantage de contributeurs, vous devez sécuriser son
organisation.

## Contenu de ce dossier

```
starter/
  server.js, public/, test/, package.json, package-lock.json
  Dockerfile, scripts/deployer.sh
  .gitlab-ci.yml       <- pipeline complet du Jour 2 (build/test/package/deploy)
  CODEOWNERS           <- modèle à compléter (consigne 2)
  INSTRUCTIONS.md       <- chaîne de test fictive pour le job de détection de secret
```

## Ce que vous devez faire

1. Dans **Settings > Repository > Protected branches**, protégez `main` :
   push direct interdit, fusion réservée aux Maintainers, ≥1 approbation
   requise, pipeline réussi obligatoire.
2. Complétez le fichier `CODEOWNERS` (modèle fourni) : un propriétaire pour
   `.gitlab-ci.yml`, un autre pour `/scripts/`.
3. Dans **Settings > Merge requests**, activez l'exigence d'approbation des
   Code Owners.
4. Ajoutez au `.gitlab-ci.yml` l'inclusion du template
   `Security/Secret-Detection.gitlab-ci.yml` :

```yaml
include:
  - template: Security/Secret-Detection.gitlab-ci.yml
```

   Si cette fonctionnalité n'est pas disponible sur l'instance utilisée,
   ajoutez à la place un job de substitution qui simule une détection de
   secret par expression régulière simple (voir un exemple de job
   `detection_secrets_grep` dans le corrigé, à titre d'inspiration — essayez
   d'abord de l'écrire vous-même).
5. Testez de bout en bout : branche → modification de `.gitlab-ci.yml` → MR →
   vérifiez que l'approbation du Code Owner désigné est exigée.
6. Committez la chaîne de test fournie dans `INSTRUCTIONS.md` et vérifiez que
   le job de détection la repère.
7. Retirez la chaîne de test, faites approuver par le binôme jouant le rôle
   de Code Owner, fusionnez.

## Lancer en local

```bash
npm ci
npm test
```
