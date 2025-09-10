'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation'; // Correct import for App Router and search params
import { doctordata } from '../../doctors/doctors-component/Doctors'; // Adjust path as needed
import DoctorDetailsHeroSection from './DoctorDetailsHeroSection'; // Adjust path as needed

export function DoctorDetailsPage({ onBack }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [doctorData, setDoctorData] = useState(null);

    useEffect(() => {
        const name = searchParams.get('name');
        if (name) {
            const doctorName = decodeURIComponent(name);
            const foundDoctor = doctordata.find(doctor => doctor.name === doctorName);

            if (foundDoctor) {
                setDoctorData(foundDoctor);
            } else {
                console.error("Doctor not found:", doctorName);
                setDoctorData(null);
            }
        }
    }, [searchParams]);

    if (!doctorData) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', fontSize: '1.2em', color: '#555' }}>
                Loading doctor details or no data found...
            </div>
        );
    }

    return (
        <>
            {/* Your existing JSX and styles */}
            <style>
                {`
                /* Font Awesome import */
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');



                body::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 130%; /* Adjusted height slightly for better visual */
                    // background-color: #87CEEB;
                    // background: linear-gradient(to right, #e0f2f7, #cceeff);
                    z-index: -1;
                }

                .doctor-profile-container {
                    margin-top : 7%;
                    display: flex;
                    width: 90%;
                    max-width: 1300px;
                    position: relative;
                    z-index: 1;
                    flex-wrap: wrap;
                    margin : 0 auto;
                }

                .doctor-main-content {
                    display: flex;
                    width: 100%;
                }

                .doctor-left-panel{
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin: 20px;
                    border-radius: 15px;
                    overflow: hidden;
                }
                .doctor-right-panel {
                    margin: 20px;
                    overflow: hidden;
                }

                .doctor-left-panel {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-width: 500px;
                    height: 380px;
                }

                .doctor-image-wrapper {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-grow: 1;
                    box-sizing: border-box;
                    background-color: #fff;
                    border-top-left-radius: 15px;
                    border-top-right-radius: 15px;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    overflow: hidden;
                    min-height: 250px;
                }

                .doctor-image {
                    max-width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                }

                .department-button {
                    background-color: #3498db;
                    color: #fff;
                    padding: 15px 30px;
                    text-align: center;
                    font-weight: bold;
                    text-decoration: none;
                    width: 100%;
                    border-bottom-left-radius: 15px;
                    border-bottom-right-radius: 15px;
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                    box-sizing: border-box;
                }

                .doctor-right-panel {
                    flex: 2;
                    padding: 40px 0px 40px 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color: #333;
                    min-width: 500px;
                }
                .doctor-name {
                    font-size: 2.5em;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #333;
                }
                .doctor-specialty {
                    font-size: 1.5em;
                    color: #555;
                    margin-bottom: 20px;
                    font-weight : bold;
                }
                .doctor-description {
                    font-size: 1em;
                    line-height: 1.6;
                    color: #666;
                    margin-bottom: 30px;
                }
                
                .doctor-degrees-section h3 {
                        font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex
;
    align-items: center;
    color: #333;
                }
                .doctor-degrees-section h3::before {
                    font-family: 'Font Awesome 5 Free';
                    font-weight: 900;
                    content: '\\f19d'; /* fa-graduation-cap */
                    margin-right: 10px;
                    font-size: 1.2em;
                }
                .doctor-degrees-list {
                    list-style: none;
                    padding: 0;
                }
                .doctor-degrees-list li {
                    margin-bottom: 10px;
                    color: #666;
                    position: relative;
                    padding-left: 20px;
                    font-size : 1.1em;
                }
                .doctor-degrees-list li::before {
                    content: '•';
                    color: #3498db;
                    font-size: 1.2em;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .doctor-degree-detail {
                    font-size: 0.9em;
                    color: #888;
                    margin-left: 20px;
                }

                .section-card {
                    // margin: 20px;
                    // padding: 30px 0px 0px 30px;
                    color: #333;

                }

                .section-card h3 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    color: #333;
                }

                .section-card h3::before {
                    font-family: 'Font Awesome 5 Free';
                    font-weight: 900;
                    margin-right: 10px;
                    color: #333;
                    font-size: 1.2em;
                }

                .contact-info h3::before { content: '\\f095'; }
                .appointment-schedules h3::before { content: '\\f073'; }
                .experiences h3::before { content: '\\f0b1'; }
                .awards-achievements h3::before { content: '\\f091'; }

                .contact-item, .schedule-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    color: #666;
                    padding-right : 20px;
                    font-size : 1.3em;
                }

                .contact-item i, .schedule-item i {
                    margin-right: 10px;
                    color: #3498db;
                    font-size: 1.1em;
                }

                .schedule-item .day {
                    flex: 1;
                    font-weight: bold;
                        font-size: 0.9em;
                }

                .schedule-item .time {
                    display: flex;
                    align-items: center;
                    color: #555;
                        font-size: 0.9em;
                }

                .schedule-item .time i {
                    margin-right: 5px;
                    font-size: 1em;
                }

                .experiences ul, .awards-achievements ul {
                    list-style: none;
                    padding: 0;
                }

                .experiences li, .awards-achievements li {
                    margin-bottom: 15px;
                    color: #666;
                    position: relative;
                    padding-left: 20px;
                    line-height: 1.6;
                    font-size : 1.1em
                }

                .experiences li::before, .awards-achievements li::before {
                    content: '•';
                    color: #3498db;
                    font-size: 1.2em;
                    position: absolute;
                    left: 0;
                    top: 0;
                }

                /* New classes for the moved inline styles */
                .doctor-additional-content {
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                    max-width: 1400px;
                }

                .doctor-contact-schedule-panel {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 600px;
                        justify-content: space-between;
                }

                .doctor-experience-awards-panel {
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    min-width: 600px;
                        justify-content: space-between;

                }
@media (max-width: 1000px) {
                    .doctor-profile-container {
                        flex-direction: column;
                        width: 95%;
                        margin: 20px auto; /* Center container and add vertical margin */
                    }
                    .doctor-main-content {
                        flex-direction: column; /* Stack image and details vertically */
                    }
                        .doctor-left-panel {
                        margin : 0 auto;
                        max-width: 500px; /* Remove min-width for mobile */
                        
                    }
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .doctor-profile-container {
                        flex-direction: column;
                        width: 95%;
                        margin: 20px auto; /* Center container and add vertical margin */
                    }
                    .doctor-main-content {
                        flex-direction: column; /* Stack image and details vertically */
                    }

                    .doctor-left-panel {
                        order: 1; /* Image first */
                        min-width: unset; /* Remove min-width for mobile */
                        margin: 0 10px; /* Adjust horizontal margin for mobile */
                        border-bottom-left-radius: 0; /* Remove bottom radius for seamless connection */
                        border-bottom-right-radius: 0; /* Remove bottom radius for seamless connection */
                    }
                    body::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 30%; /* Adjusted height slightly for better visual */
                        background-color: #87CEEB;
                        z-index: -1;
                    }
                    .doctor-right-panel {

                        margin: 0 10px; /* Adjust horizontal margin for mobile */
                        margin-top: 0; /* Remove top margin to connect with image panel */
                        padding: 20px; /* Adjust padding for mobile */
                        min-width: unset; /* Remove min-width for mobile */
                    }

                    .doctor-image-wrapper {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                    }

                    .department-button {
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        border-bottom-left-radius: 15px;
                        border-bottom-right-radius: 15px;
                    }

                    .doctor-name {
                        font-size: 2em;
                    }
                    .doctor-specialty {
                        font-size: 1em;
                    }
                    .doctor-description {
                        font-size: 1em; /* Adjusted for mobile */
                    }
                    .doctor-degrees-section h4 {
                        font-size: 1.3em; /* Adjusted for mobile */
                    }
                    .doctor-degrees-list li {
                        font-size: 1.1em; /* Adjusted for mobile */
                    }
                    .doctor-degree-detail {
                        font-size: 0.8em; /* Adjusted for mobile */
                    }

                    /* Ensure section cards stack properly */
                    .doctor-profile-container > div:last-child {
                        flex-direction: column;
                    }

                    .section-card {
                        margin: 10px; /* Uniform margin for section cards */
                        min-width: unset;
                        padding: 20px; /* Uniform padding for section cards */
                    }
                    .section-card h3 {
                        font-size: 1.3em; /* Adjusted for mobile */
                    }
                    .contact-item, .schedule-item {
                        font-size: 1.1em; /* Adjusted for mobile */
                    }
                    .experiences li, .awards-achievements li {
                        font-size: 1.1em; /* Adjusted for mobile */
                    }

                    /* Mobile adjustments for new classes */
                    .doctor-additional-content {
                        flex-direction: column; /* Stack panels vertically */
                    }

                    .doctor-contact-schedule-panel,
                    .doctor-experience-awards-panel {
                        min-width: unset; /* Remove min-width for mobile */
                        margin: 0 10px 20px 10px; /* Add margin between stacked panels */
                    }
                }

                /* Further adjustments for very small screens */
                @media (max-width: 480px) {
                    .doctor-name {
                        font-size: 1.8em;
                    }
                    .doctor-specialty {
                        font-size: 0.9em;
                    }
                    .doctor-description {
                        font-size: 0.9em;
                    }
                    .doctor-degrees-section h4, .section-card h3 {
                        font-size: 1.1em;
                    }
                    .doctor-degrees-list li {
                        font-size: 1em; /* Further adjusted for very small screens */
                    }
                    .doctor-degree-detail {
                        font-size: 0.7em; /* Further adjusted for very small screens */
                    }
                    .department-button {
                        padding: 10px 20px;
                        font-size: 0.9em;
                    }
                    .contact-item, .schedule-item {
                        font-size: 1em; /* Further adjusted for very small screens */
                    }
                    .experiences li, .awards-achievements li {
                        font-size: 1em; /* Further adjusted for very small screens */
                    }
                }
                `}
            </style>
            <div className="doctor-profile-container">
                <div className="doctor-main-content">
                    <div className="doctor-left-panel">
                        <div className="doctor-image-wrapper">
                            <Image src={doctorData.image} alt={doctorData.name} className="doctor-image" width={370} height={250} />
                        </div>
                        <a className="department-button">{doctorData.department}</a>
                    </div>
                    <div className="doctor-right-panel">
                        <h2 className="doctor-name">{doctorData.name}</h2>
                        <p className="doctor-specialty">{doctorData.specialty}</p>
                        <p className="doctor-description">{doctorData.description}</p>


                    </div>
                </div>

                <div className="doctor-additional-content">
                    <div className="doctor-contact-schedule-panel">
                        <div className="doctor-degrees-section">
                            <h3>Degrees</h3>
                            <ul className="doctor-degrees-list">
                                {doctorData.degrees.map((degree, index) => (
                                    <li key={index}>
                                        {degree.institution}
                                        {/* <div className="doctor-degree-detail">{degree.detail}</div> */}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="section-card experiences">
                            <h3>Experiences</h3>
                            <ul>
                                {doctorData.experiences.map((experience, index) => (
                                    <li key={index}>{experience}</li>
                                ))}
                            </ul>
                        </div>


                    </div>

                    <div className="doctor-experience-awards-panel">

                    <div className="section-card awards-achievements">
                            <h3>Awards/Achievements</h3>
                            <ul>
                                {doctorData.awards.map((award, index) => (
                                    <li key={index}>{award}</li>
                                ))}
                            </ul>
                        </div>


                        <div className="section-card appointment-schedules">
                            <h3>OP Timing</h3>
                            {doctorData.schedules.map((schedule, index) => (
                                <div className="schedule-item" key={index}>
                                    <span className="day">{schedule.day}</span>
                                    <span className="time"><i className="far fa-clock"></i> {schedule.time}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}