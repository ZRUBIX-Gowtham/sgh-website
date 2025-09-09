import React from 'react';
import Image from 'next/image'; // Import the Image component

function AboutDoctors() {
  const doctorsData = [
    {
      name: "Dr. James Lee, MD",
      specialty: "Head of Cardiologist",
      description: "With expertise in managing complex heart conditions and performing advanced cardiac procedures",
      image: "https://prohealth-react.vercel.app/images/about/doctor_1.png",
      link: "#" // Added a link for the button
    },
    {
      name: "Dr. John Smith, MD",
      specialty: "Emergency Medicine Physician",
      description: "With expertise in treating acute illnesses and injuries in medicine physician",
      image: "https://prohealth-react.vercel.app/images/about/doctor_2.png",
      link: "#"
    },
    {
      name: "Dr. Susan Bones, MD",
      specialty: "Board-certified Pediatrician",
      description: "With experience in managing complex medical conditions in children",
      image: "https://prohealth-react.vercel.app/images/about/doctor_3.png",
      link: "#"
    }
  ];

  return (
    <div className="doctors-section-absolute-image">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        .doctors-section-absolute-image {
          font-family: 'Inter', sans-serif;
          padding: 10px 20px;
          background-color: #ffffff;
          text-align: center;
        }

        .doctors-section-absolute-image h4 {
          font-size: 1.2rem;
          color: #007bff;
          margin-bottom: 10px;
          font-weight: 700; /* Changed to 700 for bold */
          text-transform: uppercase;
          position: relative; /* Added for underline */
          display: inline-block; /* Added for underline */
        }

        .doctors-section-absolute-image h4::after { /* Added for underline */
          content: '';
          position: absolute;
          left: 23px;
          bottom: -5px;
          width: 50px;
          height: 3px;
          background-color: #007bff;
          border-radius: 2px;
        }

        .doctors-section-absolute-image h2 {
          font-size: 40px;
          color: #2c3e50;
          margin-bottom: 130px;
          font-weight: 800;
        }

        .doctors-container-absolute-image {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
          max-width: 1300px;
          margin: 0 auto;
        }

        .doctor-card-absolute-image {
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          margin-bottom: 20px;
          padding-top: 90px;
          padding-bottom: 40px; /* Adjusted for button */
        }

        .doctor-card-absolute-image:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .doctor-image-wrapper-absolute-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid #e0f2f7;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, #e0f2f7, #cce7f0);
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: -75px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }

        .doctor-image-wrapper-absolute-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .doctor-details-container-absolute-image {
          padding: 0 25px;
          width: 100%;
          box-sizing: border-box;
          display: flex; /* Use flexbox for vertical alignment */
          flex-direction: column;
          align-items: center; /* Center items horizontally */
          flex-grow: 1; /* Allow this container to grow and push button down */
        }

        .doctor-details-container-absolute-image h3 {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .doctor-details-container-absolute-image h5 {
          font-size: 1.1rem;
          color: #007bff;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .doctor-details-container-absolute-image p {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 25px; /* Space before the button */
        }

        .learn-more-button {
          display: inline-flex; /* Use inline-flex to center content and allow padding */
          align-items: center;
          justify-content: center;
          padding: 12px 25px;
          background-color: #007bff; /* Primary blue color */
          color: #ffffff; /* White text */
          border: none;
          border-radius: 8px; /* Slightly rounded corners */
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none; /* Remove underline for links */
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2); /* Subtle shadow */
          margin-top: auto; /* Pushes the button to the bottom of the flex container */
        }

        .learn-more-button:hover {
          background-color: #0056b3; /* Darker blue on hover */
          transform: translateY(-2px); /* Slight lift on hover */
          box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3); /* More pronounced shadow */
        }

        .learn-more-button svg {
          margin-left: 8px; /* Space between text and icon */
          width: 18px;
          height: 18px;
        }

        /* Responsive Adjustments */
        @media (max-width: 1024px) {
          .doctor-card-absolute-image {
            width: 280px;
            padding-top: 80px;
          }
          .doctor-image-wrapper-absolute-image {
            width: 130px;
            height: 130px;
            top: -65px;
          }
          .doctor-details-container-absolute-image h3 {
            font-size: 1.6rem;
          }
          .doctor-details-container-absolute-image h5 {
            font-size: 1rem;
          }
          .doctor-details-container-absolute-image p {
            font-size: 0.9rem;
          }
          .learn-more-button {
            padding: 10px 20px;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 768px) {
          .doctors-section-absolute-image h2 {
            font-size: 2.2rem;
            margin-bottom: 40px;
          }
          .doctors-container-absolute-image {
            flex-direction: column;
            align-items: center;
                    gap: 70px;
          }
          .doctor-card-absolute-image {
            width: 90%;
            max-width: 350px;
            margin-bottom: 30px;
            padding-top: 90px;
          }
          .doctor-image-wrapper-absolute-image {
            width: 150px;
            height: 150px;
            top: -75px;
          }
        }

        @media (max-width: 480px) {
          .doctors-section-absolute-image h2 {
            font-size: 1.8rem;
            margin-bottom: 110px;
          }
          .doctor-card-absolute-image {
            padding-top: 80px;
          }
          .doctor-image-wrapper-absolute-image {
            width: 120px;
            height: 120px;
            top: -60px;
          }
          .doctor-details-container-absolute-image h3 {
            font-size: 1.4rem;
          }
          .doctor-details-container-absolute-image h5 {
            font-size: 0.9rem;
          }
          .doctor-details-container-absolute-image p {
            font-size: 0.85rem;
          }
          .learn-more-button {
            padding: 8px 18px;
            font-size: 0.9rem;
          }
        }
        `}
      </style>

      <h4>MEET OUR</h4>
      <h2>Experts Doctor</h2>

      <div className="doctors-container-absolute-image">
        {doctorsData.map((doctor, index) => (
          <div className="doctor-card-absolute-image" key={index}>
            <div className="doctor-image-wrapper-absolute-image">
              <Image src={doctor.image} alt={doctor.name} layout="fill" objectFit="cover" />
            </div>
            <div className="doctor-details-container-absolute-image">
              <h3>{doctor.name}</h3>
              <h5>{doctor.specialty}</h5>
              <p>{doctor.description}</p>
              <a href={doctor.link} className="learn-more-button">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutDoctors;