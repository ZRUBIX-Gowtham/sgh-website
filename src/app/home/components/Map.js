'use client';

import React from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Map({ headingGradient }) { // Changed prop name to headingGradient
  const containerRef = React.useRef(null);
  const galleryRef = React.useRef(null);
  const mapCardRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

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

  const cssStyles = `
    :root {
      --ink: #0b1324;
      --muted: #475569;
      --bg: #ffffff;
      --surface: #ffffff;
      --border: rgba(15, 23, 42, 0.08);
      --brand-1: #2f80ed;
      --brand-2: #12b981;
      --brand-3: #ef5da8;
      --glow: 0 8px 30px rgba(2, 6, 23, 0.08);
      --map-heading-gradient: ${headingGradient || 'linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 80%)'}; /* Default gradient */
    }

    .map-wrap {
      position: relative;
      overflow: clip;
      background: transparent; /* removed section radial gradient and design layers */
      isolation: isolate;
    }

    /* Removed: .map-bg, .map-noise, .map-radial, .map-lines */

    .map-contact-section {
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: 1300px;
      margin: 0 auto;
      padding: 84px 22px;
      color: var(--ink);
      z-index: 1;
    }

 .map-heading {
  margin: 0 0 8px;
  font-size: 40px;
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-align: center;
  background: var(--map-heading-gradient); /* Using the CSS variable here */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
@media (max-width: 768px) {
  .map-heading { font-size: 34px; }
}
@media (max-width: 480px) {
  .map-heading { font-size: 30px; }
}


    .map-subdesc {
      margin: 8px auto 30px;
      max-width: 760px;
      text-align: center;
      color: var(--muted);
      line-height: 1.7;
      font-size: 16px;
    }

    .map-contact-info-container {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 28px;
    }
    @media (max-width: 1000px) {
      .map-contact-info-container {
        grid-template-columns: 1fr;
        gap: 22px;
      }
    }

    .map-card {
      background: #ffffff; /* solid */
      border: 1px solid var(--border);
      box-shadow: var(--glow);
      backdrop-filter: none;
      border-radius: 16px;
    }

    .map-contact-text {
      padding: 28px;
    }
    .map-contact-text h3 {
      font-size: 22px;
      color: #274760;
      margin: 0 0 16px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 10px;
      letter-spacing: -0.01em;
    }
    .map-contact-text p {
      font-size: 1.05em;
      line-height: 1.65;
      color: #46566c;
      margin: 0;
    }

    .map-contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      gap: 14px;
    }

    .map-icon-circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 999px;
      background: rgba(47, 128, 237, 0.08);
      border: 1px solid rgba(47, 128, 237, 0.18);
      color: #1f4e9b;
      flex-shrink: 0;
    }
    .map-icon-circle i {
      font-size: 1.05rem;
      line-height: 1;
    }

    .map-contact-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .map-contact-details a,
    .map-contact-details p {
      margin: 0;
      font-size: 1.05em;
      color: #3a4a5f;
      text-decoration: none;
      word-break: break-word;
    }
    .map-contact-details a:hover {
      color: #2f80ed;
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .map-route-finder-container {
      padding: 14px;
    }

    .map-map-container {
      position: relative;
      width: 100%;
      height: 420px;
      overflow: hidden;
      border-radius: 16px;
      background: #eef4ff;
      border: 1px solid var(--border);
      box-shadow: 0 10px 30px rgba(2, 6, 23, 0.06);
    }
    .map-map-iframe-wrapper { position: absolute; inset: 0; }
    .map-map-container iframe { width: 100%; height: 100%; border: 0; }

    .map-pills {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 18px;
    }
    .map-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 12px;
      letter-spacing: 0.02em;
      background: rgba(47, 128, 237, 0.08);
      color: #1f4e9b;
      border: 1px solid rgba(47, 128, 237, 0.18);
    }

    /* Gallery */
    .map-gallery {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-top: 18px;
    }
    .map-gallery-card {
      position: relative;
      width: 100%;
      aspect-ratio: 13 / 8;
      overflow: hidden;
      border-radius: 12px;
      background: #eef2ff;
      border: 1px solid var(--border);
      box-shadow: 0 8px 24px rgba(2, 6, 23, 0.06);
    }
    :global(.map-img) { object-fit: cover; }

    @media (max-width: 640px) {
      .map-gallery { grid-template-columns: 1fr; }
    }

    @media (max-width: 768px) {
      .map-heading { font-size: 34px; }
      .map-map-container { height: 340px; }
    }
    @media (max-width: 480px) {
      .map-heading { font-size: 30px; }
      .map-contact-section { padding: 64px 16px; }
      .map-map-container { height: 280px; }
    }
  `;

  return (
    <>
      <style>{cssStyles}</style>
      <section className="map-wrap" ref={containerRef}>
        {/* Removed decorative background layers */}

        <div className="map-contact-section">
          <div className="map-pills">
            <span className="map-pill">Trusted Care</span>
            <span className="map-pill">Easy to Reach</span>
          </div>

          <h2 className="map-heading">Our Location</h2> {/* Removed inline style */}
          <p className="map-subdesc">
            Visit Salem Gopi Hospital at our centrally located campus. Find directions, call us, or email for assistance.
          </p>

          <div className="map-contact-info-container">
            {/* Left: Contact details + Gallery */}
            <div className="map-card">
              <div className="map-contact-text">
                <h3>Address</h3>

                <div className="map-contact-item">
                  <div className="map-icon-circle">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div className="map-contact-details">
                    <p>
                      23, B, Gopi Hospital, Ramakrishna Rd,<br />
                      Hasthampatti, Salem, Tamil Nadu 636007
                    </p>
                  </div>
                </div>

                <div className="map-contact-item">
                  <div className="map-icon-circle">
                    <i className="fa-solid fa-mobile-alt" />
                  </div>
                  <div className="map-contact-details">
                    <a href="tel:+919894352229">+91 9894352229</a>
                  </div>
                </div>

                <div className="map-contact-item">
                  <div className="map-icon-circle">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <div className="map-contact-details">
                    <a href="tel:+9104272666444">0427 266 6444</a>
                  </div>
                </div>

                <div className="map-contact-item">
                  <div className="map-icon-circle">
                    <i className="fas fa-envelope" />
                  </div>
                  <div className="map-contact-details">
                    <a href="mailto:salemgopihosp@gmail.com">salemgopihosp@gmail.com</a>
                  </div>
                </div>

                {/* Hospital Gallery */}
                <div className="map-gallery" ref={galleryRef}>
                  <div className="map-gallery-card">
                    <Image
                      src="https://content3.jdmagicbox.com/v2/comp/salem/x9/0427px427.x427.120519075750.g5x9/catalogue/salem-gopi-hospital-pvt-ltd-hastampatti-salem-hospitals-n1siyoksfn.jpg"
                      alt="Hospital exterior"
                      fill
                      className="map-img"
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 560px"
                      priority
                    />
                  </div>
                  <div className="map-gallery-card">
                    <Image
                      src="https://content3.jdmagicbox.com/v2/comp/salem/x9/0427px427.x427.120519075750.g5x9/catalogue/salem-gopi-hospital-pvt-ltd-hastampatti-salem-hospitals-205ztw5pxr.jpg"
                      alt="Hospital lobby"
                      fill
                      className="map-img"
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 560px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className="map-card map-route-finder-container" ref={mapCardRef}>
              <div className="map-map-container">
                <div className="map-map-iframe-wrapper">
                  <iframe
                    className="zpmap zp-pointer-events-no"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.283599411544!2d78.1487007745284!3d11.674302241992109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf04dc21a88e9%3A0xf80a03ee0550cac8!2sSalem%20Gopi%20Hospitals!5e0!3m2!1sen!2sin!4v1753262835091!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Map;