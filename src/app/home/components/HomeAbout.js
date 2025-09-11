'use client';

import React from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Welcomeabout from '../../../../public/HomePageImages/Welcomeabout.webp';
import tickicon from '../../../../public/HomePageImages/tickicon.svg';

// Register plugin (client-only)
if (typeof window !== 'undefined' && gsap.core && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const LightTokens = () => (
  <style jsx global>{`
    :root {
      --ink: #0b1324;
      --muted: #4b5563;
      --muted-2: #6b7280;
      --bg: #f8fbff;
      --surface: #ffffff;
      --border: rgba(15, 23, 42, 0.08);
      --ring: 0 0 0 2px rgba(47, 128, 237, 0.28);
      --brand-1: #2f80ed;
      --brand-2: #12b981;
      --brand-3: #ef5da8;
      --shadow-1: 0 6px 28px rgba(2, 6, 23, 0.06);
      --shadow-2: 0 10px 34px rgba(2, 6, 23, 0.08);
      --radius-lg: 18px;
      --radius-md: 12px;
      --radius-sm: 10px;
    }
    html, body {
      color: var(--ink);
      background: #fff;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .fade-in-up { opacity: 0; transform: translateY(14px); animation: fadeInUp 640ms ease forwards; }
    .fade-in { opacity: 0; animation: fadeIn 520ms ease forwards; }
    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { to { opacity: 1; } }
    .hover-lift { transition: transform .2s ease, box-shadow .2s ease, filter .2s ease, background-color .2s ease; }
    .hover-lift:hover { transform: translateY(-2px); box-shadow: var(--shadow-2); filter: saturate(1.02); }
  `}</style>
);

/* -------------------------------------------
   About (Desktop)
-------------------------------------------- */
export const HomeAboutDesktop = () => {
  const backgroundImage = Welcomeabout;
  const tickIcon = tickicon;
  const aboutUsTitle = 'About Us';
  const welcomeTitle = 'Welcome to Salem Gopi Hospital';
  const hospitalDescription = `Salem Gopi Memorial Hospital was inaugurated on 06-12-1981 in fond remembrance of the beloved brother of Dr. K. Janakiraman, the Chairman. We are one of Salem’s leading multispecialty hospitals, specializing in Diabetology, Nephrology, and Trauma care for over 30 years. We were the first multispecialty hospital in Salem to receive ISO 9001:2001 certification. Our team includes dedicated doctors, dieticians, patient educators, nurses, physiotherapists, and trained professionals committed to competent and compassionate patient care.`;

  const visionTitle = 'Our Vision';
  const visionDescription =
    'To be the leading healthcare provider in the region, recognized for compassionate care, advanced medical technology, and commitment to patient well-being.';
  const missionTitle = 'Our Mission';
  const missionDescription =
    'To provide comprehensive, high-quality, and affordable healthcare services to our community, fostering a culture of excellence, innovation, and patient-centered care.';

  return (
    <section className="w-full text-[var(--ink)] py-12 px-5">
      <LightTokens />

      <div
        className="grid gap-9 items-center max-w-[1300px] mx-auto my-12"
        // mobile: single column; lg+: fixed 480px column then flexible
        // grid-cols-1 for mobile, lg:grid-cols-[480px_1fr] for desktop layout
        style={{ gridTemplateColumns: undefined }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-9 items-center max-w-[1300px] w-full mx-auto">
          {/* Media (left column on desktop) */}
          <div
            className="relative rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-b from-white to-[#f7fbff] border hover-lift fade-in"
            style={{
              height: '520px',
              boxShadow: 'var(--shadow-1)',
              border: '1px solid var(--border)',
            }}
          >
            <Image
              src={backgroundImage}
              alt="Hospital"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
              className="object-cover saturate-[1.02] contrast-[0.98]"
            />

            {/* Experience pill (Desktop) */}
            <div
              className="inline-flex items-center gap-2 bg-white rounded-full p-3"
              style={{
                position: 'absolute',
                right: '18px',
                bottom: '18px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-2)',
              }}
              aria-hidden={false}
            >
              <div
                className="grid place-items-center rounded-full"
                style={{
                  width: '28px',
                  height: '28px',
                  background: 'rgba(18, 185, 129, 0.08)',
                  border: '1px solid rgba(18, 185, 129, 0.18)',
                }}
              >
                <Image src={tickIcon} alt="Quality" width={18} height={18} />
              </div>
              <div className="text-[13px] font-extrabold tracking-[0.01em] text-[#111827] whitespace-nowrap">
                30+ Years Of Experience
              </div>
            </div>
          </div>

          {/* Content (right column on desktop) */}
          <div
            className="fade-in-up"
            style={{
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-1)',
              padding: '28px',
              background: 'white',
            }}
          >
            {/* Eyebrow / pill - using the exact class you provided */}
            <div className="inline-flex items-center gap-2 px-3 py-2 font-bold rounded-full text-xs tracking-wide bg-[rgba(47,128,237,0.10)] text-[#1f4e9b] border border-[rgba(47,128,237,0.22)] self-start">
              {aboutUsTitle}
            </div>

            {/* Heading - using exact class + inline gradient style you requested */}
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
              {welcomeTitle}
            </h2>

            <p className="mt-3 text-[var(--muted)] leading-[1.75] text-[16px]">
              {hospitalDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div
                className="hover-lift"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.27), rgba(255,255,255,0.27))',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px',
                  boxShadow: 'var(--shadow-1)',
                }}
              >
                <h3 className="text-[#1b4db3] text-[18px] font-extrabold mb-2">{visionTitle}</h3>
                <p className="text-[var(--muted-2)] text-[15px] leading-[1.7] m-0">{visionDescription}</p>
              </div>

              <div
                className="hover-lift"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.27), rgba(255,255,255,0.27))',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px',
                  boxShadow: 'var(--shadow-1)',
                }}
              >
                <h3 className="text-[#1b4db3] text-[18px] font-extrabold mb-2">{missionTitle}</h3>
                <p className="text-[var(--muted-2)] text-[15px] leading-[1.7] m-0">{missionDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------
   About (Mobile)
-------------------------------------------- */
export const HomeAboutMobile = () => {
  const backgroundImage = Welcomeabout;
  const tickIcon = tickicon;
  const aboutUsTitle = 'About Us';
  const welcomeTitle = 'Welcome to Salem Gopi Hospital';
  const hospitalDescription = `Salem Gopi Memorial Hospital, established in 1981, is a leading multispecialty center in Salem with strengths in Diabetology, Nephrology, and Trauma care. We are committed to quality, empathy, and continuous improvement in patient care.`;

  return (
    <section className="w-full">
      <LightTokens />

      <div className="max-w-[780px] mx-auto my-6 px-4 grid gap-4">
        <div
          className="relative rounded-[var(--radius-lg)] overflow-hidden bg-gradient-to-b from-white to-[#f7fbff] border hover-lift fade-in"
          style={{
            height: '460px',
            boxShadow: 'var(--shadow-1)',
            border: '1px solid var(--border)',
          }}
        >
          <Image
            src={backgroundImage}
            alt="Hospital"
            fill
            sizes="100vw"
            priority
            className="object-cover saturate-[1.02] contrast-[0.98]"
          />

          {/* Experience pill (Mobile) positioned left bottom */}
          <div
            className="inline-flex items-center gap-2 bg-white rounded-full p-2.5"
            style={{
              position: 'absolute',
              left: '14px',
              bottom: '14px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-2)',
            }}
          >
            <div
              className="grid place-items-center rounded-full"
              style={{
                width: '26px',
                height: '26px',
                background: 'rgba(18, 185, 129, 0.08)',
                border: '1px solid rgba(18, 185, 129, 0.18)',
              }}
            >
              <Image src={tickIcon} alt="Quality" width={16} height={16} />
            </div>
            <div className="text-[12.5px] font-extrabold tracking-[0.01em] text-[#111827] whitespace-nowrap">
              30+ Years Of Experience
            </div>
          </div>
        </div>

        <div
          className="fade-in-up"
          style={{
            textAlign: 'center',
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-1)',
            padding: '18px 16px 22px',
          }}
        >
          {/* Eyebrow / pill - using the exact class you provided */}
          <div className="inline-flex items-center gap-2 px-3 py-2 font-bold rounded-full text-xs tracking-wide bg-[rgba(47,128,237,0.10)] text-[#1f4e9b] border border-[rgba(47,128,237,0.22)] self-start">
            {aboutUsTitle}
          </div>

          {/* Heading - using exact class + inline gradient style you requested */}
          <h2
            className="font-extrabold leading-[1.08] tracking-[-0.02em] self-stretch text-left mt-3 mx-auto"
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
            {welcomeTitle}
          </h2>

          <p className="mt-2 text-[var(--muted)] leading-[1.7] text-[14.5px]">
            {hospitalDescription}
          </p>

          <div className="grid gap-3 mt-3 text-left">
            <div
              className="hover-lift"
              style={{
                background: 'linear-gradient(180deg, #ffffff, #fbfdff)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                boxShadow: 'var(--shadow-1)',
              }}
            >
              <h3 className="text-[#1b4db3] text-[16px] font-extrabold mb-1">Our Vision</h3>
              <p className="text-[var(--muted-2)] text-[14px] leading-[1.6] m-0">
                To lead with compassionate care, modern technology, and a steadfast commitment to patient well-being.
              </p>
            </div>

            <div
              className="hover-lift"
              style={{
                background: 'linear-gradient(180deg, #ffffff, #fbfdff)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                boxShadow: 'var(--shadow-1)',
              }}
            >
              <h3 className="text-[#1b4db3] text-[16px] font-extrabold mb-1">Our Mission</h3>
              <p className="text-[var(--muted-2)] text-[14px] leading-[1.6] m-0">
                To deliver comprehensive, high-quality, and affordable care powered by excellence, innovation, and patient-first values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};