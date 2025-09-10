'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import doctorimage from '../../../../public/HomePageImages/HeroSectionImage.webp';
import hearticon from '../../../../public/HomePageImages/hearticon.webp';

export function HeroSection() {
  const heroData = {
    heroContent: {
      title: 'Comprehensive Kidney & Healthcare Services in Salem',
      description:
        'Salem Gopi Hospital combines expertise in kidney care, dialysis, and urology with a multiplicity of advanced medical services, delivering compassionate care for every stage of health.',
      ctaPrimary: { label: 'Book an Appointment', action: 'openModal' },
      ctaSecondary: { label: 'Call +91 9894352229', href: 'tel:+91 9894352229' },
    },
    heartBeatImage: {
      src: hearticon,
      alt: 'Heart Beat Icon',
      width: 70,
      height: 70,
    },
    doctorImage: {
      src: doctorimage,
      alt: 'Doctor',
      width: 720,
      height: 980,
    },
    pills: ['Kidney Care', 'Dialysis', 'Urology', '24/7 Emergency'],
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointmentDate: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.email) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid.';
    if (!formData.phone) errors.phone = 'Phone number is required.';
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone number must be 10 digits.';
    if (!formData.appointmentDate) errors.appointmentDate = 'Appointment date is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const webhookUrl = 'YOUR_APPOINTMENT_WEBHOOK_URL_HERE';

    const dataToSend = {
      title: 'New Appointment Request',
      ...formData,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Appointment request submitted successfully!');
        setShowModal(false);
        setFormData({ name: '', email: '', phone: '', appointmentDate: '', message: '' });
        setFormErrors({});
      } else {
        alert('Appointment submission failed. Please try again.');
        console.error('Webhook error:', response.statusText);
      }
    } catch (error) {
      alert('An error occurred during submission.');
      console.error('Submission error:', error);
    }
  };

  useEffect(() => {
    const section = document.querySelector('.hero-section');
    const text = document.querySelector('.hero-content');
    const figure = document.querySelector('.doctor-figure');

    if (!section || !text || !figure) return;

    let rafId = 0;
    let targetTxText = 0,
      targetTyText = 0,
      targetTxImg = 0,
      targetTyImg = 0;
    let curTxText = 0,
      curTyText = 0,
      curTxImg = 0,
      curTyImg = 0;

    const lerp = (a, b, n) => a + (b - a) * n;

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const textAmp = 6;
      const imgAmp = 8;

      targetTxText = x * textAmp;
      targetTyText = y * textAmp;

      targetTxImg = x * -imgAmp;
      targetTyImg = y * -imgAmp;
    };

    const animate = () => {
      curTxText = lerp(curTxText, targetTxText, 0.08);
      curTyText = lerp(curTyText, targetTyText, 0.08);
      curTxImg = lerp(curTxImg, targetTxImg, 0.08);
      curTyImg = lerp(curTyImg, targetTyImg, 0.08);

      text.style.transform = `translate3d(${curTxText}px, ${curTyText}px, 0)`;
      figure.style.transform = `translate3d(${curTxImg}px, ${curTyImg}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    const onMouseLeave = () => {
      targetTxText = 0;
      targetTyText = 0;
      targetTxImg = 0;
      targetTyImg = 0;
    };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <style jsx>{`
        @keyframes fadeInSlideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes zoomInOut {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      <section
        className="hero-section relative w-full min-h-[86vh] grid gap-6 items-center isolate px-4 md:px-8 lg:px-16 py-12 lg:py-20"
        aria-label="Hero"
        style={{
          gridTemplateColumns: '1.05fr 0.95fr',
          background:
            'radial-gradient(1200px 600px at 80% 10%, rgba(47,128,237,0.09), transparent 60%),' +
            'radial-gradient(800px 500px at 10% 90%, rgba(18,185,129,0.09), transparent 60%),' +
            'linear-gradient(135deg, #eef7ff 0%, #e7f3ff 50%, #eaf7ff 100%)',
          overflow: 'hidden',
        }}
      >
        <div
          className="hero-content relative z-10 text-[#0b1324] max-w-[720px] opacity-0"
          style={{ animation: 'fadeInSlideUp 0.8s ease-out forwards', transform: 'translateY(12px)' }}
        >
          <div className="pills flex flex-wrap gap-2 mb-3" aria-label="Specialties">
            {heroData.pills.map((pill, idx) => (
              <span
                className="pill inline-flex items-center gap-1 px-4 py-2 rounded-full font-bold text-xs text-[#1f4e9b]"
                key={idx}
                style={{ background: 'rgba(47,128,237,0.08)', border: '1px solid rgba(47,128,237,0.18)' }}
              >
                {pill}
              </span>
            ))}
          </div>

          <h1
            className="title m-0 mb-2 font-extrabold leading-tight text-transparent"
            style={{
              background: 'linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 80%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.02em',
            }}
          >
            {heroData.heroContent.title}
          </h1>

          <p className="description mt-2 mb-4 text-[#475569]" style={{ fontSize: 'clamp(15px,1.4vw,18px)', lineHeight: 1.7, maxWidth: '60ch' }}>
            {heroData.heroContent.description}
          </p>

          <div className="cta-row flex flex-wrap gap-3 mt-2" role="group" aria-label="Primary actions">
            <button
              className="inline-flex items-center gap-3 px-6 py-2 rounded-md font-bold bg-[#2f80ed] text-white shadow hover:shadow-md transition"
              onClick={() => setShowModal(true)}
            >
              <i className="fa-solid fa-calendar-check" />
              <span>{heroData.heroContent.ctaPrimary.label}</span>
            </button>

            <a
              className="inline-flex items-center gap-3 px-6 py-2 rounded-md font-bold bg-[#e9f2ff] text-[#1f4e9b] border"
              href={heroData.heroContent.ctaSecondary.href}
              style={{ borderColor: 'rgba(47,128,237,0.22)' }}
            >
              <i className="fa-solid fa-phone" />
              <span>{heroData.heroContent.ctaSecondary.label}</span>
            </a>
          </div>
        </div>

        <div className="right-col-with-image">
          <div className="right-col relative grid items-end justify-items-center h-[600px] w-full" style={{ top: '150px' }}>
            <div
              className="doctor-stage relative w-full h-full max-w-[760px] mx-auto rounded-[28px]"
              style={{
                background:
                  'radial-gradient(600px 280px at 70% 30%, rgba(47,128,237,0.14), transparent 60%),' +
                  'radial-gradient(420px 220px at 20% 80%, rgba(18,185,129,0.14), transparent 60%),' +
                  'linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.5))',
                border: '1px solid rgba(15,23,42,0.06)',
                boxShadow: '0 12px 30px rgba(2,6,23,0.06), inset 0 1px 0 rgba(255,255,255,0.6)',
                borderRadius: '28px',
              }}
              aria-hidden="false"
            >
              {/* doctor-image-wrap now has padding-right: 120px and overflow visible */}
              <div
                className="doctor-figure doctor-image-wrap absolute  right-[4%] bottom-0 w-[min(720px,82%)] max-w-[720px] aspect-[3/4] rounded-[22px] z-20"
                style={{ filter: 'drop-shadow(0 32px 48px rgba(2,6,23,0.22))', paddingRight: '120px', overflow: 'visible' }}
              >
                <Image
                  src={heroData.doctorImage.src}
                  alt={heroData.doctorImage.alt}
                  fill
                  sizes="(max-width: 1060px) 90vw, 720px"
                  style={{ objectFit: 'cover', borderRadius: '22px', overflow : 'visible', paddingRight : '180px' }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="heart-bubble hidden md:grid place-items-center absolute top-[18%] right-[8%] w-[72px] h-[72px] z-40 rounded-full bg-white/90 shadow-md"
          style={{ animation: 'zoomInOut 3s ease-in-out infinite', border: '1px solid rgba(17,50,70,0.08)' }}
          aria-hidden="true"
        >
          <Image
            src={heroData.heartBeatImage.src}
            alt={heroData.heartBeatImage.alt}
            width={heroData.heartBeatImage.width}
            height={heroData.heartBeatImage.height}
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </section>

      {/* Booking modal: overlay z-index = 4 (z-[4]) and modal content z-[5] */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000]">
          <div className="relative bg-white p-8 rounded-lg w-[90%] max-w-[500px] shadow-lg z-[5]">
            <button
              className="absolute top-4 right-4 bg-transparent border-0 text-2xl cursor-pointer text-[#555]"
              onClick={() => setShowModal(false)}
            >
              {'\u00D7'}
            </button>
            <h4 className="text-2xl mb-5 text-[#333]">Book an Appointment</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-left">
                <label htmlFor="name" className="block mb-2 font-bold text-[#333]">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md text-base"
                />
                {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
              </div>

              <div className="mb-4 text-left">
                <label htmlFor="email" className="block mb-2 font-bold text-[#333]">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md text-base"
                />
                {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div className="mb-4 text-left">
                <label htmlFor="phone" className="block mb-2 font-bold text-[#333]">Phone (Mandatory):</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                  title="Phone number must be 10 digits"
                  className="w-full p-2 border rounded-md text-base"
                />
                {formErrors.phone && <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>}
              </div>

              <div className="mb-4 text-left">
                <label htmlFor="appointmentDate" className="block mb-2 font-bold text-[#333]">Preferred Appointment Date:</label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded-md text-base"
                />
                {formErrors.appointmentDate && <p className="text-red-600 text-sm mt-1">{formErrors.appointmentDate}</p>}
              </div>

              <div className="mb-4 text-left">
                <label htmlFor="message" className="block mb-2 font-bold text-[#333]">Your Message (Optional):</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="e.g., I would like to book an appointment for a kidney check-up."
                  className="w-full p-2 border rounded-md text-base min-h-[100px] resize-y"
                />
              </div>

              <button
                type="submit"
                className="bg-[#427eb0] text-white py-3 rounded-md w-full mt-4 hover:bg-[#2a567a] transition-colors"
              >
                Submit Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default HeroSection;