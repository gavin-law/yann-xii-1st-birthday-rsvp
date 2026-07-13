import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import type { Express } from 'express';
import type Database from 'better-sqlite3';
import { createApp } from '../server/app.ts';
import { createDb } from '../server/db.ts';

let app: Express;
let db: Database.Database;

beforeAll(() => {
  db = createDb(':memory:');
  app = createApp({ db });
});

afterAll(() => {
  db.close();
});

describe('RSVP API', () => {
  it('reports health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.celebrant).toBe('Yann XII');
  });

  it('starts with an empty guest list', async () => {
    const res = await request(app).get('/api/rsvps');
    expect(res.status).toBe(200);
    expect(res.body.rsvps).toEqual([]);
    expect(res.body.totalAttendingGuests).toBe(0);
  });

  it('creates an RSVP and counts attending guests', async () => {
    const res = await request(app)
      .post('/api/rsvps')
      .send({ name: 'Ada Lovelace', email: 'ada@example.com', guests: 2 });
    expect(res.status).toBe(201);
    expect(res.body.rsvp.name).toBe('Ada Lovelace');
    expect(res.body.rsvp.attending).toBe(1);

    const list = await request(app).get('/api/rsvps');
    expect(list.body.rsvps).toHaveLength(1);
    // 1 guest + 2 additional = 3 attending
    expect(list.body.totalAttendingGuests).toBe(3);
  });

  it('rejects an RSVP without a name', async () => {
    const res = await request(app)
      .post('/api/rsvps')
      .send({ email: 'noone@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });

  it('rejects an RSVP with an invalid email', async () => {
    const res = await request(app)
      .post('/api/rsvps')
      .send({ name: 'Grace Hopper', email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/email/i);
  });

  it('records a non-attending RSVP without counting it', async () => {
    await request(app).post('/api/rsvps').send({
      name: 'Alan Turing',
      email: 'alan@example.com',
      attending: false,
    });
    const list = await request(app).get('/api/rsvps');
    const alan = list.body.rsvps.find(
      (r: { name: string }) => r.name === 'Alan Turing',
    );
    expect(alan.attending).toBe(0);
    // still only Ada's party of 3 counts as attending
    expect(list.body.totalAttendingGuests).toBe(3);
  });
});
