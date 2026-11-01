import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Globe, Menu, X, MapPin, AlertTriangle, Layers } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useFarm } from '../../context/FarmContext';

export const Navbar = () => {
  const { t, language, setLanguage, isBangla } = useTranslation();
  const { farm } = useFarm();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/dashboard', label: t('nav.dashboard') },
    { to: '/farm-map', label: t('nav.farmMap') },
    { to: '/crop-suitability', label: t('nav.cropSuitability') },
    { to: '/rotation-planner', label: t('nav.rotationPlanner') },
    { to: '/scenario-comparison', label: t('nav.scenarioComparison') },
    { to: '/data-sources', label: t('nav.dataSources') },
    { to: '/soil-report', label: t('nav.soilReport') },
    { to: '/alerts', label: t('nav.alerts') }
  ];

  const isCurrent = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="glass-header" style={{
      borderBottom: '1px solid var(--color-border)',
      position: 'relative'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height)',
        paddingTop: 0,
        paddingBottom: 0
      }}>
        {/* Brand */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #166534 0%, #14532D 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 2px 6px rgba(20, 83, 45, 0.25)'
          }}>
            <Sprout size={22} />
          </div>
          <div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary-900)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}>
              AgriShift
            </div>
            <div style={{
              fontSize: '11px',
              color: 'var(--color-primary-700)',
              fontWeight: 'var(--font-weight-medium)'
            }}>
              {isBangla ? 'কৃষি সিদ্ধান্ত সহায়তা প্ল্যাটফর্ম' : 'NASA EO Decision Support'}
            </div>
          </div>
        </Link>

        {/* Header Right Utility Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Active Farm Location Selector Pill */}
          {farm && (
            <Link
              to="/farm-map"
              className="badge badge-neutral active-farm-nav-badge"
              style={{
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                padding: '0.4rem 0.85rem',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                backgroundColor: 'var(--color-bg-cream)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--color-primary-900)'
              }}
              title={isBangla ? 'খামার অবস্থান পরিবর্তন করুন' : 'Change farm location'}
              id="active-farm-badge"
            >
              <MapPin size={13} color="var(--color-primary-700)" />
              <span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {farm.upazila}, {farm.district}
              </span>
            </Link>
          )}

          {/* Bilingual Language Selector Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="btn btn-secondary btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 'var(--font-weight-semibold)',
              padding: '0.4rem 0.85rem',
              backgroundColor: 'var(--color-bg-cream)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-primary-900)'
            }}
            aria-label={isBangla ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
            title={isBangla ? 'Switch to English' : 'বাংলা ভাষায় দেখুন'}
          >
            <Globe size={15} color="var(--color-primary-800)" />
            <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="btn btn-secondary btn-sm mobile-menu-btn"
            aria-label={mobileMenuOpen ? t('nav.close') : t('nav.menu')}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderTop: '1px solid var(--color-border)',
          padding: '1rem',
          boxShadow: 'var(--shadow-md)',
          animation: 'fadeIn var(--transition-fast) ease-out',
          maxHeight: 'calc(100vh - var(--header-total-height, 93px))',
          overflowY: 'auto',
          overscrollBehavior: 'contain'
        }}>
          {farm && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: 'var(--color-bg-cream)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '0.75rem',
              fontSize: 'var(--font-size-sm)'
            }}>
              <MapPin size={15} color="var(--color-primary-800)" />
              <span>
                <strong>{isBangla ? 'সক্রিয় খামার: ' : 'Active Farm: '}</strong>
                {farm.upazila}, {farm.district} ({farm.aez})
              </span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: isCurrent(link.to) ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                  color: isCurrent(link.to) ? 'var(--color-primary-800)' : 'var(--color-text-main)',
                  backgroundColor: isCurrent(link.to) ? 'var(--color-primary-50)' : 'var(--color-bg-main)',
                  border: isCurrent(link.to) ? '1px solid var(--color-primary-200)' : '1px solid transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
              {isBangla ? 'উন্নত স্যাটেলাইট ও এআই মডেল' : 'Advanced Satellite & AI Features'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              <Link to="/what-if-simulator" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-sm">
                {t('nav.whatIfSimulator')}
              </Link>
              <Link to="/scenario-comparison" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-sm">
                {t('nav.scenarioComparison')}
              </Link>
              <Link to="/data-sources" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-sm">
                {t('nav.dataSources')}
              </Link>
              <Link to="/salinity-prediction" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-sm">
                {t('nav.salinityPrediction')}
              </Link>
              <Link to="/ml-suitability" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-sm">
                {t('nav.mlSuitability')}
              </Link>
              <Link to="/intelligent-rotation" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-sm">
                {t('nav.intelligentRotation')}
              </Link>
              <Link to="/model-evaluation" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary btn-sm">
                {t('nav.modelEvaluation')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
