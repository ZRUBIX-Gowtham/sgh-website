import React from 'react';
import Image from 'next/image'; // Import next/image

const DepartmentDetails = ({ content }) => {
  if (!content) {
    return <div>No department selected.</div>;
  }

  return (
    <div className="department-details-container">
      <style>
        {`
        .department-details-container {
           
            padding: 40px; /* Increased padding */
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            overflow: hidden; /* Ensure no overflow from rounded corners */
        }

        @media (min-width: 769px) {
            .department-details-container {
                flex-direction: row;
                text-align: left;
                justify-content: space-between; /* Space out content and image */
            }
        }

        .department-image-wrapper {
            width: 100%;
            max-width: 550px; /* Slightly larger image area */
            margin-bottom: 30px; /* Increased margin */
            border-radius: 10px; /* Rounded corners for image wrapper */
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow for image */
            transition: transform 0.3s ease-in-out; /* Hover effect */
        }

        .department-image-wrapper:hover {
            transform: scale(1.02); /* Slight zoom on hover */
        }

        @media (min-width: 769px) {
            .department-image-wrapper {
                flex-shrink: 0;
                margin-right: 40px; /* Increased margin */
                margin-bottom: 0;
            }
            .department-details-container:nth-child(even) .department-image-wrapper {
                order: 2;
                margin-right: 0;
                margin-left: 40px; /* Increased margin */
            }
        }

        .department-details-content {
            flex-grow: 1;
            padding: 0 15px; /* Add some horizontal padding */
        }

        .department-details-title {
            font-size: 34px; /* Larger title */
            color: #212529; /* Darker blue for title */
            margin-bottom: 25px; /* Increased margin */
            font-weight: 800; /* Bolder title */
            line-height: 1.2;
            text-transform: capitalize; /* Capitalize each word */
        }

        @media (max-width: 768px) {
            .department-details-title {
                font-size: 2em;
                margin-bottom: 20px;
            }
        }

        .department-details-paragraph {
            font-size: 1em; /* Slightly larger paragraph text */
            color: #444; /* Darker text for better readability */
            line-height: 1.8; /* Improved line height */
            margin-bottom: 20px; /* Increased margin */
            max-width: 850px; /* Wider text area */
        }

        @media (max-width: 768px) {
            .department-details-paragraph {
                font-size: 1.05em;
                margin-bottom: 15px;
            }
        }
        `}
      </style>
      <div className="department-image-wrapper">
        <Image
          src={content.imageUrl}
          alt={content.imageAlt}
          width={550} // Adjusted width
          height={400} // Adjusted height
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <div className="department-details-content">
        <h2 className="department-details-title">{content.title}</h2>
        {content.paragraphs.map((paragraph, index) => (
          <p key={index} className="department-details-paragraph">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default DepartmentDetails;