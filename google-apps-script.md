# Google Apps Script for Google Sheets (Registration Logger)

## 1) Create script
1. Open https://script.google.com
2. New project
3. Paste this code into `Code.gs`
4. Set your constants:
   - `SPREADSHEET_ID` (from the shared spreadsheet URL you provided)
   - `SHEET_NAME` (tab name inside that spreadsheet; default uses the first sheet if not found)
   - `HEADER_ROW` (optional)
5. Deploy as Web App:
   - **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (or at least “Anyone with the link”)
6. Copy the **Web app URL** and paste it into `SHEET_WEBAPP_URL` in `js/features/registration.js`.

## 2) Code.gs
```js
const SPREADSHEET_ID = 'PUT_SPREADSHEET_ID_HERE'; // from: https://docs.google.com/spreadsheets/d/<ID>/edit...
const SHEET_NAME = 'Sheet1'; // change to your tab name

// Optional: where headers live. If the header row doesn’t exist, we can create it.
const HEADER_ROW = [
  'Reference ID',
  'Submitted At',
  'Full Name',
  'College Name',
  'Branch',
  'Semester',
  'Email',
  'Phone',
  'Gender',
  'Event Category',
];

function doPost(e) {
  try {
    const contents = e && e.postData ? e.postData.contents : null;
    if (!contents) {
      return jsonResponse({ ok: false, error: 'Missing request body' }, 400);
    }

    const body = JSON.parse(contents);

    // Expecting payload shaped like:
    // { ref, submittedAt, payload: { fullName, collegeName, ... } }
    const ref = body.ref || '';
    const submittedAt = body.submittedAt || '';
    const p = body.payload || {};

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(ss, SHEET_NAME);

    // Ensure headers exist
    const firstRow = sheet.getRange(1, 1, 1, HEADER_ROW.length).getValues()[0];
    const hasHeaders = firstRow && firstRow.join('|').trim().length > 0;
    if (!hasHeaders) {
      sheet.getRange(1, 1, 1, HEADER_ROW.length).setValues([HEADER_ROW]);
    }

    const row = [
      ref,
      submittedAt,
      p.fullName || '',
      p.collegeName || '',
      p.branch || '',
      p.semester || '',
      p.email || '',
      p.phone || '',
      p.gender || '',
      p.eventCategory || '',
    ];

    sheet.appendRow(row);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message ? err.message : err) }, 500);
  }
}

function getOrCreateSheet_(ss, name) {
  const sh = ss.getSheetByName(name);
  if (sh) return sh;
  return ss.insertSheet(name);
}

function jsonResponse(obj, statusCode) {
  const output = ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);

  // Note: Apps Script doesn’t always honor statusCode on web app responses.
  // But we keep it for clarity.
  return output;
}
```

## 3) Test
- Submit the registration form once.
- Verify a new row is appended with your reference ID and fields.

## 4) Security note
Anyone with the web app URL can post data. For production, you should add authentication or at least validate an expected token.

