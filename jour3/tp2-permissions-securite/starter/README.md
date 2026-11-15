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
  .gitlab-ci.yml       <- pipeline du Jour 2 + job detection_secrets_grep à compléter
  CODEOWNERS           <- modèle à compléter (consigne 2)
  INSTRUCTIONS.md       <- chaîne de test fictive pour le job de détection de secret
```

> **Offre GitLab requise** : les approbations obligatoires et l'approbation
> des Code Owners (consignes 1 et 3) nécessitent l'offre **Premium** ou
> **Ultimate**. Sur GitLab.com, le formateur active un essai gratuit
> Ultimate (30 jours) sur le groupe de la formation. Sans cela, réalisez
> les autres règles et observez simplement l'affichage des Code Owners
> dans la Merge Request.

## Ce que vous devez faire

1. Protégez `main` :
   - dans **Settings > Repository > Protected branches** : *Allowed to push
     and merge* = **No one**, *Allowed to merge* = **Maintainers** ;
   - dans **Settings > Merge requests** : cochez *Pipelines must succeed*
     et *All threads must be resolved*, puis créez une règle d'approbation
     exigeant **1 approbation** (Premium).
2. Complétez le fichier `CODEOWNERS` (modèle fourni) : un propriétaire pour
   `.gitlab-ci.yml`, un autre pour `/scripts/`.
3. Dans **Settings > Repository > Protected branches**, activez l'option
   **Code owner approval** sur `main` (Premium).
4. Complétez le job `detection_secrets_grep` fourni dans `.gitlab-ci.yml`
   (voir les deux `TODO`) : il doit rechercher le format de la chaîne de
   test décrit dans `INSTRUCTIONS.md` et échouer s'il la trouve. En
   complément facultatif, vous pouvez décommenter l'inclusion du template
   officiel `Security/Secret-Detection.gitlab-ci.yml` (lisez d'abord ce
   qu'en dit `INSTRUCTIONS.md`).
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
