/**
 * Soil Report & OCR Service
 * Simulates document processing and extraction of SRDI soil health card parameters.
 */

export const SAMPLE_SRDI_CARDS = [
  {
    id: 'srdi-khulna-sample',
    cardName: 'SRDI Khulna Regional Soil Card #KHU-2026-88',
    farmerName: 'Md. Rafiqul Islam / মোঃ রফিকুল ইসলাম',
    district: 'Khulna',
    upazila: 'Dacope',
    mouza: 'Bajua',
    soilTexture: 'Clay Loam (পলি দোআঁশ / এঁটেল)',
    extractedValues: {
      pH: 6.8,
      ec: 4.8, // dS/m
      organicMatter: 1.65, // %
      nitrogen: 0.12, // %
      phosphorus: 14.5, // ppm
      potassium: 0.28, // meq/100g
      sulfur: 18.2, // ppm
      zinc: 1.1, // ppm
      boron: 0.42 // ppm
    },
    missingFields: []
  },
  {
    id: 'srdi-satkhira-sample',
    cardName: 'SRDI Satkhira Soil Card #SAT-2026-114',
    farmerName: 'Kamal Hossain / কামাল হোসেন',
    district: 'Satkhira',
    upazila: 'Shyamnagar',
    mouza: 'Munshiganj',
    soilTexture: 'Saline Clay (লবণাক্ত এঁটেল)',
    extractedValues: {
      pH: 7.4,
      ec: 7.6, // High salinity dS/m
      organicMatter: 1.15,
      nitrogen: 0.08,
      phosphorus: 9.8,
      potassium: 0.35,
      sulfur: 22.0,
      zinc: '', // missing
      boron: '' // missing
    },
    missingFields: ['zinc', 'boron']
  }
];

export const validateSoilCardFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5 MB

  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file format. Please upload JPG, PNG, or PDF.' };
  }
  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 5MB limit. Please upload a smaller scan or photo.' };
  }
  return { valid: true };
};

/**
 * Simulates OCR extraction with realistic delay and step-by-step progress
 */
export const simulateOcrExtraction = async (fileOrSampleId, onProgress) => {
  const steps = [
    { progress: 20, stageEn: 'Pre-processing document image & correcting orientation...', stageBn: 'ডকুমেন্ট ছবি প্রক্রিয়া ও কোণ সোজা করা হচ্ছে...' },
    { progress: 50, stageEn: 'Detecting SRDI tabular structure and nutrient labels...', stageBn: 'এসআরডিআই ছক ও পুষ্টি উপাদানের শিরোনাম শনাক্ত হচ্ছে...' },
    { progress: 80, stageEn: 'Extracting numeric values for pH, EC, and macronutrients...', stageBn: 'পিএইচ, লবণাক্ততা ও রাসায়নিক উপাদানের মান রূপান্তর করা হচ্ছে...' },
    { progress: 100, stageEn: 'Validating agronomic bounds and units...', stageBn: 'কৃষিতাত্ত্বিক গ্রহণযোগ্য সীমা যাচাই সম্পন্ন...' }
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step);
    await new Promise((r) => setTimeout(r, 400));
  }

  // Return a sample extraction
  const sample = typeof fileOrSampleId === 'string' && fileOrSampleId.includes('satkhira')
    ? SAMPLE_SRDI_CARDS[1]
    : SAMPLE_SRDI_CARDS[0];

  return {
    success: true,
    data: sample,
    isMock: true,
    processedAt: new Date().toISOString()
  };
};

