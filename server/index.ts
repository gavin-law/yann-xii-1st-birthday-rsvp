import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import express from 'express';
import { createApp } from './app.ts';

const port = Number(process.env.PORT ?? 3001);
const app = createApp();

// In production, serve the built frontend from dist/.
const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
if (process.env.NODE_ENV === 'production' && existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(resolve(distDir, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`[rsvp] API listening on http://localhost:${port}`);
});
