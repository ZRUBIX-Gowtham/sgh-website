'use client';

import React from 'react';
import {
  FaUserMd,
  FaAppleAlt,
  FaPills,
  FaMicroscope,
  FaFlask,
  FaWalking,
  FaTint,
  FaCut,
  FaBone,
} from 'react-icons/fa';

const tiles = [
  { icon: FaUserMd, title: 'All Dr Op', desc: 'Outpatient services with access to experienced doctors across multiple specialties for timely consultations and expert medical guidance.', color: '#2563eb' },
  { icon: FaAppleAlt, title: 'Diet & Nutrition', desc: 'Personalized diet plans and nutrition support to aid recovery, manage chronic conditions, and promote overall health and wellness.', color: '#059669' },
  { icon: FaPills, title: 'Pharmacy', desc: 'In-house pharmacy for quick and reliable access to prescribed medications.', color: '#7c3aed' },
  { icon: FaMicroscope, title: 'Causality & Emergency Care', desc: 'Immediate emergency care and evaluation with focus on rapid stabilization and diagnosis.', color: '#ea580c' },
  { icon: FaFlask, title: 'Laboratory Services', desc: 'Accurate diagnostic tests for blood, urine, and tissue samples to detect and monitor diseases.', color: '#b45309' },
  { icon: FaWalking, title: 'Physiotherapy', desc: 'Guided therapy to restore mobility and strength post injuries and surgeries.', color: '#16a34a' },
  { icon: FaTint, title: 'Dialysis', desc: 'Safe and effective dialysis treatment supported by specialized medical staff.', color: '#0ea5e9' },
  { icon: FaCut, title: 'Operation Theatres', desc: 'State-of-the-art operation theatres for a wide range of surgical procedures.', color: '#db2777' },
  { icon: FaBone, title: 'X-Ray & Imaging', desc: 'High-quality imaging services for detailed diagnostic insights and planning.', color: '#334155' },
];

export default function ServicesVariantC() {
  const [focusedIndex, setFocusedIndex] = React.useState(null);

  const handleQuickAccess = (idx) => {
    setFocusedIndex((prev) => (prev === idx ? null : idx));
    const el = document.querySelector(`[data-card-index="${idx}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setFocusedIndex(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="wrap">
      <style jsx>{`
        .wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding: 75px 20px;
          color: #0f172a;
        }
        /* New heading styles to match About section */
        .header {
          margin-bottom: 24px;
        }
        .eyebrow {
          letter-spacing: .02em;
          color: #1f4e9b;
          background: rgba(47, 128, 237, .1);
          border: 1px solid rgba(47, 128, 237, .22);
          border-radius: 999px;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          font-size: 12px;
          display: inline-flex;
        }
        .title {
          margin: 10px 0 6px 0;
          font-size: 42px;
          line-height: 1.08;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(92deg, #0b1324 0%, #274760 0%, #2f80ed 80%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .subtitle {
          margin: 0;
          color: #4b5563; /* muted */
          font-size: 16px;
          line-height: 1.75;
          max-width: 1200px;
        }

        /* Layout: tiles left, mini list right */
        .content {
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 20px;
          width: 1200px;
        }
        @media (max-width: 1240px) {
          .content { width: 100%; }
        }
        @media (max-width: 1024px) {
          .content { grid-template-columns: 1fr; }
          .side { order: -1; }
        }

        /* Responsive grid replacing masonry on mobile */
        .masonry {
          /* Default: large screens use 3-column CSS columns for staggered look */
          column-count: 3;
          column-gap: 16px;
          transition: filter .25s ease;
        }
        @media (max-width: 1100px) {
          .masonry { column-count: 2; }
        }

        /* Switch to a real row-wise grid on tablets/phones for predictable rows */
        @media (max-width: 900px) {
          .masonry {
            column-count: initial;
            column-gap: initial;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
        }
        @media (max-width: 640px) {
          .masonry {
            grid-template-columns: 1fr; /* pure row-wise on mobile */
            gap: 12px;
          }
        }

        /* Base card */
        .tile {
          display: inline-block;
          width: 100%;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(16,24,40,0.06);
          padding: 16px;
          margin: 0 0 16px;
          break-inside: avoid;
          transition: transform .25s ease, box-shadow .25s ease, filter .25s ease, opacity .25s ease;
          min-height: 160px;
          cursor: pointer;
        }
        /* When grid mode is active (<=900px), remove the extra bottom margin so grid gap controls spacing */
        @media (max-width: 900px) {
          .tile { margin: 0; }
        }

        .tile:hover { box-shadow: 0 10px 24px rgba(16,24,40,0.10); }

        .tile.focused {
          transform: scale(1.03);
          box-shadow: 0 22px 48px rgba(16,24,40,0.18);
          position: relative;
          z-index: 2;
        }
        .tile.dimmed {
          filter: blur(1.2px) saturate(0.8);
          opacity: 0.65;
        }

        .head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .icon { font-size: 30px; }
        .name { font-weight: 800; font-size: 18px; }
        .desc {
          color: #334155;
          font-size: 14px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tile:nth-child(3n)   { background: linear-gradient(180deg, #ffffff, #f8fbff); }
        .tile:nth-child(3n+1) { background: linear-gradient(180deg, #ffffff, #f9f9ff); }
        .tile:nth-child(3n+2) { background: linear-gradient(180deg, #ffffff, #f9fffc); }

        /* Right side Quick Access */
        .side {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          box-shadow: 0 6px 16px rgba(16,24,40,0.06);
          padding: 12px;
          height: max-content;
          position: relative;
        }

        .sideHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 4px 6px 10px;
          gap: 8px;
        }
        .sideTitle {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
        }
        .clearBtn {
          border: none;
          background: #f1f5f9;
          color: #0f172a;
          border-radius: 8px;
          padding: 6px 10px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: none;
        }
        .clearBtn.show { display: inline-block; }

        .miniList {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 80vh;
          overflow: auto;
          padding-right: 4px;
        }
        .miniItem {
          display: grid;
          grid-template-columns: 28px 1fr;
          align-items: center;
          gap: 10px;
          padding: 10px 10px;
          border-radius: 10px;
          border: 1px solid #eef2f7;
          background: #fafcff;
          cursor: pointer;
          transition: background .15s ease, transform .12s ease, box-shadow .15s ease;
        }
        .miniItem:hover {
          background: #f3f7ff;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(16,24,40,0.06);
        }
        .miniItem.active {
          background: #eaf1ff;
          border-color: #c7dbff;
        }
        .miniIcon { font-size: 18px; }
        .miniName { font-size: 14px; font-weight: 700; color: #0f172a; }

        /* Small refinements for very small screens */
        @media (max-width: 400px) {
          .title { font-size: 34px; }
          .subtitle { font-size: 15px; }
          .icon { font-size: 28px; }
          .name { font-size: 17px; }
          .desc { font-size: 13.5px; }
        }
      `}</style>

      <div className="header">
        <div className="eyebrow">We Provide</div>
        <h2 className="title">Best Healthcare Services</h2>
        <p className="subtitle">
          Comprehensive, patient-first services powered by experienced specialists, modern diagnostics,
          and compassionate support.
        </p>
      </div>

      <div className="content">
        {/* Left: Responsive tiles with focus/blur behavior */}
        <div className="masonry">
          {tiles.map((t, i) => {
            const Icon = t.icon;
            const isFocused = focusedIndex === i;
            const dimOthers = focusedIndex !== null && !isFocused;
            return (
              <article
                key={i}
                data-card-index={i}
                className={`tile ${isFocused ? 'focused' : ''} ${dimOthers ? 'dimmed' : ''}`}
                aria-label={`${t.title} card`}
                role="button"
                tabIndex={0}
                onClick={() => setFocusedIndex((prev) => (prev === i ? null : i))}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFocusedIndex((prev) => (prev === i ? null : i))}
              >
                <div className="head">
                  <span className="icon" style={{ color: t.color }}>
                    <Icon aria-hidden />
                  </span>
                  <div className="name">{t.title}</div>
                </div>
                <p className="desc">{t.desc}</p>
              </article>
            );
          })}
        </div>

        {/* Right: Quick Access */}
        <aside className="side">
          <div className="sideHeader">
            <div className="sideTitle">Quick Access</div>
            <button
              className={`clearBtn ${focusedIndex !== null ? 'show' : ''}`}
              onClick={() => setFocusedIndex(null)}
              aria-label="Clear selection"
            >
              Clear
            </button>
          </div>
          <div className="miniList">
            {tiles.map((t, i) => {
              const Icon = t.icon;
              const active = focusedIndex === i;
              return (
                <div
                  key={i}
                  className={`miniItem ${active ? 'active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuickAccess(i)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleQuickAccess(i)}
                  aria-label={`Focus ${t.title}`}
                >
                  <span className="miniIcon" style={{ color: t.color }}>
                    <Icon aria-hidden />
                  </span>
                  <div className="miniName">{t.title}</div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}