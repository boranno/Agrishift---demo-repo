/**
 * Model Transparency & Specification Service
 * Adheres strictly to scientific honesty rules:
 * Model-dependent endpoints return honest 'under_development' states.
 * No fabricated predictions, fake accuracies, or synthetic confidence metrics.
 */

export const MODEL_CARD_DATA = {
  modelName: 'AgriShift Salinity & Crop Suitability Inference Engine',
  modelNameBn: 'এগ্রিশিফট মাটি লবণাক্ততা ও ফসল উপযোগিতা নির্ণয় ব্যবস্থা',
  version: '0.1.0-planned',
  status: 'ARCHITECTURE SPECIFICATION PHASE',
  statusKey: 'under_development',
  isModelTrained: false,
  isApiConnected: false,
  targetTask: 'Continuous Topsoil Electrical Conductivity (ECe dS/m) Prediction & Multi-Variate Suitability Classification',
  targetTaskBn: 'মাটির উপরিভাগের বৈদ্যুতিক পরিবাহিতা (ECe dS/m) পূর্বাভাস ও বহুমাত্রিক ফসল উপযোগিতা শ্রেণিবিন্যাস',
  targetVariables: [
    {
      name: 'Soil ECe (dS/m)',
      type: 'Continuous Regression',
      measurementStandard: 'Saturated Soil Paste Extract at 25°C',
      targetMae: '<= 1.2 dS/m',
      targetRmse: '<= 1.8 dS/m'
    },
    {
      name: 'Seasonal Crop Suitability Tier',
      type: '3-Class Ordinal Classification (Suitable, Marginal, Risky)',
      targetMetric: 'Macro F1-Score >= 0.82'
    }
  ],
  intendedUsers: 'Bangladeshi smallholder farmers, Upazila Agriculture Extension Officers (DAE), and agronomic researchers.',
  intendedUsersBn: 'বাংলাদেশের ক্ষুদ্র কৃষক, উপজেলা কৃষি সম্প্রসারণ কর্মকর্তা (ডিএই) এবং কৃষিবিজ্ঞানী।',
  plannedTrainingSources: [
    'Soil Resource Development Institute (SRDI) 64-District Ground Soil Database (2018–2025)',
    'NASA SMAP L3 Radiometer Global Daily 36 km EASE-Grid Soil Moisture',
    'NASA MODIS (MOD13Q1) 250m 16-Day Vegetation Indices (NDVI / EVI)',
    'NASA GPM (IMERG) Daily Global Precipitation Measurement',
    'USGS / NASA Landsat 8-9 Surface Reflectance 30m',
    'NASA POWER Daily Agroclimatology Solar & Temperature Archive'
  ],
  plannedTrainingSourcesBn: [
    'মৃত্তিকা সম্পদ উন্নয়ন ইনস্টিটিউট (SRDI)-এর ৬৪ জেলার মাটি ডেটাবেস (২০১৮–২০২৫)',
    'NASA SMAP L3 রেডিওমিটার বৈশ্বিক দৈনিক ৩৬ কিমি মাটির আর্দ্রতা তথ্য',
    'NASA MODIS (MOD13Q1) ২৫০ মিটার ১৬ দিনের উদ্ভিদ সূচক (NDVI / EVI)',
    'NASA GPM (IMERG) দৈনিক বৈশ্বিক বৃষ্টিপাত পরিমাপ',
    'USGS / NASA Landsat 8-9 পৃষ্ঠ প্রতিফলন তথ্য (৩০ মিটার)',
    'NASA POWER দৈনিক কৃষি-আবহাওয়া, সৌরশক্তি ও তাপমাত্রার তথ্য'
  ],
  validationStrategy: {
    method: 'Spatial Leave-One-District-Out Cross-Validation (LODO-CV)',
    methodBn: 'স্থানিক জেলা-ভিত্তিক Leave-One-Out ক্রস-ভ্যালিডেশন (LODO-CV)',
    descriptionEn: 'To prevent spatial autocorrelation leakage, models are trained on N-1 districts and validated on an entirely held-out coastal district (e.g. validating on Khulna while training on Satkhira, Bagerhat, and Patuakhali).',
    descriptionBn: 'স্থানিক পারস্পরিক সম্পর্কের প্রভাবমুক্ত রাখতে ১টি জেলাকে সম্পূর্ণ আলাদা রেখে বাকি জেলাগুলোর তথ্যের ওপর মডেল পরীক্ষা করা হবে।'
  },
  knownScientificLimitations: [
    {
      id: 'lim-1',
      titleEn: 'Microwave Soil Penetration Depth',
      titleBn: 'মাইক্রোওয়েভ সেন্সরের গভীরতা সীমাবদ্ধতা',
      descEn: 'SMAP L-band radiometer senses soil moisture only within the top 0–5 cm. Deep sub-surface moisture and hardpan salt accumulation require coupled hydrological modeling.',
      descBn: 'এসএমএপি উপগ্রহ কেবল ওপরের ০–৫ সেমি মাটির তথ্য পায়; শিকড় অঞ্চলের গভীরতার জন্য আলাদা জলতাত্ত্বিক মডেল প্রয়োজন।'
    },
    {
      id: 'lim-2',
      titleEn: 'Monsoon Cloud Occlusion',
      titleBn: 'বর্ষায় মেঘের প্রতিবন্ধকতা',
      descEn: 'Optical satellite observations (Landsat / MODIS NDVI) suffer substantial missing data gaps during peak monsoon months (June–September) due to dense tropical cloud cover.',
      descBn: 'আষাঢ়-শ্রাবণ মাসে অতিরিক্ত মেঘের কারণে সাধারণ স্যাটেলাইটে মাটির ও উদ্ভিদের স্পষ্ট ছবি পাওয়া যায় না।'
    },
    {
      id: 'lim-3',
      titleEn: 'Tidal Fluvial Salinity Dynamics',
      titleBn: 'নদীর আকস্মিক জোয়ার-ভাটা ও নোনা পানির প্রভাব',
      descEn: 'Polder river salinity can fluctuate dramatically within hours due to upstream freshwater withdrawal and spring tides, which cannot be captured without automated river salinity sensors.',
      descBn: 'নদীতে অমাবস্যা-পূর্ণিমার জোয়ারে যে নোনা পানি ঢোকে তা তাৎক্ষণিকভাবে কেবল স্যাটেলাইট দিয়ে ধরা সম্ভব নয়।'
    }
  ]
};

export const SALINITY_PREDICTION_SPEC = {
  isAvailable: false,
  status: 'MODEL_UNDER_DEVELOPMENT',
  messageEn: 'The automated ML soil salinity prediction model is currently being developed for Part 2 and Part 3. In accordance with AgriShift scientific integrity rules, no synthetic or fabricated predictions are returned.',
  messageBn: 'মাটির লবণাক্ততার কৃত্রিম বুদ্ধিমত্তা মডেলটি বর্তমানে প্রস্তুত করা হচ্ছে। বৈজ্ঞানিক সততা বজায় রাখতে কোনো ভুয়া বা কাল্পনিক মান প্রদর্শন করা হচ্ছে না।',
  requiredPipelineInputs: [
    {
      source: 'NASA SMAP L3',
      sourceBn: 'NASA SMAP L3',
      parameter: 'Surface Soil Moisture (cm³/cm³)',
      parameterBn: 'মাটির উপরিভাগের আর্দ্রতা (cm³/cm³)',
      status: 'Pipeline Schema Ready / Awaiting Part 2 Ingestion',
      statusBn: 'পাইপলাইন কাঠামো প্রস্তুত / পর্ব ২-এর সংযোগ অপেক্ষমাণ',
      ready: false
    },
    {
      source: 'NASA MODIS',
      sourceBn: 'NASA MODIS',
      parameter: 'Evapotranspiration & Vegetation Index (NDVI)',
      parameterBn: 'বাষ্পীভবন ও উদ্ভিদ সূচক (NDVI)',
      status: 'Pipeline Schema Ready / Awaiting Part 2 Ingestion',
      statusBn: 'পাইপলাইন কাঠামো প্রস্তুত / পর্ব ২-এর সংযোগ অপেক্ষমাণ',
      ready: false
    },
    {
      source: 'SRDI Soil Card',
      sourceBn: 'SRDI মাটি পরীক্ষার কার্ড',
      parameter: 'Baseline Ground ECe & Soil Texture',
      parameterBn: 'প্রাথমিক মাটির ECe ও মাটির গঠন',
      status: 'Available via Soil Report OCR / Manual Input',
      statusBn: 'মাটি পরীক্ষার OCR / হাতে ইনপুটের মাধ্যমে পাওয়া যাবে',
      ready: true
    },
    {
      source: 'NASA GPM IMERG',
      sourceBn: 'NASA GPM IMERG',
      parameter: 'Cumulative 30-Day Precipitation',
      parameterBn: '৩০ দিনের মোট বৃষ্টিপাত',
      status: 'Pipeline Schema Ready / Awaiting Part 2 Ingestion',
      statusBn: 'পাইপলাইন কাঠামো প্রস্তুত / পর্ব ২-এর সংযোগ অপেক্ষমাণ',
      ready: false
    }
  ]
};

export const ML_SUITABILITY_EXPLAINABILITY = {
  isAvailable: false,
  status: 'MODEL_UNDER_DEVELOPMENT',
  factorWeightsPreview: [
    { factorEn: 'Soil Salinity (ECe dS/m)', factorBn: 'মাটির লবণাক্ততা (ইসি)', weight: 38, impact: 'High' },
    { factorEn: 'Available Soil Moisture (SMAP)', factorBn: 'মাটির আর্দ্রতা প্রাপ্যতা', weight: 27, impact: 'High' },
    { factorEn: 'Soil Texture & Drainage', factorBn: 'মাটির গঠন ও পানি নিষ্কাশন', weight: 19, impact: 'Medium' },
    { factorEn: 'Thermal & Sowing Window', factorBn: 'তাপমাত্রা ও উপযুক্ত সময়সূচি', weight: 16, impact: 'Medium' }
  ]
};

export const getModelCardData = () => MODEL_CARD_DATA;
export const getSalinityPredictionSpec = () => SALINITY_PREDICTION_SPEC;
export const getMlSuitabilityExplainability = () => ML_SUITABILITY_EXPLAINABILITY;
