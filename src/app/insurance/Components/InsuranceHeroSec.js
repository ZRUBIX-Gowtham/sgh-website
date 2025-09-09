import React from 'react';
import Image from 'next/image';
import Header from '../../common-components/header/page';

function InsuranceHeroSection() {
     const content = {
        title: "Accepted Insurance Plans at Salem Gopi Hospital",
        description: "We accept most major insurance plans at Salem Gopi Hospital. Our team will guide you through approvals and paperwork, making your healthcare journey smooth and worry-free.",
        imageUrl: "https://prohealth-react.vercel.app/images/doctors/banner_img.png",
        imageAlt: "Doctor smiling and holding out hand",
    pills: ['Cashless Treatment', 'Easy Approvals', 'Major Insurers']

    };

    return (
        <>
            <style>
                {`
                .insurance-hero-section {
                    background: linear-gradient(to right, #e0f2f7, #cceeff);
                    padding: 40px 0 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    min-height: 500px;
                }
                .insurance-hero-content {
                    display: flex;
                    align-items: center;
                    max-width: 1300px;
                    width: 100%;
                    box-sizing: border-box;
                    position: relative;
                    z-index: 1;
                }
                .text-container {
                    flex: 1;
                    padding-right: 40px;
                    color: #2c3e50;
                }
                .text-container h3 {
                    font-size: clamp(28px, 4vw, 44px);
                    line-height: 1.1;
                    font-weight: 900;
                    letter-spacing: -0.02em;
                    background:linear-gradient(92deg,#0b1324 0%,#274760 40%,#2f80ed 80%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    margin: 0 0 10px;
                }
                .text-container p {
                    font-size: 18px;
                    line-height: 1.6;
                    max-width: 500px;
                }
                .image-container {
                    flex: 1;
                    display: flex;
                    
                    justify-content: flex-end;
                    align-items: flex-end;
                    position: relative;
                }
                .image-container img {
                padding-top : 100px;
                    max-width: 110%;
                    height: auto;
                    display: block;
                }

                /* Pills styling */
                .pills {
                  display: flex;
                  gap: 10px;
                  flex-wrap: wrap;
                  margin-bottom: 14px;
                }
                .pill {
                  display: inline-flex;
                  align-items: center;
                  gap: 6px;
                  font-weight : 500;
                  padding: 6px 10px;
                  border-radius: 999px;
                  font-size: 12px;
                  letter-spacing: 0.02em;
                  background: rgba(47, 128, 237, 0.08);
                  color: #1f4e9b;
                  border: 1px solid rgba(47, 128, 237, 0.18);
                }

                /* Responsive adjustments */
                @media (max-width: 992px) {
                    .insurance-hero-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    .text-container {
                        padding-right: 0;
                        margin-bottom: 20px;
                        margin-top: 20px;
                    }
                    .text-container h3 {
                        font-size: 38px;
                    }
                    .text-container p {
                        max-width: 100%;
                    }
                    .image-container {
                        justify-content: center;
                        align-items: center;
                    }
                    .pills {
                        justify-content: center;
                    }
                }
                @media (max-width: 768px) {
                    .insurance-hero-section {
                        padding: 70px 15px 0px 15px;
                    }
                    .text-container h3 {
                        font-size: 30px;
                    }
                    .text-container p {
                        font-size: 16px;
                    }
                         .image-container img {
                padding-top : 10px;
                
                    max-width: 110%;
                    height: auto;
                    display: block;
                }
                }
                `}
            </style>
            <div><Header/></div>
            
            <section className="insurance-hero-section">
                <div className="insurance-hero-content">
                    <div className="text-container">
                        <div className="pills" aria-label="Specialties">
                            {content.pills.map((pill, idx) => (
                                <span className="pill" key={idx}>
                                    {pill}
                                </span>
                            ))}
                        </div>
                        <h3>{content.title}</h3>
                        <p>{content.description}</p>
                    </div>
                  <div className="image-container">
                        <Image src={content.imageUrl} alt={content.imageAlt} width={600} height={400} className="object-contain" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default InsuranceHeroSection;