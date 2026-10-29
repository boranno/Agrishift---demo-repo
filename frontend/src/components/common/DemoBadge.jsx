import React from 'react';
import { FlaskConical } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const DemoBadge = ({ text, style = {} }) => {
  const { t, isBangla } = useTranslation();

  return (
    <span
      className="badge badge-demo"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontSize: '11px',
        fontWeight: 'var(--font-weight-semibold)',
        padding: '0.2rem 0.55rem',
        ...style
      }}
      title="Sample data for interface development only"
    >
      <FlaskConical size={12} />
      <span>{text || t('common.demoBadge')}</span>
    </span>
  );
};

export default DemoBadge;

