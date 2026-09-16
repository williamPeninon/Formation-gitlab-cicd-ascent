# Instructions — Test du job de détection de secret (TP 3.2)

## Chaîne de test à committer (consigne 6)

Pour vérifier que votre job de détection de secret fonctionne, committez
**volontairement et temporairement** la ligne suivante dans un fichier du
projet (par exemple un commentaire ajouté en bas de `server.js`), sur la
branche de votre Merge Request de test :

```
FORMATION_FAKE_SECRET_7f3a9c2e1b8d4f60
```

> Cette chaîne est **entièrement fictive** : elle ne correspond à aucun
> service réel, aucune clé d'API valide, et ne doit servir qu'à vérifier que
> le mécanisme de détection réagit bien. Le format
> `FORMATION_FAKE_SECRET_<hexadécimal>` est spécifique à cette formation.

## Ce qui doit se produire

- Si vous utilisez le template GitLab officiel
  `Security/Secret-Detection.gitlab-ci.yml` : le rapport de sécurité
  (onglet **Security & Compliance**) doit signaler la chaîne comme un secret
  potentiel détecté.
- Si vous utilisez le job de substitution fourni (voir `.gitlab-ci.yml`,
  job `detection_secrets_grep`) : le job doit échouer explicitement en
  affichant la ligne concernée.

## Une fois la vérification faite

Retirez cette chaîne de test avant de faire fusionner votre Merge Request
définitive (consigne 7) — elle n'a aucune utilité au-delà de ce test.
