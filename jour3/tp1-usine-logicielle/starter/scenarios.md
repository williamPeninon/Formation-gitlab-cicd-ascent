# Scénarios pour le TP 3.1 — Conception d'une usine logicielle DevOps

Choisissez l'un des deux scénarios ci-dessous (ou votre propre contexte
professionnel si vous préférez), puis répondez aux consignes du TP en vous
appuyant sur les éléments fournis.

## Scénario A — Application de gestion documentaire interne

**Contexte** : une direction administrative interne développe une
application web permettant aux agents de déposer, classer et rechercher des
documents officiels (courriers, arrêtés, comptes rendus). L'application est
utilisée uniquement en interne, par environ 200 agents répartis sur plusieurs
sites.

**Éléments connus** :
- Équipe de 4 développeurs, livraisons actuellement manuelles et peu
  fréquentes (environ une fois par mois).
- Une exigence forte de traçabilité : toute mise en production doit pouvoir
  être justifiée (qui a validé, quand, sur quelle version).
- Un serveur de fichiers interne existant doit être intégré (stockage des
  documents), pas de service cloud public autorisé pour cette donnée.
- Un outil de messagerie interne (compatible avec les webhooks sortants)
  existe déjà et pourrait recevoir des notifications automatiques.
- Aucun outil de CI/CD n'est utilisé à ce jour ; le code est déjà versionné
  sur GitLab depuis six mois.

**Questions à considérer en particulier** :
- Combien d'environnements sont réellement nécessaires, sachant l'usage
  interne et le rythme de livraison actuel ?
- Quelle validation humaine est indispensable avant toute mise en production,
  compte tenu de l'exigence de traçabilité ?

---

## Scénario B — API exposée à des partenaires externes

**Contexte** : une entreprise édite une API REST consommée par une dizaine de
partenaires externes (intégrateurs tiers), facturée à l'usage. Toute
interruption de service a un impact commercial direct et rapide.

**Éléments connus** :
- Équipe de 8 développeurs répartis en 2 sous-équipes (fonctionnalités /
  plateforme), livraisons souhaitées plusieurs fois par semaine.
- Les partenaires disposent de clés d'API et de quotas : toute régression
  doit être détectée avant d'atteindre la production.
- Un outil de supervision externe (type page de statut public) doit être mis
  à jour automatiquement en cas d'incident de déploiement.
- La direction technique souhaite pouvoir revenir en arrière en moins de 5
  minutes en cas de problème constaté après une mise en production.
- Des audits de sécurité réguliers imposent une traçabilité complète des
  accès en production et une revue systématique du code avant fusion.

**Questions à considérer en particulier** :
- Quel niveau d'automatisation du déploiement en production est réaliste
  compte tenu de l'exigence de rollback rapide ?
- Quelle intégration externe est prioritaire pour limiter l'impact d'un
  incident ?

---

*(Rappel : cet exercice est un exercice de conception et de documentation,
pas de codage — répondez dans un `README.md` à déposer dans `solution/`.)*
