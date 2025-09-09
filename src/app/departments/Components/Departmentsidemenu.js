"use client";
import React, { useState, useEffect } from 'react';

import DepartmentDetails from './DepartmentDetail'; // Assuming this component exists
import DepartmentTreatments from './DepartmentKeywords'; // Assuming this is your file


// Centralized Data
const departmentsData = [
  {
    id: 1,
    name: 'Nephrology',
    title: "Department of Nephrology",
    paragraphs: [
      "At Salem Gopi Hospital, our Nephrology Department delivers expert care for patients with acute and chronic kidney diseases. From diagnosis to advanced treatments, including dialysis and kidney transplants, our team of nephrologists ensures compassionate, safe, and effective care for patients of all ages."
    ],
    buttonText: "Learn More",
    imageUrl: "https://static.wixstatic.com/media/690369_12d1b576e211467e8c59d684b9c88117~mv2.jpg/v1/fill/w_1000,h_600,al_c,q_85/Nephrology.jpg", // Open-source image for Nephrology
    imageAlt: "Kidney Dialysis Machine",
    keywords: [
      {
        iconClass: "fas fa-heartbeat", // General health icon
        title: "Kidney Health Check-ups",
        description: "Early detection and monitoring of kidney function to prevent complications."
      },
      {
        iconClass: "fas fa-pump-medical", // Icon for medical pump/dialysis
        title: "Dialysis Services",
        description: "Advanced hemodialysis and peritoneal dialysis with modern machines and strict infection control."
      },
      {
        iconClass: "fas fa-hand-holding-medical", // Icon for medical care/transplant
        title: "Kidney Transplants",
        description: "Successful transplant programs, including complex ABO-incompatible cases, with excellent outcomes."
      },
      {
        iconClass: "fas fa-stethoscope", // Icon for general medical care
        title: "Hypertension & Diabetes-related Kidney Care",
        description: "Specialized management of kidney conditions caused by high blood pressure and diabetes."
      }
    ]
  },
  {
    id: 2,
    name: 'Urology',
    title: "Expert Urology & Kidney Stone Care in Salem",
    paragraphs: [
      "At Salem Gopi Hospital, Salem, our Urology Department combines expertise, advanced technology, and patient-focused care to treat a wide range of urinary and kidney conditions. From kidney stones to prostate health and bladder care, our specialists ensure safe, effective, and minimally invasive treatments. We are recognized as one of the leading urology hospitals in Salem, trusted by patients across the region."
    ],
    buttonText: "Learn More",
    imageUrl: "https://api.neohospital.com/uploads/categories/image-1716788528326-837446693-Urology.jpg", // Open-source image for Urology
    imageAlt: "Urology Examination",
    keywords: [
      {
        iconClass: "fas fa-gem", // Icon for kidney stones
        title: "Kidney Stone Treatment in Salem",
        description: "Get relief from kidney stones with advanced options like laser lithotripsy, endoscopic removal, and minimally invasive surgery. Fast recovery, less pain, and long-lasting results."
      },
      {
        iconClass: "fas fa-male", // Icon for male health
        title: "Prostate Health",
        description: "Specialized care for prostate enlargement (BPH) and prostate cancer, using modern diagnostic and surgical techniques."
      },
      {
        iconClass: "fas fa-toilet", // More specific icon for bladder/urinary tract
        title: "Bladder & Urinary Tract Care",
        description: "Expert diagnosis and treatment for urinary infections, bladder disorders, and incontinence, helping restore comfort and confidence."
      },
      {
        iconClass: "fas fa-venus-mars", // Icon for male/female health
        title: "Male Reproductive Health",
        description: "Comprehensive treatment for male infertility, erectile dysfunction, and sexual health concerns with personalized care plans."
      }
    ]
  },
  {
    id: 3,
    name: 'Dialysis',
    title: "Advanced Dialysis Services in Salem",
    paragraphs: [
      "The Dialysis Department at Salem Gopi Hospital offers Advanced Dialysis Services in Salem for patients with chronic kidney disease (CKD) and kidney failure. With cutting-edge dialysis machines, skilled nephrologists, and 24/7 emergency support, we provide safe, comfortable, and effective dialysis care."
    ],
    buttonText: "Learn More",
    imageUrl: "https://www.imec-int.com/_next/image?url=https%3A%2F%2Fdrupal.imec-int.com%2Fsites%2Fdefault%2Ffiles%2Fimported%2Frenal.jpg&w=3840&q=75", // Open-source image for Dialysis
    imageAlt: "Dialysis Machine in use",
    keywords: [
      {
        iconClass: "fas fa-pump-medical",
        title: "Hemodialysis in Salem",
        description: "Performed with advanced machines for safe and efficient toxin removal."
      },
      {
        iconClass: "fas fa-home",
        title: "Peritoneal Dialysis in Salem",
        description: "Flexible, home-based dialysis option for patient independence."
      },
      {
        iconClass: "fas fa-ambulance",
        title: "Emergency Dialysis in Salem",
        description: "24/7 advanced care for sudden kidney failure."
      },
      {
        iconClass: "fas fa-notes-medical",
        title: "Comprehensive Kidney Care",
        description: "Nutrition guidance, counseling, and transplant evaluation."
      }
    ]
  },
  {
    id: 4,
    name: 'Diabetology',
    title: "Comprehensive Diabetes Care in Salem",
    paragraphs: [
      "Managing diabetes is more than just controlling sugar levels — it’s about protecting your heart, kidneys, eyes, and overall well-being. At Salem Gopi Hospital, Salem, our Diabetology Department provides end-to-end care, from early detection to advanced treatment and lifestyle guidance. We work with patients to create a personalized diabetes plan that fits their health goals."
    ],
    buttonText: "Learn More",
    imageUrl: "https://f.hubspotusercontent30.net/hubfs/2027031/diabetes.jpeg", // Open-source image for Diabetology
    imageAlt: "Blood Glucose Monitor",
    keywords: [
      {
        iconClass: "fas fa-search",
        title: "Early Diagnosis",
        description: "Advanced screening tests for accurate detection."
      },
      {
        iconClass: "fas fa-syringe",
        title: "Type 1 & Type 2 Diabetes Care",
        description: "Tailored treatment plans for every patient."
      },
      {
        iconClass: "fas fa-baby",
        title: "Gestational Diabetes Support",
        description: "Safe management during pregnancy."
      },
      {
        iconClass: "fas fa-shield-alt",
        title: "Complication Prevention",
        description: "Protecting kidneys, nerves, heart & eyes from damage."
      }
    ]
  },
  {
    id: 5,
    name: 'Neurology',
    title: "Salem’s Lifeline for Brain & Nerve Health",
    paragraphs: [
      "When a stroke strikes or seizures disrupt life, every second matters. That’s why the Neurology Department at Salem Gopi Hospital is trusted as a leading neurology hospital in Salem — combining 24/7 emergency care, advanced MRI/EEG diagnostics, and expert neurologists in Salem to protect what matters most: your brain."
    ],
    buttonText: "Learn More",
    imageUrl: "https://www.asterhospitals.in/sites/default/files/styles/webp/public/CMI%20Bangalore/blogs/best-hospital-for-neurology-in-bangalore-08.png.webp?itok=B6UfamFh", // Open-source image for Neurology
    imageAlt: "Brain Scan",
    keywords: [
      {
        iconClass: "fas fa-brain",
        title: "Stroke Care in Salem",
        description: "Immediate response unit with clot-busting treatments to save lives."
      },
      {
        iconClass: "fas fa-wave-square", // Icon for EEG/brain waves
        title: "Epilepsy & Seizures",
        description: "Long-term care and monitoring with advanced neuro-diagnostics."
      },
      {
        iconClass: "fas fa-head-side-mask", // Icon for headache/mask
        title: "Headache & Migraine Clinic",
        description: "Relief programs designed for chronic headache sufferers in Salem."
      },
      {
        iconClass: "fas fa-walking",
        title: "Parkinson’s & Movement Disorders",
        description: "Treatment plans to improve mobility and independence."
      },
      {
        iconClass: "fas fa-bone", // Icon for spine/bone
        title: "Spine & Nerve Conditions",
        description: "Expert care for back pain, neuropathy, and spinal cord problems."
      }
    ]
  },
  {
    id: 6,
    name: 'Gastroenterology',
    title: "Healthy Digestion, Healthy Life – Advanced Gastro Care in Salem",
    paragraphs: [
      "From heartburn to liver disorders, stomach pain to digestive complications — your gut health plays a vital role in overall wellness. The Gastroenterology Department at Salem Gopi Hospital, Salem, offers comprehensive digestive care with modern endoscopy, advanced imaging, and expert gastroenterologists in Salem who specialize in both common and complex conditions."
    ],
    buttonText: "Learn More",
    imageUrl: "https://amcarehospital.com/wp-content/uploads/2022/10/GastroEndo-Image.jpg", // Open-source image for Gastroenterology
    imageAlt: "Digestive System Illustration",
    keywords: [
      {
        iconClass: "fas fa-fire", // Icon for heartburn
        title: "Acid Reflux & Heartburn",
        description: "Advanced treatment for GERD and chronic acidity."
      },
      {
        iconClass: "fas fa-hand-holding-medical", // Changed to a more general medical icon for liver/pancreas
        title: "Liver & Pancreas Disorders",
        description: "Specialized care for hepatitis, pancreatitis, and fatty liver disease."
      },
      {
        iconClass: "fas fa-bowling-ball", // Icon for IBS (abstract)
        title: "Irritable Bowel Syndrome (IBS) & Colitis",
        description: "Personalized management for digestive discomfort."
      },
      {
        iconClass: "fas fa-hand-holding-medical", // Changed to a general medical icon for stomach pain/ulcers
        title: "Stomach Pain & Ulcers",
        description: "Accurate diagnosis and effective treatment to restore comfort."
      },
      {
        iconClass: "fas fa-camera", // Icon for endoscopy
        title: "Endoscopy & Colonoscopy Services in Salem",
        description: "Early detection of digestive issues with advanced technology."
      }
    ]
  },
  {
    id: 7,
    name: 'Cardiology',
    title: "Expert Heart Specialists in Salem",
    paragraphs: [
      "Your heart deserves the best. The Cardiology Department at Salem Gopi Hospital, Salem, is dedicated to diagnosing, treating, and preventing heart and blood vessel diseases with cutting-edge technology and expert cardiologists in Salem. From routine check-ups to life-saving emergency care, we are one of the trusted cardiology hospitals in Salem for comprehensive heart care."
    ],
    buttonText: "Learn More",
    imageUrl: "https://www.ayushmanhhs.in/wp-content/uploads/2023/04/Clinical-Critical-Cardiology.jpg", // Open-source image for Cardiology
    imageAlt: "Heart Monitor",
    keywords: [
      {
        iconClass: "fas fa-heartbeat",
        title: "Heart Check-ups & Preventive Care",
        description: "ECG, echocardiogram, and cardiac screenings for early detection."
      },
      {
        iconClass: "fas fa-ambulance",
        title: "Emergency Cardiac Care in Salem",
        description: "24/7 availability for heart attacks, chest pain, and cardiac emergencies."
      },
      {
        iconClass: "fas fa-x-ray", // Icon for angiography
        title: "Angiography & Angioplasty",
        description: "Advanced interventional cardiology procedures for blocked arteries."
      },
      {
        iconClass: "fas fa-heart-broken", // Icon for heart failure
        title: "Heart Failure & Hypertension Management",
        description: "Long-term care for chronic conditions."
      },
      {
        iconClass: "fas fa-running",
        title: "Cardiac Rehabilitation Programs",
        description: "Lifestyle, diet, and recovery plans to strengthen your heart health."
      }
    ]
  }
];
console.log(JSON.stringify(departmentsData, null, 2));
// --- DepartmentMenu Component (Left Side) ---
const DepartmentMenu = ({ selectedDepartment, onDepartmentClick }) => {
  return (
    <div className="department-menu">
      <h3 className="department-menu-title">Departments</h3>
      <ul className="department-menu-list">
        {departmentsData.map((department) => (
          <li key={department.id} className="department-menu-item">
            <button
              onClick={() => onDepartmentClick(department.name)}
              className={`department-menu-button ${selectedDepartment && selectedDepartment.id === department.id ? 'selected' : ''}`}
            >
              {department.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Main Department Viewer Component (Orchestrator) ---
function  DepartmentViewer() {


  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    setSelectedDepartment(departmentsData[0]); // Default to first department
  }, []); // Run only once on component mount

  const handleDepartmentClick = (departmentName) => {
    const foundDepartment = departmentsData.find(
      (dept) => dept.name === departmentName
    );
    setSelectedDepartment(foundDepartment);
  };

  if (!selectedDepartment) {
    return <div>Loading department details...</div>; // Or a loading spinner
  }

  return (
    <div>

      <style>
        {`
        .department-viewer-container {
            display: flex;
            min-height: 100vh;
            background-color: #f4f7f6;
            flex-direction: row; /* Default for desktop: row */
        }

        .department-menu {
            width: 400px;
            background-color: #ffffff;
            padding: 30px 20px;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
            border-right: none;
            overflow-y: auto;
            max-height: calc(100vh - 80px); /* Adjust max-height to allow scrolling within the viewport, considering the top offset */
            display: flex;
            flex-direction: column;
            align-items: center;
            position: sticky; /* Make the menu sticky */
            top: 80px; /* Stick to the top of the viewport */
            align-self: flex-start; /* Ensure it aligns to the start of the flex container */
        }

        /* Custom scrollbar for desktop */
        .department-menu::-webkit-scrollbar {
            width: 5px; /* Adjust the width of the scrollbar */
        }

        .department-menu::-webkit-scrollbar-thumb {
            background-color: #007bff; /* Color of the scrollbar thumb */
            border-radius: 10px;
        }

        .department-menu::-webkit-scrollbar-track {
            background-color: #f1f1f1; /* Color of the scrollbar track */
        }

        .department-menu-title {
            font-size: 1.8em;
            color: #2c3e50;
            margin-bottom: 30px;
            font-weight: 600;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
            width: 80%;
            text-align: center;
        }

        .department-menu-list {
            list-style: none;
            padding: 0;
            width: 100%;
        }

        .department-menu-item {
            margin-bottom: 15px;
        }

        .department-menu-button {
            width: 100%;
            padding: 15px 20px;
            border: none;
            border-radius: 8px;
            background-color: #f8f9fa;
            color: #333;
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
            text-align: left;
            font-weight: 500;
            font-size: 1.1em;
            box-shadow: none;
        }

        .department-menu-button.selected {
            background-color: #007bff;
            color: #ffffff;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
        }

        .department-menu-button:not(.selected):hover {
            background-color: #e2e6ea;
            transform: translateX(5px);
        }

        .department-content-area {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 20px;
            overflow-y: auto;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .department-viewer-container {
                flex-direction: column; /* Stack content vertically, menu at top */
            }

            .department-menu {
                width: 94%; /* Full width for menu on small screens */
                max-height: none; /* Remove max-height for mobile menu */
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* Add shadow to bottom of menu */
                border-right: none;
                padding: 10px; /* Adjust padding */
                margin: 0 auto; /* Center the menu */
                position: static; /* Remove sticky for mobile */
                top: auto;
                align-self: auto;
            }

            /* Remove custom scrollbar for mobile */
            .department-menu::-webkit-scrollbar {
                width: 0;
            }

            .department-menu-title {
                font-size: 1.5em;
                margin-bottom: 20px;
                width: 90%; /* Adjust underline width */
            }

            .department-menu-item {
                margin-bottom: 10px;
            }

            .department-menu-button {
                padding: 12px 15px; /* Adjust button padding */
                font-size: 1em;
            }

            .department-content-area {
                padding: 15px; /* Adjust padding for content area */
            }
        }
        `}
      </style>
      <div className="department-viewer-container">
        {/* Left Menu (for desktop) */}
        <DepartmentMenu
          selectedDepartment={selectedDepartment}
          onDepartmentClick={handleDepartmentClick}
        />

        {/* Right Content Area (DepartmentHero and DepartmentTreatments stacked vertically) */}
        <div className="department-content-area">
          {/* DepartmentHero */}
          <DepartmentDetails content={selectedDepartment} />

          {/* DepartmentTreatments section, directly below DepartmentTreatments */}
          {selectedDepartment && selectedDepartment.keywords && (
            <DepartmentTreatments keywords={selectedDepartment.keywords} />
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentViewer;