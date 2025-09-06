'use client';

import React from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin (client-only)
if (typeof window !== 'undefined' && gsap.core && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const LightTokens = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
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
      font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji';
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
  const backgroundImage = 'https://market-resized.envatousercontent.com/photodune.net/EVA/TRX/e0/ec/fc/49/69/v1_E11/E1139QFU.jpeg?auto=format&q=94&mark=https%3A%2F%2Fassets.market-storefront.envato-static.com%2Fwatermarks%2Fphoto-260724.png&opacity=0.2&cf_fit=contain&w=590&h=963&s=9f1eb5636f70acddbaba8cf938efe4ac033f8a2ba11276f9ebf6fa89485505ce';
  const tickIcon = 'https://prohealth-react.vercel.app/images/icons/tick.svg';
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
    <section className="about-desktop-wrap">
      <LightTokens />
      <style jsx>{`
        .about-desktop-wrap {
          display: grid;
          grid-template-columns: 480px 1fr;
          gap: 36px;
          align-items: center;
          max-width: 1300px;
          margin: 48px auto;
          padding: 0 22px;
        }
        .media {
          position: relative;
          height: 570px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-1);
          background: linear-gradient(180deg, #ffffff, #f7fbff);
          border: 1px solid var(--border);
        }
        .media :global(img) {
          object-fit: cover;
          filter: saturate(1.02) contrast(0.98);
        }

        /* Experience pill (Desktop) */
        .experience-pill {
          position: absolute;
          right: 18px;
          bottom: 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-2);
          border-radius: 999px;
          padding: 10px 14px;
        }
        .experience-pill .icon {
          flex: 0 0 auto;
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          background: rgba(18, 185, 129, 0.08);
          border: 1px solid rgba(18, 185, 129, 0.18);
          border-radius: 999px;
        }
        .experience-pill .icon :global(img) {
          width: 18px !important;
          height: 18px !important;
        }
        .experience-pill .text {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.01em;
          color: #111827;
          white-space: nowrap;
        }

        .content { border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-1); padding: 28px; }
        .eyebrow {
          letter-spacing: .02em; color: #1f4e9b; background: rgba(47, 128, 237, .1);
          border: 1px solid rgba(47, 128, 237, .22);
          border-radius: 999px; align-items: center; gap: 8px; padding: 6px 10px; font-size: 12px; display: inline-flex;
        }
        h2 {
          margin: 12px 0 10px; font-size: 42px; line-height: 1.08; font-weight: 900; letter-spacing: -0.02em;
          background: linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .desc { color: var(--muted); line-height: 1.75; font-size: 16px; }
        .vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }
        .vm-card { background: linear-gradient(180deg, #ffffff44, #ffffff44); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-1); }
        .vm-card h3 { color: #1b4db3; font-size: 18px; margin: 0 0 8px; font-weight: 800; }
        .vm-card p { color: var(--muted-2); margin: 0; line-height: 1.7; font-size: 15px; }
        @media (max-width: 1024px) { .about-desktop-wrap { grid-template-columns: 1fr; } .media { height: 480px; } }
      `}</style>

      <div className="media fade-in hover-lift">
        <Image
          src={backgroundImage}
          alt="Hospital"
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          priority
          className="about-image"
        />

        {/* Horizontal icon + text pill */}
        <div className="experience-pill">
          <div className="icon">
            <Image src={tickIcon} alt="Quality" width={18} height={18} />
          </div>
          <div className="text">30+ Years Of Experience</div>
        </div>
      </div>

      <div className="content fade-in-up">
        <div className="eyebrow"> {aboutUsTitle} </div>
        <h2>{welcomeTitle}</h2>
        <p className="desc">{hospitalDescription}</p>

        <div className="vm-grid">
          <div className="vm-card hover-lift">
            <h3>{visionTitle}</h3>
            <p>{visionDescription}</p>
          </div>
          <div className="vm-card hover-lift">
            <h3>{missionTitle}</h3>
            <p>{missionDescription}</p>
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
  const backgroundImage = 'https://market-resized.envatousercontent.com/photodune.net/EVA/TRX/e0/ec/fc/49/69/v1_E11/E1139QFU.jpeg?auto=format&q=94&mark=https%3A%2F%2Fassets.market-storefront.envato-static.com%2Fwatermarks%2Fphoto-260724.png&opacity=0.2&cf_fit=contain&w=590&h=963&s=9f1eb5636f70acddbaba8cf938efe4ac033f8a2ba11276f9ebf6fa89485505ce';
  const tickIcon = 'https://prohealth-react.vercel.app/images/icons/tick.svg';
  const aboutUsTitle = 'About Us';
  const welcomeTitle = 'Welcome to Salem Gopi Hospital';
  const hospitalDescription = `Salem Gopi Memorial Hospital, established in 1981, is a leading multispecialty center in Salem with strengths in Diabetology, Nephrology, and Trauma care. We are committed to quality, empathy, and continuous improvement in patient care.`;

  return (
    <section className="about-mobile-wrap">
      <LightTokens />
      <style jsx>{`
        .about-mobile-wrap {
          display: grid; gap: 16px; max-width: 780px; margin: 24px auto 36px; padding: 0 16px;
        }
        .media {
          position: relative; height: 460px; width: 100%; border-radius: var(--radius-lg);
          overflow: hidden; box-shadow: var(--shadow-1); border: 1px solid var(--border);
          background: linear-gradient(180deg, #ffffff, #f7fbff);
        }
        .media :global(img) { object-fit: cover; filter: saturate(1.02) contrast(0.98); }

        /* Experience pill (Mobile) */
        .experience-pill {
          position: absolute;
          left: 14px;
          bottom: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-2);
          border-radius: 999px;
          padding: 8px 12px;
        }
        .experience-pill .icon {
          flex: 0 0 auto;
          width: 26px;
          height: 26px;
          display: grid;
          place-items: center;
          background: rgba(18, 185, 129, 0.08);
          border: 1px solid rgba(18, 185, 129, 0.18);
          border-radius: 999px;
        }
        .experience-pill .icon :global(img) {
          width: 16px !important;
          height: 16px !important;
        }
        .experience-pill .text {
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.01em;
          color: #111827;
          white-space: nowrap;
        }

        .content {
          text-align: center; background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg);
          box-shadow: var(--shadow-1); padding: 18px 16px 22px;
        }
        .eyebrow {
          letter-spacing: .02em; color: #1f4e9b; background: rgba(47, 128, 237, .1);
          border: 1px solid rgba(47, 128, 237, .22);
          border-radius: 999px; align-items: center; gap: 8px; padding: 6px 10px; font-size: 12px; display: inline-flex;
        }
        h2 {
          margin: 10px 0 8px; font-size: 28px; line-height: 1.15; font-weight: 900; letter-spacing: -0.01em;
          background: linear-gradient(92deg, #0b1324, #274760, #2f80ed); -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .desc { color: var(--muted); line-height: 1.7; font-size: 14.5px; }
        .vm-col { display: grid; gap: 12px; margin-top: 14px; text-align: left; }
        .vm-card { background: linear-gradient(180deg, #ffffff, #fbfdff); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 14px; box-shadow: var(--shadow-1); }
        .vm-card h3 { color: #1b4db3; font-size: 16px; margin: 0 0 6px; font-weight: 800; }
        .vm-card p { color: var(--muted-2); margin: 0; line-height: 1.6; font-size: 14px; }
      `}</style>

      <div className="media fade-in hover-lift">
        <Image
          src={backgroundImage}
          alt="Hospital"
          fill
          sizes="100vw"
          priority
          className="about-image"
        />

        {/* Horizontal icon + text pill */}
        <div className="experience-pill">
          <div className="icon">
            <Image src={tickIcon} alt="Quality" width={16} height={16} />
          </div>
          <div className="text">30+ Years Of Experience</div>
        </div>
      </div>

      <div className="content fade-in-up">
        <div className="eyebrow">{aboutUsTitle}</div>
        <h2>{welcomeTitle}</h2>
        <p className="desc">{hospitalDescription}</p>

        <div className="vm-col">
          <div className="vm-card hover-lift">
            <h3>Our Vision</h3>
            <p>To lead with compassionate care, modern technology, and a steadfast commitment to patient well-being.</p>
          </div>
          <div className="vm-card hover-lift">
            <h3>Our Mission</h3>
            <p>To deliver comprehensive, high-quality, and affordable care powered by excellence, innovation, and patient-first values.</p>
          </div>
        </div>
      </div>
    </section>
  );
};