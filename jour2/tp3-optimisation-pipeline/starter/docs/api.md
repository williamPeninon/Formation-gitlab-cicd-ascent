# Documentation de l'API taskflow-api

## Routes disponibles

- `GET /api/health` — vérification de disponibilité
- `GET /api/tasks` — liste des tâches
- `POST /api/tasks` — création d'une tâche (`{ "title": "..." }`)
- `DELETE /api/tasks/:id` — suppression d'une tâche
- `PATCH /api/tasks/:id` — bascule du statut "terminé"

*(Modifiez ce fichier pour tester le déclenchement conditionnel du job
`tests_documentation` — voir consigne 7 du TP.)*
