# taskflow-api — TP 1.1 : Créer un projet GitLab et explorer ses fonctionnalités (corrigé)

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.
Ce projet sera versionné, testé, packagé et déployé automatiquement au fil des
trois journées de formation, jusqu'à un pipeline de production sécurisé.

> Cette section a été ajoutée via un commit réalisé **directement depuis
> l'interface web de GitLab** (bouton d'édition du fichier, puis "Commit
> changes" sur la branche `main`), comme demandé à la consigne 6 du TP.

## Contenu de ce dossier

Identique au `starter/` : ce TP ne modifie aucun code, il consiste à créer et
configurer correctement l'espace GitLab qui va accueillir le projet.

```
solution/
  server.js       API HTTP (routes /api/health, /api/tasks)
  public/         page front statique de démonstration
  test/           suite de tests (node --test)
  package.json
```

## Récapitulatif attendu côté GitLab (critères de réussite)

- [x] Groupe `formation-gitlab-cicd` créé, visibilité **Privée**
- [x] Projet `taskflow-api` créé dans ce groupe, description renseignée :
      « API REST de gestion de tâches — projet fil rouge de la formation
      GitLab CI/CD »
- [x] Section "Objectif du projet" ajoutée au `README.md` via un commit web,
      visible dans **Repository > Commits**
- [x] Chaque entrée du menu latéral explorée et décrite en une phrase :

| Menu | Rôle |
|---|---|
| Overview | Vue d'ensemble du projet (README, activité récente, statistiques) |
| Repository | Code source, branches, tags, historique des commits |
| Issues | Suivi des tâches, bugs et demandes à traiter |
| Merge Requests | Propositions de fusion de code, revues et discussions |
| CI/CD | Pipelines, jobs, variables et exécution des tests/déploiements |
| Deployments | Environnements, historique des déploiements, rollback |
| Packages and registries | Registre de conteneurs et de paquets du projet |
| Wiki | Documentation libre du projet, éditable en Markdown |

## Lancer l'application

```bash
node server.js
node --test
```
