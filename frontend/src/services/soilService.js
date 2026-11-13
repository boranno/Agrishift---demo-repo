/**
 * Soil report utilities and browser-side OCR for soil health cards.
 */

export const SAMPLE_SOIL_CARD = {
  id: 'video-demo-soil-card',
  isMock: true,
  cardName: 'Video demo values (illustrative)',
  extractedValues: {
    pH: 7.2,
    ec: 4.5,
    nitrogenMgKg: 120,
    phosphorusMgKg: 18,
    potassiumMgKg: 150
  },
  missingFields: []
};

export const validateSoilCardFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5 MB

  if (!file) {
    return { valid: false, error: 'fileRequired' };
  }
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'fileTypeError' };
  }
  if (file.size > maxSize) {
    return { valid: false, error: 'fileTooLarge' };
  }
  return { valid: true };
};

const SOIL_FIELDS = [
  { key: 'pH', pattern: '(?:soil\\s*)?p\\s*h\\b|পিএইচ|পি\\s*এইচ', min: 3, max: 10 },
  { key: 'ec', pattern: '\\bECe\\b|saturated\\s+paste(?:\\s+extract)?|স্যাচুরেটেড\\s*পেস্ট', unit: 'dS\\s*\\/\\s*m|mS\\s*\\/\\s*cm', min: 0, max: 30 },
  { key: 'nitrogenMgKg', pattern: '\\btotal\\s+nitrogen\\b|\\bnitrogen\\b|\\bN\\b|নাইট্রোজেন|এন', unit: 'ppm|mg\\s*\\/\\s*kg', min: 0, max: 100000 },
  { key: 'phosphorusMgKg', pattern: '\\bavailable\\s+phosphorus\\b|\\bphosphorus\\b|\\bP\\b(?!\\s*H)|ফসফরাস|পি(?!\\s*এইচ)', unit: 'ppm|mg\\s*\\/\\s*kg', min: 0, max: 100000 },
  { key: 'potassiumMgKg', pattern: '\\bexchangeable\\s+potassium\\b|\\bpotassium\\b|\\bK\\b|পটাশিয়াম|পটাসিয়াম|কে', unit: 'ppm|mg\\s*\\/\\s*kg', min: 0, max: 100000 }
];

const normalizeOcrText = (text) => String(text)
  .replace(/[০-৯]/g, digit => String('০১২৩৪৫৬৭৮৯'.indexOf(digit)))
  .replace(/(\d),(\d{1,2})(?!\d)/g, '$1.$2')
  .replace(/\(?\s*\d+\s*:\s*\d+(?:\.\d+)?\s*\)?/g, ' ');

export const parseSoilReportText = (text) => {
  const lines = normalizeOcrText(text).split(/\r?\n/);
  const values = {};
  const numberPattern = '(\\d+(?:\\.\\d+)?|\\.\\d+)';

  SOIL_FIELDS.forEach(({ key, pattern, unit, min, max }) => {
    for (const line of lines) {
      const label = new RegExp(pattern, 'i').exec(line);
      if (!label || (unit && !new RegExp(unit, 'i').test(line))) continue;

      let valueText = line.slice(label.index + label[0].length)
        .replace(/\(?\s*\d+\s*:\s*\d+(?:\.\d+)?\s*\)?/g, ' ');
      if (unit) valueText = valueText.replace(new RegExp(unit, 'i'), ' ');

      const match = valueText.match(new RegExp(numberPattern));
      if (!match) continue;

      const value = Number(match[0]);
      if (Number.isFinite(value) && value >= min && value <= max) {
        values[key] = value;
        break;
      }
    }
  });

  return values;
};

const loadExternalScript = (url, globalName) => {
  if (window[globalName]) return Promise.resolve(window[globalName]);

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (window[globalName]) resolve(window[globalName]);
      else reject(new Error(`${globalName} did not initialize`));
    };
    script.onerror = () => {
      script.remove();
      reject(new Error(`Unable to load ${globalName}`));
    };
    document.head.appendChild(script);
  });
};

const extractPdfText = async (file) => {
  const pdfjsLib = await loadExternalScript(
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js',
    'pdfjsLib'
  );
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const textPages = [];

  for (let pageNumber = 1; pageNumber <= Math.min(pdf.numPages, 3); pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const items = content.items
      .filter(item => item.str.trim())
      .map(item => ({ text: item.str, x: item.transform[4], y: item.transform[5], width: item.width || 0 }))
      .sort((left, right) => right.y - left.y || left.x - right.x);
    const lines = [];

    items.forEach(item => {
      const line = lines[lines.length - 1];
      if (line && Math.abs(line.y - item.y) <= 3) line.items.push(item);
      else lines.push({ y: item.y, items: [item] });
    });

    textPages.push(lines.map(line => line.items
      .sort((left, right) => left.x - right.x)
      .map(item => item.text.trim())
      .join(' ')).join('\n'));
  }

  return { pdf, pdfjsLib, text: textPages.join('\n') };
};

const renderFirstPdfPage = async (pdf) => {
  const page = await pdf.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(2500 / Math.max(baseViewport.width, baseViewport.height), 1.5);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const context = canvas.getContext('2d');

  if (!context) throw new Error('Unable to prepare PDF page for OCR');
  document.body.appendChild(canvas);
  try {
    await page.render({ canvasContext: context, viewport, intent: 'print' }).promise;
  } finally {
    canvas.remove();
  }
  return canvas;
};

const recognizeImage = async (image, onProgress) => {
  const Tesseract = await loadExternalScript(
    'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
    'Tesseract'
  );
  if (onProgress) {
    onProgress({
      progress: 25,
      stageEn: 'Starting the browser OCR engine...',
      stageBn: 'ব্রাউজার OCR চালু হচ্ছে...'
    });
  }
  const worker = await Tesseract.createWorker('eng+ben', 1, {
    logger: message => {
      if (message.status === 'recognizing text' && onProgress) {
        onProgress({
          progress: Math.round(message.progress * 100),
          stageEn: 'Reading report text in this browser...',
          stageBn: 'এই ব্রাউজারেই রিপোর্টের লেখা পড়া হচ্ছে...'
        });
      }
    }
  });

  try {
    let bestText = '';
    let bestValues = {};

    for (const pageSegmentationMode of ['6', '4']) {
      await worker.setParameters({ tessedit_pageseg_mode: pageSegmentationMode });
      const { data } = await worker.recognize(image);
      const values = parseSoilReportText(data.text);
      if (Object.keys(values).length > Object.keys(bestValues).length) {
        bestText = data.text;
        bestValues = values;
      }
      if (Object.keys(bestValues).length === SOIL_FIELDS.length) break;
    }

    return { text: bestText, values: bestValues };
  } finally {
    await worker.terminate();
  }
};

export const extractSoilReport = async (file, onProgress) => {
  const progress = (value, stageEn, stageBn) => {
    if (onProgress) onProgress({ progress: value, stageEn, stageBn });
  };
  let text = '';
  let values = {};

  if (file.type === 'application/pdf' || /\.pdf$/i.test(file.name)) {
    progress(10, 'Reading PDF in this browser...', 'এই ব্রাউজারেই PDF পড়া হচ্ছে...');
    const extractedPdf = await extractPdfText(file);
    text = extractedPdf.text;
    values = parseSoilReportText(text);
    if (Object.keys(values).length < SOIL_FIELDS.length) {
      progress(20, 'Preparing the first PDF page for OCR...', 'প্রথম PDF পৃষ্ঠা OCR-এর জন্য প্রস্তুত হচ্ছে...');
      const image = await renderFirstPdfPage(extractedPdf.pdf);
      progress(25, 'Starting OCR for the scanned PDF page...', 'স্ক্যান করা PDF পৃষ্ঠায় OCR শুরু হচ্ছে...');
      const imageBlob = await new Promise((resolve, reject) => {
        image.toBlob(blob => {
          if (blob) resolve(blob);
          else reject(new Error('Unable to prepare rendered PDF page for OCR'));
        }, 'image/png');
      });
      const recognized = await recognizeImage(imageBlob, onProgress);
      if (Object.keys(recognized.values).length > Object.keys(values).length) {
        text = recognized.text;
        values = recognized.values;
      }
    }
  } else {
    progress(10, 'Preparing report image...', 'রিপোর্টের ছবি প্রস্তুত হচ্ছে...');
    const recognized = await recognizeImage(file, onProgress);
    text = recognized.text;
    values = recognized.values;
  }

  progress(100, 'Review extracted values before saving.', 'সংরক্ষণের আগে শনাক্ত করা মানগুলো যাচাই করুন।');
  return {
    cardName: file.name,
    extractedValues: values,
    missingFields: SOIL_FIELDS.map(field => field.key).filter(key => values[key] === undefined),
    isMock: false
  };
};

