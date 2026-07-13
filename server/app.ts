import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import type Database from 'better-sqlite3';
import { createDb, type Rsvp } from './db.ts';

export interface CreateAppOptions {
  db?: Database.Database;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function createApp(options: CreateAppOptions = {}): Express {
  const db = options.db ?? createDb();
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', celebrant: 'Yann XII', occasion: '1st birthday' });
  });

  app.get('/api/rsvps', (_req: Request, res: Response) => {
    const rows = db
      .prepare('SELECT * FROM rsvps ORDER BY created_at DESC, id DESC')
      .all() as Rsvp[];
    const attendingGuests = rows
      .filter((r) => r.attending === 1)
      .reduce((sum, r) => sum + 1 + r.guests, 0);
    res.json({ rsvps: rows, totalAttendingGuests: attendingGuests });
  });

  app.post('/api/rsvps', (req: Request, res: Response) => {
    const { name, email, attending, guests, message } = req.body ?? {};

    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'A valid email is required.' });
    }

    const attendingValue = attending === false ? 0 : 1;
    const guestsValue =
      Number.isFinite(Number(guests)) && Number(guests) > 0
        ? Math.floor(Number(guests))
        : 0;

    const info = db
      .prepare(
        `INSERT INTO rsvps (name, email, attending, guests, message)
         VALUES (@name, @email, @attending, @guests, @message)`,
      )
      .run({
        name: name.trim(),
        email: email.trim(),
        attending: attendingValue,
        guests: guestsValue,
        message:
          typeof message === 'string' && message.trim().length > 0
            ? message.trim()
            : null,
      });

    const created = db
      .prepare('SELECT * FROM rsvps WHERE id = ?')
      .get(info.lastInsertRowid) as Rsvp;

    res.status(201).json({ rsvp: created });
  });

  return app;
}
