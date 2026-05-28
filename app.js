const CONFIG = {
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbxnDWfkhE63t_ApRmQoRW6KMcvtkmQnCzaWatu9pFV1uXViPVJq0lxECAPAJWnHJf7Z/exec",
};

const reasons = [
  { value: "ACCESS ISSUE" },
  { value: "BUSINESS CLOSED" },
  { value: "CANCELLED" },
  {
    value: "CUSTOMER ISSUE",
    subReasons: ["REQUESTED FUTURE DELIVERY DATE", "NO LONGER WANTS PACKAGE", "UNAVAILABLE"],
  },
  { value: "EMPTY PACKAGE" },
  { value: "DAMAGED PACKAGE" },
  { value: "INCORRECT ADDRESS" },
  {
    value: "LOCKER ISSUES",
    subReasons: ["PICKUP", "FULL", "NOT WORKING"],
  },
  { value: "CUSTOMER RETURN" },
  { value: "MISSORTED PACKAGE" },
  {
    value: "OTP",
    subReasons: ["CODE UNAVAILABLE", "CUSTOMER UNAVAILABLE"],
  },
  { value: "UNABLE TO PICKUP" },
  {
    value: "UNSAFE DELIVERY",
    subReasons: ["DUE TO DOG", "DUE TO BAD WEATHER", "UNSAFE TO LEAVE PACKAGE", "ROAD CLOSED"],
  },
  { value: "UNABLE TO FIND ADDRESS" },
];

const translations = {
  en: {
    sop: "Standard Operating Procedure",
    title: "Return to Station (RTS)",
    warning: "DO NOT WAIT UNTIL THE END OF YOUR ROUTE!",
    dispatchNow: "If a delivery cannot be completed, contact Dispatch immediately.",
    stepCustomer: "Call and text the customer.",
    stepSupport: "If no response, contact Driver Support.",
    stepDispatch: "If still unable to deliver, contact Dispatch for final steps.",
    impact: "Failure to follow these steps will negatively impact driver scores.",
    driverName: "Driver Name",
    tbaCode: "TBA / Barcode",
    startScan: "Start Camera Scan",
    stopScan: "Stop Camera Scan",
    reason: "Reason of RTS",
    selectReason: "Select RTS reason",
    subReason: "Sub-reason",
    selectSubReason: "Select sub-reason",
    photo: "Photo Upload",
    photoHint: "Take or upload a clear package photo.",
    businessClosedPhotoHint: "For business closed, the photo must show proof of closure, such as posted business hours, closure notice, storefront/signage, or new business hours.",
    submit: "Submit RTS",
    submitting: "Submitting...",
    submittingRts: "Submitting RTS...",
    successTitle: "RTS submitted successfully.",
    submitAnother: "Submit another package?",
    yes: "Yes",
    no: "No",
    invalidScan: "Invalid scan. Please scan again.",
    validScan: "TBA captured.",
    scannerUnavailable: "Camera scanner is not available on this device.",
    missingBackend: "Connect the Google Apps Script URL before submitting.",
    submitError: "Unable to submit RTS. Please contact Dispatch.",
    photoSelected: "Photo selected:",
    required: "Please complete all required fields.",
    back: "Back",
    confirmSubmit: "Confirm & Submit",
    checklistPromptTitle: "Before submitting, complete RTS procedure steps.",
    checklistRequired: "Please complete all required RTS procedure steps before submitting.",
    businessProofPhoto: "Take Business Closed Proof Photo",
    businessProofPhotoHint: "Photo should show business hours, closure notice, storefront/signage, or changed hours.",
    businessProofPhotoRequired: "Please take a Business Closed proof photo before submitting.",
  },
  es: {
    sop: "Procedimiento Operativo Estándar",
    title: "Return to Station (RTS)",
    warning: "¡NO ESPERE HASTA EL FINAL DE SU RUTA!",
    dispatchNow: "Si una entrega no se puede completar, contacte a Dispatch inmediatamente.",
    stepCustomer: "Llame y envíe texto al cliente.",
    stepSupport: "Si no hay respuesta, contacte a Driver Support.",
    stepDispatch: "Si aún no puede entregar, contacte a Dispatch para los pasos finales.",
    impact: "No seguir estos pasos afectará negativamente los puntajes del conductor.",
    driverName: "Nombre del conductor",
    tbaCode: "TBA / Código de barras",
    startScan: "Iniciar escaneo con cámara",
    stopScan: "Detener escaneo",
    reason: "Razón de RTS",
    selectReason: "Seleccione razón de RTS",
    subReason: "Sub-razón",
    selectSubReason: "Seleccione sub-razón",
    photo: "Subir foto",
    photoHint: "Tome o suba una foto clara del paquete.",
    businessClosedPhotoHint: "Para negocios cerrados, la foto debe mostrar prueba del cierre, como horario publicado, aviso de cierre, letrero de la tienda, o nuevo horario.",
    submit: "Enviar RTS",
    submitting: "Enviando...",
    submittingRts: "Enviando RTS...",
    successTitle: "RTS enviado correctamente.",
    submitAnother: "¿Enviar otro paquete?",
    yes: "Sí",
    no: "No",
    invalidScan: "Escaneo inválido. Escanee nuevamente.",
    validScan: "TBA capturado.",
    scannerUnavailable: "El escáner de cámara no está disponible en este dispositivo.",
    missingBackend: "Conecte la URL de Google Apps Script antes de enviar.",
    submitError: "No se pudo enviar el RTS. Contacte a Dispatch.",
    photoSelected: "Foto seleccionada:",
    required: "Complete todos los campos requeridos.",
    back: "Atrás",
    confirmSubmit: "Confirmar y Enviar",
    checklistPromptTitle: "Antes de enviar, complete los pasos del procedimiento RTS.",
    checklistRequired: "Please complete all required RTS procedure steps before submitting.",
    businessProofPhoto: "Tomar foto de prueba de negocio cerrado",
    businessProofPhotoHint: "La foto debe mostrar el horario del negocio, aviso de cierre, letrero de la tienda, o cambio de horario.",
    businessProofPhotoRequired: "Tome una foto de prueba de negocio cerrado antes de enviar.",
  },
};

const checklistLabels = {
  "Called customer": "Llamé al cliente",
  "Sent text message": "Envié mensaje de texto",
  "Contacted Driver Support if access issue was not resolved": "Contacté a Driver Support si el problema de acceso no se resolvió",
  "Contacted Dispatch for final steps": "Contacté a Dispatch para los pasos finales",
  "Reviewed delivery notes/instructions": "Revisé las notas/instrucciones de entrega",
  "Attempted customer contact": "Intenté contactar al cliente",
  "Took photo showing business hours, closure notice, or posted signage": "Tomé una foto que muestra el horario del negocio, aviso de cierre, o señalización publicada",
  "Contacted Driver Support if customer could not be reached": "Contacté a Driver Support si no se pudo contactar al cliente",
  "Contacted Driver Support": "Contacté a Driver Support",
  "Notified Dispatch": "Notifiqué a Dispatch",
  "Called customer if safe to do so": "Llamé al cliente si era seguro hacerlo",
  "Sent text message or attempted second call": "Envié mensaje de texto o intenté una segunda llamada",
  "Contacted Driver Support if needed": "Contacté a Driver Support si era necesario",
  "Checked for safe location": "Busqué una ubicación segura",
  "Marked package damaged in Amazon app": "Marqué el paquete como dañado en la app de Amazon",
  "Returned package to station": "Devolví el paquete a la estación",
  "Contacted Dispatch if needed": "Contacté a Dispatch si era necesario",
};

const defaultChecklist = ["Contacted Dispatch for final steps"];

const procedureChecklists = {
  "ACCESS ISSUE": [
    "Called customer",
    "Sent text message",
    "Contacted Driver Support if access issue was not resolved",
    "Contacted Dispatch for final steps",
  ],
  "BUSINESS CLOSED": [
    "Reviewed delivery notes/instructions",
    "Attempted customer contact",
    "Took photo showing business hours, closure notice, or posted signage",
    "Contacted Dispatch for final steps",
  ],
  "CUSTOMER ISSUE - UNAVAILABLE": [
    "Called customer",
    "Sent text message",
    "Contacted Driver Support if customer could not be reached",
    "Contacted Dispatch for final steps",
  ],
  "INCORRECT ADDRESS": [
    "Called customer",
    "Sent text message",
    "Contacted Driver Support",
    "Contacted Dispatch for final steps",
  ],
  "UNABLE TO FIND ADDRESS": [
    "Called customer",
    "Sent text message",
    "Contacted Driver Support",
    "Contacted Dispatch for final steps",
  ],
  "LOCKER ISSUES - FULL": [
    "Contacted Driver Support",
    "Notified Dispatch",
  ],
  "LOCKER ISSUES - PICKUP": [
    "Contacted Driver Support",
    "Notified Dispatch",
  ],
  "LOCKER ISSUES - NOT WORKING": [
    "Contacted Driver Support",
    "Notified Dispatch",
  ],
  "UNSAFE DELIVERY - DUE TO DOG": [
    "Called customer if safe to do so",
    "Sent text message or attempted second call",
    "Contacted Driver Support if needed",
    "Contacted Dispatch for final steps",
  ],
  "UNSAFE DELIVERY - DUE TO BAD WEATHER": [
    "Called customer",
    "Sent text message",
    "Contacted Driver Support if needed",
    "Contacted Dispatch for final steps",
  ],
  "UNSAFE DELIVERY - UNSAFE TO LEAVE PACKAGE": [
    "Checked for safe location",
    "Called customer",
    "Sent text message",
    "Contacted Dispatch for final steps",
  ],
  "UNSAFE DELIVERY - ROAD CLOSED": [
    "Contacted Dispatch for final steps",
  ],
  "DAMAGED PACKAGE": [
    "Marked package damaged in Amazon app",
    "Returned package to station",
    "Contacted Dispatch if needed",
  ],
  "OTP - CODE UNAVAILABLE": [
    "Called customer",
    "Sent text message",
    "Contacted Driver Support",
    "Contacted Dispatch for final steps",
  ],
  "OTP - CUSTOMER UNAVAILABLE": [
    "Called customer",
    "Sent text message",
    "Contacted Driver Support",
    "Contacted Dispatch for final steps",
  ],
};

let currentLanguage = "en";
let scanner;
let isScanning = false;
let scanMessageKey = "";
let scanMessageIsError = false;
let pendingPayload = null;
let currentVerificationReason = "";
let isSubmitting = false;

const form = document.querySelector("#rtsForm");
const languageToggle = document.querySelector("#languageToggle");
const scanButton = document.querySelector("#scanButton");
const scannerPanel = document.querySelector("#scannerPanel");
const scanMessage = document.querySelector("#scanMessage");
const reasonSelect = document.querySelector("#reason");
const subReasonGroup = document.querySelector("#subReasonGroup");
const subReasonSelect = document.querySelector("#subReason");
const photoInput = document.querySelector("#photo");
const photoName = document.querySelector("#photoName");
const formMessage = document.querySelector("#formMessage");
const submitButton = document.querySelector("#submitButton");
const successDialog = document.querySelector("#successDialog");
const verificationDialog = document.querySelector("#verificationDialog");
const verificationForm = document.querySelector("#verificationForm");
const verificationTitle = document.querySelector("#verificationTitle");
const verificationOptions = document.querySelector("#verificationOptions");
const verificationMessage = document.querySelector("#verificationMessage");
const businessProofGroup = document.querySelector("#businessProofGroup");
const businessProofPhotoInput = document.querySelector("#businessProofPhoto");
const businessProofPhotoName = document.querySelector("#businessProofPhotoName");
const backButton = verificationDialog.querySelector('[value="back"]');
const confirmSubmitButton = verificationDialog.querySelector('[value="confirm"]');

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function translateReason(value) {
  return reasonLabels[currentLanguage][value] || value;
}

const reasonLabels = {
  en: Object.fromEntries(reasons.flatMap((reason) => [
    [reason.value, reason.value],
    ...(reason.subReasons || []).map((subReason) => [subReason, subReason]),
  ])),
  es: {
    "ACCESS ISSUE": "PROBLEMA DE ACCESO",
    "BUSINESS CLOSED": "NEGOCIO CERRADO",
    CANCELLED: "CANCELADO",
    "CUSTOMER ISSUE": "PROBLEMA CON CLIENTE",
    "REQUESTED FUTURE DELIVERY DATE": "SOLICITO ENTREGA FUTURA",
    "NO LONGER WANTS PACKAGE": "YA NO QUIERE EL PAQUETE",
    UNAVAILABLE: "NO DISPONIBLE",
    "EMPTY PACKAGE": "PAQUETE VACÍO",
    "DAMAGED PACKAGE": "PAQUETE DAÑADO",
    "INCORRECT ADDRESS": "DIRECCIÓN INCORRECTA",
    "LOCKER ISSUES": "PROBLEMAS CON LOCKER",
    PICKUP: "RECOGIDA",
    FULL: "LLENO",
    "NOT WORKING": "NO FUNCIONA",
    "CUSTOMER RETURN": "DEVOLUCIÓN DEL CLIENTE",
    "MISSORTED PACKAGE": "PAQUETE MAL CLASIFICADO",
    OTP: "OTP",
    "CODE UNAVAILABLE": "CÓDIGO NO DISPONIBLE",
    "CUSTOMER UNAVAILABLE": "CLIENTE NO DISPONIBLE",
    "UNABLE TO PICKUP": "NO SE PUDO RECOGER",
    "UNSAFE DELIVERY": "ENTREGA INSEGURA",
    "DUE TO DOG": "POR PERRO",
    "DUE TO BAD WEATHER": "POR MAL CLIMA",
    "UNSAFE TO LEAVE PACKAGE": "INSEGURO DEJAR PAQUETE",
    "ROAD CLOSED": "CARRETERA CERRADA",
    "UNABLE TO FIND ADDRESS": "NO SE PUDO ENCONTRAR DIRECCIÓN",
  },
};

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  scanButton.textContent = isScanning ? t("stopScan") : t("startScan");
  renderReasons();
  updateSubReasons();
  if (scanMessageKey) {
    setScanMessage(t(scanMessageKey), scanMessageIsError, scanMessageKey);
  }
  updatePhotoHint();
  if (verificationDialog.open && currentVerificationReason) {
    renderVerificationModal(currentVerificationReason);
  }
  updateBusinessProofPhotoName();
}

function renderReasons() {
  const selectedReason = reasonSelect.value;
  reasonSelect.innerHTML = `<option value="">${t("selectReason")}</option>`;
  reasons.forEach((reason) => {
    const option = document.createElement("option");
    option.value = reason.value;
    option.textContent = translateReason(reason.value);
    reasonSelect.append(option);
  });
  reasonSelect.value = selectedReason;
}

function updateSubReasons() {
  const selected = reasons.find((reason) => reason.value === reasonSelect.value);
  const subReasons = selected?.subReasons || [];
  const selectedSubReason = subReasonSelect.value;

  subReasonSelect.innerHTML = `<option value="">${t("selectSubReason")}</option>`;
  subReasons.forEach((subReason) => {
    const option = document.createElement("option");
    option.value = subReason;
    option.textContent = translateReason(subReason);
    subReasonSelect.append(option);
  });

  subReasonGroup.hidden = subReasons.length === 0;
  subReasonSelect.required = subReasons.length > 0;
  subReasonSelect.value = subReasons.includes(selectedSubReason) ? selectedSubReason : "";
  updatePhotoHint();
}

function updatePhotoHint() {
  if (photoInput.files.length) {
    photoName.textContent = `${t("photoSelected")} ${photoInput.files[0].name}`;
    return;
  }

  photoName.textContent = reasonSelect.value === "BUSINESS CLOSED"
    ? t("businessClosedPhotoHint")
    : t("photoHint");
}

function setScanMessage(message, isError = false, key = "") {
  scanMessageKey = key;
  scanMessageIsError = isError;
  scanMessage.textContent = message;
  scanMessage.classList.toggle("is-error", isError);
}

function setFormMessage(message, type = "") {
  formMessage.textContent = message;
  formMessage.className = `form-message${type ? ` is-${type}` : ""}`;
}

function normalizeTba(value) {
  return value.trim().toUpperCase();
}

function acceptTba(value) {
  const tba = normalizeTba(value);
  if (!tba.startsWith("TBA")) {
    setScanMessage(t("invalidScan"), true, "invalidScan");
    return false;
  }

  document.querySelector("#tbaCode").value = tba;
  setScanMessage(t("validScan"), false, "validScan");
  return true;
}

async function stopScanner() {
  if (!scanner || !isScanning) {
    return;
  }

  await scanner.stop();
  isScanning = false;
  scannerPanel.hidden = true;
  scanButton.textContent = t("startScan");
}

async function startScanner() {
  if (!window.Html5Qrcode) {
    setScanMessage(t("scannerUnavailable"), true, "scannerUnavailable");
    return;
  }

  if (!scanner) {
    scanner = new Html5Qrcode("reader");
  }

  scannerPanel.hidden = false;
  isScanning = true;
  scanButton.textContent = t("stopScan");

  try {
    await scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 160 } },
      async (decodedText) => {
        if (acceptTba(decodedText)) {
          await stopScanner();
        }
      },
      () => {}
    );
  } catch (error) {
    isScanning = false;
    scannerPanel.hidden = true;
    scanButton.textContent = t("startScan");
    setScanMessage(t("scannerUnavailable"), true, "scannerUnavailable");
  }
}

function getCompressedPhotoName(fileName) {
  const baseName = fileName.replace(/\.[^/.]+$/, "") || "return-photo";
  return `${baseName}.jpg`;
}

function fileToPayload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const image = new Image();

    reader.onload = () => {
      image.src = String(reader.result);
    };

    image.onload = () => {
      const scale = Math.min(1, 400 / image.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      const result = canvas.toDataURL("image/jpeg", 0.25);

      resolve({
        name: getCompressedPhotoName(file.name),
        type: "image/jpeg",
        data: result.split(",")[1],
      });
    };

    reader.onerror = reject;
    image.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getReturnReason() {
  const reason = reasonSelect.value;
  const selected = reasons.find((item) => item.value === reason);
  if (selected?.subReasons?.length) {
    return `${reason} - ${subReasonSelect.value}`;
  }
  return reason;
}

function getChecklist(returnReason) {
  return procedureChecklists[returnReason] || defaultChecklist;
}

function translateChecklistItem(value) {
  return currentLanguage === "es" ? checklistLabels[value] || value : value;
}

function getChecklistInputId(value, index) {
  return `procedure-step-${index}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function renderVerificationModal(returnReason) {
  currentVerificationReason = returnReason;
  const checklist = getChecklist(returnReason);
  verificationTitle.textContent = t("checklistPromptTitle");
  verificationMessage.textContent = "";
  verificationMessage.className = "form-message";
  verificationOptions.innerHTML = "";
  businessProofGroup.hidden = returnReason !== "BUSINESS CLOSED";
  businessProofPhotoInput.required = returnReason === "BUSINESS CLOSED";
  if (businessProofGroup.hidden) {
    businessProofPhotoInput.value = "";
  }
  updateBusinessProofPhotoName();

  checklist.forEach((value, index) => {
    const label = document.createElement("label");
    label.className = "verification-option";
    label.htmlFor = getChecklistInputId(value, index);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = getChecklistInputId(value, index);
    input.name = "verificationStep";
    input.value = value;

    const text = document.createElement("span");
    text.textContent = translateChecklistItem(value);

    label.append(input, text);
    verificationOptions.append(label);
  });
}

function updateBusinessProofPhotoName() {
  businessProofPhotoName.textContent = businessProofPhotoInput.files.length
    ? `${t("photoSelected")} ${businessProofPhotoInput.files[0].name}`
    : "";
}

function getContactStepCompleted() {
  const checklist = getChecklist(currentVerificationReason);
  const checked = Array.from(verificationOptions.querySelectorAll("input:checked"));

  if (checked.length !== checklist.length) {
    return "";
  }

  return checked.map((input) => input.value).join("; ");
}

function showVerificationModal(payload) {
  pendingPayload = payload;
  renderVerificationModal(payload.returnReason);
  verificationDialog.showModal();
}

async function sendPayload(payload) {
  if (isSubmitting) {
    return;
  }

  isSubmitting = true;
  submitButton.disabled = true;
  submitButton.textContent = t("submittingRts");
  backButton.disabled = true;
  confirmSubmitButton.disabled = true;
  confirmSubmitButton.textContent = t("submittingRts");
  verificationMessage.textContent = t("submittingRts");
  verificationMessage.className = "form-message";

  let submittedSuccessfully = false;
  try {
    const compressedPhoto = await fileToPayload(payload.photoFile);
    const uploadPayload = {
      ...payload,
      photo: compressedPhoto,
    };

    if (payload.businessClosedProofPhotoFile) {
      uploadPayload.businessClosedProofPhoto = await fileToPayload(payload.businessClosedProofPhotoFile);
    }

    delete uploadPayload.photoFile;
    delete uploadPayload.businessClosedProofPhotoFile;

    const response = await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(uploadPayload),
    });
    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.error || "Submission failed");
    }

    verificationDialog.close("confirm");
    submittedSuccessfully = true;
    setFormMessage(t("successTitle"), "success");
    successDialog.showModal();
  } catch (error) {
    const message = error.message || t("submitError");
    verificationMessage.textContent = message;
    verificationMessage.className = "form-message is-error";
    setFormMessage(message, "error");
  } finally {
    isSubmitting = false;
    submitButton.disabled = false;
    submitButton.textContent = t("submit");
    backButton.disabled = false;
    confirmSubmitButton.disabled = false;
    confirmSubmitButton.textContent = t("confirmSubmit");
    if (submittedSuccessfully) {
      pendingPayload = null;
    }
  }
}

async function submitRts(event) {
  event.preventDefault();
  setFormMessage("");

  const tbaInput = document.querySelector("#tbaCode");
  if (!form.reportValidity() || !acceptTba(tbaInput.value)) {
    setFormMessage(t("required"), "error");
    return;
  }

  if (!CONFIG.appsScriptUrl) {
    setFormMessage(t("missingBackend"), "error");
    return;
  }

  const payload = {
    driverName: document.querySelector("#driverName").value.trim(),
    tbaCode: normalizeTba(tbaInput.value),
    returnReason: getReturnReason(),
    contactStepCompleted: "",
    userAgent: navigator.userAgent,
    dispatcherNotes: "",
    photoFile: photoInput.files[0],
  };

  showVerificationModal(payload);
}

async function resetForAnotherPackage() {
  const driverName = document.querySelector("#driverName").value;
  form.reset();
  businessProofPhotoInput.value = "";
  document.querySelector("#driverName").value = driverName;
  setScanMessage("");
  setFormMessage("");
  updateBusinessProofPhotoName();
  updateSubReasons();
  await startScanner();
}

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "es" : "en";
  applyTranslations();
});

scanButton.addEventListener("click", async () => {
  if (isScanning) {
    await stopScanner();
    return;
  }
  await startScanner();
});

document.querySelector("#tbaCode").addEventListener("blur", (event) => {
  if (event.target.value.trim()) {
    acceptTba(event.target.value);
  }
});

reasonSelect.addEventListener("change", updateSubReasons);

photoInput.addEventListener("change", () => {
  updatePhotoHint();
});

form.addEventListener("submit", submitRts);

verificationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  const action = event.submitter?.value;
  if (action === "back") {
    pendingPayload = null;
    verificationDialog.close("back");
    return;
  }

  const contactStepCompleted = getContactStepCompleted();
  if (!contactStepCompleted) {
    verificationMessage.textContent = t("checklistRequired");
    verificationMessage.className = "form-message is-error";
    return;
  }

  if (pendingPayload.returnReason === "BUSINESS CLOSED" && !businessProofPhotoInput.files.length) {
    verificationMessage.textContent = t("businessProofPhotoRequired");
    verificationMessage.className = "form-message is-error";
    return;
  }

  await sendPayload({
    ...pendingPayload,
    contactStepCompleted,
    businessClosedProofPhotoFile: businessProofPhotoInput.files[0],
  });
});

businessProofPhotoInput.addEventListener("change", updateBusinessProofPhotoName);

successDialog.addEventListener("close", async () => {
  if (successDialog.returnValue === "another") {
    await resetForAnotherPackage();
  }
});

applyTranslations();
