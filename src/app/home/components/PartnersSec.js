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
    Insurance1,
    Insurance2,
    Insurance3,
    Insurance4,
    Insurance5,
    Insurance6,
    Insurance7,
    Insurance8,
  ];

  return (
    <section className="w-full text-[#0b1324] py-16 px-5" aria-labelledby="partners-heading">
      <div className="max-w-[1200px] w-[92vw] mx-auto text-center">
        {/* Pills */}
        <div className="flex gap-2 flex-wrap justify-center mb-3" aria-label="Highlights">
          {pills.map((pill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-2 font-bold rounded-full text-xs tracking-wide bg-[rgba(47,128,237,0.10)] text-[#1f4e9b] border border-[rgba(47,128,237,0.22)] self-start"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Heading */}
        <h2
          id="partners-heading"
          className="font-extrabold leading-[1.08] tracking-[-0.02em] self-stretch text-center mx-auto"
          style={{
            backgroundImage: 'linear-gradient(92deg, #0b1324 0%, #274760 00%, #2f80ed 80%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            fontSize: 'clamp(28px, 4vw, 44px)',
            letterSpacing: '-0.02em',
            maxWidth: 'min(1200px, 92vw)',
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p className="mt-2 mb-7 max-w-[760px] mx-auto text-center text-[#475569] leading-7 text-base">
          {subtitle}
        </p>

        {/* Content card */}
        <div
          className="bg-white rounded-2xl p-6"
          role="region"
          aria-label="Insurance partner logos"
        >
          {layout === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[18px]">
              {partnerImages.map((src, index) => (
                <div
                  className="flex items-center justify-center p-4 border rounded-lg bg-white transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:shadow-[0_10px_20px_rgba(2,6,23,0.06)] border-[rgba(15,23,42,0.08)]"
                  key={index}
                  aria-label={`Partner ${index + 1}`}
                >
                  <div className="relative w-[200px] h-[120px]">
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
            <div
              className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-thin"
              aria-label="Scrollable list of partners"
            >
              {partnerImages.map((src, index) => (
                <div
                  className="flex-shrink-0 w-[180px] h-[120px] flex items-center justify-center border rounded-lg bg-white transition-transform duration-200 ease-in-out hover:-translate-y-[2px] hover:shadow-[0_10px_20px_rgba(2,6,23,0.06)] border-[rgba(15,23,42,0.08)] snap-center"
                  key={index}
                  aria-label={`Partner ${index + 1}`}
                >
                  <div className="relative w-[140px] h-[80px]">
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