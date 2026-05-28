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
    submit: "Submit RTS",
    submitting: "Submitting...",
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
    submit: "Enviar RTS",
    submitting: "Enviando...",
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
  },
};

let currentLanguage = "en";
let scanner;
let isScanning = false;
let scanMessageKey = "";
let scanMessageIsError = false;

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
  if (photoInput.files.length) {
    photoName.textContent = `${t("photoSelected")} ${photoInput.files[0].name}`;
  }
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

function fileToPayload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve({
        name: file.name,
        type: file.type || "application/octet-stream",
        data: result.split(",")[1],
      });
    };
    reader.onerror = reject;
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

  submitButton.disabled = true;
  submitButton.textContent = t("submitting");

  try {
    const photo = await fileToPayload(photoInput.files[0]);
    const payload = {
      driverName: document.querySelector("#driverName").value.trim(),
      tbaCode: normalizeTba(tbaInput.value),
      returnReason: getReturnReason(),
      userAgent: navigator.userAgent,
      dispatcherNotes: "",
      photo,
    };

    const response = await fetch(CONFIG.appsScriptUrl, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.error || "Submission failed");
    }

    setFormMessage(t("successTitle"), "success");
    successDialog.showModal();
  } catch (error) {
    setFormMessage(t("submitError"), "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = t("submit");
  }
}

async function resetForAnotherPackage() {
  const driverName = document.querySelector("#driverName").value;
  form.reset();
  document.querySelector("#driverName").value = driverName;
  setScanMessage("");
  setFormMessage("");
  photoName.textContent = t("photoHint");
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
  photoName.textContent = photoInput.files.length
    ? `${t("photoSelected")} ${photoInput.files[0].name}`
    : t("photoHint");
});

form.addEventListener("submit", submitRts);

successDialog.addEventListener("close", async () => {
  if (successDialog.returnValue === "another") {
    await resetForAnotherPackage();
  }
});

applyTranslations();
