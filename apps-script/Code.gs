const SHEET_NAME = 'Returns';
const PHOTO_FOLDER_NAME = 'Return Package Photos';
const HEADERS = [
  'Timestamp',
  'Driver Name',
  'TBA Code',
  'Return Reason',
  'Contact Step Completed',
  'Photo Name / Photo Link',
  'User Agent',
  'Dispatcher Notes',
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    validatePayload(payload);

    const folder = getOrCreateFolder_(PHOTO_FOLDER_NAME);
    const photo = savePhoto_(folder, payload.photo, payload.tbaCode);
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      payload.driverName,
      payload.tbaCode,
      payload.returnReason,
      payload.contactStepCompleted,
      `${photo.name} / ${photo.url}`,
      payload.userAgent || '',
      payload.dispatcherNotes || '',
    ]);

    return json_({ ok: true, photoLink: photo.url });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function doGet() {
  return json_({ ok: true, app: 'RTS submission endpoint' });
}

function validatePayload(payload) {
  if (!payload) throw new Error('Missing payload');
  if (!payload.driverName) throw new Error('Driver Name is required');
  if (!payload.tbaCode || !String(payload.tbaCode).startsWith('TBA')) throw new Error('Valid TBA Code is required');
  if (!payload.returnReason) throw new Error('Return Reason is required');
  if (!payload.contactStepCompleted) throw new Error('Contact Step Completed is required');
  if (!payload.photo || !payload.photo.data || !payload.photo.name) throw new Error('Photo is required');
}

function savePhoto_(folder, photo, tbaCode) {
  const bytes = Utilities.base64Decode(photo.data);
  const cleanTba = String(tbaCode).replace(/[^A-Z0-9_-]/g, '');
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  const extension = getExtension_(photo.name, photo.type);
  const fileName = `${cleanTba}-${timestamp}.${extension}`;
  const blob = Utilities.newBlob(bytes, photo.type || 'image/jpeg', fileName);
  const file = folder.createFile(blob);

  return {
    name: file.getName(),
    url: file.getUrl(),
  };
}

function getExtension_(fileName, mimeType) {
  const match = String(fileName).match(/\.([a-zA-Z0-9]+)$/);
  if (match) return match[1].toLowerCase();
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/webp') return 'webp';
  return 'jpg';
}

function getOrCreateFolder_(name) {
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.some(Boolean);
  const hasCurrentHeaders = HEADERS.every((header, index) => firstRow[index] === header);
  if (!hasHeaders || !hasCurrentHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
