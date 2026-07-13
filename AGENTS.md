# AGENTS.md

## Cursor Cloud specific instructions

RSVP web app for Yann XII's 1st birthday. See `README.md` for the full stack,
scripts, and API reference; only non-obvious notes live here.

### Services

- **Web (Vite dev server)** — port `5173`. Serves the React UI.
- **API (Express)** — port `3001`. REST API backed by SQLite.

`npm run dev` starts **both** concurrently (via `concurrently`). The Vite dev
server proxies `/api/*` → the API on port `3001` (see `vite.config.ts`), so the
frontend only works when the API is also running. Open the app at
<http://localhost:5173> (not 3001) during development.

### Non-obvious notes

- Dependencies are installed by the startup update script (`npm install`); no
  manual install is needed for a fresh cloud session.
- `better-sqlite3` is a native module but installs from a prebuilt binary — no
  system build tools are required.
- SQLite data lives at `./data/rsvp.sqlite` (gitignored, auto-created on first
  run). Delete the `data/` directory to reset the guest list. Tests use an
  in-memory DB (`:memory:`) and never touch this file.
- `npm run build` runs `tsc -p tsconfig.node.json` (server type-check) then
  `vite build`. It does NOT need the dev servers running.
- `npm start` runs the API in production mode and serves the built `dist/`
  frontend from the same port (`3001`) — run `npm run build` first.
