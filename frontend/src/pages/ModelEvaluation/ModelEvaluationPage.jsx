import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Database,
  BarChart2,
  AlertTriangle,
  Info,
  Clock,
  Layers,
  FileCode,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { getModelCardData } from '../../services/modelService';
import PageHeader from '../../components/common/PageHeader';
import DemoBadge from '../../components/common/DemoBadge';
import ModelUnavailableBanner from '../../components/common/ModelUnavailableBanner';

export const ModelEvaluationPage = () => {
  const { t, isBangla } = useTranslation();
  const card = getModelCardData();

  return (
    <div>
      <PageHeader
        title={t('modelEvaluation.title')}
        subtitle={t('modelEvaluation.subtitle')}
        badge={<DemoBadge text="Feature 15" />}
        actions={
          <span className="badge badge-neutral">{isBangla ? 'মডেল স্বচ্ছতা v0.1' : 'Model Transparency v0.1'}</span>
        }
        helpText={isBangla
          ? 'এগ্রিশিফট প্ল্যাটফর্মের কৃত্রিম বুদ্ধিমত্তা মডেলের আর্কিটেকচার, প্রশিক্ষণ ডেটাসেটের বিবরণ এবং পারফরম্যান্সের বৈজ্ঞানিক লক্ষ্যমাত্রা এখানে স্বচ্ছভাবে উন্মুক্ত করা হয়েছে।'
          : 'Official Model Card detailing architecture, intended use, cross-validation protocols, target error benchmarks, and scientific limitations.'}
      />

      {/* Model Status Banner */}
      <ModelUnavailableBanner
        title={t('modelEvaluation.statusBanner')}
        message={t('modelEvaluation.statusDesc')}
        plannedPhase="Part 3 (Model Training & Benchmark Evaluation)"
      />

      {/* Model Overview Summary Table */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h2 className="card-title">
            <Cpu size={18} color="var(--color-primary-800)" />
            <span>{isBangla ? 'মডেল পরিচিতি ও লক্ষ্য' : 'Model Identity & Scope'}</span>
          </h2>
          <span className="badge badge-info">{card.version}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: 'var(--font-size-xs)' }}>
          <div>
            <span style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '2px' }}>
              {t('modelEvaluation.cardModelName')}:
            </span>
            <strong>{isBangla ? card.modelNameBn : card.modelName}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '2px' }}>
              {t('modelEvaluation.cardTarget')}:
            </span>
            <strong>{isBangla ? card.targetTaskBn : card.targetTask}</strong>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '2px' }}>
              {isBangla ? 'উদ্দিষ্ট ব্যবহারকারী:' : 'Intended Users:'}
            </span>
            <span>{isBangla ? card.intendedUsersBn : card.intendedUsers}</span>
          </div>
        </div>
      </div>

      {/* Target Metric Benchmarks Grid */}
      <div className="grid grid-cols-3" style={{ marginBottom: '1.5rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary-700)' }}>
          <div className="card-header">
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              {isBangla ? 'রিগ্রেশন লক্ষ্য ১' : 'Regression Target 1'}
            </span>
            <span className="badge badge-demo">{isBangla ? 'লক্ষ্য' : 'Target'}</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-primary-900)', marginBottom: '0.25rem' }}>
            MAE ≤ 1.2 dS/m
          </div>
          <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            {t('modelEvaluation.cardMetricMae')}
          </p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--color-primary-700)' }}>
          <div className="card-header">
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              {isBangla ? 'রিগ্রেশন লক্ষ্য ২' : 'Regression Target 2'}
            </span>
            <span className="badge badge-demo">{isBangla ? 'লক্ষ্য' : 'Target'}</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-primary-900)', marginBottom: '0.25rem' }}>
            RMSE ≤ 1.8 dS/m
          </div>
          <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            {t('modelEvaluation.cardMetricRmse')}
          </p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--color-primary-700)' }}>
          <div className="card-header">
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              {isBangla ? 'উপযোগিতা শ্রেণিবিন্যাস' : 'Suitability Classification'}
            </span>
            <span className="badge badge-demo">{isBangla ? 'লক্ষ্য' : 'Target'}</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-primary-900)', marginBottom: '0.25rem' }}>
            Macro F1 ≥ 0.82
          </div>
          <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            {t('modelEvaluation.cardMetricF1')}
          </p>
        </div>
      </div>

      {/* Validation Strategy & Training Sources */}
      <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'start' }}>
        {/* Planned Training Datasets */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Database size={18} color="var(--color-primary-800)" />
              <span>{isBangla ? 'পরিকল্পিত প্রশিক্ষণ ডেটাসেট' : 'Planned Training Data Pipeline'}</span>
            </h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}>
            {(isBangla ? card.plannedTrainingSourcesBn : card.plannedTrainingSources).map((src, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.5 }}>
                <CheckCircle2 size={14} color="var(--color-primary-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{src}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Validation Strategy */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <ShieldCheck size={18} color="var(--color-primary-800)" />
              <span>{t('modelEvaluation.validationStrategy')}</span>
            </h3>
          </div>
          <div style={{
            backgroundColor: 'var(--color-bg-cream)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '0.75rem',
            fontSize: 'var(--font-size-xs)',
            lineHeight: 1.6
          }}>
            <strong>{isBangla ? card.validationStrategy.methodBn : card.validationStrategy.method}</strong>
            <p style={{ margin: '0.35rem 0 0 0', color: 'var(--color-text-on-cream)' }}>
              {isBangla ? card.validationStrategy.descriptionBn : card.validationStrategy.descriptionEn}
            </p>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            {isBangla
              ? 'উপকূলীয় পোল্ডারগুলোর মাটির লবণাক্ততায় স্থানিক নির্ভরতা (Spatial Autocorrelation) দূর করতে মডেলটি জেলাভিত্তিক লিভ-ওয়ান-আউট পদ্ধতিতে যাচাই করা হবে।'
              : 'Standard random K-fold CV leaks spatial proximity. Leave-One-District-Out cross-validation ensures the model generalizes accurately to unseen coastal upazilas.'}
          </p>
        </div>
      </div>

      {/* Known Limitations Accordion / Cards */}
      <div className="card">
        <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} color="var(--color-marginal-dot)" />
          <span>{t('modelEvaluation.knownLimitations')}</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {card.knownScientificLimitations.map(lim => (
            <div
              key={lim.id}
              style={{
                backgroundColor: 'var(--color-bg-main)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-xs)'
              }}
            >
              <strong style={{ color: 'var(--color-primary-900)', display: 'block', marginBottom: '0.2rem' }}>
                {isBangla ? lim.titleBn : lim.titleEn}
              </strong>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {isBangla ? lim.descBn : lim.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelEvaluationPage;
