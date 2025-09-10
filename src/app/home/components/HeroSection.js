'use client';

import React, { useState } from 'react'; // Import useState
import Image from 'next/image';

export function HeroSection() {
  const heroData = {
    heroContent: {
      title: 'Comprehensive Kidney & Healthcare Services in Salem',
      description:
        'Salem Gopi Hospital combines expertise in kidney care, dialysis, and urology with a multiplicity of advanced medical services, delivering compassionate care for every stage of health.',
      ctaPrimary: { label: 'Book an Appointment', action: 'openModal' }, // Changed href to action
      ctaSecondary: { label: 'Call +91 9894352229', href: 'tel:+91 9894352229' },
    },
    doctorInfoBox: {
      avatar:
        'https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/d41w54025eaed20c74ddbaf5ceaf5b374d?orig=true',
      name: 'Dr D Mahadevan MD.,DM',
      specialty: 'Neurology',
      scheduleDays: 'Monday - Thursday',
      scheduleTime: '09:00 AM - 07:00 PM',
    },
    floatingImages: [
      {
        src: 'https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/d41w5ba0ff67edffc4291bbd47cb58ee44a1f?orig=true',
        alt: 'Floating Element 1',
        className: 'float-top-bottom',
        width: 220,
        height: 220,
      },
      {
        src: 'https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/d41w5c13872b16fda485fafba2ee5cc5bc2b1?orig=true',
        alt: 'Floating Element 2',
        className: 'float-left-right',
        width: 300,
        height: 180,
      },
    ],
    heartBeatImage: {
      src: 'https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/vfmizb249cf9f557340e288fee3223082dc29?orig=true',
      alt: 'Heart Beat Icon',
      width: 70,
      height: 70,
    },
    doctorImage: {
      src: 'https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/vfmizf40963cfb72d4b1d9c9f4b6d177dd892?orig=true',
      alt: 'Doctor',
      width: 720,
      height: 980,
    },
    pills: ['Kidney Care', 'Dialysis', 'Urology', '24/7 Emergency'],
  };

  const [showModal, setShowModal] = useState(false); // State for modal visibility
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
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone number must be 10 digits.";
    if (!formData.appointmentDate) errors.appointmentDate = "Appointment date is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Replace with your actual webhook URL for appointments
    const webhookUrl = 'YOUR_APPOINTMENT_WEBHOOK_URL_HERE'; // IMPORTANT: Replace this with your actual webhook URL

    const dataToSend = {
      title: "New Appointment Request",
      ...formData,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Appointment request submitted successfully!');
        setShowModal(false);
        setFormData({ name: '', email: '', phone: '', appointmentDate: '', message: '' }); // Reset form
        setFormErrors({}); // Clear errors
      } else {
        alert('Appointment submission failed. Please try again.');
        console.error('Webhook error:', response.statusText);
      }
    } catch (error) {
      alert('An error occurred during submission.');
      console.error('Submission error:', error);
    }
  };

  React.useEffect(() => {
    // Gentle cursor-follow parallax within the hero (pure JS, no TS types)
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
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const textAmp = 6; // px
      const imgAmp = 8; // px

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
        :root {
          --ink: #0b1324;
          --muted: #475569;
          --brand: #2f80ed;
          --brand-2: #12b981;
          --border: rgba(15, 23, 42, 0.08);
        }

        .hero-section {
          position: relative;
          width: 100%;
          min-height: 86vh;
          display: grid;
          
          grid-template-columns: 1.05fr 0.95fr;
          gap: 24px;
          align-items: center;
          padding: clamp(56px, 6vw, 88px) clamp(16px, 6vw, 64px);
          background:
            radial-gradient(1200px 600px at 80% 10%, rgba(47, 128, 237, 0.09), transparent 60%),
            radial-gradient(800px 500px at 10% 90%, rgba(18, 185, 129, 0.09), transparent 60%),
            linear-gradient(135deg, #eef7ff 0%, #e7f3ff 50%, #eaf7ff 100%);
          overflow: hidden;
          isolation: isolate;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          color: var(--ink);
          max-width: 720px;
          animation: fadeInSlideUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(12px);
          transition: transform 0.2s ease-out;
        }

        .pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .pill {
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

        .title {
          margin: 0 0 10px;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 80%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .description {
          margin: 10px 0 22px;
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.7;
          color: var(--muted);
          max-width: 60ch;
        }

        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 6px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
          will-change: transform;
        }
        .btn-primary {
          background: var(--brand);
          color: #1f4e9b;
          box-shadow: 0 10px 24px rgba(47, 128, 237, 0.26);
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px rgba(47, 128, 237, 0.32);
        }
        .btn-secondary {
          background: #e9f2ff;
          color: #1f4e9b;
          border: 1px solid rgba(47, 128, 237, 0.22);
        }
        .btn-secondary:hover {
          background: #dceaff;
          transform: translateY(-1px);
        }

        /* RIGHT SIDE simplified: no perspective */
        .right-col {
          position: relative;
          display: grid;
          align-items: end;
          justify-items: center;
          height: 600px;
          width: 100%;
          top: 150px;
          overflow: visible;
        }

        .doctor-stage {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 28px;
          overflow: visible;
          background:
            radial-gradient(600px 280px at 70% 30%, rgba(47, 128, 237, 0.14), transparent 60%),
            radial-gradient(420px 220px at 20% 80%, rgba(18, 185, 129, 0.14), transparent 60%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.5));
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow:
            0 12px 30px rgba(2, 6, 23, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transition: box-shadow 0.35s ease;
        }

        .doctor-stage::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 30px;
          pointer-events: none;
          background:
            radial-gradient(120% 80% at 80% 20%, rgba(47, 128, 237, 0.15), transparent 60%),
            radial-gradient(100% 70% at 20% 80%, rgba(18, 185, 129, 0.12), transparent 60%);
          filter: blur(8px);
          opacity: 0.8;
          z-index: 0;
        }

        .doctor-figure {
          position: absolute;
          right: 4%;
          bottom: 0%;
          width: min(720px, 82%);
          max-width: 720px;
          aspect-ratio: 3 / 4;
          filter: drop-shadow(0 32px 48px rgba(2, 6, 23, 0.22));
          transition: transform 0.2s ease-out, filter 0.35s ease;
          will-change: transform;
          z-index: 2;
          border-radius: 22px;
        }

        .doctor-figure::before {
          content: '';
          position: absolute;
          inset: -14px -18px -18px -14px;
          border-radius: 30px;
          background:
            radial-gradient(40% 60% at 70% 0%, rgba(47, 128, 237, 0.18), transparent 60%),
            radial-gradient(50% 70% at 0% 80%, rgba(18, 185, 129, 0.14), transparent 60%);
          z-index: -1;
          filter: blur(14px);
        }

        .right-col-with-image {
          position: relative;
          width: 100%;
        }

        .doctor-image-wrap {
          position: relative;
          width: 700px;
          height: 650px;
          right: 70px;
          bottom : 100px;
          overflow: visible;
          border-radius: inherit;
        }

        .hero-section:hover .doctor-stage {
          box-shadow:
            0 18px 44px rgba(2, 6, 23, 0.1),\
            inset 0 1px 0 rgba(255, 255, 255, 0.65);
        }

        /* Two additional images container */
        .extra-images {
          position: relative;
          margin-top:20px;
          display: flex;
          gap: 12px;
          z-index: 3;
        }
        .extra-image {
          position: relative;
          width: 300px;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 24px rgba(2, 6, 23, 0.12);
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: #fff;
        }

        /* Floating accents */
        .float-el {
          position: absolute;
          z-index: 3;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          will-change: transform;
          pointer-events: none;
        }
        .float-top-bottom {
          top: 14%;
          left: 56%;
          animation-name: floatUpDown;
          animation-duration: 6s;
        }
        .float-left-right {
          bottom: 10%;
          right: 10%;
          animation-name: floatLeftRight;
          animation-duration: 8s;
        }
        .heart-bubble {
          position: absolute;
          top: 18%;
          right: 8%;
          width: 72px;
          height: 72px;
          z-index: 4;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 999px;
          display: grid;
          place-items: center;
          animation: zoomInOut 3s ease-in-out infinite;
          box-shadow: 0 8px 22px rgba(2, 6, 23, 0.08);
          border: 1px solid rgba(17, 50, 70, 0.08);
        }

        @keyframes fadeInSlideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatUpDown {
          0% { transform: translateY(0); }
          50% { transform: translateY(14px); }
          100% { transform: translateY(0); }
        }
        @keyframes floatLeftRight {
          0% { transform: translateX(0); }
          50% { transform: translateX(14px); }
          100% { transform: translateX(0); }
        }
        @keyframes zoomInOut {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        /* Modal Styles (copied from Insurance component) */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          position: relative;
        }

        .modal-close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 1.5em;
          cursor: pointer;
          color: #555;
        }

        .modal-title {
          font-size: 1.8em;
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 15px;
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #333;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1em;
          box-sizing: border-box;
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-error {
          color: red;
          font-size: 0.9em;
          margin-top: 5px;
        }

        .form-submit-button {
          background-color: #427eb0;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 5px;
          font-size: 1.1em;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
          margin-top: 20px;
        }

        .form-submit-button:hover {
          background-color: #2a567aff;
        }


        /* Responsive */
        @media (max-width: 1100px) {
          .hero-section {
            grid-template-columns: 1fr;
          }
          .right-col {
            order: 2;
            height: 520px;
          }
          .doctor-figure {
            right: 50%;
            width: min(560px, 88vw);
            transform: translateX(50%);
          }
          .extra-images {
           flex-direction : column;
            bottom: 10%;
          }
        }

        @media (max-width: 760px) {
          .hero-section {
            padding: 48px 16px 56px;
            min-height: auto;
            text-align: center;
          }
          .pills { justify-content: center; }
          .title { margin-bottom: 12px; }
          .description {
            margin: 10px auto 18px;
            max-width: 60ch;
          }
          .cta-row {
            justify-content: center;
          }

          /* Hide the right column entirely on mobile */
          .right-col {
            display: none;
          }

          .heart-bubble {
            display: none;
          }
        }
      `}</style>

      <section className="hero-section" aria-label="Hero">
        {/* Left: Text and CTAs */}
        <div className="hero-content">
          <div className="pills" aria-label="Specialties">
            {heroData.pills.map((pill, idx) => (
              <span className="pill" key={idx}>
                {pill}
              </span>
            ))}
          </div>

          <h1 className="title">{heroData.heroContent.title}</h1>
          <p className="description">{heroData.heroContent.description}</p>

          <div className="cta-row" role="group" aria-label="Primary actions">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}> {/* Changed to button and added onClick */}
              <i className="fa-solid fa-calendar-check" />
              {heroData.heroContent.ctaPrimary.label}
            </button>
            <a className="btn btn-secondary" href={heroData.heroContent.ctaSecondary.href}>
              <i className="fa-solid fa-phone" />
              {heroData.heroContent.ctaSecondary.label}
            </a>

             {/* Two open-source images (Unsplash Source) */}
              {/* <div className="extra-images" aria-hidden="false">
                <div className="extra-image">
                  <Image
                    src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/online/PublishingImages/blog/health-care-economics.jpg&w=1200&h=630"
                    alt="Healthcare"
                    fill
                    sizes="180px"
                    style={{ objectFit: 'cover' }}
                    priority={false}
                  />
                </div>
                <div className="extra-image">
                  <Image
                    src="https://highpowervtls.com/wp-content/uploads/2024/06/highpowervalidation-321647-reusablemedicaldevices-blogbanner1.jpg"
                    alt="Medical equipment"
                    fill
                    sizes="180px"
                    style={{ objectFit: 'cover' }}
                    priority={false}
                  />
                </div>
              </div> */}
          </div>

          {/* Doctor info removed as requested */}
        </div>

        {/* Right: Visual (hidden on mobile via CSS) */}
        <div className="right-col-with-image">
          <div className="right-col">
            <div className="doctor-stage" aria-hidden="false">
              <div className="doctor-figure doctor-image-wrap">
                {/* <div className="doctor-image-wrap"> */}
                  <Image
                    src={heroData.doctorImage.src}
                    alt={heroData.doctorImage.alt}
                    fill
                    sizes="(max-width: 1060px) 90vw, 720px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                {/* </div> */}
              </div>

             
              {/* End extra images */}
            </div>
          </div>
        </div>

        {/* Optional Floating accents (kept off by default)
        {heroData.floatingImages.map((img, i) => (
          <div
            className={`float-el ${img.className}`}
            key={i}
            style={{ width: img.width, height: img.height }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              style={{ objectFit: 'contain' }}
              priority={i === 0}
            />
          </div>
        ))}
        */}

        {/* Heart bubble (hidden on mobile via CSS above) */}
        <div className="heart-bubble" aria-hidden="true">
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h4 className="modal-title">Book an Appointment</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.name && <p className="form-error">{formErrors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.email && <p className="form-error">{formErrors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone (Mandatory):</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                  title="Phone number must be 10 digits"
                />
                {formErrors.phone && <p className="form-error">{formErrors.phone}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="appointmentDate">Preferred Appointment Date:</label>
                <input
                  type="date"
                  id="appointmentDate"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.appointmentDate && <p className="form-error">{formErrors.appointmentDate}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message (Optional):</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="e.g., I would like to book an appointment for a kidney check-up."
                ></textarea>
              </div>
              <button type="submit" className="form-submit-button">
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