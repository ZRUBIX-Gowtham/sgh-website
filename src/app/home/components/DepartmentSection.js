'use client';

import React from 'react';
import Image from 'next/image';

export const DepartmentSection = () => {
  const departmentsData = [
    {
      key: 'nephrology',
      icon: '💡',
      title: 'Nephrology',
      description:
        'Salem Gopi Hospital is recognized as one of the premier nephrology hospitals in Salem, providing specialized care for kidney diseases, chronic kidney disease (CKD), and dialysis support to patients throughout Salem and its surrounding areas.',
      link: '/departments/nephrology',
      images: [
        'https://static.wixstatic.com/media/690369_12d1b576e211467e8c59d684b9c88117~mv2.jpg/v1/fill/w_1000,h_600,al_c,q_85/Nephrology.jpg',
        'https://www.chaudharyhospital.in/wp-content/uploads/2021/02/Nephrology.png',
      ],
    },
    {
      key: 'urology',
      icon: '💡',
      title: 'Urology',
      description:
        'Our Urology department at Salem Gopi Hospital provides advanced care for kidney stones, urinary tract infections, bladder disorders, and prostate health, serving patients in Salem and surrounding districts.',
      link: '#/departments?name=Neurology',
      images: [
        'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
        'https://images.unsplash.com/photo-1579154204601-01588f351e67',
      ],
    },
    {
      key: 'dialysis',
      icon: '💡',
      title: 'Dialysis',
      description:
        'The Dialysis center at Salem Gopi Hospital in Salem provides safe, reliable, and comfortable treatment for patients with kidney failure, making us a trusted dialysis center in the local community.',
      link: '/departments/dialysis',
      images: [
        'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1200&auto=format&fit=crop',
      ],
    },
    {
      key: 'diabetes',
      icon: '💡',
      title: 'Diabetes Care',
      description:
        'Salem Gopi Hospital offers complete diabetes care in Salem with personalized plans for Type 1, Type 2, and lifestyle-related diabetes, helping local patients manage their condition and improve their quality of life.',
      link: '/departments/diabetes',
      images: [
        'https://mydoctorshub.com/wp-content/uploads/2024/11/vegetiarian-diabetes-diet-chart-food.webp',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      ],
    },
  ];

  const [activeKey, setActiveKey] = React.useState(departmentsData[0].key);

  const cardRefs = React.useRef({});
  const setCardRef = (key) => (el) => {
    cardRefs.current[key] = el;
  };

  const handleNavigation = (e, link) => {
    e.preventDefault();
    window.location.href = link;
    window.scrollTo(0, 0);
  };

  const handleSelectDept = (key) => {
    setActiveKey(key);
    const el = cardRefs.current[key];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.remove('animate-pop');
      el.offsetWidth;
      el.classList.add('animate-pop');
      setTimeout(() => el.classList.remove('animate-pop'), 600);
    }
    const gallery = document.querySelector('.dept-image-gallery');
    if (gallery) {
      gallery.classList.remove('fade-in');
      gallery.offsetWidth;
      gallery.classList.add('fade-in');
    }
  };

  const activeDept =
    departmentsData.find((d) => d.key === activeKey) || departmentsData[0];

  return (
    <>
      <style>{`
        :root {
          --ink: #0b1324;
          --muted: #475569;
          --border: rgba(15, 23, 42, 0.08);
          --cta-from: #2f80ed;
          --cta-to: #1f5fc9;
          --cta-hover-from: #1f5fc9;
          --cta-hover-to: #174a9e;
          --card-shadow: 0 10px 20px rgba(0,0,0,0.06);
          --card-shadow-hover: 0 20px 40px rgba(0,0,0,0.10);
        }

        .dept-wrap {
          background: transparent;
          color: var(--ink);
          padding: 72px 22px;
        }

        .dept-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 32px;
        }
        @media (max-width: 1024px) {
          .dept-content { grid-template-columns: 1fr; gap: 24px; }
        }

        /* LEFT */
        .dept-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-self: start;
          align-items: center;
        }

        .dept-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.02em;
          background: rgba(47,128,237,0.10);
          color: #1f4e9b;
          border: 1px solid rgba(47,128,237,0.22);
          width: fit-content;
          align-self: flex-start;
        }

        .dept-heading {
          margin: 6px 0 2px;
          font-size: 40px;
          line-height: 1.08;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(92deg, #0b1324 0%, #274760 00%, #2f80ed 70%);

          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          align-self: stretch;
          text-align: left;
        }
       
        /* ...keep your existing code... */

/* Replace your existing @media (max-width: 520px) block for these elements with this: */
@media (max-width: 520px) {
  .dept-heading {
    font-size: 32px;
    text-align: center;
  }
  .dept-badge {
    text-align: center;
    align-self: center; /* center the pill itself */
  }
  .dept-subtext {
    text-align: center;
    align-self: center; /* center the paragraph block */
  }
}

/* ...keep the rest of your styles... */

        .dept-subtext {
          margin: 0 0 8px;
          color: var(--muted);
          line-height: 1.7;
          font-size: 15.5px;
          max-width: 60ch;
          align-self: stretch;
          // text-align: left;
        }

        /* Names grid (2x2) – larger chips */
        .dept-name-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 16px;
          width: 100%;
        }
        @media (max-width: 520px) {
          .dept-name-list { grid-template-columns: 1fr; }
        }
        .dept-name-chip {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          gap: 12px;
          padding: 16px 16px;
          border-radius: 14px;
          font-size: 15px;
          border: 1px solid var(--border);
          color: #0f2b4f;
          background: #f2f7ff; /* icon bg visible on inactive */
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, border-color 0.18s ease;
          box-shadow: 0 6px 14px rgba(47,128,237,0.10);
        }
        .dept-name-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(47,128,237,0.22);
          background: #e9f1ff;
        }
        .dept-name-chip .chip-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-size: 22px;
          color: #2f80ed;
          background: #eaf3ff;
          border: 1px solid rgba(15,23,42,0.06);
        }
        .dept-name-chip .chip-text {
          font-weight: 800;
          letter-spacing: 0.01em;
          text-align : left;
        }
        .dept-name-chip.active {
          background: linear-gradient(135deg, #a8d8ff, #66b2ff);
          color: #fff;
          border-color: rgba(255,255,255,0.5);
          box-shadow: 0 14px 32px rgba(47,128,237,0.35);
        }
        .dept-name-chip.active .chip-icon {
          color: #1b3f7a;
          background: rgba(255,255,255,0.35);
          border-color: transparent;
        }

        /* Image gallery under the chips */
        .dept-image-gallery {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          width: 100%;
        }
        @media (max-width: 520px) {
          .dept-image-gallery { grid-template-columns: 1fr; }
        }
        .dept-image-tile {
          position: relative;
          width: 100%;
          padding-top: 62%;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid var(--border);
          box-shadow: 0 14px 34px rgba(0,0,0,0.08);
          background: linear-gradient(180deg, #f8fbff, #eef5ff);
        }
        .dept-image-tile::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(60% 60% at 20% 0%, rgba(255,255,255,0.55), transparent 60%);
          pointer-events: none;
        }
        .dept-image-tile img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.45s ease, filter 0.3s ease;
        }
        .dept-image-tile:hover img {
          transform: scale(1.05);
          filter: saturate(1.05);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in .dept-image-tile {
          animation: fadeIn 0.4s ease both;
        }

        /* RIGHT: cards grid */
        .dept-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 640px) {
          .dept-cards { grid-template-columns: 1fr; }
        }

        .dept-card {
          background-color: #fff;
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--card-shadow);
          border: 1px solid var(--border);
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: 12px;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
        }
        .dept-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--card-shadow-hover);
          background-color: #f8faff;
        }

        /* Active card only is blue */
        .dept-card.active {
          background: linear-gradient(135deg, #a8d8ff, #66b2ff);
          color: #fff;
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 20px 40px rgba(47,128,237,0.35);
        }

        /* Inactive card visuals */
        .dept-card:not(.active) .dept-icon {
          color: #2f80ed;
          background-color: #eaf3ff;
          border: 1px solid rgba(15, 23, 42, 0.06);
        }

        .dept-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          background-color: rgba(255,255,255,0.28);
          transition: transform 0.25s ease;
        }

        .dept-title {
          font-size: 20px;
          font-weight: 900;
          line-height: 1.2;
          margin: 2px 0 10px 0; /* added bigger gap under heading */
          letter-spacing: -0.01em;
        }
        .dept-card:not(.active) .dept-title { color: var(--ink); }

        .dept-desc {
          font-size: 14.5px;
          line-height: 1.65;
          opacity: 0.95;
          margin: 0;
        }
        .dept-card:not(.active) .dept-desc { color: #445468; }

        /* Arrow pill backgrounds */
        .dept-card:not(.active) .dept-arrow {
          background-color: #eff4ff;
          color: #2f80ed;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 6px 14px rgba(47,128,237,0.10);
        }
        .dept-card:not(.active) .dept-arrow:hover {
          background-color: #dce8ff;
          transform: translateX(6px);
        }

        .dept-arrow {
          justify-self: end;
          width: 46px;
          height: 46px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-size: 22px;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease;
          background-color: rgba(255,255,255,0.3);
          color: #fff;
        }
        .dept-card.active .dept-arrow {
          background-color: rgba(255,255,255,0.35);
        }
        .dept-card.active .dept-arrow:hover {
          background-color: rgba(255,255,255,0.5);
          transform: translateX(6px);
        }

        /* Card pop + shine */
        @keyframes popCard {
          0% { transform: scale(0.98); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        @keyframes shine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-pop { animation: popCard 0.45s ease-out; }
        .dept-card.active::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.25) 20%, transparent 40%);
          background-size: 200% 100%;
          animation: shine 0.9s ease-out 1;
          pointer-events: none;
        }

        /* Bottom CTA centered */
        .dept-cta-bottom {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 22px;
          padding: 13px 20px;
          border-radius: 12px;
          background: linear-gradient(90deg, var(--cta-from), var(--cta-to));
          color: #fff;
          font-weight: 800;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: transform 0.18s ease, filter 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 12px 28px rgba(47, 128, 237, 0.28);
          width: fit-content;
          align-self: center;
        }
        .dept-cta-bottom:hover {
          transform: translateY(-1px);
          background: linear-gradient(90deg, var(--cta-hover-from), var(--cta-hover-to));
          filter: saturate(1.02);
        }
      `}</style>

      <section className="dept-wrap" aria-labelledby="dept-heading">
        <div className="dept-content">
          {/* LEFT: Title, 2x2 buttons, Images, Bottom CTA */}
          <aside className="dept-left">
            <div className="dept-badge">Trusted Multispecialty Departments</div>
            <h2 id="dept-heading" className="dept-heading">Departments</h2>
            <p className="dept-subtext">
              Explore our core specialties and programs. Each department is led by expert physicians and supported by
              modern facilities to provide comprehensive, compassionate care.
            </p>

            {/* 2x2 Larger buttons */}
            <div className="dept-name-list" role="tablist" aria-label="Departments quick select">
              {departmentsData.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  role="tab"
                  aria-selected={activeKey === d.key}
                  className={`dept-name-chip ${activeKey === d.key ? 'active' : ''}`}
                  onClick={() => handleSelectDept(d.key)}
                >
                  <span className="chip-icon">{d.icon}</span>
                  <span className="chip-text">{d.title}</span>
                </button>
              ))}
            </div>

            {/* Two images below buttons */}
            <div className="dept-image-gallery fade-in" aria-live="polite">
              {activeDept.images.map((src, idx) => (
                <div key={idx} className="dept-image-tile">
                  <Image
                    src={src}
                    alt={`${activeDept.title} ${idx + 1}`}
                    fill
                    sizes="(max-width: 520px) 100vw, 50vw"
                    priority={idx === 0}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom CTA centered */}
            <a
              href="/departments"
              className="dept-cta-bottom"
              aria-label="View all departments"
              onClick={(e) => handleNavigation(e, '/departments')}
            >
              Explore All Departments →
            </a>
          </aside>

          {/* RIGHT: Cards grid */}
          <div className="dept-cards" role="list">
            {departmentsData.map((d) => {
              const isActive = activeKey === d.key;
              return (
                <div
                  key={d.key}
                  ref={setCardRef(d.key)}
                  className={`dept-card ${isActive ? 'active' : ''}`}
                  role="listitem"
                >
                  <div className="dept-icon">{d.icon}</div>
                  <div>
                    <h3 className="dept-title">{d.title}</h3>
                    <p className="dept-desc">{d.description}</p>
                  </div>
                  <a
                    href={d.link}
                    className="dept-arrow"
                    aria-label={`Learn more about ${d.title}`}
                    onClick={(e) => handleNavigation(e, d.link)}
                  >
                    →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};