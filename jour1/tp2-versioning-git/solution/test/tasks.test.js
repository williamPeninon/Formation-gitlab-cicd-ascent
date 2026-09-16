'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const server = require('../server.js');

/**
 * Démarre le serveur sur un port éphémère, exécute une requête HTTP,
 * puis referme le serveur. Utilisé pour isoler chaque test.
 */
function request(options, body) {
  return new Promise((resolve, reject) => {
    server.listen(0, () => {
      const { port } = server.address();
      const req = http.request(
        { host: '127.0.0.1', port, ...options },
        (res) => {
          let raw = '';
          res.on('data', (chunk) => (raw += chunk));
          res.on('end', () => {
            server.close(() => {
              let parsed = null;
              try {
                parsed = raw ? JSON.parse(raw) : null;
              } catch (err) {
                // corps non-JSON (ex: page HTML) : on le laisse tel quel
                parsed = raw;
              }
              resolve({ statusCode: res.statusCode, body: parsed });
            });
          });
        },
      );
      req.on('error', (err) => {
        server.close(() => reject(err));
      });
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  });
}

test('GET /api/health répond ok avec le numéro de version', async () => {
  const res = await request({ method: 'GET', path: '/api/health' });
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.status, 'ok');
  assert.equal(typeof res.body.version, 'string');
});

test('GET /api/tasks renvoie un tableau de tâches', async () => {
  const res = await request({ method: 'GET', path: '/api/tasks' });
  assert.equal(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length >= 1);
  assert.ok('id' in res.body[0]);
  assert.ok('title' in res.body[0]);
  assert.ok('done' in res.body[0]);
});

test('POST /api/tasks crée une nouvelle tâche', async () => {
  const res = await request(
    { method: 'POST', path: '/api/tasks', headers: { 'Content-Type': 'application/json' } },
    { title: 'Écrire les tests unitaires' },
  );
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.title, 'Écrire les tests unitaires');
  assert.equal(res.body.done, false);
  assert.ok(res.body.id);
});

test('POST /api/tasks sans titre renvoie une erreur 400', async () => {
  const res = await request(
    { method: 'POST', path: '/api/tasks', headers: { 'Content-Type': 'application/json' } },
    {},
  );
  assert.equal(res.statusCode, 400);
  assert.ok(res.body.error);
});

test('DELETE /api/tasks/:id sur un id inconnu renvoie 404', async () => {
  const res = await request({ method: 'DELETE', path: '/api/tasks/id-inexistant' });
  assert.equal(res.statusCode, 404);
});
