# Yann Xii · 1st Birthday RSVP

A bilingual (English / 中文) RSVP site. Responses are written straight into your
Google Sheet — no database, no server logic. Includes background music and a
poster cover. Designed to be published free on **GitHub Pages**.

---

## 1. Connect your Google Sheet (once, ~5 min)

1. Open your Google Sheet → **Extensions → Apps Script**.
2. Delete the starter code, paste in `google-apps-script/Code.gs`, **Save**.
3. **Deploy → New deployment → Web app**.
   - **Execute as:** Me
   - **Who has access:** **Anyone**  ← required, or guests can't submit
4. **Deploy**, authorise, and copy the **Web app URL** (ends in `/exec`).
5. Paste it into **`src/config.js`** (already filled in with your current URL).

## 2. Publish to GitHub Pages

This repo already includes a deploy workflow (`.github/workflows/deploy.yml`).
After you enable Pages once, every push to **`main`** rebuilds and publishes the site.

1. Open **Settings → Pages** in the repo:
   https://github.com/gavin-law/yann-xii-1st-birthday-rsvp/settings/pages
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to **`main`** (or run the **Deploy to GitHub Pages** workflow manually under
   **Actions**). After a minute or two, your site will be live at:
   **https://gavin-law.github.io/yann-xii-1st-birthday-rsvp/**

To update the site later, change files and push to `main` again — it redeploys automatically.

> **Test it:** open your published link, submit a test RSVP, and confirm a row
> appears in your Sheet's **RSVPs** tab. Delete the test row afterward.

---

## Run or preview locally (optional)

Requires **Node 20+**.

```bash
npm install
npm run dev      # live preview at http://localhost:5173
```

Or build and serve the production bundle:

```bash
npm install
npm run build
npm start        # serves the built site at http://localhost:3000
```

(`npm start` is only for local preview — GitHub Pages serves the built `dist/`
folder directly and doesn't use the Node server.)

---

## Managing responses

Everything lives in your Google Sheet — each row is one RSVP with a timestamp
(Name, Contact, Attending, Adults, Children, Babies, Baby chair). Sort,
filter, add your own Status/Notes columns, or pivot for head counts.

---

## Editing the invitation

- **Date / time / venue / dress code and the map links** → `src/pages/RsvpForm.jsx`
  (the `EVENT` object near the top).
- **Poster** → replace `public/poster.png` (same filename), then it rebuilds.
- **Music** → replace `public/melody.mp3` (same filename). It loops, is icon-only,
  and starts on the visitor's first tap / click / scroll (browsers block
  autoplay with sound until the visitor interacts).
- **Colours / fonts** → `src/theme.css`.
- **Questions** → `src/pages/RsvpForm.jsx`. If you add a field, add a matching
  column in `google-apps-script/Code.gs`.

---

## Project layout

```
.github/workflows/deploy.yml  Auto-deploy to GitHub Pages
google-apps-script/Code.gs    Paste into your Sheet's Apps Script
src/config.js                 Your Apps Script Web App URL
src/pages/RsvpForm.jsx        Invitation + form (bilingual)
src/components/MusicToggle.jsx Background music button
public/poster.png             Cover image
public/melody.mp3             Background music
src/theme.css                 Styling
```
