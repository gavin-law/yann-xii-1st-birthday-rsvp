/**
 * Yann Xu RSVP → Google Sheets
 *
 * This runs inside your Google Sheet (Extensions → Apps Script).
 * Deploy it as a Web App and paste the resulting URL into src/config.js.
 * Each RSVP the form sends becomes a new row.
 */

var SHEET_NAME = 'RSVPs' // the tab responses are written to (created if missing)

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)

    // Write a header row the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Contact',
        'Attending',
        'Adults',
        'Children',
        'Babies',
        'Baby chair',
        'Dietary / allergies',
      ])
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold')
      sheet.setFrozenRows(1)
    }

    var going = data.attending === 'yes'
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.contact || '',
      going ? 'Yes' : 'No',
      going ? Number(data.adults) || 0 : 0,
      going ? Number(data.children) || 0 : 0,
      going ? Number(data.babies) || 0 : 0,
      going ? (data.baby_chair === 'yes' ? 'Yes' : 'No') : '',
      going ? data.dietary || '' : '',
    ])

    return json({ result: 'success' })
  } catch (err) {
    return json({ result: 'error', message: String(err) })
  }
}

// Lets you open the Web App URL in a browser to confirm it is live.
function doGet() {
  return json({ result: 'ok', info: 'Yann Xu RSVP endpoint is live.' })
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
