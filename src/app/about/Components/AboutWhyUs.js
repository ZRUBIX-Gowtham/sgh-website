import React from 'react';
import Image from 'next/image';

export function AboutWhyUs() {
    const featuresData = [
        {
            iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z",
            title: "Experienced Medical Professionals",
            description: "Our team includes experienced doctors, nurses, and other healthcare professionals who are dedicated to providing the best possible care to our patients."
        },
        {
            iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm4 0h-2V7h2v6z",
            title: "Comprehensive Services",
            description: "We offer a wide range of healthcare services, from preventive care to specialized treatment for complex conditions."
        },
        {
            iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4zm-3-8h6V7h-6v1z",
            title: "Patient-centered Approach",
            description: "We believe in treating each patient as an individual, and we take the time to understand your unique health needs and concerns."
        },
        {
            iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
            title: "State-of-the-art Facilities",
            description: "Our healthcare center is equipped with the latest technology and equipment to provide our patients with the most advanced care possible."
        }
    ];

    return (
        <div className="page-container">
            <style>
                {`
                /* Page Container for Centering */
                .page-container {
                    display: flex;
                    justify-content: center; /* Center content horizontally */
                    align-items: center; /* Center content vertically */
                    min-height: 100vh; /* Ensure container takes full viewport height */
                    padding: 20px; /* Add some padding around the main section */
                    background-color: #f8f9fa; /* Light grey background for the page */
                    line-height: 1.6;
                    color: #333;
                }

                /* AboutWhyUs Section Styling */
                .AboutWhyUs {
                    display: flex;
                    gap: 40px;
                    padding: 40px;
                    max-width: 1300px; /* Max width for the content */
                    overflow: hidden;
                    width: 100%; /* Ensure it takes full width within its container */
                }

                .AboutWhyUs .image-section {
                    flex: 1;
                    min-width: 300px;
                    border-radius: 15px;
                    overflow: hidden;
                    display: flex; /* Add flexbox to the container */
                    justify-content: center; /* Center horizontally */
                    align-items: center; /* Center vertically */
                    /* Animation for image section */
                    animation: fadeInScale 1s ease-out forwards;
                    position: relative; /* Added for Next.js Image component */
                }

                .AboutWhyUs .image-section img {
                    width: 100%;
                    height: 90%; /* Image height set to 90% */
                    object-fit: cover;
                    display: block;
                    border-radius: 15px;
                    /* Subtle hover effect */
                    transition: transform 0.3s ease-in-out;
                }

                .AboutWhyUs .image-section img:hover {
                    transform: scale(1.03);
                }

                .AboutWhyUs .content-section {
                    flex: 1.5;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .AboutWhyUs h3 {
                    font-size: 40px;
                    color: #333;
                    margin-bottom: 30px;
                    font-weight: bold;
                    text-align: left;
                    /* Animation for heading */
                    animation: slideInRight 1s ease-out forwards;
                }

                .AboutWhyUs .features-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 30px;
                }

                .AboutWhyUs .feature-item {
                    background-color: #fff;
                    padding: 25px;
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                    text-align: left;
                    border: 1px solid #eee;
                    /* Hover effect */
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                    /* Animation for feature items */
                    opacity: 0;
                    transform: translateY(20px);
                    animation: slideInUp 0.6s ease-out forwards;
                }

                .AboutWhyUs .feature-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .AboutWhyUs .feature-item .icon-circle {
                    width: 40px;
                    height: 40px;
                    background-color: #e0f2f7;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 15px;
                    /* Icon background hover effect */
                    transition: background-color 0.3s ease-in-out;
                }

                .AboutWhyUs .feature-item:hover .icon-circle {
                    background-color: #0056b3;
                }

                .AboutWhyUs .feature-item .icon-circle svg {
                    width: 24px;
                    height: 24px;
                    fill: #0056b3; /* Color for the SVG icon */
                    /* Icon fill hover effect */
                    transition: fill 0.3s ease-in-out;
                }

                .AboutWhyUs .feature-item:hover .icon-circle svg {
                    fill: #fff;
                }

                .AboutWhyUs .feature-item h4 {
                    font-size: 1.3em;
                    color: #333;
                    margin-bottom: 10px;
                    font-weight: 600;
                }

                .AboutWhyUs .feature-item p {
                    font-size: 0.95em;
                    color: #666;
                    line-height: 1.6;
                }

                /* Keyframe animations */
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
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
                @media (max-width: 992px) {
                    .AboutWhyUs {
                        flex-direction: column;
                        padding: 20px;
                        gap: 20px; /* Adjust gap for smaller screens */
                    }

                    .AboutWhyUs .image-section {
                        height: 300px;
                        min-width: unset;
                        animation: none; /* Disable animation on smaller screens */
                    }

                    .AboutWhyUs .content-section {
                        padding: 0;
                    }

                    .AboutWhyUs h3 {
                        text-align: center;
                        margin-top: 20px;
                        animation: none; /* Disable animation on smaller screens */
                    }

                    .AboutWhyUs .features-grid {
                        grid-template-columns: 1fr;
                    }
                    .AboutWhyUs .feature-item {
                        animation: none; /* Disable animation on smaller screens */
                    }
                }

                @media (max-width: 576px) {
                    .page-container {
                        padding: 10px; /* Reduce padding on very small screens */
                    }
                    .AboutWhyUs {
                        padding: 15px;
                        gap: 15px;
                    }

                    .AboutWhyUs h3 {
                        font-size: 2em;
                        margin-bottom: 20px;
                    }

                    .AboutWhyUs .feature-item {
                        padding: 20px;
                    }

                    .AboutWhyUs .feature-item h4 {
                        font-size: 1.2em;
                    }

                    .AboutWhyUs .feature-item p {
                        font-size: 0.9em;
                    }
                }
                `}
            </style>
            <div className="AboutWhyUs">
                <div className="image-section">
                    <Image src="https://prohealth-react.vercel.app/images/about/why_choose_us.jpeg" alt="Doctor and patient discussing" layout="fill" objectFit="cover" />
                </div>
                <div className="content-section">
                    <h3>Why Choose Us</h3>
                    <div className="features-grid">
                        {featuresData.map((feature, index) => (
                            <div className="feature-item" key={index} style={{ animationDelay: `${0.2 * index}s` }}>
                                <div className="icon-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d={feature.iconPath} />
                                    </svg>
                                </div>
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}




export function AboutWhyUsMobile() {
    const featuresData = [
        {
            iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z",
            title: "Experienced Medical Professionals",
            description: "Our team includes experienced doctors, nurses, and other healthcare professionals who are dedicated to providing the best possible care to our patients."
        },
        {
            iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm4 0h-2V7h2v6z",
            title: "Comprehensive Services",
            description: "We offer a wide range of healthcare services, from preventive care to specialized treatment for complex conditions."
        },
        {
            iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4zm-3-8h6V7h-6v1z",
            title: "Patient-centered Approach",
            description: "We believe in treating each patient as an individual, and we take the time to understand your unique health needs and concerns."
        },
        {
            iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
            title: "State-of-the-art Facilities",
            description: "Our healthcare center is equipped with the latest technology and equipment to provide our patients with the most advanced care possible."
        }
    ];

    return (
        <div className="page-container-mobile">
            <style>
                {`
                /* Page Container for Centering */
                .page-container-mobile {
                    display: flex;
                    justify-content: center; /* Center content horizontally */
                    align-items: center; /* Center content vertically */
                    min-height: 100vh; /* Ensure container takes full viewport height */
                    padding: 15px; /* Add some padding around the main section */
                    background-color: #f8f9fa; /* Light grey background for the page */
                    font-family: Arial, sans-serif; /* Apply font to the container */
                    line-height: 1.6;
                    color: #333;
                }

                /* AboutWhyUsMobile Section Styling */
                .AboutWhyUsMobile {
                    display: flex;
                    flex-direction: column; /* Stack items vertically for mobile */
                    gap: 20px; /* Adjust gap for smaller screens */
                    padding: 20px;
                    max-width: 600px; /* Max width for mobile content */
                    overflow: hidden;
                    width: 100%; /* Ensure it takes full width within its container */
                }

                .AboutWhyUsMobile .image-section-mobile {
                    width: 100%; /* Full width for image */
                    height: 250px; /* Fixed height for mobile image */
                    border-radius: 15px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative; /* Added for Next.js Image component */
                }

                .AboutWhyUsMobile .image-section-mobile img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    border-radius: 15px;
                }

                .AboutWhyUsMobile .content-section-mobile {
                    width: 100%; /* Full width for content */
                    padding: 0; /* No extra padding here */
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .AboutWhyUsMobile h3 {
                    font-size: 2em; /* Smaller font size for mobile heading */
                    color: #333;
                    margin-bottom: 25px;
                    font-weight: bold;
                    text-align: center; /* Center align heading for mobile */
                }

                .AboutWhyUsMobile .features-grid-mobile {
                    display: grid;
                    grid-template-columns: 1fr; /* Single column for features on mobile */
                    gap: 20px; /* Adjust gap for mobile features */
                }

                .AboutWhyUsMobile .feature-item-mobile {
                    background-color: #fff;
                    padding: 20px; /* Smaller padding for mobile feature items */
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                    text-align: left;
                    border: 1px solid #eee;
                }

                .AboutWhyUsMobile .feature-item-mobile .icon-circle-mobile {
                    width: 35px; /* Smaller icon circle */
                    height: 35px;
                    background-color: #e0f2f7;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 12px;
                }

                .AboutWhyUsMobile .feature-item-mobile .icon-circle-mobile svg {
                    width: 22px; /* Smaller SVG icon */
                    height: 22px;
                    fill: #0056b3;
                }

                .AboutWhyUsMobile .feature-item-mobile h4 {
                    font-size: 1.2em; /* Smaller font size for feature titles */
                    color: #333;
                    margin-bottom: 8px;
                    font-weight: 600;
                }

                .AboutWhyUsMobile .feature-item-mobile p {
                    font-size: 0.9em; /* Smaller font size for feature descriptions */
                    color: #666;
                    line-height: 1.5;
                }
                `}
            </style>
            <div className="AboutWhyUsMobile">
                <div className="image-section-mobile">
                    <Image src="https://prohealth-react.vercel.app/images/about/why_choose_us.jpeg" alt="Doctor and patient discussing" layout="fill" objectFit="cover" />
                </div>
                <div className="content-section-mobile">
                    <h3>Why Choose Us</h3>
                    <div className="features-grid-mobile">
                        {featuresData.map((feature, index) => (
                            <div className="feature-item-mobile" key={index}>
                                <div className="icon-circle-mobile">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d={feature.iconPath} />
                                    </svg>
                                </div>
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}