import React from 'react';
import { ShieldAlert, AlertTriangle, Info, Clock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const ModelUnavailableBanner = ({
  title,
  message,
  plannedPhase = 'Part 2 & 3 (Backend & ML Pipeline)',
  showInputsNote = true
}) => {
  const { t, isBangla } = useTranslation();

  return (
    <div style={{
      backgroundColor: '#FEF3C7',
      border: '1px solid #FCD34D',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      boxShadow: 'var(--shadow-xs)'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: '#FDE68A',
        color: '#92400E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Clock size={22} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '0.35rem'
        }}>
          <h3 style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-bold)',
            color: '#92400E'
          }}>
            {title || t('common.modelUnderDev')}
          </h3>
          <span style={{
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 'var(--font-weight-bold)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)'
          }}>
            {plannedPhase}
          </span>
        </div>

        <p style={{
          fontSize: 'var(--font-size-sm)',
          color: '#78350F',
          lineHeight: 1.5,
          marginBottom: showInputsNote ? '0.5rem' : 0
        }}>
          {message || (isBangla
            ? 'এই স্ক্রিনের প্রেডিকশন এবং মেশিন লার্নিং মডেলটি বর্তমানে প্রশিক্ষণ ও যাচাইকরণের প্রক্রিয়ায় রয়েছে। কোনো অসত্য বা ভুয়া অনুমান এখানে তৈরি করা হয়নি।'
            : 'The machine learning model for this screen is under active development. To preserve scientific rigor, no fabricated predictions or synthetic outputs are displayed.')}
        </p>

        {showInputsNote && (
          <div style={{
            fontSize: 'var(--font-size-xs)',
            color: '#92400E',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontStyle: 'italic'
          }}>
            <Info size={13} />
            <span>
              {isBangla
                ? 'অনুরূপ ইন্টারফেস কাঠামো ও ইনপুট ডেটা স্কিমা নিচে স্বচ্ছভাবে প্রদর্শিত হয়েছে।'
                : 'The interface layout, parameter schema, and evaluation criteria below reflect the planned production specification.'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelUnavailableBanner;

