'use strict';

/**
 * taskflow-api — API REST minimaliste de gestion de tâches.
 *
 * Application "fil rouge" de la formation GitLab CI/CD.
 * Écrite en Node.js natif pur : aucun framework, aucune dépendance npm,
 * aucune base de données externe (persistance en mémoire, réinitialisée
 * à chaque redémarrage du serveur).
 *
 * Démarrage :   node server.js
 * Tests :       node --test
 */

const http = require('node:http');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const VERSION = '1.0.0';

// --- État en mémoire ---------------------------------------------------

let tasks = [
  {
    id: crypto.randomUUID(),
    title: 'Préparer le pipeline CI',
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Relire la merge request #1',
    done: true,
    createdAt: new Date().toISOString(),
  },
];

// --- Aides HTTP ----------------------------------------------------------

/** Envoie une réponse JSON avec le bon en-tête et le bon code de statut. */
function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

/** Lit et parse le corps JSON d'une requête. Rejette si le JSON est invalide. */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      // Garde-fou simple contre un corps de requête anormalement volumineux.
      if (raw.length > 1e6) {
        req.destroy();
        reject(new Error('Corps de requête trop volumineux'));
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error('JSON invalide'));
      }
    });
    req.on('error', reject);
  });
}

/** Sert la page front statique de démonstration (public/index.html), si présente. */
function serveStatic(req, res) {
  const filePath = path.join(__dirname, 'public', 'index.html');
  fs.readFile(filePath, (err, content) => {
    if (err) {
      sendJson(res, 404, { error: 'Page non trouvée' });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
}

// --- Routeur ---------------------------------------------------------------

async function handleRequest(req, res) {
  const { method, url } = req;

  // GET /api/health — vérification de disponibilité du service
  if (method === 'GET' && url === '/api/health') {
    return sendJson(res, 200, { status: 'ok', version: VERSION });
  }

  // GET /api/tasks — liste de toutes les tâches
  if (method === 'GET' && url === '/api/tasks') {
    return sendJson(res, 200, tasks);
  }

  // POST /api/tasks — création d'une tâche
  if (method === 'POST' && url === '/api/tasks') {
    let body;
    try {
      body = await readBody(req);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }

    if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
      return sendJson(res, 400, { error: "Le champ 'title' est obligatoire" });
    }

    const task = {
      id: crypto.randomUUID(),
      title: body.title.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return sendJson(res, 201, task);
  }

  // DELETE /api/tasks/:id — suppression d'une tâche
  const deleteMatch = method === 'DELETE' && url.match(/^\/api\/tasks\/([^/]+)$/);
  if (deleteMatch) {
    const id = deleteMatch[1];
    const before = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    if (tasks.length === before) {
      return sendJson(res, 404, { error: 'Tâche non trouvée' });
    }
    return sendJson(res, 200, { ok: true, id });
  }

  // TODO (TP "Collaboration avec GitLab" — Jour 1) :
  //   Ajouter ici la route PATCH /api/tasks/:id permettant de marquer une
  //   tâche comme terminée (bascule du champ `done`). Voir l'issue GitLab
  //   "Ajouter le marquage d'une tâche comme terminée" et la consigne du TP.
  //
  // const patchMatch = method === 'PATCH' && url.match(/^\/api\/tasks\/([^/]+)$/);
  // if (patchMatch) { ... }

  // Page de démonstration
  if (method === 'GET' && (url === '/' || url === '/index.html')) {
    return serveStatic(req, res);
  }

  return sendJson(res, 404, { error: 'Route non trouvée' });
}

const server = http.createServer((req, res) => {
  handleRequest(req, res).catch((err) => {
    sendJson(res, 500, { error: 'Erreur interne', detail: err.message });
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`taskflow-api démarrée sur http://localhost:${PORT}`);
  });
}

module.exports = server;
