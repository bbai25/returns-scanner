const SHEET_NAME = 'Returns';
const PHOTO_FOLDER_NAME = 'Return Package Photos';
const HEADERS = [
  'Timestamp',
  'Driver Name',
  'TBA Code',
  'Return Reason',
  'Contact Step Completed',
  'Photo Link',
  'Business Closed Proof Photo Link',
  'User Agent',
  'Dispatcher Notes',
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    validatePayload(payload);

    const folder = getOrCreateFolder_(PHOTO_FOLDER_NAME);
    const photo = savePhoto_(folder, payload.photo, payload.tbaCode);
    const businessClosedProofPhoto = payload.businessClosedProofPhoto
      ? savePhoto_(folder, payload.businessClosedProofPhoto, payload.tbaCode, '-business-closed-proof')
      : null;
    const sheet = getOrCreateSheet_();

    const rowData = [
      new Date(),
      payload.driverName,
      payload.tbaCode,
      payload.returnReason,
      payload.contactStepCompleted,
      photo.url,
      businessClosedProofPhoto ? businessClosedProofPhoto.url : '',
      payload.userAgent || '',
      payload.dispatcherNotes || '',
    ];
    if (rowData.length !== HEADERS.length) {
      throw new Error('Sheet row does not match header count');
    }
    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, rowData.length).setValues([rowData]);

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
  if (payload.returnReason === 'BUSINESS CLOSED' && (!payload.businessClosedProofPhoto || !payload.businessClosedProofPhoto.data || !payload.businessClosedProofPhoto.name)) {
    throw new Error('Business Closed Proof Photo is required');
  }
}

function savePhoto_(folder, photo, tbaCode, suffix) {
  const bytes = Utilities.base64Decode(photo.data);
  const cleanTba = String(tbaCode).replace(/[^A-Z0-9_-]/g, '');
  const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  const extension = getExtension_(photo.name, photo.type);
  const fileName = `${cleanTba}${suffix || ''}-${timestamp}.${extension}`;
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

  ensureHeaders_(sheet);

  return sheet;
}

function ensureHeaders_(sheet) {
  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  let headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const hasHeaders = headers.some(Boolean);
  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    return;
  }

  let photoColumnIndex = headers.indexOf('Photo Link');
  const oldPhotoColumnIndex = headers.indexOf('Photo Name / Photo Link');
  if (photoColumnIndex === -1 && oldPhotoColumnIndex !== -1) {
    photoColumnIndex = oldPhotoColumnIndex;
    sheet.getRange(1, photoColumnIndex + 1).setValue('Photo Link');
    headers[photoColumnIndex] = 'Photo Link';
  }

  if (headers.indexOf('Business Closed Proof Photo Link') === -1) {
    const insertAfterColumn = photoColumnIndex === -1 ? 6 : photoColumnIndex + 1;
    sheet.insertColumnAfter(insertAfterColumn);
    sheet.getRange(1, insertAfterColumn + 1).setValue('Business Closed Proof Photo Link');
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
