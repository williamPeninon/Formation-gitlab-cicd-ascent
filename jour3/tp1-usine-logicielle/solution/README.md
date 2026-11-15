# Architecture DevOps — API partenaires (Scénario B)

*Exemple corrigé du TP 3.1, à titre d'illustration d'une réponse complète et
structurée. Votre propre production peut légitimement diverger sur certains
choix, du moment qu'elle est justifiée.*

## 1. Les 4 questions structurantes

- **Nombre d'environnements** : 3 — `review` (par Merge Request, éphémère),
  `staging` (intégration continue de `main`), `production` (partenaires
  externes). Un environnement `review` par MR permet aux partenaires pilotes
  de tester une fonctionnalité avant sa fusion, sans risque pour la
  production.
- **Rythme de livraison** : plusieurs fois par semaine sur `staging`
  (automatique dès la fusion sur `main`) ; en production, au rythme jugé
  nécessaire par l'équipe, mais jamais plus d'une fois par jour ouvré pour
  laisser le temps d'observer chaque déploiement.
- **Validations humaines obligatoires** : aucune sur `review` et `staging`
  (l'objectif est la rapidité de retour) ; **une validation manuelle
  (`when: manual`)** est obligatoire avant tout déploiement en production,
  déclenchée par un Maintainer.
- **Outils existants à intégrer** : la page de statut public (mise à jour
  automatique en cas d'incident de déploiement) et l'outil d'audit de
  sécurité existant (déclenché en amont de la fusion sur `main`).

## 2. Environnements et règles de promotion

```
Merge Request  ──(push)──►  review/<nom-mr>   (automatique, éphémère)
      │
      ▼ (fusion sur main)
    staging   (automatique, dès la fusion)
      │
      ▼ (validation manuelle d'un Maintainer)
   production   (when: manual, déclenché volontairement)
```

## 3. Événements déclencheurs par transition

| Transition | Événement GitLab | Validation manuelle |
|---|---|---|
| MR ouverte → `review` | `push` sur la branche de la MR | Non |
| MR fusionnée → `staging` | fusion sur `main` | Non |
| `staging` → `production` | déclenchement manuel du job `deployer_production` | Oui (`when: manual`, rôle Maintainer) |

## 4. Intégration externe prioritaire

En cas d'échec du job `deployer_production`, un webhook déclenche
automatiquement la mise à jour de la page de statut public (statut
"dégradé") ainsi que l'ouverture d'une issue GitLab dans le projet
d'astreinte, assignée à l'équipe plateforme — afin de raccourcir au maximum
le délai de détection d'un incident visible par les partenaires.

## 5. Structure de groupes/sous-groupes GitLab

```
entreprise/
  plateforme-api/                 <- groupe racine
    api-partenaires/              <- sous-groupe : projet principal (ce dépôt)
    api-partenaires-infra/        <- sous-groupe : Terraform / configuration infra
    equipe-fonctionnalites/       <- sous-groupe : projets applicatifs annexes
    equipe-plateforme/            <- sous-groupe : outils internes, monitoring
```

**Exemple d'héritage au niveau du groupe** : les variables CI/CD sensibles
(jetons du registre de conteneurs, identifiants du fournisseur cloud) sont
définies une seule fois au niveau du groupe `plateforme-api` (Settings >
Settings > CI/CD > Variables, avec l'option **Protected**), et héritées automatiquement
par tous les projets des sous-groupes — évitant toute duplication ou
divergence entre projets.

## Positionnement / bilan

Cette architecture correspond à un niveau de maturité **"Avancé"** sur la
grille du Module 3.3 : environnements multiples avec promotion automatisée
jusqu'à `staging`, mais validation humaine encore nécessaire en production.
Une évolution vers le niveau "Industrialisé" impliquerait un déploiement
progressif (canary/blue-green) automatisé, réduisant encore le délai de
détection d'anomalie avant impact partenaire.
