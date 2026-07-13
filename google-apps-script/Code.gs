/**
 * Yann Xii RSVP → Google Sheets
 *
 * This runs inside your Google Sheet (Extensions → Apps Script).
 * Deploy it as a Web App and paste the resulting URL into src/config.js.
 * Each RSVP the form sends becomes a new row.
 *
 * The "RSVPs" tab is created automatically on first successful submit,
 * or immediately if you run setup() from the Apps Script editor
 * (select setup → Run).
 */

var SHEET_NAME = 'RSVPs' // the tab responses are written to (created if missing)

var HEADERS = [
  'Timestamp',
  'Name',
  'Contact',
  'Attending',
  'Adults',
  'Children',
  'Babies',
  'Baby chair',
]

/** Creates the RSVPs tab + header row if they don't exist yet. */
function ensureRsvpSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME)

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  // Keep leading zeros in phone numbers (e.g. 0122919214).
  sheet.getRange('C:C').setNumberFormat('@')
  return sheet
}

/** Run this once from the Apps Script editor to create the RSVPs tab now. */
function setup() {
  ensureRsvpSheet()
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)
    var sheet = ensureRsvpSheet()

    var going = data.attending === 'yes'
    var contact = String(data.contact || '')
    sheet.appendRow([
      new Date(),
      data.name || '',
      '', // set as plain text below so leading zeros are kept
      going ? 'Yes' : 'No',
      going ? Number(data.adults) || 0 : 0,
      going ? Number(data.children) || 0 : 0,
      going ? Number(data.babies) || 0 : 0,
      going ? (data.baby_chair === 'yes' ? 'Yes' : 'No') : '',
    ])
    var row = sheet.getLastRow()
    sheet.getRange(row, 3).setNumberFormat('@').setValue(contact)

    return json({ result: 'success' })
  } catch (err) {
    return json({ result: 'error', message: String(err) })
  }
}

// Open the Web App URL in a browser to confirm it is live (also creates RSVPs).
function doGet() {
  try {
    ensureRsvpSheet()
    return json({ result: 'ok', info: 'Yann Xii RSVP endpoint is live. RSVPs tab ready.' })
  } catch (err) {
    return json({ result: 'error', message: String(err) })
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
