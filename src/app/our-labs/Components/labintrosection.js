import React from 'react';
import Image from 'next/image';

function LabIntroSection() {
  const content = {
    "title": "Department of Laboratory & Diagnostics",
    "paragraphs": [
      "Gopi Hospitals, Salem, has one of the most effective Departments of Laboratory & Diagnostics, setting a new standard for medical excellence. It is well-equipped with contemporary test instruments and diagnostic tools to deliver fast and precise findings. The Department of Laboratory & Diagnostics' mission is to provide clinically accurate diagnosis and treatment of a range of disorders. Laboratory Services – Operate 24 hours a day, 7 days a week, with staff on duty constantly. Modern Radiology Department of Gopi Hospitals in Salem makes the most of remarkable equipment. The department’s primary goal is to make sure patients are comfortable and convenient both before and after having the necessary imaging tests. Our skilled crew uses modern equipment while taking the utmost precautions to preserve overall hygiene and adhere to all safety rules.",
      "Our cutting-edge reference lab has received NABL accreditation. The accreditations enable us to fulfill our commitment to offering the greatest patient care. The findings of the laboratory tests have an impact on many aspects of our everyday lives, and having an international accreditation in medical testing laboratories helps to ensure that our patients receive consistent, accurate, and high-quality results.",
      "In the Department of Laboratory & Diagnostics, our skilled nursing, and paramedical professionals uphold a tradition of quality. We specialize in providing both general and targeted diagnostic services. To deliver prompt and precise findings, we collaborate with our doctors."
    ],
    "imageUrl": "https://salemgopihospital.in/wp-content/uploads/2022/08/doctor-analyzing-blood-samples-with-microscope-min.jpg"
  };

  return (
    <section className="lab-intro-section">
      <style>
        {`
          .lab-intro-section {
            display: flex;
            flex-direction: row; /* Default to row for larger screens */
            align-items: center;
            justify-content: center;
            padding: 2rem;
           color: #2c3e50;
          }

          .lab-intro-content {
            width: 50%;
            padding: 1rem;
          }

          .lab-intro-content h3 {
            font-size: 2.25rem; /* Equivalent to text-3xl */
            font-weight: bold;
            margin-bottom: 1rem;
          }

          .lab-intro-content p {
            margin-bottom: 1rem;
            font-size: 1.125rem; /* Equivalent to text-lg */
            line-height: 1.625; /* Equivalent to leading-relaxed */
             color : #555;
          }

          .lab-intro-image {
            width: 30%;
            padding: 1rem;
          }

          .lab-intro-image img {
            width: 100%;
            height: auto;
            border-radius: 0.5rem; /* Equivalent to rounded-lg */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Equivalent to shadow-lg */
          }

          @media (max-width: 768px) {
            .lab-intro-section {
              flex-direction: column;
            }
            .lab-intro-content, .lab-intro-image {
              width: 100%;
            }
          }
        `}
      </style>
      <div className="lab-intro-content">
        <h3>{content.title}</h3>
        {content.paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="lab-intro-image">
        <Image
          src={content.imageUrl}
          alt="Laboratory & Diagnostics"
          width={500} // Placeholder width
          height={300} // Placeholder height
        />
      </div>
    </section>
  );
}

export default LabIntroSection;