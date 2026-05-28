# Return to Station RTS App

Mobile-friendly RTS form for Amazon DSP drivers. Drivers enter their name, scan or type a TBA barcode, choose a return reason, upload a photo, and submit to Google Sheets and Google Drive through Google Apps Script.

## Files

- `index.html` - GitHub Pages entry point
- `styles.css` - mobile-first internal tool styling
- `app.js` - scanner, validation, language toggle, and submission logic
- `apps-script/Code.gs` - Google Apps Script backend

## Google Setup

1. Create a Google Sheet for RTS submissions.
2. Open `Extensions > Apps Script`.
3. Paste the contents of `apps-script/Code.gs`.
4. Save the Apps Script project.
5. Deploy as a Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
6. Copy the Web App URL.
7. In `app.js`, set:

```js
const CONFIG = {
  appsScriptUrl: "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL",
};
```

The script creates or reuses:

- Sheet tab: `RTS Submissions`
- Drive folder: `Return Package Photos`

## Sheet Columns

The Google Sheet stores reporting values in English:

- Timestamp
- Driver Name
- TBA Code
- Return Reason
- Photo Name / Photo Link
- User Agent
- Dispatcher Notes

## Driver Flow

After a successful submission, the app asks whether the driver wants to submit another package. Choosing Yes clears the TBA, reason, sub-reason, and photo while keeping the driver name, then reopens the scanner.

## Local Preview

Open `index.html` in a browser to preview the page. Camera scanning works best from a deployed HTTPS page such as GitHub Pages.
