import { SHEET_URL } from './config.js'

// Sends each RSVP to your Google Sheet via the Apps Script Web App.
// We use mode:'no-cors' so it works from any static host (GitHub Pages,
// Netlify, etc.) without tripping cross-origin errors. The response is
// opaque (not readable), but the row is still written on Google's side.
export async function submitRsvp(payload) {
  if (!SHEET_URL || SHEET_URL.includes('PASTE_YOUR')) {
    throw new Error(
      'The Google Sheet link has not been set up yet. Add your Apps Script URL in src/config.js.',
    )
  }
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
  } catch (e) {
    throw new Error('Could not reach the RSVP service. Please check your connection and try again.')
  }
  return { result: 'success' }
}
