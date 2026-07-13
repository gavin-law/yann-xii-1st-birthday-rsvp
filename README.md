# yann-xii-1st-birthday-rsvp

A small RSVP web app for Yann XII's 1st birthday party. Guests can submit an
RSVP (attending or not, plus additional guest count and a message) and see the
running guest list.

## Tech stack

- **Frontend:** React 18 + TypeScript, bundled with Vite
- **Backend:** Express (TypeScript, run via `tsx`)
- **Database:** SQLite (via `better-sqlite3`), stored at `./data/rsvp.sqlite`
- **Tooling:** ESLint, Vitest (+ Supertest for API tests)

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` starts two processes concurrently:

- the Express API on <http://localhost:3001>
- the Vite dev server on <http://localhost:5173> (proxies `/api` → the API)

Open <http://localhost:5173> to use the app.

## Configuration

Copy `.env.example` to `.env` to override defaults:

- `PORT` — API port (default `3001`)
- `DATABASE_PATH` — SQLite file path (default `./data/rsvp.sqlite`)

## Scripts

| Command          | Description                                       |
| ---------------- | ------------------------------------------------- |
| `npm run dev`    | Run API + web dev servers (hot reload)            |
| `npm run build`  | Type-check the server and build the frontend      |
| `npm start`      | Run the API in production mode, serving `dist/`    |
| `npm run lint`   | Lint the codebase with ESLint                     |
| `npm test`       | Run the Vitest test suite                         |

## API

- `GET /api/health` — health/liveness probe
- `GET /api/rsvps` — list RSVPs + total attending guests
- `POST /api/rsvps` — create an RSVP (`{ name, email, attending?, guests?, message? }`)
