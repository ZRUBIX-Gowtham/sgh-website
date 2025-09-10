'use client';

import React from 'react';
import Image from 'next/image';
import kidneybooktamil from '../../../../public/HomePageImages/kidneybooktamil.webp';


export function BookSection() {
  const slides = [
    {
      image: kidneybooktamil,
      alt: 'Understanding Kidney Diseases',
      title: 'Understanding Kidney Diseases',
      description:
        'A clear, Q&A style guide to causes, early symptoms, prevention, lifestyle changes, and treatments. Written in simple language to help you and your family make informed health decisions.',
      buttonText: 'Learn More',
      bookLink: 'https://salemgopihospital.in/book/',
      ctaLabel: 'Buy the book online',
      tag: 'Patient Education',
    },
    {
      image: kidneybooktamil,
      alt: 'சிறுநீரக பாதிப்புகள்',
      title: 'சிறுநீரக பாதிப்புகள்',
      description:
        'எளிய தமிழில் கேள்வி-பதில் வடிவில் சிறுநீரக நோய் பற்றிய விழிப்புணர்வு, அறிகுறிகள், தடுப்பு, வாழ்க்கை முறை மாற்றங்கள் மற்றும் சிகிச்சைகள் குறித்து விரிவான விளக்கம்.',
      buttonText: 'மேலும் அறிக',
      bookLink: 'https://salemgopihospital.in/book/',
      ctaLabel: 'புத்தகத்தை ஆன்லைனில் வாங்க',
      tag: 'நலவாழ்வு',
    },
  ];

  const en = slides[0];
  const ta = slides[1];

  return (
    <section className="book-wrap" aria-label="Featured health books split view">
      <style>{`
        :root {
          --ink: #0b1324;
          --muted: #475569;
          --primary: #2f80ed;
          --primary-2: #1b4db3;
          --ring: rgba(47,128,237,0.35);
          --green: #10b981;
          --bg-grad: radial-gradient(1200px 600px at 10% -10%, rgba(47,128,237,0.10), transparent 40%),
                     radial-gradient(1000px 500px at 90% 0%, rgba(16,185,129,0.08), transparent 45%);
        }

        .book-wrap {
          position: relative;
          overflow: visible;
          padding: 0;
          background: transparent;
        }
        .book-wrap::before {
          content: '';
          position: absolute;
          inset: -60px 0 0 0;
          background: var(--bg-grad);
          filter: blur(0.2px);
          z-index: 0;
          pointer-events: none;
        }

        .book-inner {
          position: relative;
          z-index: 1;
          max-width: 1300px;
          margin: 0 auto;
          padding: 28px 18px 36px;
        }

        .book-head { text-align: center; margin-bottom: 20px; }
        .book-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 10px; border-radius: 999px;
          background: rgba(47,128,237,0.10);
          border: 1px solid rgba(47,128,237,0.25);
          color: #1f4e9b; font-size: 12.5px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.3) inset;
        }
        

        .book-title {
          margin: 12px 0 10px;
          font-size: 36px; line-height: 1.12; font-weight: 900; letter-spacing: -0.01em;
          background: linear-gradient(92deg, #0b1324, #274760 45%, #2f80ed 85%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .book-sub { margin: 0 auto; max-width: 820px; color: var(--muted); line-height: 1.75; font-size: 15.6px; }

        .split-wrap {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 18px;
        }
        .split-wrap::before {
          content: '';
          position: absolute;
          top: 8%;
          bottom: 8%;
          left: 50%;
          width: 1px;
          background: linear-gradient(180deg, rgba(2,6,23,0), rgba(2,6,23,0.18), rgba(2,6,23,0));
          pointer-events: none;
        }

        .BookSec-panel {
          position: relative;
          border-radius: 20px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(2,6,23,0.06);
          box-shadow:
            0 10px 30px rgba(2,6,23,0.08),
            0 1px 0 rgba(255,255,255,0.6) inset;
          backdrop-filter: saturate(140%) blur(6px);
          padding: 24px;
          overflow: hidden;
          transform: translateZ(0);
        }
        .BookSec-panel::after {
          content: '';
          position: absolute;
          inset: -40%;
          background: radial-gradient(400px 240px at var(--mx, 60%) var(--my, 40%), rgba(47,128,237,0.12), transparent 55%);
          transition: opacity 220ms ease;
          opacity: 0;
          pointer-events: none;
        }
        .BookSec-panel:hover::after { opacity: 1; }

        .BookSec-panel-inner {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 16px;
          align-items: center;
        }

        .book-visual { display: grid; place-items: center; padding: 8px; }
        .book-mock {
          position: relative; width: 100%; max-width: 420px; aspect-ratio: 3 / 4; border-radius: 14px; overflow: hidden;
          background: linear-gradient(180deg, rgba(2,6,23,0.02), rgba(2,6,23,0.00));
          border: 1px solid rgba(2,6,23,0.06);
          box-shadow: 0 10px 26px rgba(2,6,23,0.08);
          transform: translateY(4px) scale(0.98);
          transition: transform 420ms cubic-bezier(.22,.61,.36,1), box-shadow 420ms ease;
        }
        .BookSec-panel:hover .book-mock { transform: translateY(0) scale(1); box-shadow: 0 16px 34px rgba(2,6,23,0.12); }
        /* Make the Image fill behave like the old img */
        .book-mock :global(img) { object-fit: contain; }
        .book-mock img { width: 100%; height: 100%; object-fit: contain; }

        .book-content {
          display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
          padding: 6px 4px;
        }
        .book-tag {
          display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px;
          background: rgba(18,185,129,0.10); border: 1px solid rgba(18,185,129,0.22); color: #0c7a58; font-size: 12.5px; font-weight: 700;
        }
        .book-tag::before { content: '●'; font-size: 10px; color: var(--green); }

        .book-h3 { margin: 0; font-size: 26px; line-height: 1.22; font-weight: 900; letter-spacing: -0.01em; color: var(--ink); }
        .book-desc { margin: 2px 0 10px; color: var(--muted); line-height: 1.85; font-size: 15.8px; }

        .book-cta {
          display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px; border-radius: 12px;
          background: linear-gradient(90deg, var(--primary), var(--primary-2));
          color: #fff; font-weight: 850; text-decoration: none;
          box-shadow: 0 10px 22px rgba(47,128,237,0.24), inset 0 1px 0 rgba(255,255,255,0.35);
          transition: transform 180ms ease, box-shadow 220ms ease, background 220ms ease;
          border: 1px solid rgba(255,255,255,0.25);
        }
        .book-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 26px rgba(47,128,237,0.28), inset 0 1px 0 rgba(255,255,255,0.4);
          background: linear-gradient(90deg, #4690ff, #2159c9);
        }
        .book-cta:focus-visible { outline: 3px solid var(--ring); outline-offset: 3px; }

        .book-link-wrap { font-size: 13.8px; color: #3a4a5f; }
        .book-link { color: var(--primary); font-weight: 800; text-decoration: none; }
        .book-link:hover { text-decoration: underline; text-underline-offset: 3px; }

        .reveal-up { opacity: 0; transform: translateY(14px); animation: riseIn 560ms cubic-bezier(.22,.61,.36,1) forwards; }
        .reveal-up.d2 { animation-delay: .06s; }
        @keyframes riseIn { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1100px) {
          .BookSec-panel-inner { grid-template-columns: 1fr; }
          .book-content { align-items: center; text-align: center; }
        }
        @media (max-width: 900px) {
          .split-wrap { grid-template-columns: 1fr; }
          .split-wrap::before { display: none; }
        }
        @media (max-width: 560px) {
          .book-title { font-size: 29px; }
          .book-badge { font-size: 12px; }
        }
      `}</style>

      <div className="book-inner">
        <div className="book-head">
          <span className="book-badge" aria-label="Trusted Patient Guide">
            Trusted Patient Guide
          </span>
          <h2 className="book-title">Helpful Books by Salem Gopi Hospital</h2>
          <p className="book-sub">
            Easy-to-read guides that explain complex kidney health topics with clarity and compassion.
          </p>
        </div>

        <div className="split-wrap">
          {/* English BookSec-panel */}
          <article
            className="BookSec-panel reveal-up"
            role="region"
            aria-label={en.title + ' BookSec-panel'}
            data-parallax="true"
            onMouseMove={(e) => {
              const t = e.currentTarget;
              const r = t.getBoundingClientRect();
              const mx = ((e.clientX - r.left) / r.width) * 100;
              const my = ((e.clientY - r.top) / r.height) * 100;
              t.style.setProperty('--mx', mx + '%');
              t.style.setProperty('--my', my + '%');
              const mock = t.querySelector('.book-mock') ;
              if (mock) {
                const dx = (mx - 50) / 60;
                const dy = (my - 50) / 60;
                mock.style.transform = `translate(${dx * 10}px, ${dy * 10}px) scale(1.01)`;
              }
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              const mock = t.querySelector('.book-mock') ;
              if (mock) mock.style.transform = '';
            }}
          >
            <div className="BookSec-panel-inner">
              <div className="book-visual">
                <div className="book-mock" aria-hidden="true">
                  <Image
                    src={en.image}
                    alt={en.alt}
                    fill
                    sizes="(max-width: 1100px) 80vw, 420px"
                    priority
                  />
                </div>
              </div>
              <div className="book-content">
                <span className="book-tag">{en.tag}</span>
                <h3 className="book-h3">{en.title}</h3>
                <p className="book-desc">{en.description}</p>
                <a
                  className="book-cta"
                  href={en.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${en.buttonText}: ${en.title}`}
                >
                  {en.buttonText}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 2 }}>
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="book-link-wrap">
                  {en.ctaLabel}:{' '}
                  <a className="book-link" href={en.bookLink} target="_blank" rel="noopener noreferrer">
                    {en.bookLink}
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Tamil BookSec-panel */}
          <article
            className="BookSec-panel reveal-up d2"
            role="region"
            aria-label={ta.title + ' BookSec-panel'}
            data-parallax="true"
            onMouseMove={(e) => {
              const t = e.currentTarget;
              const r = t.getBoundingClientRect();
              const mx = ((e.clientX - r.left) / r.width) * 100;
              const my = ((e.clientY - r.top) / r.height) * 100;
              t.style.setProperty('--mx', mx + '%');
              t.style.setProperty('--my', my + '%');
              const mock = t.querySelector('.book-mock') ;
              if (mock) {
                const dx = (mx - 50) / 60;
                const dy = (my - 50) / 60;
                mock.style.transform = `translate(${dx * 10}px, ${dy * 10}px) scale(1.01)`;
              }
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              const mock = t.querySelector('.book-mock');
              if (mock) mock.style.transform = '';
            }}
          >
            <div className="BookSec-panel-inner">
              <div className="book-visual">
                <div className="book-mock" aria-hidden="true">
                  <Image
                    src={ta.image}
                    alt={ta.alt}
                    fill
                    sizes="(max-width: 1100px) 80vw, 420px"
                    priority
                  />
                </div>
              </div>
              <div className="book-content" lang="ta">
                <span className="book-tag">{ta.tag}</span>
                <h3 className="book-h3">{ta.title}</h3>
                <p className="book-desc">{ta.description}</p>
                <a
                  className="book-cta"
                  href={ta.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ta.buttonText}: ${ta.title}`}
                >
                  {ta.buttonText}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 2 }}>
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="book-link-wrap">
                  {ta.ctaLabel}:{' '}
                  <a className="book-link" href={ta.bookLink} target="_blank" rel="noopener noreferrer">
                    {ta.bookLink}
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}