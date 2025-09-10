'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

// This data represents doctors, not departments
export const doctordata = [
  {
    id: 1,
    name: "Dr D Mahadevan MD.,DM",
    specialty: "Neurology",
    description: "Dr. D. Mahadevan, Senior Consultant Neurologist at Salem Gopi Hospital, has 29 years of experience in managing complex neurological conditions with expertise in headache , stroke, Parkinson’s, epilepsy, and neurocritical care. He holds an MBBS from Mysore University and MD in General Medicine from Kasturba Medical College, DM in Neurology from Medras Medical College, chennai with multiple research contributions.",
    image: "https://prohealth-react.vercel.app/images/doctors/doctor_1.png",
    department: "Neurology",
    degrees: [
        {
            institution: "Mysore University, Karnataka (MBBS)",
        },
        {
            institution: "Kasturba Medical College, Mangalore (MD General Medicine)",
        },
        {
            institution: "Madras Medical College, Chennai (DM Neurology)",
        }
    ],
    
    schedules: [
        { day: "Monday - Saturday", time: "9 AM to 7 PM" },
    ],
    experiences: [
        "Consultant - Salem Gopi Hospital 25 years of Neurology care",
    ],
    awards: [
        "Best Outgoing student during MBBS with 9 Gold medal and University 1st Rank",
        "Won the best outgoing student in MD"
    ]
  },
  {
    id: 2,
    name: "Dr A P Subburaj M.S.,FIAGES",
    specialty: "Surgical Gastroenterology",
    description: "Dr. A. P. Subburaj, Gastrointestinal Surgeon at Salem Gopi Hospital, has 30 years of experience specializing in intestinal obstruction, gall bladder and stomach surgeries, endoscopy, and adrenal gland removal. He holds an MBBS, MS in General Surgery, and a Fellowship from the Indian Association of Gastrointestinal Endosurgeons, with active contributions to research and clinical workshops",
    image: "https://prohealth-react.vercel.app/images/doctors/doctor_1.png",
    department: "Surgical Gastroenterology",
    degrees: [
        {
            institution: "MBBS",
        },
        {
            institution: "MS General surgery",
        },
        {
            institution: "Fellowship of Indian Association of Gastrointestinal Endosurgeons",
        }
    ],
    
    schedules: [
        { day: "Monday - Saturday", time: "4 PM to 6 PM" },
    ],
    experiences: [
        "Consultant - Salem Gopi Hospital",
    ],
    awards: [
        "Fellowship of Indian Association of Gastrointestinal Endosurgeons",
        
    ]
  },
  {
    id: 3,
    name: "Dr.P. PUGAZHENTHI M.S.,M.Ch",
    specialty: "",
    description: "",
    image: "https://prohealth-react.vercel.app/images/doctors/doctor_1.png",
    department: "",
    degrees: [
        {
            institution: "",
        },
        {
            institution: "",
        },
        {
            institution: "",
        }
    ],
    
    schedules: [
        { day: "Monday - Saturday", time: "4 PM to 6 PM" },
    ],
    experiences: [
        "",
    ],
    awards: [
        "",
        
    ]
  },
  {
    id: 4,
    name: "Dr. Praveen Kumar S MS., M.CH (Uro)",
    specialty: "",
    description: "",
    image: "https://prohealth-react.vercel.app/images/doctors/doctor_1.png",
    department: "",
    degrees: [
        {
            institution: "",
        },
        {
            institution: "",
        },
        {
            institution: "",
        }
    ],
    
    schedules: [
        { day: "Monday - Saturday", time: "4 PM to 6 PM" },
    ],
    experiences: [
        "",
    ],
    awards: [
        "",
        
    ]
  },
  {
    id: 5,
    name: "Dr C. Krishna Kumar M.D., D.M.,FESC",
    specialty: "Interventional Cardiology, Angioplasty - PTCA, Coronary Anigoram, Pacemaker",
    description: "Dr. C. Krishna Kumar, Cardiologist at Salem Gopi Hospital, has 15 years of experience with expertise in angioplasty, pacemaker insertion, cardiac imaging, and advanced cardiac procedures. He holds an MBBS, MD in General Medicine, and DM in Cardiology, with active involvement in research and clinical workshops.",
    image: "https://prohealth-react.vercel.app/images/doctors/doctor_1.png",
    department: "Cardiology",
    degrees: [
        {
            institution: "MBBS",
        },
        {
            institution: "MD General Medicine",
        },
        {
            institution: "DM Cardiology",
        }
    ],
    
    schedules: [
        { day: "Monday - Saturday", time: "3 PM to 4 PM" },
    ],
    experiences: [
        "Consultant - Salem Gopi Hospital",
    ],
    awards: [
        "None",
        
    ]
  },
  {
    id: 6,
    name: "Dr. Kamalanathan MS ., DNB",
    specialty: "Orthopaedics",
    description: "",
    image: "https://prohealth-react.vercel.app/images/doctors/doctor_1.png",
    department: "Orthopaedics",
    degrees: [
        {
            institution: "MBBS",
        },
        {
            institution: "MS Orthopaedics",
        },
        {
            institution: "Diploma in Orthopaedics",
        },
        {
            institution: "DNB Orthopaedics",
        }
    ],
    
    schedules: [
        { day: "Monday - Saturday", time: "" },
    ],
    experiences: [
        "Consultant - Salem Gopi Hospital",
    ],
    awards: [
        "None",
        
    ]
  },
  {
    id: 7,
    name: "Dr.. M.R. Madan Karthik Raj MS FIAGES FMAS Dip MAS",
    specialty: "General Surgery / Endoscopy",
    description: "Dr. Madan Karthik Raj - with more than of 15 years of experience in Laparoscopic Surgeries - Appendix Removal , Gall Bladder Removal , Various Hernia Surgeries, Piles ,Fistula in ano , Fissure in ano surgeries and  Endoscopic Interventions - Diagnostic Endoscopy / Colonoscopy , Interventional Endoscopy - Banding for Oesophageal Varices , Stenting for GI Malignancies etc.",
    image: "https://prohealth-react.vercel.app/images/doctors/doctor_1.png",
    department: "General",
    degrees: [
        {
            institution: "Gvt Mohan kumaramangalam Medical College,Salem (MBBS)",
        },
        {
            institution: "Rajah Muthaih Medical College , Chidambaram (MS)",
        },
        {
            institution: "Diploma in Advanced Minimal Access Surgery (Dip MAS)",
        }
    ],
    
    schedules: [
        { day: "Monday - Saturday", time: "1 pm to 3 pm & on calls" },
    ],
    experiences: [
        "Worked as Consultant in Apollo Hospital ,Vellore and Karur",
        "Worked in GEM Hospital, Coimbatore"
    ],
    awards: [
        "Fellowship in Minimal Access Surgery (FMAS)",
        "Fellowship of Indian Association of Gastrointestinal Endosurgeons (FIAGES)",
        
    ]
  },
  {
    id: 8,
    name: "Dr G Gopalan MBBS, MS (ENT), MCh (Plastic Surgeon)",
    specialty: "Plastic and Reconstructive Surgery, Ear Nose Throat (ENT)",
    description: "Dr. G. Gopalan, Plastic Surgeon at Sri Surakkshaa Hospital and Salem Gopi Hospital, has 10 years of experience in plastic and reconstructive surgery across various cities in India. He holds an MBBS, MS in ENT, and MCh in Plastic Surgery, with active contributions to research and clinical workshops.",
    image: "https://prohealth-react.vercel.app/images/doctors/doctor_1.png",
    department: "Surgery",
    degrees: [
        {
            institution: "",
        },
        {
            institution: "",
        },
        {
            institution: "",
        }
    ],
    
    schedules: [
        { day: "Monday - Saturday", time: "" },
    ],
    experiences: [
        "",
    ],
    awards: [
        "",
    ]
  },
];

export const DoctorsList = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // Default to 'list' view
  const router = useRouter();

  const handleBoxClick = (doctor) => {
    const url = `/doctor-details?name=${encodeURIComponent(doctor.name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredDoctors = doctordata.filter(doctor => {
    if (activeFilter === 'All') {
      return true;
    }
    // Normalize department names for comparison
    return doctor.department.toLowerCase().includes(activeFilter.toLowerCase());
  });

  // Extract unique department names for filters, excluding "Department" suffix
  const uniqueDepartments = ['All', ...new Set(doctordata.map(doctor => {
    const departmentName = doctor.department.replace(' Department', '');
    return departmentName;
  }))].filter(Boolean); // Filter out any empty strings if they occur

  return (
    <div>
      <div className="doctors-list-container">
        <h3>Our Doctors</h3>

        <div className="sort-and-view-controls">
          <div className="sort-by-section">
            <span className="sort-by-label">Sort By</span>
            <div className="filter-buttons">
              {uniqueDepartments.map(department => (
                <button
                  key={department}
                  className={`filter-button ${activeFilter === department ? 'active' : ''}`}
                  onClick={() => setActiveFilter(department)}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>

          <div className="view-controls">
            <span className="item-count">Showing {filteredDoctors.length} items</span>
            {/* Only show view toggle buttons on larger screens */}
            <div className="view-toggle-buttons desktop-only">
              <button
                className={`view-toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                {/* Grid icon - using a simple square for now, replace with Font Awesome if available */}
                <i className="fas fa-th-large"></i> 
              </button>
              <button
                className={`view-toggle-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                {/* List icon - using a simple list for now, replace with Font Awesome if available */}
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        <div className={`doctors-grid ${viewMode === 'list' ? 'doctors-list-view' : ''}`}>
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`doctor-card ${viewMode === 'list' ? 'doctor-card-list-item' : ''}`}
              onClick={() => handleBoxClick(doctor)}
            >
              <div className="doctor-card-image-wrapper">
                <img src={doctor.image} alt={doctor.name} className="doctor-card-image" />
              </div>
              <a href="#" className="doctor-card-department-button">{doctor.department}</a>
              <div className="doctor-card-content">
                <div>
                  <h3 className="doctor-card-name">{doctor.name}</h3>
                  <p className="doctor-card-specialty">{doctor.specialty}</p>
                </div>
                <p className="doctor-card-description">{doctor.description.substring(0, 100)}...</p> {/* Show a snippet */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles for DoctorsList */}
      <style>
        {`
        /* Import Font Awesome for icons */
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

        .doctors-list-container {
            padding: 20px;
            font-family: Arial, sans-serif;
            max-width: 1300px; /* Set max-width to 1300px */
            margin: 0 auto; /* Center the container */
        }

        .doctors-list-container h3 {
            text-align: left;
            margin-bottom: 30px;
            font-size: 2em;
            color: #333;
        }

        .sort-and-view-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding: 10px 0;
            flex-wrap: wrap; /* Allow wrapping on smaller screens */
        }

        .sort-by-section {
            display: flex;
            align-items: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .sort-by-label {
            font-weight: bold;
            color: #555;
            font-size: 1.1em;
        }

        .filter-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .filter-button {
            padding: 10px 20px;
            border: 1px solid #ccc;
            border-radius: 25px;
            background-color: #fff;
            color: #555;
            cursor: pointer;
            font-size: 0.95em;
            transition: all 0.3s ease;
            white-space: nowrap; /* Prevent text wrapping */
        }

        .filter-button:hover {
            border-color: #3498db;
            color: #3498db;
        }

        .filter-button.active {
            background-color: #3498db;
            color: #fff;
            border-color: #3498db;
            box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
        }

        .view-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-left: auto; /* Push to the right */
            flex-wrap: wrap;
        }

        .item-count {
            color: #777;
            font-size: 0.95em;
        }

        .view-toggle-buttons {
            display: flex;
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow: hidden;
        }

        .view-toggle-button {
            padding: 8px 12px;
            background-color: #fff;
            border: none;
            cursor: pointer;
            color: #777;
            font-size: 1.1em;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .view-toggle-button:first-child {
            border-right: 1px solid #ccc;
        }

        .view-toggle-button.active {
            background-color: #3498db;
            color: #fff;
        }

        .view-toggle-button:hover:not(.active) {
            background-color: #f0f0f0;
        }

        .doctors-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px; /* Space between cards */
        }

        /* List View Specific Styles */
        .doctors-list-view {
            flex-direction: column; /* Stack items vertically */
            align-items: center; /* Center items in list view */
        }

        .doctor-card {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: calc(33.333% - 20px); /* Three cards per row with gap */
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center; /* Centered for grid view */
            padding-bottom: 20px; /* Padding for content below the button */
            cursor: pointer;
            transition: transform 0.2s ease-in-out;
        }
            .doctor-card h3{
            text-align: center; /* Centered for grid view */
            
        }

        .doctor-card:hover {
            transform: translateY(-5px);
        }

        /* List view card adjustments */
        .doctor-card-list-item {
            width: 90%; /* Wider for list view */
            flex-direction: row; /* Arrange content horizontally */
            text-align: left; /* Left-aligned for list view */
            padding: 15px;
            align-items: flex-start; /* Align items to the start */
            position: relative; /* Allow absolute positioning of button */
            height: 250px; /* Let content dictate height */
        }

        .doctor-card-list-item .doctor-card-image-wrapper {
            width: 150px; /* Smaller image for list view */
            height: 150px;
            border-radius: 10px; /* Keep rounded corners */
            flex-shrink: 0; /* Prevent image from shrinking */
            margin-right: 20px;
            margin-top: 0; /* Reset margin-top from grid view */
        }

        .doctor-card-list-item .doctor-card-department-button {
            position: absolute; /* Position relative to the card */
            top: 180px; /* Adjust to be below the image */
            left: 15px; /* Align with the image */
            margin-top: 0; /* Reset margin-top */
            margin-bottom: 0; /* Reset margin-bottom */
            align-self: auto; /* Reset align-self */
        }

        .doctor-card-list-item .doctor-card-content {
            padding: 0; /* Remove padding as it's handled by parent */
            text-align: left;
            flex-grow: 1;
            padding-top: 10px; /* Add some top padding to align with image */
            padding-left: 10px; /* Add some left padding */
        }

        .doctor-card-list-item .doctor-card-name {
            font-size: 1.3em;
        }

        .doctor-card-list-item .doctor-card-specialty {
            font-size: 0.8em;
        }

        .doctor-card-list-item .doctor-card-description {
            font-size: 0.8em;
            margin-bottom: 0;
        }


        .doctor-card-image-wrapper {
            width: 100%;
            height: 400px; /* Set height to 400px */
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e0f2f7; /* Light blue background for image area */
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .doctor-card-image {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Ensure image covers the area */
        }

        .doctor-card-department-button {
            background-color: #3498db;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: -25px; /* Overlap with the image */
            position: relative;
            z-index: 1;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
        }

        .doctor-card-content {
            padding: 20px;
            flex-grow: 1; /* Allows content to take available space */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .doctor-card-name {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }

        .doctor-card-specialty {
            font-size: 0.9em;
            color: #555;
            margin-bottom: 15px;
        }

        .doctor-card-description {
            font-size: 0.85em;
            color: #666;
            line-height: 1.5;
            margin-bottom: 15px;
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
            .doctor-card {
                width: calc(50% - 20px); /* Two cards per row */
            }
            .doctor-card-list-item {
                width: 95%; /* Adjust for smaller screens in list view */
            }
        }

        @media (max-width: 768px) {
            .doctor-card {
                width: calc(100% - 5px); /* One card per row */
            }
            .sort-and-view-controls {
                flex-direction: column;
                align-items: flex-start;
                gap: 20px;
            }
            .view-controls {
                margin-left: 0; /* Reset margin for mobile */
                width: 100%;
                justify-content: space-between;
            }
            .sort-by-section {
                width: 100%;
            }
            .filter-buttons {
                width: 100%;
                justify-content: center;
            }
            .doctor-card-list-item {
                flex-direction: column; /* Stack content vertically in list view on small screens */
                align-items: center;
                text-align: center;
                height : auto;
            }
            .doctor-card-list-item .doctor-card-image-wrapper {
                margin-right: 0;
                margin-bottom: 15px;
            }
            .doctor-card-list-item .doctor-card-department-button {
                position: static; /* Reset position for small screens */
                margin-top: 10px; /* Add some space */
                margin-bottom: 10px;
            }
            .doctor-card-list-item .doctor-card-content {
                padding-top: 0; /* Reset padding */
                padding-left: 0;
            }
            /* Hide view toggle buttons on mobile */
            .view-toggle-buttons {
                display: none;
            }
        }
        `}
      </style>
      
    </div>
    
  );
};
