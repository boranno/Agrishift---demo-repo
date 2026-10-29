import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Save,
  Eye,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useFarm } from '../../context/FarmContext';
import {
  validateSoilCardFile,
  simulateOcrExtraction,
  SAMPLE_SRDI_CARDS
} from '../../services/soilService';
import PageHeader from '../../components/common/PageHeader';
import DemoBadge from '../../components/common/DemoBadge';

export const SoilReportPage = () => {
  const { t, isBangla } = useTranslation();
  const { soil, updateSoil } = useFarm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileError, setFileError] = useState('');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState({ progress: 0, stageEn: '', stageBn: '' });
  const [extractionResult, setExtractionResult] = useState(null);

  // Editable Form fields
  const [formFields, setFormFields] = useState({
    pH: soil?.pH || 6.8,
    ec: soil?.ec || 4.8,
    organicMatter: soil?.organicMatter || 1.65,
    nitrogen: soil?.nitrogen || 0.12,
    phosphorus: soil?.phosphorus || 14.5,
    potassium: soil?.potassium || 0.28,
    sulfur: soil?.sulfur || 18.2,
    zinc: soil?.zinc || 1.1,
    boron: soil?.boron || 0.42
  });

  const [missingWarning, setMissingWarning] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFileError('');
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files[0]) {
      processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = (file) => {
    const val = validateSoilCardFile(file);
    if (!val.valid) {
      setFileError(val.error);
      return;
    }

    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }

    // Trigger simulated OCR
    startOcrExtraction(file);
  };

  const startOcrExtraction = async (fileOrId) => {
    setIsProcessing(true);
    setExtractionResult(null);
    setSavedSuccess(false);

    try {
      const res = await simulateOcrExtraction(fileOrId, (p) => setOcrProgress(p));
      setExtractionResult(res.data);
      setFormFields({
        ...formFields,
        ...res.data.extractedValues
      });
      setMissingWarning(res.data.missingFields.length > 0);
    } catch (err) {
      setFileError('OCR processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoadSample = (sampleId) => {
    setFileError('');
    setSelectedFile({ name: 'SRDI_Khulna_Dacope_SoilCard_2026.png', size: 1024 * 780, type: 'image/png' });
    setFilePreview(null);
    startOcrExtraction(sampleId);
  };

  const handleInputChange = (field, val) => {
    setFormFields(prev => ({
      ...prev,
      [field]: val
    }));
    setSavedSuccess(false);
  };

  const handleSaveToProfile = (e) => {
    e.preventDefault();
    updateSoil({
      pH: parseFloat(formFields.pH),
      ec: parseFloat(formFields.ec),
      organicMatter: parseFloat(formFields.organicMatter),
      nitrogen: parseFloat(formFields.nitrogen),
      phosphorus: parseFloat(formFields.phosphorus),
      potassium: parseFloat(formFields.potassium),
      sulfur: parseFloat(formFields.sulfur),
      zinc: formFields.zinc !== '' ? parseFloat(formFields.zinc) : null,
      boron: formFields.boron !== '' ? parseFloat(formFields.boron) : null,
      testedDate: new Date().toISOString().split('T')[0],
      source: extractionResult?.cardName || 'SRDI Soil Health Card (Digitized via OCR)'
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div>
      <PageHeader
        title={t('soilOCR.title')}
        subtitle={t('soilOCR.subtitle')}
        badge={<DemoBadge text="Feature 5" />}
        actions={
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={() => handleLoadSample('srdi-khulna-sample')}
              className="btn btn-secondary btn-sm"
            >
              <FileText size={14} />
              <span>{isBangla ? 'নমুনা এসআরডিআই কার্ড (খুলনা)' : 'Sample SRDI Card (Khulna)'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('srdi-satkhira-sample')}
              className="btn btn-secondary btn-sm"
            >
              <FileText size={14} />
              <span>{isBangla ? 'উচ্চ লবণ নমুনা (সাতক্ষীরা)' : 'High Saline Sample'}</span>
            </button>
          </div>
        }
        helpText={isBangla
          ? 'মৃত্তিকা সম্পদ উন্নয়ন ইনস্টিটিউট (এসআরডিআই)-এর মাটি পরীক্ষার কার্ড আপলোড করে মাটির লবণাক্ততা (ইসি), পিএইচ ও পুষ্টি উপাদানের মান ডিজিটাইজ করুন।'
          : 'Digitize official paper soil test cards issued by SRDI or regional soil testing laboratories. The extracted parameters immediately calibrate crop suitability thresholds.'}
      />

      {/* Mock OCR callout notice */}
      <div className="callout callout-demo">
        <Info size={18} />
        <span>{t('soilOCR.mockNotice')}</span>
      </div>

      {savedSuccess && (
        <div className="callout callout-info animate-fade-in">
          <CheckCircle2 size={18} color="var(--color-primary-600)" />
          <span>{t('soilOCR.validationSuccess')}</span>
        </div>
      )}

      {fileError && (
        <div className="callout" style={{ backgroundColor: 'var(--color-risky-bg)', borderColor: 'var(--color-risky-border)', color: 'var(--color-risky-text)' }}>
          <AlertTriangle size={18} />
          <span>{fileError}</span>
        </div>
      )}

      <div className="grid grid-cols-2" style={{ gap: '1.5rem', alignItems: 'start' }}>
        {/* Left Column: Dropzone & Preview */}
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="card"
            style={{
              border: '2px dashed var(--color-border)',
              backgroundColor: 'var(--color-bg-cream)',
              textAlign: 'center',
              padding: '2.5rem 1.5rem',
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('soil-file-input').click()}
          >
            <input
              id="soil-file-input"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.webp"
              onChange={handleFileDrop}
              style={{ display: 'none' }}
            />

            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-100)',
              color: 'var(--color-primary-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <UploadCloud size={26} />
            </div>

            <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: '0.4rem', color: 'var(--color-primary-900)' }}>
              {t('soilOCR.dropzoneTitle')}
            </h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', maxWidth: '380px', margin: '0 auto' }}>
              {t('soilOCR.dropzoneSubtitle')}
            </p>
          </div>

          {/* Extraction Scanning Progress Bar */}
          {isProcessing && (
            <div className="card" style={{ marginTop: '1rem', backgroundColor: 'var(--color-bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: 'var(--font-size-xs)' }}>
                <span style={{ fontWeight: '600', color: 'var(--color-primary-800)' }}>
                  {isBangla ? ocrProgress.stageBn : ocrProgress.stageEn}
                </span>
                <span>{ocrProgress.progress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{
                  width: `${ocrProgress.progress}%`,
                  height: '100%',
                  backgroundColor: 'var(--color-primary-600)',
                  transition: 'width 300ms ease'
                }} />
              </div>
            </div>
          )}

          {/* Document Preview Card */}
          {selectedFile && !isProcessing && (
            <div className="card" style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="var(--color-primary-800)" />
                  <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                    {selectedFile.name}
                  </span>
                </div>
                <span className="badge badge-suitable" style={{ fontSize: '11px' }}>
                  OCR Scanned
                </span>
              </div>

              {filePreview ? (
                <div style={{ maxHeight: '220px', overflow: 'hidden', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <img src={filePreview} alt="Soil Card Preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              ) : (
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--color-bg-main)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-xs)',
                  lineHeight: 1.6
                }}>
                  <div><strong>Document:</strong> {extractionResult?.cardName || 'SRDI Official Soil Health Card'}</div>
                  <div><strong>Farmer:</strong> {extractionResult?.farmerName || 'Md. Rafiqul Islam'}</div>
                  <div><strong>Location:</strong> {extractionResult?.district || 'Khulna'}, {extractionResult?.upazila || 'Dacope'}</div>
                  <div><strong>Texture:</strong> {extractionResult?.soilTexture || 'Clay Loam (Ganges Alluvium)'}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Extracted Values Review & Editing Form */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Sparkles size={18} color="var(--color-primary-800)" />
              <span>{t('soilOCR.extractionReview')}</span>
            </h2>
            <DemoBadge text="Editable OCR Output" />
          </div>

          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
            {t('soilOCR.reviewNotice')}
          </p>

          {missingWarning && (
            <div className="callout callout-warning" style={{ fontSize: '12px', padding: '0.65rem 0.85rem' }}>
              <AlertTriangle size={15} style={{ flexShrink: 0 }} />
              <span>{t('soilOCR.missingWarning')}</span>
            </div>
          )}

          <form onSubmit={handleSaveToProfile}>
            {/* Critical Soil Parameters: pH & EC */}
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-ph">
                  {t('soilOCR.ph')}
                </label>
                <input
                  id="ocr-ph"
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="10.0"
                  value={formFields.pH}
                  onChange={e => handleInputChange('pH', e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-ec">
                  {t('soilOCR.ec')}
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="ocr-ec"
                    type="number"
                    step="0.1"
                    min="0"
                    max="30"
                    value={formFields.ec}
                    onChange={e => handleInputChange('ec', e.target.value)}
                    className="form-control"
                    required
                  />
                  <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    dS/m
                  </span>
                </div>
              </div>
            </div>

            {/* Organic Matter & Nitrogen */}
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-om">
                  {t('soilOCR.om')}
                </label>
                <input
                  id="ocr-om"
                  type="number"
                  step="0.01"
                  value={formFields.organicMatter}
                  onChange={e => handleInputChange('organicMatter', e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-n">
                  {t('soilOCR.nitrogen')}
                </label>
                <input
                  id="ocr-n"
                  type="number"
                  step="0.01"
                  value={formFields.nitrogen}
                  onChange={e => handleInputChange('nitrogen', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            {/* P & K */}
            <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-p">
                  {t('soilOCR.phosphorus')}
                </label>
                <input
                  id="ocr-p"
                  type="number"
                  step="0.1"
                  value={formFields.phosphorus}
                  onChange={e => handleInputChange('phosphorus', e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-k">
                  {t('soilOCR.potassium')}
                </label>
                <input
                  id="ocr-k"
                  type="number"
                  step="0.01"
                  value={formFields.potassium}
                  onChange={e => handleInputChange('potassium', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Micronutrients: Sulfur, Zinc, Boron */}
            <div className="grid grid-cols-3" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-s">
                  {t('soilOCR.sulfur')}
                </label>
                <input
                  id="ocr-s"
                  type="number"
                  step="0.1"
                  value={formFields.sulfur}
                  onChange={e => handleInputChange('sulfur', e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-zn">
                  {t('soilOCR.zinc')}
                </label>
                <input
                  id="ocr-zn"
                  type="number"
                  step="0.01"
                  value={formFields.zinc}
                  onChange={e => handleInputChange('zinc', e.target.value)}
                  placeholder="Optional"
                  className="form-control"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="ocr-b">
                  {t('soilOCR.boron')}
                </label>
                <input
                  id="ocr-b"
                  type="number"
                  step="0.01"
                  value={formFields.boron}
                  onChange={e => handleInputChange('boron', e.target.value)}
                  placeholder="Optional"
                  className="form-control"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Save size={16} />
              <span>{t('soilOCR.saveToProfile')}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SoilReportPage;

