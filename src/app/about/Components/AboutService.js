import React from 'react';

function AboutService() {
  const servicesData = [
    {
      iconPath: "M19 4h-3V2h-2v2h-4V2H8v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h10v2H7zm0 4h10v2H7z",
      title: "Diagnostic testing",
      description: "Blood tests, imaging studies, and other tests to diagnose health conditions"
    },
    {
      iconPath: "M19 4h-3V2h-2v2h-4V2H8v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h10v2H7zm0 4h10v2H7z",
      title: "Rehabilitation services",
      description: "Physical therapy, occupational therapy, and other services to help patients recover from injuries"
    },
    {
      iconPath: "M19 4h-3V2h-2v2h-4V2H8v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h10v2H7zm0 4h10v2H7z",
      title: "Preventive care",
      description: "Annual checkups, immunizations, and health screenings care preventive"
    },
    {
      iconPath: "M19 4h-3V2h-2v2h-4V2H8v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h10v2H7zm0 4h10v2H7z",
      title: "Treatment for chronic",
      description: "Medication management, disease management, and other treatments to improve health outcomes"
    },
    {
      iconPath: "M19 4h-3V2h-2v2h-4V2H8v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h10v2H7zm0 4h10v2H7z",
      title: "Mental health services",
      description: "Counseling, therapy, and other services to help patients manage mental health conditions"
    }
  ];

  return (
    <div className="aboutservice">
      <style>
        {`
        /* Styles for the new aboutservice container */
        .aboutservice {
            margin: 0;
            padding: 40px;
            background-color: #f8f9fa;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            box-sizing: border-box;
            width: 100%; /* Ensure it takes full width */
        }

        .services-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* Now 3 columns for cards */
            gap: 20px;
            max-width: 1300px;
            width: 100%;
        }

        .services-header {
            grid-column: 1 / 2; /* Stays in the first column */
            grid-row: 1 / 2; /* Stays in the first row */
            padding-right: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            /* Animation for header */
            animation: fadeIn 1s ease-out forwards;
        }

        .services-header h4 {
            color: #007bff;
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-transform: uppercase;
            position: relative;
            display: inline-block;
        }

        .services-header h4::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 50px;
            height: 3px;
            background-color: #007bff;
            border-radius: 2px;
        }

        .services-header h1 {
            color: #212529;
            font-size: 40px;
            font-weight: 700;
            line-height: 1.2;
            margin: 0;
        }

        .service-card {
            background-color: #fff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
            /* Hover effect */
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            /* Initial state for animation */
            opacity: 0;
            transform: translateY(20px);
            animation: slideInUp 0.6s ease-out forwards;
        }

        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .service-card .icon {
            background-color: #e0f2ff;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            /* Icon animation */
            transition: background-color 0.3s ease-in-out;
        }

        .service-card:hover .icon {
            background-color: #007bff;
        }

        .service-card .icon svg {
            fill: #007bff;
            width: 24px;
            height: 24px;
            /* Icon fill animation */
            transition: fill 0.3s ease-in-out;
        }

        .service-card:hover .icon svg {
            fill: #fff;
        }

        .service-card h3 {
            color: #212529;
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .service-card p {
            color: #6c757d;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 0;
        }

        /* Grid adjustments for specific card placement */
        .service-card:nth-of-type(1) {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            animation-delay: 0.2s;
        }

        .service-card:nth-of-type(2) {
            grid-column: 3 / 4;
            grid-row: 1 / 2;
            animation-delay: 0.4s;
        }

        .service-card:nth-of-type(3) {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
            animation-delay: 0.6s;
        }

        .service-card:nth-of-type(4) {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
            animation-delay: 0.8s;
        }

        .service-card:nth-of-type(5) {
            grid-column: 3 / 4;
            grid-row: 2 / 3;
            animation-delay: 1.0s;
        }

        /* Keyframe animations */
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideInUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
            .services-container {
                grid-template-columns: repeat(2, 1fr);
            }
            .services-header {
                grid-column: 1 / 3;
                grid-row: auto;
                padding-right: 0;
            }
            .service-card:nth-of-type(1),
            .service-card:nth-of-type(2),
            .service-card:nth-of-type(3),
            .service-card:nth-of-type(4),
            .service-card:nth-of-type(5) {
                grid-column: auto;
                grid-row: auto;
                animation-delay: 0s; /* Reset delay for smaller screens */
            }
        }

        @media (max-width: 768px) {
            .services-container {
                grid-template-columns: 1fr;
            }
            .services-header {
                grid-column: 1 / 2;
            }
            .aboutservice { /* Apply padding to aboutservice container */
                padding: 20px;
            }
            .services-header h1 {
                font-size: 2rem;
            }
            .service-card h3 {
                font-size: 1.3rem;
            }
            .service-card p {
                font-size: 0.9rem;
            }
        }
        `}
      </style>
      <div className="services-container">
        <div className="services-header">
          <h4>SERVICES</h4>
          <h1>Provides Our<br />Best Services</h1>
        </div>

        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d={service.iconPath} />
              </svg>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutService;