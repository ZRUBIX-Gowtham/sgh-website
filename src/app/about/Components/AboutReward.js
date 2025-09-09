'use client';
import React from 'react';

import Image from 'next/image';

function AboutRewards() {
  const pageData = {
    "header": "AWARDS",
    "title": "Winning Awards and Recognition",
    "subtitle": "We have been recognized for our commitment to excellence in healthcare.",
    "awards": [
      {
        "name": "Malcolm Baldrige National Quality Award",
        "icon": "https://prohealth-react.vercel.app/images/icons/award.svg"
      },
      {
        "name": "HIMSS Davies Award",
        "icon": "https://prohealth-react.vercel.app/images/icons/award.svg"
      },
      {
        "name": "Healthgrades National's Best Hospital",
        "icon": "https://prohealth-react.vercel.app/images/icons/award.svg"
      },
      {
        "name": "Joint Commission Gold Seal of Approval",
        "icon": "https://prohealth-react.vercel.app/images/icons/award.svg"
      }
    ]
  };

  return (
    <>
      <style>{`
        .about-rewards-container {
          background-color: #ffffff;
          padding: 60px 20px;
          text-align: center;
          max-width : 1400px;
          margin: 0 auto;
        }

        .about-rewards-awards-header {
          color: #3366cc;
          font-size: 1.2em;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          display: inline-block;
        }
          .about-rewards-awards-header:after { /* Added for underline */
          content: '';
          position: absolute;
          left: 15px;
          bottom: -5px;
          width: 50px;
          height: 3px;
          background-color: #007bff;
          border-radius: 2px;
        }

        .about-rewards-title {
          color: #2c3e50;
          font-size: 40px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .about-rewards-subtitle {
          color: #7f8c8d;
          font-size: 18px;
          margin-bottom: 40px;
        }

        .about-rewards-cards-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .about-rewards-card {
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 280px;
          display: flex;
          align-items: center;
          text-align: left;
          overflow: hidden; /* Ensure the glass effect stays within the card */
        }

        .about-rewards-icon-container {
          background-color: #3366cc;
          border-radius: 8px;
          padding: 15px;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative; /* Needed for positioning the pseudo-element */
          overflow: hidden; /* Ensures the glass effect stays within the bounds */
          width: 40px; /* Fixed width */
          height: 40px; /* Fixed height */
          flex-shrink: 0; /* Prevent shrinking */
        }

        .about-rewards-icon-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 70%);
          transform: translateX(-100%); /* Start off-screen to the left */
          transition: transform 0.6s ease-in-out;
          z-index: 1; /* Ensures the glass effect is above the icon */
        }

        .about-rewards-card:hover .about-rewards-icon-container::before {
          transform: translateX(100%); /* Move to the right on hover */
        }

        .about-rewards-icon {
          width: 40px;
          height: 40px;
          position: relative; /* Needed for z-index to be above pseudo-element */
          z-index: 2; /* Ensures the icon is above the glass effect */
        }

        .about-rewards-card-text {
          color: #2c3e50;
          font-size: 18px;
          font-weight: 600;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .about-rewards-cards-container {
            flex-direction: column;
            align-items: center;
          }
          .about-rewards-card {
            width: 90%; /* Adjust width for better mobile fit */
            max-width: 350px; /* Max width for smaller screens */
          }
        }
      `}</style>
      <div className="about-rewards-container">
        <div className="about-rewards-awards-header">{pageData.header}</div>
        <h3 className="about-rewards-title">{pageData.title}</h3>
        <p className="about-rewards-subtitle">
          {pageData.subtitle}
        </p>
        <div className="about-rewards-cards-container">
          {pageData.awards.map((award, index) => (
            <div key={index} className="about-rewards-card">
              <div className="about-rewards-icon-container">
                <Image src={award.icon} alt="Award Icon" width={40} height={40} className="about-rewards-icon" />
              </div>
              <div className="about-rewards-card-text">{award.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutRewards;