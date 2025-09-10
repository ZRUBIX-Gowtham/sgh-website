'use client';

import React from 'react';
import Image from 'next/image';
import Insurance1 from '../../../../public/HomePageImages/Insurance1.webp';
import Insurance2 from '../../../../public/HomePageImages/Insurance2.webp';
import Insurance3 from '../../../../public/HomePageImages/Insurance3.webp';
import Insurance4 from '../../../../public/HomePageImages/Insurance4.webp';
import Insurance5 from '../../../../public/HomePageImages/Insurance5.webp';
import Insurance6 from '../../../../public/HomePageImages/Insurance6.webp';
import Insurance7 from '../../../../public/HomePageImages/Insurance7.webp';
import Insurance8 from '../../../../public/HomePageImages/Insurance8.webp';





function PartnerSection(props) {
  const {
    title = 'Our Insurance Partners',
    subtitle = 'We are empanelled with leading insurance providers and government schemes to make your care accessible and seamless.',
    pills = ['Trusted Network', 'Cashless Facility', 'Hassle-free Claims'],
    layout = 'grid', // 'grid' | 'scroll'
  } = props;

  const partnerImages = [
    Insurance1,Insurance2,Insurance3,Insurance4,Insurance5,Insurance6,Insurance7,,Insurance8
  ];

  return (
    <section className="partners-wrap" aria-labelledby="partners-heading">
      <style jsx>{`
        :root {
          --ink: #0b1324;
          --muted: #475569;
          --border: rgba(15, 23, 42, 0.08);
          --brand: #2f80ed;
          --chip-bg: rgba(47, 128, 237, 0.08);
          --chip-border: rgba(47, 128, 237, 0.18);
          --glow: 0 8px 30px rgba(2, 6, 23, 0.08);
        }

        .partners-wrap {
          position: relative;
          width: 100%;
          padding: 64px 20px;
          color: var(--ink);
        }

        .partners-container {
          margin: 0 auto;
          width: min(1200px, 92vw);
          text-align: center;
        }

        /* Pills */
        .partners-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 14px;
        }
        .partners-pill {
          letter-spacing: .02em;
    color: #1f4e9b;
    background: rgba(47, 128, 237, .1);
    border: 1px solid rgba(47, 128, 237, .22);
    border-radius: 999px;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    font-size: 12px;
    display: inline-flex
;
        }

        /* Heading + subheading */
        h2.partners-heading {
          margin: 0 0 10px;
          font-size: 36px;
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-align: center;
          background: linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 80%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        p.partners-subtitle {
          margin: 8px auto 28px;
          max-width: 760px;
          text-align: center;
          color: var(--muted);
          line-height: 1.7;
          font-size: 16px;
        }

        /* Card wrapper */
        .partners-card {
         
          border-radius: 16px;
          padding: 22px;
        }

        /* Grid layout */
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }
        .partner-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .partner-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(2, 6, 23, 0.06);
        }

        /* Scroll (carousel-like) layout */
        .partners-scroll {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 4px;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
        }
        .partners-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .partners-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 999px;
        }
        .partner-chip {
          flex: 0 0 auto;
          width: 180px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: #ffffff;
          scroll-snap-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .partner-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(2, 6, 23, 0.06);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .partners-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 820px) {
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          h2.partners-heading {
            font-size: 32px;
          }
        }
        @media (max-width: 560px) {
          .partners-wrap {
            padding: 48px 16px;
          }
          h2.partners-heading {
            font-size: 28px;
          }
          p.partners-subtitle {
            font-size: 15px;
          }
          .partners-card {
            padding: 16px;
          }
          .partners-grid {
            grid-template-columns: 1fr; /* single column on small phones */
          }
          .partner-chip {
            width: 160px;
            height: 110px;
          }
        }
      `}</style>

      <div className="partners-container">
        {/* Pills */}
        <div className="partners-pills" aria-label="Highlights">
          {pills.map((pill, idx) => (
            <span className="partners-pill" key={idx}>
              {pill}
            </span>
          ))}
        </div>

        {/* Heading + Subtitle */}
        <h2 id="partners-heading" className="partners-heading">
          {title}
        </h2>
        <p className="partners-subtitle">{subtitle}</p>

        {/* Content card */}
        <div className="partners-card" role="region" aria-label="Insurance partner logos">
          {layout === 'grid' ? (
            <div className="partners-grid">
              {partnerImages.map((src, index) => (
                <div className="partner-item" key={index} aria-label={`Partner ${index + 1}`}>
                  {/* Next/Image with fixed box to preserve aspect ratio and avoid layout shift */}
                  <div style={{ position: 'relative', width: '200px', height: '120px' }}>
                    <Image
                      src={src}
                      alt={`Insurance partner logo ${index + 1}`}
                      fill
                      sizes="(max-width: 560px) 70vw, (max-width: 1024px) 40vw, 200px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="partners-scroll" aria-label="Scrollable list of partners">
              {partnerImages.map((src, index) => (
                <div className="partner-chip" key={index} aria-label={`Partner ${index + 1}`}>
                  <div style={{ position: 'relative', width: '140px', height: '80px' }}>
                    <Image
                      src={src}
                      alt={`Insurance partner logo ${index + 1}`}
                      fill
                      sizes="140px"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PartnerSection;