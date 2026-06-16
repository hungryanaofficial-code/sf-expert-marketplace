/**
 * Hungryana contact form → Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet with headers in row 1:
 *    Timestamp | Name | Email | Phone | Message
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the web app URL into Vercel as GOOGLE_SHEETS_WEBHOOK_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: err.message || 'Failed to save row' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
