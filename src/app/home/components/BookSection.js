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
    <section className="relative overflow-visible p-0 bg-transparent book-wrap" aria-label="Featured health books split view">
      {/* Keep a compact css block for the CSS variables, pseudo elements, complex :hover/:before rules and keyframes.
          Layout, spacing and most visual styles are applied using Tailwind classes below to match your request. */}
      <style jsx>{`
        :root {
          --ink: #0b1324;
          --muted: #475569;
          --primary: #2f80ed;
          --primary-2: #1b4db3;
          --ring: rgba(47,128,237,0.35);
          --green: #10b981;
        }

        /* background radial-grad behind the section */
        .book-wrap::before {
          content: '';
          position: absolute;
          inset: -60px 0 0 0;
          background:
            radial-gradient(1200px 600px at 10% -10%, rgba(47,128,237,0.10), transparent 40%),
            radial-gradient(1000px 500px at 90% 0%, rgba(16,185,129,0.08), transparent 45%);
          filter: blur(0.2px);
          z-index: 0;
          pointer-events: none;
        }

        /* center dividing line on wide screens */
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

        /* Book panel accent / parallax overlay */
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

        /* mock hover transform (kept in CSS for parent hover selector) */
        .BookSec-panel:hover .book-mock {
          transform: translateY(0) scale(1);
          box-shadow: 0 16px 34px rgba(2,6,23,0.12);
        }

        /* initial mock transform */
        .book-mock { transform: translateY(4px) scale(0.98); transition: transform 420ms cubic-bezier(.22,.61,.36,1), box-shadow 420ms ease; }

        /* reveal animations */
        .reveal-up { opacity: 0; transform: translateY(14px); animation: riseIn 560ms cubic-bezier(.22,.61,.36,1) forwards; }
        .reveal-up.d2 { animation-delay: .06s; }
        @keyframes riseIn { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1100px) {
          .BookSec-panel-inner { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .split-wrap { grid-template-columns: 1fr !important; }
          .split-wrap::before { display: none; }
        }

       
      `}</style>

      <div className="relative z-10 max-w-[1300px] mx-auto px-[18px] pt-7 pb-9 book-inner">
        <div className="text-center book-head">
          {/* exact pill class you requested */}
          <span
            className="inline-flex items-center gap-2 px-3 py-2 font-bold rounded-full text-xs tracking-wide bg-[rgba(47,128,237,0.10)] text-[#1f4e9b] border border-[rgba(47,128,237,0.25)] book-badge"
            aria-label="Trusted Patient Guide"
            style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset' }}
          >
            Trusted Patient Guide
          </span>

          {/* heading - exact class + inline gradient you requested */}
          <h2
            className="mx-auto mt-3 mb-0 book-title font-extrabold leading-[1.08] tracking-[-0.02em] text-center"
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)', // close to original 36 on desktop with responsive clamp
              backgroundImage: 'linear-gradient(92deg, #0b1324, #274760 45%, #2f80ed 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Helpful Books by Salem Gopi Hospital
          </h2>

          <p className="mx-auto mt-3 max-w-[820px] text-[15.6px] leading-[1.75] text-[var(--muted)] book-sub">
            Easy-to-read guides that explain complex kidney health topics with clarity and compassion.
          </p>
        </div>

        {/* split panels */}
        <div className="relative split-wrap grid grid-cols-2 gap-4 mt-4">
          {/* English panel */}
          <article
            className="BookSec-panel reveal-up relative rounded-[20px] bg-[rgba(255,255,255,0.7)] border border-[rgba(2,6,23,0.06)] shadow-[0_10px_30px_rgba(2,6,23,0.08)] backdrop-blur-[6px] p-6 overflow-hidden"
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
              const mock = t.querySelector('.book-mock');
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
            <div
              className="BookSec-panel-inner grid gap-4 items-center"
              style={{ gridTemplateColumns: '0.9fr 1.1fr' }}
            >
              <div className="book-visual grid place-items-center p-2">
                <div
                  className="book-mock relative w-full max-w-[420px] aspect-[3/4] rounded-[14px] overflow-hidden bg-gradient-to-b from-[rgba(2,6,23,0.02)] to-transparent border border-[rgba(2,6,23,0.06)] shadow-[0_10px_26px_rgba(2,6,23,0.08)]"
                  aria-hidden="true"
                >
                  <Image
                    src={en.image}
                    alt={en.alt}
                    fill
                    sizes="(max-width: 1100px) 80vw, 420px"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="book-content flex flex-col items-start gap-3 p-1">
                <span className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full text-[12.5px] font-bold bg-[rgba(18,185,129,0.10)] border border-[rgba(18,185,129,0.22)] text-[#0c7a58] book-tag">
                  {en.tag}
                </span>

                <h3 className="book-h3 m-0 text-[26px] leading-[1.22] font-extrabold text-[var(--ink)]">
                  {en.title}
                </h3>

                <p className="book-desc text-[15.8px] leading-[1.85] text-[var(--muted)]">
                  {en.description}
                </p>

                <a
                  className="inline-flex items-center gap-2 mt-5 px-4 py-3 rounded-[12px] font-extrabold text-white bg-gradient-to-r from-[#2f80ed] to-[#1f5fc9] shadow-[0_12px_28px_rgba(47,128,237,0.28)] self-center hover:from-[#1f5fc9] hover:to-[#174a9e] transition-transform duration-150"
                  href={en.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${en.buttonText}: ${en.title}`}
                  
                >
                  <span>{en.buttonText}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 2 }}>
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <div className="book-link-wrap text-[13.8px] text-[#3a4a5f]">
                  {en.ctaLabel}:{' '}
                  <a className="book-link font-extrabold text-[var(--primary)]" href={en.bookLink} target="_blank" rel="noopener noreferrer">
                    {en.bookLink}
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Tamil panel */}
          <article
            className="BookSec-panel reveal-up d2 relative rounded-[20px] bg-[rgba(255,255,255,0.7)] border border-[rgba(2,6,23,0.06)] shadow-[0_10px_30px_rgba(2,6,23,0.08)] backdrop-blur-[6px] p-6 overflow-hidden"
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
              const mock = t.querySelector('.book-mock');
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
            <div
              className="BookSec-panel-inner grid gap-4 items-center"
              style={{ gridTemplateColumns: '0.9fr 1.1fr' }}
            >
              <div className="book-visual grid place-items-center p-2">
                <div
                  className="book-mock relative w-full max-w-[420px] aspect-[3/4] rounded-[14px] overflow-hidden bg-gradient-to-b from-[rgba(2,6,23,0.02)] to-transparent border border-[rgba(2,6,23,0.06)] shadow-[0_10px_26px_rgba(2,6,23,0.08)]"
                  aria-hidden="true"
                >
                  <Image
                    src={ta.image}
                    alt={ta.alt}
                    fill
                    sizes="(max-width: 1100px) 80vw, 420px"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="book-content flex flex-col items-start gap-3 p-1" lang="ta">
                <span className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full text-[12.5px] font-bold bg-[rgba(18,185,129,0.10)] border border-[rgba(18,185,129,0.22)] text-[#0c7a58] book-tag">
                  {ta.tag}
                </span>

                <h3 className="book-h3 m-0 text-[26px] leading-[1.22] font-extrabold text-[var(--ink)]">
                  {ta.title}
                </h3>

                <p className="book-desc text-[15.8px] leading-[1.85] text-[var(--muted)]">
                  {ta.description}
                </p>

                <a
                  className="inline-flex items-center gap-2 mt-5 px-4 py-3 rounded-[12px] font-extrabold text-white bg-gradient-to-r from-[#2f80ed] to-[#1f5fc9] shadow-[0_12px_28px_rgba(47,128,237,0.28)] self-center hover:from-[#1f5fc9] hover:to-[#174a9e] transition-transform duration-150"
                  href={ta.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ta.buttonText}: ${ta.title}`}
                 
                >
                  <span>{ta.buttonText}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 2 }}>
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <div className="book-link-wrap text-[13.8px] text-[#3a4a5f]">
                  {ta.ctaLabel}:{' '}
                  <a className="book-link font-extrabold text-[var(--primary)]" href={ta.bookLink} target="_blank" rel="noopener noreferrer">
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