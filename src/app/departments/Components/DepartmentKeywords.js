// DepartmentTreatments.jsx
import React, { useEffect } from 'react';

function DepartmentTreatments({ keywords }) {
  // Use useEffect to inject the Font Awesome stylesheet when the component mounts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Clean up the stylesheet when the component unmounts (optional but good practice)
    return () => {
      document.head.removeChild(link);
    };
  }, []); // Empty dependency array means this runs once on mount and once on unmount

  if (!keywords || keywords.length === 0) {
    return null; // Don't render if no keywords are provided
  }

  return (
    <>
      {/* The style tag containing all the CSS */}
      <style>
        {`
          .treatments-section {
              max-width: 1200px;
              margin: 80px auto;
              padding: 0 20px;
              text-align: center;
              position: relative;
          }

          .treatments-heading {
              font-size: 36px; /* Specified heading size */
              color: #1a2a3a;
              margin-bottom: 60px;
              font-weight: 800;
              position: relative;
              display: inline-block;
              letter-spacing: -0.5px;
          }

          .treatments-heading::after {
              content: '';
              position: absolute;
              left: 50%;
              bottom: -20px;
              transform: translateX(-50%);
              width: 100px;
              height: 5px;
              background-color: #007bff;
              border-radius: 3px;
          }

          .keywords-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr); /* 2 columns for desktop */
              gap: 40px; /* Increased gap for 2x2 layout */
              justify-content: center;
              align-items: stretch; /* Ensure cards stretch to fill grid cell */
          }

          .keyword-card {
              background: linear-gradient(145deg, #ffffff, #f0f0f0);
              padding: 40px 30px; /* Adjusted padding */
              border-radius: 20px;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
              transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              position: relative;
              overflow: hidden;
              border: 1px solid #e0e0e0;
          }

          .keyword-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 6px;
              background-color: #007bff;
              transform: translateY(-100%);
              transition: transform 0.4s ease-in-out;
          }

          .keyword-card:hover {
              transform: translateY(-15px) scale(1.02); /* Slightly less pronounced lift for grid */
              box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15); /* Adjusted shadow on hover */
          }

          .keyword-card:hover::before {
              transform: translateY(0);
          }

          .keyword-icon-wrapper {
              width: 70px;
              height: 70px;
              background-color: #e3f2fd;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-bottom: 30px;
              font-size: 30px; /* Icon size remains large */
              color: #007bff;
              transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;
              box-shadow: 0 4px 15px rgba(0, 123, 255, 0.2);
          }

          .keyword-card:hover .keyword-icon-wrapper {
              background-color: #007bff;
              color: #ffffff;
              box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
          }

          .keyword-title {
              font-size: 20px; /* Specified card title size */
              margin-bottom: 18px;
              color: #2c3e50;
              font-weight: 700;
              line-height: 1.3;
              letter-spacing: -0.2px;
          }

          .keyword-description {
              font-size: 18px; /* Specified description text size */
              line-height: 1.7;
              color: #555;
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
              .treatments-section {
                  margin: 50px auto;
                  padding: 0 15px;
              }

              .treatments-heading {
                  font-size: 32px;
                  margin-bottom: 40px;
              }

              .treatments-heading::after {
                  bottom: -15px;
                  width: 80px;
              }

              .keywords-grid {
                  grid-template-columns: 1fr; /* Stack cards on mobile */
                  gap: 25px;
              }

              .keyword-card {
                  padding: 30px 20px;
              }

              .keyword-icon-wrapper {
                  width: 75px;
                  height: 75px;
                  font-size: 38px;
                  margin-bottom: 25px;
              }

              .keyword-title {
                  font-size: 26px; /* Adjusted for mobile */
                  margin-bottom: 12px;
              }

              .keyword-description {
                  font-size: 20px; /* Adjusted for mobile */
              }
          }
        `}
      </style>

      <div className="treatments-section">
        <h1 className="treatments-heading">Our Specialized Treatments</h1>
        <div className="keywords-grid">
          {keywords.map((item, index) => (
            <div className="keyword-card" key={index}>
              <div className="keyword-icon-wrapper">
                <i className={item.iconClass}></i>
              </div>
              <h4 className="keyword-title">{item.title}</h4>
              <p className="keyword-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DepartmentTreatments;