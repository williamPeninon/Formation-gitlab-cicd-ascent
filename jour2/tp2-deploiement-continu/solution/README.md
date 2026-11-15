# taskflow-api — TP 2.2 : Déployer une application web sur un environnement de test (corrigé)

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.

## Pipeline complet (4 stages)

Voir `.gitlab-ci.yml` : `build → test → package → deploy`.

- **`construire_image`** (stage `package`) : construit l'image Docker à
  partir du `Dockerfile` fourni et la pousse dans `$CI_REGISTRY_IMAGE`
  (Container Registry intégré au projet GitLab), taguée avec
  `$CI_COMMIT_SHORT_SHA`. Restreint à `main` via `rules:`.
- **`deployer_staging`** (stage `deploy`) : job lié à l'environnement GitLab
  `staging` (`environment.name` + `environment.url`), qui affiche la variable
  `DEPLOY_ENV_LABEL` — vous devez constater qu'elle apparaît comme
  `[MASKED]` dans les logs du job, jamais en clair — puis exécute
  `scripts/deployer.sh staging $CI_COMMIT_SHORT_SHA`.

## Variable CI/CD à créer

| Nom | Valeur | Options |
|---|---|---|
| `DEPLOY_ENV_LABEL` | `staging-formation` (exemple) | Masked |

## Vérification attendue

1. Fusion sur `main` → pipeline à 4 stages, tous verts.
2. Onglet **Operate > Environments** : environnement `staging` visible,
   avec l'URL renseignée et l'historique du déploiement.
3. Un second déploiement (après une modification mineure du code) apparaît
   dans l'historique ; un **rollback** vers le déploiement précédent est
   réalisable en un clic depuis cet onglet.
4. Les logs du job `deployer_staging` affichent `Label d'environnement:
   [MASKED]`, jamais la valeur réelle de `DEPLOY_ENV_LABEL`.

## Lancer en local

```bash
npm ci
npm test
docker build -t taskflow-api:local .
chmod +x scripts/deployer.sh
DEPLOY_ENV_LABEL=staging-formation ./scripts/deployer.sh staging abc1234
```
