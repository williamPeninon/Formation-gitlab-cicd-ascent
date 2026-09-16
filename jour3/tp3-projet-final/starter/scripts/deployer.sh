#!/bin/sh
# scripts/deployer.sh — simule un déploiement de taskflow-api.
#
# Ce script ne nécessite aucune infrastructure réelle : il affiche les
# étapes d'un déploiement type et écrit un fichier de statut, suffisant
# pour observer le mécanisme des GitLab Environments en TP.
#
# Usage : ./scripts/deployer.sh <environnement> [reference-commit]

set -e

ENVIRONNEMENT="${1:?Usage: deployer.sh <environnement> [reference-commit]}"
REFERENCE="${2:-inconnue}"
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "=== Déploiement taskflow-api ==="
echo "Environnement cible : $ENVIRONNEMENT"
echo "Référence (commit)  : $REFERENCE"
echo "Label de config     : ${DEPLOY_ENV_LABEL:-non défini}"
echo ""
echo "[1/3] Vérification de l'image..."
sleep 1
echo "[2/3] Application de la configuration sur l'environnement $ENVIRONNEMENT..."
sleep 1
echo "[3/3] Bascule du trafic vers la nouvelle version..."
sleep 1

cat > "statut-deploiement-${ENVIRONNEMENT}.txt" <<EOF
environnement: $ENVIRONNEMENT
reference: $REFERENCE
date: $DATE
statut: succes
EOF

echo ""
echo "Déploiement simulé terminé avec succès sur '$ENVIRONNEMENT'."
