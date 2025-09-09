import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

function AboutExperience() {
  const statRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    statRefs.current.forEach((el, index) => {
      const valueElement = el.querySelector('h2');
      const targetValue = parseInt(valueElement.textContent.replace(/[^0-9]/g, ''));
      const suffix = valueElement.textContent.replace(/[0-9]/g, '');

      gsap.fromTo(valueElement, 
        { innerText: 0 }, 
        { 
          innerText: targetValue, 
          duration: 2, 
          snap: { innerText: 1 },
          ease: "power1.out",
          onUpdate: function() {
            valueElement.textContent = Math.ceil(this.targets()[0].innerText) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );
    });
  }, []);

  const statsData = [
    {
      value: "40+",
      label: "Years of experience",
    },
    {
      value: "10 Lakh",
      label: "Patients Served",
    },
    {
      value: "20+",
      label: "Expert Doctors",
    },
    {
      value: "15+",
      label: "Special Departments",
    }
  ];

  return (
    <div className="stats-section-simple">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

        .stats-section-simple {
            padding: 40px 20px;
            margin: 10px auto;
            max-width: 1200px;
            display: flex;
            justify-content: space-around;
            align-items: flex-start; /* Default alignment for larger screens */
            flex-wrap: wrap;
            font-family: 'Inter', sans-serif;
            background-color: transparent;
            box-shadow: none;
            position: relative;
            overflow: hidden;
        }

        .stats-section-simple::before,
        .stats-section-simple::after {
            content: none;
        }

        .stat-item-simple {
            text-align: center;
            margin: 15px;
            color: #000000;
            flex: 1;
            min-width: 200px;
            max-width: 280px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transform: translateY(0);
            animation: none;
        }

        .stat-item-simple:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .stat-item-simple:nth-child(1),
        .stat-item-simple:nth-child(2),
        .stat-item-simple:nth-child(3),
        .stat-item-simple:nth-child(4) {
            animation-delay: 0s;
        }

        .icon-wrapper-simple {
            background-color: transparent;
            border-radius: 0;
            padding: 0;
            margin-bottom: 10px;
            box-shadow: none;
        }

        .stat-icon {
            width: 40px;
            height: 40px;
            color: #007bff;
        }

        .text-container-simple {
            background-color: transparent;
            border-radius: 0;
            padding: 0;
            margin-top: 5px;
            width: 100%;
            box-shadow: none;
            border: none;
        }

        .stat-item-simple h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 5px;
            color: #000000;
            line-height: 1.1;
        }

        .stat-item-simple p {
            font-size: 1rem;
            color: #000000;
            line-height: 1.5;
            font-weight: 400;
        }

        /* Responsive Adjustments (simplified) */
        @media (max-width: 1200px) {
            .stat-item-simple {
                max-width: 25%;
            }
        }

        @media (max-width: 992px) {
            .stat-item-simple {
                max-width: 45%;
            }
        }

        @media (max-width: 768px) {
            .stats-section-simple {
                flex-direction: column;
                padding: 30px 15px;
                align-items: center; /* Center items horizontally in column layout */
            }
            .stat-item-simple {
                margin: 10px 0;
                width: 90%;
                max-width: 280px;
                padding: 15px;
            }
            .stat-item-simple h2 {
                font-size: 2rem;
            }
            .stat-item-simple p {
                font-size: 0.9rem;
            }
        }

        @media (max-width: 480px) {
            .stat-item-simple {
                padding: 10px;
            }
            .stat-item-simple h2 {
                font-size: 1.6rem;
            }
            .stat-item-simple p {
                font-size: 0.8rem;
            }
            .stat-icon {
                width: 35px;
                height: 35px;
            }
        }
        `}
      </style>
      {statsData.map((stat, index) => (
        <div className="stat-item-simple" key={index} ref={el => statRefs.current[index] = el}>
          <div className="text-container-simple">
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AboutExperience;