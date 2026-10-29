import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.resolve(__dirname, '../src/locales');
const enPath = path.join(localesDir, 'en.json');
const bnPath = path.join(localesDir, 'bn.json');

console.log('--- AgriShift Frontend Verification ---');

// 1. Verify Locales
if (!fs.existsSync(enPath) || !fs.existsSync(bnPath)) {
  console.error('❌ Locale files missing!');
  process.exit(1);
}

const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
const bn = JSON.parse(fs.readFileSync(bnPath, 'utf-8'));

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      keys = keys.concat(getKeys(obj[k], key));
    } else {
      keys.push(key);
    }
  }
  return keys;
}

const enKeys = getKeys(en);
const bnKeys = getKeys(bn);

console.log(`✓ English keys count: ${enKeys.length}`);
console.log(`✓ Bangla keys count: ${bnKeys.length}`);

const missingInBn = enKeys.filter(k => !bnKeys.includes(k));
const missingInEn = bnKeys.filter(k => !enKeys.includes(k));

if (missingInBn.length > 0) {
  console.warn(`⚠️ Keys in EN but missing in BN (${missingInBn.length}):`, missingInBn.slice(0, 5));
} else {
  console.log('✓ All English keys are present in Bangla translations!');
}

if (missingInEn.length > 0) {
  console.warn(`⚠️ Keys in BN but missing in EN (${missingInEn.length}):`, missingInEn.slice(0, 5));
} else {
  console.log('✓ All Bangla keys are present in English translations!');
}

// 2. Verify 15 Feature Components
const pagesToCheck = [
  '../src/pages/Home/HomePage.jsx',
  '../src/pages/FarmMap/FarmMapPage.jsx',
  '../src/pages/Dashboard/DashboardPage.jsx',
  '../src/pages/WeatherCalendar/WeatherCalendarPage.jsx',
  '../src/pages/SoilReport/SoilReportPage.jsx',
  '../src/pages/CropSuitability/CropSuitabilityPage.jsx',
  '../src/pages/RotationPlanner/RotationPlannerPage.jsx',
  '../src/pages/WhatIfSimulator/WhatIfSimulatorPage.jsx',
  '../src/pages/ScenarioComparison/ScenarioComparisonPage.jsx',
  '../src/pages/Alerts/AlertsPage.jsx',
  '../src/pages/DataSources/DataSourcesPage.jsx',
  '../src/pages/SalinityPrediction/SalinityPredictionPage.jsx',
  '../src/pages/CropSuitability/MlSuitabilityPage.jsx',
  '../src/pages/RotationPlanner/IntelligentRotationPage.jsx',
  '../src/pages/ModelEvaluation/ModelEvaluationPage.jsx'
];

let allPagesExist = true;
pagesToCheck.forEach((pageRelPath, idx) => {
  const fullPath = path.resolve(__dirname, pageRelPath);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ Feature ${idx + 1} page exists: ${path.basename(fullPath)}`);
  } else {
    console.error(`❌ Feature ${idx + 1} page missing: ${pageRelPath}`);
    allPagesExist = false;
  }
});

if (!allPagesExist) {
  console.error('❌ Some feature pages are missing!');
  process.exit(1);
}

console.log('✅ All 15 Feature components and localization checks passed!');

