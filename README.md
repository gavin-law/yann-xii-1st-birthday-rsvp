# Yann Xü · 1st Birthday RSVP

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

1. Create a new GitHub repository and upload this whole project to it
   (drag-and-drop the files into the repo, or use `git push`). Commit to the
   **main** branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. That's it. The included workflow (`.github/workflows/deploy.yml`) builds the
   site and deploys it automatically on every push to `main`. Give it a minute,
   then your link appears at the top of the Pages settings — usually
   `https://<your-username>.github.io/<repo-name>/`.

To update the site later, just change files and push again; it redeploys.

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
(Name, Contact, Attending, Adults, Children, Babies, Baby chair, Dietary). Sort,
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
