import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// A tiny, dependency-free static server. There is no backend or database now —
// RSVPs go straight to your Google Sheet from the browser (see src/config.js).
// This server only serves the built site so "npm start" keeps working.

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, '..', 'dist')
const PORT = process.env.PORT || 3000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}

const send = (res, code, body, type = 'text/plain; charset=utf-8') => {
  res.writeHead(code, { 'Content-Type': type })
  res.end(body)
}

const server = http.createServer((req, res) => {
  if (!fs.existsSync(DIST)) {
    return send(
      res,
      200,
      '<div style="font-family:sans-serif;max-width:520px;margin:80px auto;text-align:center">' +
        '<h1>Almost there</h1><p>Run <code>npm run build</code> once, then restart with ' +
        '<code>npm start</code>.</p></div>',
      'text/html; charset=utf-8',
    )
  }

  let urlPath = decodeURIComponent((req.url || '/').split('?')[0])
  if (urlPath === '/') urlPath = '/index.html'
  let filePath = path.join(DIST, path.normalize(urlPath))
  if (!filePath.startsWith(DIST)) return send(res, 403, 'Forbidden')

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) filePath = path.join(DIST, 'index.html') // SPA fallback
    fs.readFile(filePath, (e, buf) => {
      if (e) return send(res, 404, 'Not found')
      send(res, 200, buf, MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream')
    })
  })
})

server.listen(PORT, () => {
  console.log(`\n  Yann Xii RSVP running on http://localhost:${PORT}\n`)
})
