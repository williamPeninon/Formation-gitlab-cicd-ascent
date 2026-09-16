# taskflow-api — TP 1.2 : Configurer un dépôt Git local, collaborer et résoudre des conflits (corrigé)

## Objectif du projet

API REST de gestion de tâches — projet fil rouge de la formation GitLab CI/CD.
**Corrigée à la main lors du TP** : nous avons volontairement modifié cette
même section depuis deux branches différentes pour provoquer un conflit de
fusion réel, puis nous l'avons résolu en conservant les deux apports.
**(phrase ajoutée depuis `feature/description-projet`)**
**(phrase ajoutée depuis `feature/description-alternative`)**

## Ce que ce corrigé démontre

- Le fichier `.gitignore` (voir à la racine de ce dossier) a été créé à partir
  du modèle fourni et committé sur `main` en tout premier lieu.
- Deux branches `feature/description-projet` et
  `feature/description-alternative` ont modifié **la même section** du
  `README.md`, ce qui a délibérément provoqué un conflit lors de la seconde
  fusion.
- Le conflit a été résolu en conservant les deux phrases côte à côte (voir
  ci-dessus), sans laisser aucun marqueur `<<<<<<<` / `=======` / `>>>>>>>`
  résiduel.
- Le commit de fusion final possède deux parents (visible avec
  `git log --oneline --graph --all` ou dans le graphe de commits GitLab).

## Séquence Git de référence

```bash
git clone <url-du-projet>
cd taskflow-api
cp gitignore-modele.txt .gitignore   # puis : git add .gitignore && git commit -m "Ajoute .gitignore"

git switch -c feature/description-projet
# ... modification du README.md ...
git add README.md && git commit -m "Précise l'objectif du projet (v1)"
git push -u origin feature/description-projet

git switch main
git switch -c feature/description-alternative
# ... modification différente de la même section ...
git add README.md && git commit -m "Précise l'objectif du projet (v2)"
git push -u origin feature/description-alternative

git switch main
git merge feature/description-projet          # fast-forward, sans conflit
git merge feature/description-alternative     # conflit attendu sur README.md

# Résolution manuelle du conflit dans README.md, puis :
git add README.md
git commit                                    # finalise le merge commit à deux parents
git push origin main
```

## Lancer l'application / les tests

```bash
node server.js
node --test
```
