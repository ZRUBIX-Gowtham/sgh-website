'use client';

import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from Next.js
import InsuranceHeroSection from './Components/InsuranceHeroSec';
import Map from '../home/components/Map';
import CommonFooter from '../common-components/footer/page';

function Insurance() {
  const pageData = {
    heading: "Insurance Company Tie Up",
    paragraph: "Gopi hospitals are the hospitals with where the insurance companies have a tie-up and wherein you can avail cashless treatment. The Gopi hospitals are chosen by the insurance companies based on their comprehensive background checks, effectiveness, and knowledge of the medical services they provide.",
    insuranceCompanies: [
      { name: "Government of Tamilnadu", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i2e41fe08ef8f4be58b29cb770b6fb111?orig=true" },
      { name: "The New India Assurance Co. Ltd.", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9id7d23d3b861e4cd99f4f40594d705577?orig=true" },
      { name: "Star Health", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i6247df20e2464f598e319910531f4d30?orig=true" },
      { name: "United India", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i162e0550424b4f96bfd89427ddb532f4?orig=true" },
      { name: "Allianz Global Assistance", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9iadc7b75b34054297a02c350ad33e6845?orig=true" },
      { name: "Health India", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i2196ccba205a44eaa211d6da43888072?orig=true" },
      { name: "Family Health Plan Insurance TPA Limited", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i7904b7ce8423462cadc1782835c2889f?orig=true" },
      { name: "Chola MS General Insurance", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i9edaab7108a94ade9585ab29728164a1?orig=true" },
      { name: "E-MEDITEK Insurance TPA Limited", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i19971424a29142d0b3cec72050e33754?orig=true" },
      { name: "Medi Assist", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i49ecdd47fafd45d2aa7d3eff3792c955?orig=true" },
      { name: "Future Generali Total Insurance Solutions", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i3a179b032bbe4ca7a124299fce52a332?orig=true" },
      { name: "HDFC ERGO General Insurance", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9ia4770048879a4142ac77faa8a3326c40?orig=true" },
      { name: "Heritage Health", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i5036ba4c9d4d459eb4bb6c9985c91801?orig=true" },
      { name: "IFFCO-TOKIO General Insurance", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i1881d63120d547cab9438e39a1b3b9ba?orig=true" },
      { name: "Good Health", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i4c0f03fcd4884a54a9193317a450d285?orig=true" },
      { name: "Genins India Insurance TPA LTD", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i93e850fee3ef4f469c2a6ad6a143dfed?orig=true" },
      { name: "Focus Healthcare Products", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i3fd2298b7a2d4c3eace9e93a6f66cd49?orig=true" },
      { name: "MD India", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i203aa696b916491b888a30299753db66?orig=true" },
      { name: "National Insurance", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9if9dabcbd188c4a1281ae61135636688a?orig=true" },
      { name: "Paramount Health", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9if68900a468c54461aec6206fe3ac1e2f?orig=true" },
      { name: "TTK Healthcare", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9ib60afb91ebbc423c85deade957c3b102?orig=true" },
      { name: "Titan Company", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9id7f971b2415e433b96058322491a028f?orig=true" },
      { name: "Religare", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i81741d52aaf2470eb8677113582c0dfc?orig=true" },
      { name: "MedSave India", logo: "https://files-accl.zohoexternal.com/public/workdrive-external/previewdata/36v9i38ad288ceb0e4762b399d5b499f7a682?orig=true" },
    ],
    // insuranceTypes is no longer needed for a textarea, but keeping it for reference if needed elsewhere
    insuranceTypes: [
      "Health Insurance",
      "Life Insurance",
      "Car Insurance",
      "Travel Insurance",
      "Home Insurance",
      "Business Insurance",
      "Other"
    ]
  };

  // SEO content for the Insurance page
  const seo = {
    title: "Gopi Hospital - Insurance Tie-ups | Cashless Treatment & Accepted Plans",
    description: "Discover Gopi Hospital's extensive list of insurance company tie-ups for cashless treatment. We partner with leading insurance providers to offer seamless healthcare services.",
    keywords: "Gopi Hospital, insurance tie-ups, cashless treatment, health insurance, medical insurance, accepted insurance plans, hospital network, insurance companies, Tamilnadu government insurance"
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '', // Email is no longer mandatory
    phone: '',
    insuranceDetails: '' // Changed to string for textarea
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // No longer need handleMultiSelectChange as it's a textarea now

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    // Email is no longer required, but still validate if provided
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone number must be 10 digits.";
    // insuranceDetails is now a textarea, so check if it's empty
    if (!formData.insuranceDetails.trim()) errors.insuranceDetails = "Please provide details about the insurance you need.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Replace with your actual webhook URL
    const webhookUrl = 'YOUR_WEBHOOK_URL_HERE'; // IMPORTANT: Replace this with your actual webhook URL

    const dataToSend = {
      title: "Enquire About Insurance", // Added title here
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
        alert('Form submitted successfully!');
        setShowModal(false);
        setFormData({ name: '', email: '', phone: '', insuranceDetails: '' }); // Reset form
        setFormErrors({}); // Clear errors
      } else {
        alert('Form submission failed. Please try again.');
        console.error('Webhook error:', response.statusText);
      }
    } catch (error) {
      alert('An error occurred during submission.');
      console.error('Submission error:', error);
    }
  };

  return (
    <>
      <style>{`
        .insurance-container {
          padding: 40px 30px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .insurance-heading {
              color: #212529;
    font-size: 40px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
        }

        .insurance-paragraph {
          font-size: 1.1em;
          color: #555;
          margin-bottom: 40px;
          line-height: 1.6;
          font-family: 'Arial', 'Helvetica Neue', 'Segoe UI', sans-serif; /* Added font-family */
        }

        .insurance-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr); /* Exactly 6 columns */
          gap: 60px; /* Gap between grid items */
          justify-items: center;
          margin-bottom: 40px;
        }

        .insurance-box {
          border: 1px solid #ddd;
          padding: 15px; /* Added padding inside the box */
          display: flex;
          flex-direction: column; /* Arrange content vertically */
          justify-content: center;
          align-items: center;
          height: 150px; /* Increased height to accommodate text */
          width: 130%; /* Take full width of grid column */
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: transform 0.2s ease-in-out;
          background-color: #fff; /* Ensure background is white */
          text-align: center; /* Center text below image */
        }

        .insurance-box:hover {
          transform: translateY(-5px);
        }

        .insurance-box img {
          max-width: 80px; /* Adjusted max-width for logos */
          max-height: 60px; /* Adjusted max-height for logos */
          object-fit: contain;
          margin-bottom: 8px; /* Space between image and text */
        }

        .insurance-box-name {
          font-size: 0.9em;
          color: #333;
          font-weight: 500;
        }

        .learn-more-button {
          background-color: #007bff;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 5px;
          font-size: 1.1em;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .learn-more-button:hover {
          background-color: #0056b3;
        }

        /* Modal Styles */
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
        .form-group textarea { /* Changed select to textarea */
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1em;
          box-sizing: border-box;
        }

        .form-group textarea { /* Specific styles for textarea */
          min-height: 100px;
          resize: vertical; /* Allow vertical resizing */
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

        /* Responsive adjustments for grid */
        @media (max-width: 1024px) {
          .insurance-grid {
            grid-template-columns: repeat(4, 1fr); /* 4 columns on medium screens */
          }
        }

        @media (max-width: 768px) {
          .insurance-heading {
            font-size: 2em;
          }
          .insurance-paragraph {
            font-size: 1em;
          }
          .insurance-grid {
            grid-template-columns: repeat(3, 1fr); /* 3 columns on tablets */
          }
        }

        @media (max-width: 480px) {
          .insurance-grid {
            grid-template-columns: 1fr 1fr; /* Two columns on very small screens */
          }
        }
      `}</style>
      <InsuranceHeroSection/>
      <div className="insurance-container">
        <h3 className="insurance-heading">{pageData.heading}</h3>
        <p className="insurance-paragraph">
          {pageData.paragraph}
        </p>
        <div className="insurance-grid">
          {pageData.insuranceCompanies.map((company, index) => (
            <div key={index} className="insurance-box">
              <Image src={company.logo} alt={company.name} width={80} height={60} objectFit="contain" />
              <span className="insurance-box-name">{company.name}</span>
            </div>
          ))}
        </div>
        <button className="learn-more-button" onClick={() => setShowModal(true)}>
          Learn More
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h4 className="modal-title">Enquire About Insurance</h4>
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
                  // Removed 'required' attribute
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
                <label htmlFor="insuranceDetails">Which insurance details do you need?</label>
                <textarea // Changed from select to textarea
                  id="insuranceDetails"
                  name="insuranceDetails"
                  value={formData.insuranceDetails}
                  onChange={handleInputChange} // Using handleInputChange for textarea
                  required // Made textarea mandatory
                  placeholder="e.g., I need details about health insurance for my family, specifically for cashless treatment at Gopi hospitals."
                ></textarea>
                {formErrors.insuranceDetails && <p className="form-error">{formErrors.insuranceDetails}</p>}
              </div>
              <button type="submit" className="form-submit-button">
                Submit
              </button>
            </form>
          </div>
          
        </div>
      )}
      <Map/>
      <CommonFooter/>
    </>
  );
}

export default Insurance;