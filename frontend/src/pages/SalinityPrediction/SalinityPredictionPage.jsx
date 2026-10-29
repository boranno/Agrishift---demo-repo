import React, { useState } from 'react';
import {
  Gauge,
  CalendarDays,
  MapPin,
  Clock,
  AlertTriangle,
  Info,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useFarm } from '../../context/FarmContext';
import { getSalinityPredictionSpec } from '../../services/modelService';
import PageHeader from '../../components/common/PageHeader';
import DemoBadge from '../../components/common/DemoBadge';
import ModelUnavailableBanner from '../../components/common/ModelUnavailableBanner';

export const SalinityPredictionPage = () => {
  const { t, isBangla } = useTranslation();
  const { farm, soil, season, setSeason } = useFarm();
  const [selectedDate, setSelectedDate] = useState('2026-10-27');

  const spec = getSalinityPredictionSpec();

  return (
    <div>
      <PageHeader
        title={t('salinityPrediction.title')}
        subtitle={`${farm?.upazila || 'Dacope'}, ${farm?.district || 'Khulna'} — ${farm?.aez || 'AEZ 13'}`}
        badge={<DemoBadge text="Feature 12" />}
        helpText={isBangla
          ? 'নাসার উপগ্রহ উপাত্ত ও এসআরডিআই মাটির তথ্যকে কাজে লাগিয়ে মাটির লবণাক্ততা (ইসি) পূর্বাভাসের এই ইন্টারফেসটি তৈরি করা হয়েছে। মডেলের প্রশিক্ষণ সম্পন্ন হলে এখানে স্বয়ংক্রিয় পূর্বাভাস প্রদর্শিত হবে।'
          : 'High-resolution topsoil electrical conductivity (ECe) prediction interface. Connects satellite surface moisture with regional hydrological variables.'}
      />

      {/* Prominent Honest Model Unavailable Banner */}
      <ModelUnavailableBanner
        title={t('salinityPrediction.modelStatusBanner')}
        message={isBangla ? spec.messageBn : spec.messageEn}
        plannedPhase="Part 2 & 3 Backend Integration"
      />

      {/* Selection Filters */}
      <div className="card" style={{
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        backgroundColor: 'var(--color-bg-cream)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <MapPin size={18} color="var(--color-primary-800)" />
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
            {farm?.upazila}, {farm?.district} ({Number(farm?.latitude).toFixed(4)}°N, {Number(farm?.longitude).toFixed(4)}°E)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CalendarDays size={16} color="var(--color-text-secondary)" />
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="form-control"
              style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: 'var(--font-size-xs)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {['rabi', 'kharif1', 'kharif2'].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSeason(s)}
                className="btn btn-sm"
                style={{
                  backgroundColor: season === s ? 'var(--color-primary-800)' : 'var(--color-bg-surface)',
                  color: season === s ? '#fff' : 'var(--color-text-main)',
                  fontSize: '11px',
                  padding: '0.25rem 0.55rem'
                }}
              >
                {s === 'rabi' ? 'Rabi' : s === 'kharif1' ? 'Kharif-1' : 'Kharif-2'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Required Pipeline Inputs Status Checklist */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h2 className="card-title">
            <Database size={18} color="var(--color-primary-800)" />
            <span>{t('salinityPrediction.pipelineInputs')}</span>
          </h2>
          <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
            Telemetry Readiness Checklist
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {spec.requiredPipelineInputs.map((input, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                backgroundColor: 'var(--color-bg-main)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-xs)',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              <div>
                <strong>{input.source}: </strong>
                <span style={{ color: 'var(--color-text-secondary)' }}>{input.parameter}</span>
              </div>

              <div>
                {input.ready ? (
                  <span className="badge badge-suitable" style={{ fontSize: '11px' }}>
                    <CheckCircle2 size={12} />
                    <span>{input.status}</span>
                  </span>
                ) : (
                  <span className="badge badge-marginal" style={{ fontSize: '11px' }}>
                    <Clock size={12} />
                    <span>{input.status}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Output Specification Visual Container (Placeholder without fake numbers) */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h2 className="card-title">
            <Gauge size={18} color="var(--color-primary-800)" />
            <span>{t('salinityPrediction.expectedOutput')}</span>
          </h2>
          <span className="badge badge-demo">UI Schema Representation</span>
        </div>

        <div style={{
          backgroundColor: '#F8FAF7',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#E5E7EB',
            color: '#6B7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Gauge size={24} />
          </div>

          <h3 style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>
            {isBangla ? 'পূর্বাভাস পাত্র — মডেল আউটপুটের অপেক্ষায়' : 'Prediction Container — Awaiting Live Inference Model'}
          </h3>

          <p style={{ fontSize: 'var(--font-size-xs)', maxWidth: '520px', margin: '0 auto 1.25rem auto' }}>
            {t('salinityPrediction.unitContext')}
          </p>

          {/* Planned Output Schema Preview */}
          <div style={{
            display: 'inline-grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            textAlign: 'left',
            backgroundColor: 'var(--color-bg-surface)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            fontSize: 'var(--font-size-xs)'
          }}>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Target Variable:</span>
              <strong>ECe (dS/m at 25°C)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Confidence Interval:</span>
              <strong>95% CI (±0.8 dS/m)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block' }}>Salinity Risk Tier:</span>
              <strong>Ordinal Category</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Model Architecture & Benchmarking Target Details */}
      <div className="card">
        <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={18} color="var(--color-primary-800)" />
          <span>{isBangla ? 'মডেল আর্কিটেকচার ও মূল্যায়ন প্রোটোকল' : 'Model Architecture & Evaluation Protocols'}</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: 'var(--font-size-xs)', lineHeight: 1.6 }}>
          <p style={{ margin: 0 }}>
            {t('salinityPrediction.targetArchitecture')}
          </p>
          <div style={{
            backgroundColor: 'var(--color-bg-cream)',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)'
          }}>
            <strong>{isBangla ? 'লক্ষ্যমাত্রা নির্ভুলতা বেঞ্চমার্ক: ' : 'Target Accuracy Benchmark: '}</strong>
            {t('salinityPrediction.benchmarkTarget')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalinityPredictionPage;

