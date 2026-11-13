import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarDays,
  CloudSun,
  Cpu,
  FileText,
  FlaskConical,
  Gauge,
  GitCompare,
  History,
  LayoutDashboard,
  Map,
  MapPin,
  Satellite,
  ShieldCheck,
  SlidersHorizontal,
  Sprout,
  Workflow
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { HOME_TOOL_GROUPS } from '../../pages/Home/homeToolRoutes';

const TOOL_ICONS = {
  Activity,
  Bell,
  CalendarDays,
  CloudSun,
  Cpu,
  FileText,
  FlaskConical,
  Gauge,
  GitCompare,
  History,
  LayoutDashboard,
  Map,
  MapPin,
  Satellite,
  ShieldCheck,
  SlidersHorizontal,
  Sprout,
  Workflow
};

export const HomeToolDirectory = () => {
  const { t } = useTranslation();

  return (
    <section
      className="home-tool-directory"
      id="home-tool-directory"
      aria-labelledby="home-tool-directory-title"
    >
      <div className="home-tool-directory-inner">
        <header className="home-tool-directory-heading">
          <div>
            <p className="home-tool-directory-eyebrow">{t('home.directoryEyebrow')}</p>
            <h2 id="home-tool-directory-title">{t('home.directoryTitle')}</h2>
            <p className="home-tool-directory-subtitle">{t('home.directorySubtitle')}</p>
          </div>
        </header>

        <div className="home-tool-groups">
          {HOME_TOOL_GROUPS.map((group) => {
            const GroupIcon = TOOL_ICONS[group.icon];

            return (
              <section className="home-tool-group" key={group.titleKey} aria-labelledby={`${group.titleKey}-heading`}>
                <h3 className="home-tool-group-title" id={`${group.titleKey}-heading`}>
                  <span className="home-tool-group-icon" aria-hidden="true">
                    <GroupIcon size={18} />
                  </span>
                  {t(group.titleKey)}
                </h3>
                <nav aria-label={t(group.titleKey)} className="home-tool-links">
                  {group.items.map((item) => {
                    const ToolIcon = TOOL_ICONS[item.icon];

                    return (
                      <Link className="home-tool-link" key={item.to} to={item.to}>
                        <ToolIcon className="home-tool-link-icon" size={18} aria-hidden="true" />
                        <span>{t(item.labelKey)}</span>
                        <ArrowRight className="home-tool-link-arrow" size={16} aria-hidden="true" />
                      </Link>
                    );
                  })}
                </nav>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeToolDirectory;
