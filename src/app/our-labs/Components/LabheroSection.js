import React from 'react';
import Image from 'next/image';

function LabHeroSection() {
    const content = {
        title: "Discover Our Laboratory",
        description: "At Gopi Hospital, our advanced laboratory is equipped with cutting-edge technology and staffed by experienced professionals dedicated to accurate and timely diagnostic testing. We offer a comprehensive range of lab services to support precise diagnoses and effective treatment plans.",
        imageUrl: "https://prohealth-react.vercel.app/images/doctors/banner_img.png",
        imageAlt: "Modern laboratory equipment or a lab technician at work" // Updated alt text for relevance
    };

    return (
        <>
            <style>
                {`
                .prohealth-section {
                    background: linear-gradient(to right, #e0f2f7, #cceeff);
                    padding: 40px 0 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    min-height: 500px;
                }
                .prohealth-content {
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
                    font-size: 48px;
                    margin-bottom: 20px;
                    line-height: 1.2;
                    font-weight: bold;
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
                /* Responsive adjustments */
                @media (max-width: 992px) {
                    .prohealth-content {
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
                }
                @media (max-width: 768px) {
                    .prohealth-section {
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
            {/* <div><Header/></div> */}
            
            <section className="prohealth-section">
                <div className="prohealth-content">
                    <div className="text-container">
                        <h3>{content.title}</h3>
                        <p>{content.description}</p>
                    </div>
                    <div className="image-container">
                        <Image src={content.imageUrl} alt={content.imageAlt} width={600} height={400} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default LabHeroSection;
