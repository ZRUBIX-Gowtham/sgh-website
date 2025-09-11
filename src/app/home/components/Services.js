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
    <section className="max-w-[1300px] mx-auto px-5 py-20 text-[#0f172a]">
      {/* Scoped CSS for column masonry behavior, nth-child backgrounds and a couple small helpers */}
      <style jsx>{`
        /* Masonry-like columns for large screens, switches to grid on narrower screens */
        .masonry {
          column-count: 3;
          column-gap: 16px;
          transition: filter .25s ease;
        }
        @media (max-width: 1100px) {
          .masonry { column-count: 2; }
        }
        @media (max-width: 900px) {
          .masonry {
            column-count: initial;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }
        }
        @media (max-width: 640px) {
          .masonry {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        /* Avoid break inside for cards when using columns */
        .tile {
          break-inside: avoid;
        }

        /* Variant backgrounds to create subtle color banding similar to original */
        .tile:nth-child(3n)   { background: linear-gradient(180deg, #ffffff, #f8fbff); }
        .tile:nth-child(3n+1) { background: linear-gradient(180deg, #ffffff, #f9f9ff); }
        .tile:nth-child(3n+2) { background: linear-gradient(180deg, #ffffff, #f9fffc); }
      `}</style>

      {/* Header */}
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-2 font-bold rounded-full text-xs tracking-wide bg-[rgba(47,128,237,0.10)] text-[#1f4e9b] border border-[rgba(47,128,237,0.22)] self-start">
          We Provide
        </div>

        <h2
          className="font-extrabold leading-[1.08] tracking-[-0.02em] self-stretch text-left mt-3"
          style={{
            backgroundImage: 'linear-gradient(92deg, #0b1324 0%, #274760 00%, #2f80ed 80%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            fontSize: 'clamp(28px, 4vw, 44px)',
            letterSpacing: '-0.02em',
          }}
        >
          Best Healthcare Services
        </h2>

        <p className="mt-2 text-[#4b5563] text-base leading-7 max-w-[1200px]">
          Comprehensive, patient-first services powered by experienced specialists, modern diagnostics,
          and compassionate support.
        </p>
      </header>

      {/* Main content: left masonry tiles, right quick-access */}
      <div className="w-full mx-auto grid lg:grid-cols-[1fr_280px] gap-5">
        {/* Left: Masonry / grid switching */}
        <div>
          <div className="masonry">
            {tiles.map((t, i) => {
              const Icon = t.icon;
              const isFocused = focusedIndex === i;
              const dimOthers = focusedIndex !== null && !isFocused;
              return (
                <article
                  key={i}
                  data-card-index={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => setFocusedIndex((prev) => (prev === i ? null : i))}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFocusedIndex((prev) => (prev === i ? null : i))}
                  aria-label={`${t.title} card`}
                  className={`tile w-full mb-4 inline-block border rounded-[16px] p-4 min-h-[160px] cursor-pointer transition-transform duration-200 ease-in-out transform will-change-transform
                    border-[rgba(229,231,235,1)] shadow-[0_6px_16px_rgba(16,24,40,0.06)]
                    ${isFocused ? 'scale-[1.03] z-[20] shadow-[0_22px_48px_rgba(16,24,40,0.18)] relative' : ''}
                    ${dimOthers ? 'filter blur-[1.2px] saturate-[0.8] opacity-70' : ''}
                  `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl" style={{ color: t.color }}>
                      <Icon aria-hidden />
                    </span>
                    <div className="text-[18px] font-extrabold">{t.title}</div>
                  </div>
                  <p className="text-[#334155] text-sm leading-6 line-clamp-4">
                    {t.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Access */}
        <aside className="bg-white border border-[rgba(229,231,235,1)] rounded-[14px] shadow-[0_6px_16px_rgba(16,24,40,0.06)] p-3 h-max">
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="text-base font-extrabold text-[#0f172a]">Quick Access</div>
            <button
              onClick={() => setFocusedIndex(null)}
              aria-label="Clear selection"
              className={`${focusedIndex !== null ? 'inline-flex' : 'hidden'} items-center gap-2 bg-[#f1f5f9] text-[#0f172a] rounded-md px-3 py-1.5 text-sm font-bold`}
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-[70vh] overflow-auto pr-1">
            {tiles.map((t, i) => {
              const Icon = t.icon;
              const active = focusedIndex === i;
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuickAccess(i)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleQuickAccess(i)}
                  aria-label={`Focus ${t.title}`}
                  className={`grid grid-cols-[28px_1fr] items-center gap-3 p-2.5 rounded-lg border transition-all duration-150 cursor-pointer
                    ${active ? 'bg-[#eaf1ff] border-[#c7dbff]' : 'bg-[#fafcff] border-[rgba(238,242,247,1)]'}
                    hover:bg-[#f3f7ff] hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(16,24,40,0.06)]`}
                >
                  <span className="text-lg" style={{ color: t.color }}>
                    <Icon aria-hidden />
                  </span>
                  <div className="font-bold text-sm text-[#0f172a]">{t.title}</div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}