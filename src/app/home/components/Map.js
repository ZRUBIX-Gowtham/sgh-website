'use client';

import React from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import map1 from '../../../../public/MapImages/map1.webp';
import map2 from '../../../../public/MapImages/map2.webp';

gsap.registerPlugin(ScrollTrigger);

function Map({ headingGradient }) {
  const containerRef = React.useRef(null);
  const galleryRef = React.useRef(null);
  const mapCardRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // Gallery reveal
      gsap.from('.map-gallery-card', {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
      });

      // Map card gentle pop
      if (mapCardRef.current) {
        gsap.from(mapCardRef.current, {
          scrollTrigger: {
            trigger: mapCardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 18,
          duration: 0.65,
          ease: 'power2.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scroll to section if hash is present in URL
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // fallback gradient if prop not provided
  const gradient =
    headingGradient ||
    'linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 80%)';

  return (
    <section
      className="map-wrap relative isolate overflow-hidden bg-transparent"
      ref={containerRef}
    >
      <div className="map-contact-section relative z-10 mx-auto max-w-[1300px] px-6 py-20 text-[#0b1324]">
        <div className="map-pills flex flex-wrap justify-center gap-2 mb-4">
          {/* Using the exact pill class you requested */}
          <div className="inline-flex items-center gap-2 px-3 py-2 font-bold rounded-full text-xs tracking-wide bg-[rgba(47,128,237,0.10)] text-[#1f4e9b] border border-[rgba(47,128,237,0.22)] self-start">
            Trusted Care
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 font-bold rounded-full text-xs tracking-wide bg-[rgba(47,128,237,0.10)] text-[#1f4e9b] border border-[rgba(47,128,237,0.22)] self-start">
            Easy to Reach
          </div>
        </div>

        <h2
          className="map-heading font-extrabold leading-[1.08] tracking-[-0.02em] self-stretch text-center"
          style={{
            backgroundImage: gradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            fontSize: 'clamp(28px, 4vw, 44px)',
            letterSpacing: '-0.02em',
          }}
        >
          Our Location
        </h2>

        <p className="map-subdesc mx-auto mt-2 mb-8 max-w-[760px] text-center text-[16px] leading-[1.7] text-[#475569]">
          Visit Salem Gopi Hospital at our centrally located campus. Find directions, call us,
          or email for assistance.
        </p>

        <div className="map-contact-info-container grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-7">
          {/* Left: Contact details + Gallery */}
          <div className="map-card bg-white border border-[rgba(15,23,42,0.08)] rounded-[16px] shadow-[0_8px_30px_rgba(2,6,23,0.08)]">
            <div className="map-contact-text p-7">
              <h3 className="text-[22px] font-extrabold text-[#274760] mb-4 flex items-center gap-2">
                Address
              </h3>

              <div className="map-contact-item flex items-center gap-4 mb-4">
                <div className="map-icon-circle inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(47,128,237,0.08)] border border-[rgba(47,128,237,0.18)] text-[#1f4e9b] flex-shrink-0">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="map-contact-details flex flex-col justify-center">
                  <p className="m-0 text-[1.05em] leading-[1.65] text-[#3a4a5f]">
                    23, B, Gopi Hospital, Ramakrishna Rd,
                    <br />
                    Hasthampatti, Salem, Tamil Nadu 636007
                  </p>
                </div>
              </div>

              <div className="map-contact-item flex items-center gap-4 mb-4">
                <div className="map-icon-circle inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(47,128,237,0.08)] border border-[rgba(47,128,237,0.18)] text-[#1f4e9b] flex-shrink-0">
                  <i className="fa-solid fa-mobile-alt" />
                </div>
                <div className="map-contact-details flex flex-col justify-center">
                  <a className="text-[1.05em] text-[#3a4a5f] hover:text-[#2f80ed] hover:underline" href="tel:+919894352229">
                    +91 9894352229
                  </a>
                </div>
              </div>

              <div className="map-contact-item flex items-center gap-4 mb-4">
                <div className="map-icon-circle inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(47,128,237,0.08)] border border-[rgba(47,128,237,0.18)] text-[#1f4e9b] flex-shrink-0">
                  <i className="fa-solid fa-phone" />
                </div>
                <div className="map-contact-details flex flex-col justify-center">
                  <a className="text-[1.05em] text-[#3a4a5f] hover:text-[#2f80ed] hover:underline" href="tel:+9104272666444">
                    0427 266 6444
                  </a>
                </div>
              </div>

              <div className="map-contact-item flex items-center gap-4 mb-6">
                <div className="map-icon-circle inline-flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(47,128,237,0.08)] border border-[rgba(47,128,237,0.18)] text-[#1f4e9b] flex-shrink-0">
                  <i className="fas fa-envelope" />
                </div>
                <div className="map-contact-details flex flex-col justify-center">
                  <a className="text-[1.05em] text-[#3a4a5f] hover:text-[#2f80ed] hover:underline" href="mailto:salemgopihosp@gmail.com">
                    salemgopihosp@gmail.com
                  </a>
                </div>
              </div>

              {/* Hospital Gallery */}
              <div className="map-gallery mt-2 grid grid-cols-2 gap-3" ref={galleryRef}>
                <div className="map-gallery-card relative w-full overflow-hidden rounded-[12px] bg-[#eef2ff] border border-[rgba(15,23,42,0.08)] shadow-[0_8px_24px_rgba(2,6,23,0.06)]">
                  <div className="relative w-full pb-[61.538%]"> {/* 13/8 aspect ratio */}
                    <Image
                      src={map1}
                      alt="Hospital exterior"
                      fill
                      className="map-img object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 560px"
                      priority
                    />
                  </div>
                </div>

                <div className="map-gallery-card relative w-full overflow-hidden rounded-[12px] bg-[#eef2ff] border border-[rgba(15,23,42,0.08)] shadow-[0_8px_24px_rgba(2,6,23,0.06)]">
                  <div className="relative w-full pb-[61.538%]">
                    <Image
                      src={map2}
                      alt="Hospital lobby"
                      fill
                      className="map-img object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 560px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div
            className="map-card map-route-finder-container bg-white border border-[rgba(15,23,42,0.08)] rounded-[16px] shadow-[0_10px_30px_rgba(2,6,23,0.06)] p-3"
            ref={mapCardRef}
          >
            <div className="map-map-container relative w-full overflow-hidden rounded-[16px] bg-[#eef4ff] border border-[rgba(15,23,42,0.08)]">
              <div className="map-map-iframe-wrapper absolute inset-0">
                <iframe
                  className="zpmap zp-pointer-events-no w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.283599411544!2d78.1487007745284!3d11.674302241992109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf04dc21a88e9%3A0xf80a03ee0550cac8!2sSalem%20Gopi%20Hospitals!5e0!3m2!1sen!2sin!4v1753262835091!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              {/* Control map container height with responsive classes */}
              <style jsx>{`
                .map-map-container { height: 420px; }
                @media (max-width: 768px) {
                  .map-map-container { height: 340px; }
                }
                @media (max-width: 480px) {
                  .map-map-container { height: 280px; }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Map;