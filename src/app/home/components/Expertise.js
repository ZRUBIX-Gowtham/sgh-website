'use client';

import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register plugin on the client
if (typeof window !== 'undefined' && gsap.core && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/* Hook: safely read window params */
function useWindowParams() {
  const [params, setParams] = React.useState({
    width: 0,
    height: 0,
    scrollY: 0,
    devicePixelRatio: 1,
  });

  React.useEffect(() => {
    const update = () =>
      setParams({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollY: window.scrollY,
        devicePixelRatio: window.devicePixelRatio || 1,
      });

    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, []);

  return params;
}

/* Desktop/tablet section */
export const ExpertiseSection = () => {
  useWindowParams(); // keep for resize effects

  const faqContent = {
    title: 'Our Expertise',
    description:
      'At Salem Gopi Hospital, we offer a multiplicity of healthcare services across specialties. Each department is led by skilled doctors and supported by advanced facilities, ensuring comprehensive and compassionate care for every patient.',
    faqs: [
      {
        question: 'Nephrology',
        answer:
          'Our Nephrology Department offers expert care for kidney diseases, dialysis, and transplants, including complex ABO-incompatible cases. We provide advanced treatment with compassionate support for patients of all ages.',
        images: [
          'https://static.wixstatic.com/media/690369_12d1b576e211467e8c59d684b9c88117~mv2.jpg/v1/fill/w_1000,h_600,al_c,q_85/Nephrology.jpg',
          'https://www.chaudharyhospital.in/wp-content/uploads/2021/02/Nephrology.png',
        ],
      },
      {
        question: 'Diabetology',
        answer:
          'Specialized management of diabetes, prevention of complications, and lifestyle care for long-term health.',
        images: [
          'https://mydoctorshub.com/wp-content/uploads/2024/11/vegetiarian-diabetes-diet-chart-food.webp',
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        ],
      },
      {
        question: 'Urology',
        answer:
          'Comprehensive care for urinary tract, bladder, prostate, and kidney stone problems, using advanced diagnostics and minimally invasive surgical techniques.',
        images: [
          'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
          'https://images.unsplash.com/photo-1579154204601-01588f351e67',
        ],
      },
      {
        question: 'Kidney Transplant',
        answer:
          'State-of-the-art hemodialysis and peritoneal dialysis services with advanced machines, skilled staff, and strict infection control — ensuring safe, comfortable, and effective kidney care for patients of all ages.',
        images: [
          'https://www.hindustantimes.com/ht-img/img/2024/03/19/1600x900/Kidney_Transplantation_1710834285646_1710834347989.jpg',
          'https://www.amjtransplant.org/cms/10.1016/j.ajt.2022.11.023/asset/67e8b19f-f682-4510-b55e-8a666f84cdd7/main.assets/gr1_lrg.jpg',
        ],
      },
    ],
  };

  const [openIndex, setOpenIndex] = React.useState(0);

  // Icons for departments
  const icons = {
    Nephrology: '🩺',
    Diabetology: '🩸',
    Urology: '🚻',
    'Kidney Transplant': '🧬',
  };

  // Refs
  const sectionRef = React.useRef(null);
  const orbRef = React.useRef(null);
  const orbWrapRef = React.useRef(null); // container for full-width travel

  React.useEffect(() => {
    if (!sectionRef.current || !orbRef.current || !orbWrapRef.current) return;

    orbRef.current.style.setProperty('--x-drift', '0px');

    const measure = () => {
      const wrap = orbWrapRef.current;
      const orb = orbRef.current;
      if (!wrap || !orb) return { maxTravel: 0 };
      const wrapRect = wrap.getBoundingClientRect();
      const orbRect = orb.getBoundingClientRect();
      const maxTravel = Math.max(0, wrapRect.width - orbRect.width);
      return { maxTravel };
    };

    let { maxTravel } = measure();

    const ctx = gsap.context(() => {
      const refreshHandler = () => {
        maxTravel = measure().maxTravel;
      };
      ScrollTrigger.addEventListener('refreshInit', refreshHandler);

      gsap.to({}, {
        scrollTrigger: {
          id: 'orbSweep',
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const px = Math.round(self.progress * maxTravel);
            if (orbRef.current) {
              orbRef.current.style.setProperty('--x-drift', `${px}px`);
            }
          },
        },
      });

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', refreshHandler);
      };
    }, sectionRef);

    setTimeout(() => ScrollTrigger.refresh(), 0);

    return () => {
      ctx.revert();
    };
  }, []);

  const active = faqContent.faqs[openIndex];

  return (
    <section className="x-wrap" aria-labelledby="x-title" ref={sectionRef}>
      {/* NEW: Top header with left-aligned CTA */}
      <div className="x-top">
        <div className="x-badge">Patient‑First Care</div>
        <h2 className="x-top-heading">Trusted Multispecialty Care</h2>
        <p className="x-top-sub">
          Expert doctors, modern diagnostics, and minimally invasive treatments in nephrology, diabetology, urology, and kidney transplant—with a compassionate, patient‑first approach.
        </p>
        {/* Removed the Explore All Departments button as requested */}
      </div>

      {/* Main two-column content */}
      <div className="x-content">
        {/* Left column */}
        <aside className="x-left">
          <div className="x-badge">Multispecialty Care</div>
          <h2 id="x-title" className="x-heading">{faqContent.title}</h2>
          <p className="x-desc">{faqContent.description}</p>

          <ul className="x-points" aria-label="Key highlights">
            <li><span className="x-dot x-blue" /> Multi-specialty, end-to-end care</li>
            <li><span className="x-dot x-green" /> Modern diagnosis, less invasive</li>
            <li><span className="x-dot x-pink" /> Compassionate, patient-first approach</li>
          </ul>

          {/* Full-width orb track and smaller orb */}
          <div className="x-orb-track" ref={orbWrapRef} aria-hidden="true">
            <div className="x-orb" ref={orbRef}>
              <div className="x-orb-core" />
              <div className="x-orb-ring" />
            </div>
          </div>
        </aside>

        {/* Right column: 2x2 buttons + detail with 2 images */}
        <div className="x-right">
          <div className="x-grid" role="list">
            {faqContent.faqs.map((item, idx) => {
              const isActive = openIndex === idx;
              return (
                <button
                  key={idx}
                  className={`x-cell ${isActive ? 'active' : ''}`}
                  role="listitem"
                                   onClick={() => setOpenIndex(idx)}
                >
                  <span
                    className="x-cell-icon"
                    aria-hidden="true"
                    style={{ fontSize: 18, marginRight: 10 }}
                  >
                    {icons[item.question] || '🏥'}
                  </span>
                  <span className="x-cell-title">{item.question}</span>
                </button>
              );
            })}
          </div>

          <div className="x-detail" role="region" aria-live="polite">
            <div className="x-detail-inner">
              <h3 className="x-detail-title">{active?.question}</h3>
              <p className="x-detail-text">{active?.answer}</p>

              <div className="x-detail-images">
                {active?.images?.slice(0, 2).map((src, i) => (
                  <div className="x-img-wrap" key={i}>
                    <Image
                      src={src}
                      alt={`${active?.question} ${i + 1}`}
                      fill
                      sizes="(max-width: 700px) 50vw, 260px"
                      className="x-img"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --ink: #0b1324;
          --muted: #475569;
          --bg: #ffffff;
          --surface: #ffffff;
          --card: rgba(255, 255, 255, 0.9);
          --card-strong: rgba(255, 255, 255, 0.95);
          --border: rgba(15, 23, 42, 0.08);
          --brand-1: #2f80ed;
          --brand-2: #12b981;
          --brand-3: #ef5da8;
          --glow: 0 8px 30px rgba(2, 6, 23, 0.08);
          --ring: 0 0 0 2px rgba(47, 128, 237, 0.28);
        }

        .x-wrap {
          position: relative;
          overflow: hidden;
          background: transparent;
          padding: 84px 22px;
          color: var(--ink);
          isolation: isolate;
        }

        /* NEW: top header */
        .x-top {
          max-width: 1300px;
          margin: 0 auto 18px auto;
          padding: 0 4px;
          text-align: left;
        }
        .x-top-heading {
          margin: 10px 0px 10px;
          font-size: 44px;
          line-height: 1.05;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(92deg, #0b1324 0%, #274760 0%, #2f80ed 70%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .x-top-sub {
          margin: 0 0 14px 0;
          color: #475569;
          font-size: 16px;
          line-height: 1.7;
          max-width: 1300px;
        }
        .x-top-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: 12px;
          background: linear-gradient(90deg, #2f80ed, #1f5fc9);
          color: #fff;
          font-weight: 800;
          letter-spacing: 0.01em;
          text-decoration: none;
          box-shadow: 0 12px 28px rgba(47,128,237,0.28);
          transition: transform 0.18s ease, background 0.18s ease, filter 0.18s ease;
        }
        .x-top-cta:hover {
          transform: translateY(-1px);
          background: linear-gradient(90deg, #1f5fc9, #174a9e);
          filter: saturate(1.02);
        }
        @media (max-width: 520px) {
          .x-top-heading { font-size: 34px; }
        }

        .x-content {
          position: relative; z-index: 1; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 0.95fr 1.25fr; gap: 36px; height: 600px;
        }
        @media (max-width: 1000px) { .x-content { grid-template-columns: 1fr; gap: 28px; height: auto; } }

        .x-left {
          position: sticky; top: 28px; align-self: start; padding: 28px; border-radius: 18px; height: 600px;
          background: #ffffff;
          border: 1px solid var(--border); backdrop-filter: none; box-shadow: var(--glow);
        }
        @media (max-width: 1000px) { .x-left { position: static; height: auto; } }

        .x-badge {
          display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 999px;
          font-size: 12px; letter-spacing: 0.02em; background: rgba(47,128,237,0.1);
          color: #1f4e9b; border: 1px solid rgba(47,128,237,0.22);
        }
        .x-heading {
          margin: 12px 0 8px;
          font-size: 40px;
          line-height: 1.08;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(92deg, #0b1324 0%, #274760 0%, #2f80ed 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .x-desc { margin: 0 0 18px; color: var(--muted); line-height: 1.75; font-size: 16px; }
        .x-points { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
        .x-points li { display: flex; align-items: center; gap: 10px; font-weight: 700; color: #0f172a; }
        .x-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.03) inset; }
        .x-blue { background: var(--brand-1); } .x-green { background: var(--brand-2); } .x-pink { background: var(--brand-3); }

        /* Track that defines total horizontal travel */
        .x-orb-track {
          position: relative;
          width: 100%;
          min-height: 130px;
          margin-top: 22px;
        }

        /* Smaller orb that travels across the full track width */
        .x-orb {
          --x-drift: 0px;
          position: absolute; top: 50px; left: 0;
          width: 110px; height: 110px;
          will-change: transform;
          filter: drop-shadow(0 10px 26px rgba(47, 128, 237, 0.25));
          transform: translateX(var(--x-drift));
          animation: floatY 6s ease-in-out infinite;
        }
        .x-orb-core {
          width: 100%; height: 100%; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #e7f1ff, #b7d2ff 55%, #6aa7ff 100%);
        }
        .x-orb-ring {
          position: absolute; inset: -12px; border-radius: 50%;
          background: conic-gradient(from 120deg, rgba(47,128,237,0.0), rgba(47,128,237,0.45), rgba(239,93,168,0.35), rgba(18,185,129,0.35), rgba(47,128,237,0.0));
          filter: blur(9px); opacity: 0.7;
        }
        @keyframes floatY {
          0%, 100% { transform: translateX(var(--x-drift)) translateY(0); }
          50% { transform: translateX(var(--x-drift)) translateY(-8px); }
        }

        /* RIGHT COLUMN */
        .x-right {
          display: grid;
          gap: 14px;
        }

        .x-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        @media (max-width: 700px) {
          .x-grid { grid-template-columns: 1fr; }
        }

        .x-cell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 12px 14px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: 0 6px 20px rgba(2, 6, 23, 0.06);
          color: var(--ink);
          cursor: pointer;
          text-align: left;
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease, background-color 0.18s ease;
          backdrop-filter: none;
          min-height: 56px;
        }

        .x-cell:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 30px rgba(2, 6, 23, 0.08);
          filter: saturate(1.02);
        }

        .x-cell.active {
          background: #f6f9ff;
          border: 1px solid rgba(47,128,237,0.25);
        }

        .x-cell-icon { display: inline-flex; }
        .x-cell-title {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #0b1324;
        }

        .x-detail {
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: 0 8px 28px rgba(2, 6, 23, 0.06);
        }

        .x-detail-inner { padding: 18px; }

        .x-detail-title {
          margin: 0 0 6px;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: -0.01em;
          color: #0b1324;
        }

        .x-detail-text {
          margin: 50px 0 12px 0;
          color: var(--muted);
          line-height: 1.7;
          font-size: 15px;
        }

        .x-detail-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .x-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 13 / 8;
          overflow: hidden;
          border-radius: 12px;
          background: #eef2ff;
          border: 1px solid var(--border);
        }

        :global(.x-img) { object-fit: cover; }

        @media (max-width: 520px) {
          .x-heading { font-size: 32px; }
          .x-orb-track { min-height: 110px; }
          .x-orb { width: 96px; height: 96px; }
          .x-detail .x-detail-inner { padding: 14px; }
          .x-cell { min-height: 52px; padding: 10px 12px; }
        }
      `}</style>
    </section>
  );
};

/* Mobile section */
export const ExpertiseSectionMobile = () => {
  const faqContent = {
    title: 'Our Expertise',
    description:
      'At Salem Gopi Hospital, we offer a multiplicity of healthcare services across specialties. Each department is led by skilled doctors and supported by advanced facilities, ensuring comprehensive and compassionate care for every patient.',
    highlights: [
      { color: 'x-blue', text: 'Multi-specialty, end-to-end care' },
      { color: 'x-green', text: 'Modern diagnosis, less invasive' },
      { color: 'x-pink', text: 'Compassionate, patient-first approach' },
    ],
    faqs: [
      {
        question: 'Nephrology',
        answer:
          'Our Nephrology Department offers expert care for kidney diseases, dialysis, and transplants, including complex ABO-incompatible cases. We provide advanced treatment with compassionate support for patients of all ages.',
        images: [
          'https://static.wixstatic.com/media/690369_12d1b576e211467e8c59d684b9c88117~mv2.jpg/v1/fill/w_1000,h_600,al_c,q_85/Nephrology.jpg',
          'https://www.chaudharyhospital.in/wp-content/uploads/2021/02/Nephrology.png',
        ],
      },
      {
        question: 'Diabetology',
        answer:
          'Specialized management of diabetes, prevention of complications, and lifestyle care for long-term health.',
        images: [
          'https://mydoctorshub.com/wp-content/uploads/2024/11/vegetiarian-diabetes-diet-chart-food.webp',
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        ],
      },
      {
        question: 'Urology',
        answer:
          'Comprehensive care for urinary tract, bladder, prostate, and kidney stone problems, using advanced diagnostics and minimally invasive surgical techniques.',
        images: [
          'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
          'https://images.unsplash.com/photo-1579154204601-01588f351e67',
        ],
      },
      {
        question: 'Kidney Transplant',
        answer:
          'State-of-the-art hemodialysis and peritoneal dialysis services with advanced machines, skilled staff, and strict infection control — ensuring safe, comfortable, and effective kidney care for patients of all ages.',
        images: [
          'https://www.hindustantimes.com/ht-img/img/2024/03/19/1600x900/Kidney_Transplantation_1710834285646_1710834347989.jpg',
          'https://www.amjtransplant.org/cms/10.1016/j.ajt.2022.11.023/asset/67e8b19f-f682-4510-b55e-8a666f84cdd7/main.assets/gr1_lrg.jpg',
        ],
      },
    ],
  };

  const [openIndex, setOpenIndex] = React.useState(0);
  const active = faqContent.faqs[openIndex];

  // Icons for departments
  const icons = {
    Nephrology: '🩺',
    Diabetology: '🩸',
    Urology: '🚻',
    'Kidney Transplant': '🧬',
  };

  return (
    <section className="m3-wrap" aria-labelledby="m3-title">
      {/* NEW: top header with left-aligned CTA */}
      <div className="m3-top">
        <div className="m3-badge">Patient‑First Care</div>
        <h2 className="m3-top-heading">Trusted Multispecialty Care</h2>
        <p className="m3-top-sub">
          Expert doctors, modern diagnostics, and minimally invasive treatments in nephrology, diabetology, urology, and kidney transplant—with a compassionate, patient‑first approach.
        </p>
        {/* Removed the Explore All Departments button as requested */}
      </div>

      <div className="m3-head">
        {/* <div className="m3-badge">Multispecialty Care</div>
        <h2 id="m3-title" className="m3-heading">{faqContent.title}</h2>
        <p className="m3-desc">{faqContent.description}</p> */}

        <ul className="m3-points" aria-label="Key highlights">
          {faqContent.highlights.map((h, i) => (
            <li key={i}>
              <span className={`x-dot ${h.color}`} />
              {h.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Row-wise tabs (vertical buttons) */}
      <div className="m3-tabs" role="list">
        {faqContent.faqs.map((item, idx) => {
          const isActive = idx === openIndex;
          return (
            <button
              key={idx}
              className={`m3-tab ${isActive ? 'active' : ''}`}
              role="listitem"
            
              onClick={() => setOpenIndex(idx)}
            >
              <span
                className="m3-tab-icon"
                aria-hidden="true"
                style={{ fontSize: 18, marginRight: 10 }}
              >
                {icons[item.question] || '🏥'}
              </span>
              <span className="m3-tab-title">{item.question}</span>
            </button>
          );
        })}
      </div>

      {/* Active detail below tabs with images */}
      <div className="m3-detail" role="region" aria-live="polite">
        <div className="m3-detail-inner">
          <h3 className="m3-detail-title">{active?.question}</h3>
          <p className="m3-detail-text">{active?.answer}</p>

          <div className="m3-detail-images">
            {active?.images?.slice(0, 2).map((src, i) => (
              <div className="m3-img-wrap" key={i}>
                <Image
                  src={src}
                  alt={`${active?.question} ${i + 1}`}
                  fill
                  sizes="(max-width: 700px) 50vw, 260px"
                  className="m3-img"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --bg: #ffffff;
          --ink: #0b1324;
          --muted: #475569;
          --brand-1: #2f80ed;
          --brand-2: #12b981;
          --brand-3: #ef5da8;
          --border: rgba(15, 23, 42, 0.08);
        }

        .m3-wrap {
          background: transparent;
          padding: 28px 16px 30px;
          color: var(--ink);
          position: relative;
          overflow: hidden;
        }

        /* NEW: Mobile top header */
        .m3-top {
          text-align: center;
          margin: 0 0 14px 0;
        }
        .m3-top-heading {
          margin: 10px 0 10px 0;
          font-size: 32px;
          line-height: 1.12;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-align : center;
        }
        .m3-top-sub {
          margin: 0 0 12px 0;
          color: #475569;
          line-height: 1.7;
          font-size: 14.5px;
        }

        .m3-head { text-align: center; margin-bottom: 16px; }
        .m3-badge {
          display: inline-flex;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(47,128,237,0.1);
          border: 1px solid rgba(47,128,237,0.22);
          color: #1f4e9b;
          font-size: 12px;
        }
        .m3-heading {
          margin: 12px 0 8px;
          font-size: 28px;
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .m3-desc {
          margin: 0 auto;
          max-width: 760px;
          color: var(--muted);
          line-height: 1.7;
          font-size: 14.5px;
        }

        /* Key highlights */
        .m3-points {
          list-style: none;
          padding: 0;
          margin: 14px auto 0;
          display: grid;
          gap: 10px;
          max-width: 760px;
          text-align: left;
        }
        .m3-points li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: #0f172a;
          justify-content: center;
        }
        .x-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 4px rgba(0,0,0,0.03) inset;
        }
        .x-blue { background: var(--brand-1); }
        .x-green { background: var(--brand-2); }
        .x-pink { background: var(--brand-3); }

        /* Row-wise tabs */
        .m3-tabs {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: 18px;
        }

        .m3-tab {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 12px 14px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: 0 6px 20px rgba(2, 6, 23, 0.06);
          color: var(--ink);
          cursor: pointer;
          text-align: left;
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease, background-color 0.18s ease;
          backdrop-filter: none;
          min-height: 52px;
        }
        .m3-tab:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 30px rgba(2, 6, 23, 0.08);
          filter: saturate(1.02);
        }
        .m3-tab.active {
          background: #f6f9ff;
          border: 1px solid rgba(47,128,237,0.25);
        }
        .m3-tab-icon { display: inline-flex; }
        .m3-tab-title {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #0b1324;
        }

        .m3-detail {
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: 0 8px 28px rgba(2, 6, 23, 0.06);
          margin-top: 12px;
        }
        .m3-detail-inner { padding: 16px; }
        .m3-detail-title {
          margin: 0 0 6px;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: -0.01em;
          color: #0b1324;
        }
        .m3-detail-text {
          margin: 0 10px 10px 0;
          color: var(--muted);
          line-height: 1.7;
          font-size: 15px;
        }

        .m3-detail-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 6px;
        }

        .m3-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 13 / 8;
          overflow: hidden;
          border-radius: 12px;
          background: #eef2ff;
          border: 1px solid var(--border);
        }

        :global(.m3-img) { object-fit: cover; }

        /* Slightly larger touch targets on very small phones */
        @media (max-width: 380px) {
          .m3-tab { padding: 12px; }
          .m3-tab-title { font-size: 14.5px; }
        }
      `}</style>
    </section>
  );
};