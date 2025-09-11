'use client';

import React from 'react';
import Image from 'next/image';
import nephrology1 from '../../../../public/HomePageImages/Nephrology-1.webp';
import nephrology2 from '../../../../public/HomePageImages/Nephrology-2.webp';
import urology1 from '../../../../public/HomePageImages/Urology-1.webp';
import urology2 from '../../../../public/HomePageImages/Urology-2.webp';
import dialysis1 from '../../../../public/HomePageImages/Dialysis-1.webp';
import dialysis2 from '../../../../public/HomePageImages/Dialysis-2.webp';
import diabetes1 from '../../../../public/HomePageImages/Diabetes-1.webp';
import diabetes2 from '../../../../public/HomePageImages/Diabetes-2.webp';

export const DepartmentSection = () => {
  const departmentsData = [
    {
      key: 'nephrology',
      icon: '💡',
      title: 'Nephrology',
      description:
        'Salem Gopi Hospital is recognized as one of the premier nephrology hospitals in Salem, providing specialized care for kidney diseases, chronic kidney disease (CKD), and dialysis support to patients throughout Salem and its surrounding areas.',
      link: '/departments/nephrology',
      images: [nephrology1, nephrology2],
    },
    {
      key: 'urology',
      icon: '💡',
      title: 'Urology',
      description:
        'Our Urology department at Salem Gopi Hospital provides advanced care for kidney stones, urinary tract infections, bladder disorders, and prostate health, serving patients in Salem and surrounding districts.',
      link: '/departments?name=Neurology',
      images: [urology1, urology2],
    },
    {
      key: 'dialysis',
      icon: '💡',
      title: 'Dialysis',
      description:
        'The Dialysis center at Salem Gopi Hospital in Salem provides safe, reliable, and comfortable treatment for patients with kidney failure, making us a trusted dialysis center in the local community.',
      link: '/departments/dialysis',
      images: [dialysis1, dialysis2],
    },
    {
      key: 'diabetes',
      icon: '💡',
      title: 'Diabetes Care',
      description:
        'Salem Gopi Hospital offers complete diabetes care in Salem with personalized plans for Type 1, Type 2, and lifestyle-related diabetes, helping local patients manage their condition and improve their quality of life.',
      link: '/departments/diabetes',
      images: [diabetes1, diabetes2],
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
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetWidth;
      el.classList.add('animate-pop');
      setTimeout(() => el.classList.remove('animate-pop'), 600);
    }
    const gallery = document.querySelector('.dept-image-gallery');
    if (gallery) {
      gallery.classList.remove('fade-in');
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      gallery.offsetWidth;
      gallery.classList.add('fade-in');
    }
  };

  const activeDept =
    departmentsData.find((d) => d.key === activeKey) || departmentsData[0];

  return (
    <>
      {/* Minimal CSS for layout fractions and animations (safe) */}
      <style jsx>{`
        .dept-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 32px;
        }
        @media (max-width: 1024px) {
          .dept-content {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @keyframes popCard {
          0% {
            transform: scale(0.98);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pop {
          animation: popCard 0.45s ease-out;
        }

        .fade-in .dept-image-tile {
          animation: fadeIn 0.4s ease both;
        }

        /* pseudo-element shine for active card */
        .dept-card.active::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.25) 20%,
            transparent 40%
          );
          background-size: 200% 100%;
          animation: shine 0.9s ease-out 1;
          pointer-events: none;
        }
      `}</style>

      <section
        className="bg-transparent text-[#0b1324] py-[72px] px-[22px]"
        aria-labelledby="dept-heading"
      >
        <div className="dept-content">
          {/* LEFT */}
          <aside className="flex flex-col gap-3.5 self-start items-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 font-bold rounded-full text-xs tracking-wide bg-[rgba(47,128,237,0.10)] text-[#1f4e9b] border border-[rgba(47,128,237,0.22)] self-start">
              Trusted Multispecialty Departments
            </div>

            {/* H2 with gradient text only (no wrapper background) */}
            <h2
              id="dept-heading"
              className="font-extrabold leading-[1.08] tracking-[-0.02em] self-stretch text-left"
              style={{
                backgroundImage:
                  'linear-gradient(92deg, #0b1324 0%, #274760 00%, #2f80ed 80%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                fontSize: 'clamp(28px, 4vw, 44px)',
                letterSpacing: '-0.02em',
              }}
            >
              Departments
            </h2>

            <p className="mb-2 text-[15.5px] leading-[1.7] text-[#475569] max-w-[60ch] self-stretch">
              Explore our core specialties and programs. Each department is led by expert physicians and supported by
              modern facilities to provide comprehensive, compassionate care.
            </p>

            {/* 2x2 chips */}
            <div className="grid grid-cols-2 gap-3.5 mt-4 w-full sm:grid-cols-2" role="tablist" aria-label="Departments quick select">
              {departmentsData.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  role="tab"
                  aria-selected={activeKey === d.key}
                  className={`grid grid-cols-[auto_1fr] items-center gap-3 p-4 rounded-[14px] text-sm border border-[rgba(15,23,42,0.08)] text-[#0f2b4f] bg-[#f2f7ff] cursor-pointer transition-transform duration-150 shadow-[0_6px_14px_rgba(47,128,237,0.10)]
                    hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(47,128,237,0.22)] hover:bg-[#e9f1ff] text-left
                    ${activeKey === d.key ? 'bg-gradient-to-br from-[#a8d8ff] to-[#66b2ff] text-white border-transparent shadow-[0_14px_32px_rgba(47,128,237,0.35)]' : ''}`}
                  onClick={() => handleSelectDept(d.key)}
                >
                  <span className={`w-11 h-11 rounded-[12px] grid place-items-center text-[22px] ${activeKey === d.key ? 'text-[#1b3f7a] bg-[rgba(255,255,255,0.35)]' : 'text-[#2f80ed] bg-[#eaf3ff] border border-[rgba(15,23,42,0.06)]'}`}>
                    {d.icon}
                  </span>
                  <span className="font-extrabold text-[15px]">{d.title}</span>
                </button>
              ))}
            </div>

            {/* Image gallery */}
            <div className="dept-image-gallery fade-in mt-4 grid grid-cols-2 gap-3.5 w-full sm:grid-cols-2" aria-live="polite">
              {activeDept.images.map((src, idx) => (
                <div
                  key={idx}
                  className="dept-image-tile relative w-full pt-[62%] overflow-hidden rounded-[16px] border border-[rgba(15,23,42,0.08)] shadow-[0_14px_34px_rgba(0,0,0,0.08)] bg-gradient-to-b from-[#f8fbff] to-[#eef5ff]"
                >
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

            {/* CTA */}
            <a
              href="/departments"
              className="inline-flex items-center gap-2 mt-5 px-4 py-3 rounded-[12px] font-extrabold text-white bg-gradient-to-r from-[#2f80ed] to-[#1f5fc9] shadow-[0_12px_28px_rgba(47,128,237,0.28)] self-center hover:from-[#1f5fc9] hover:to-[#174a9e] transition-transform duration-150"
              aria-label="View all departments"
              onClick={(e) => handleNavigation(e, '/departments')}
            >
              Explore All Departments →
            </a>
          </aside>

          {/* RIGHT: cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2" role="list">
            {departmentsData.map((d) => {
              const isActive = activeKey === d.key;
              return (
                <div
                  key={d.key}
                  ref={setCardRef(d.key)}
                  role="listitem"
                  className={`dept-card relative overflow-hidden rounded-[16px] p-5 grid grid-rows-[auto_1fr_auto] gap-3 border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.06)] transition-transform duration-200 ${isActive ? 'bg-gradient-to-br from-[#a8d8ff] to-[#66b2ff] text-white border-transparent shadow-[0_20px_40px_rgba(47,128,237,0.35)]' : 'hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.10)] hover:bg-[#f8faff]'}`}
                >
                  <div className={`dept-icon w-[52px] h-[52px] rounded-[12px] grid place-items-center text-[26px] font-bold transition-transform duration-200 ${isActive ? 'text-white bg-[rgba(255,255,255,0.28)]' : 'text-[#2f80ed] bg-[#eaf3ff] border border-[rgba(15,23,42,0.06)]'}`}>
                    {d.icon}
                  </div>

                  <div>
                    <h3 className={`dept-title text-[20px] font-extrabold leading-[1.2] tracking-[-0.01em] mb-2 ${!isActive ? 'text-[#0b1324]' : ''}`}>
                      {d.title}
                    </h3>
                    <p className={`dept-desc text-[14.5px] leading-[1.65] ${!isActive ? 'text-[#445468]' : 'text-white'}`}>
                      {d.description}
                    </p>
                  </div>

                  <a
                    href={d.link}
                    className={`dept-arrow justify-self-end w-[46px] h-[46px] rounded-[14px] grid place-items-center text-[22px] transition-transform duration-200 ${!isActive ? 'bg-[#eff4ff] text-[#2f80ed] border border-[rgba(15,23,42,0.08)] shadow-[0_6px_14px_rgba(47,128,237,0.10)] hover:bg-[#dce8ff] hover:translate-x-1.5' : 'bg-[rgba(255,255,255,0.35)] text-white hover:bg-[rgba(255,255,255,0.5)] hover:translate-x-1.5'}`}
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