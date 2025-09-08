'use client';

import React, { useState, useEffect } from 'react';


export function BookNow() {
    // State for form fields
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [medicalRecord, setMedicalRecord] = useState('');
    const [reason, setReason] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('Diabetes'); // Default to Pediatric

    // Function to handle department selection
    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    // Function to handle form submission
    const handleFormSubmission = async (event) => {
        event.preventDefault();

        const formData = {
            name,
            phone,
            medicalRecord,
            reason,
            preferredDate,
            preferredTime,
            selectedDepartment,
        };

        const webhookUrl = 'https://play.svix.com/in/e_fj8CbU3MjuXGTohGwvtBBTd4M1z/';

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Appointment details sent successfully!');
                console.log('Webhook response:', await response.json());
                // Reset form fields
                setName('');
                setPhone('');
                setMedicalRecord('');
                setReason('');
                setPreferredDate('');
                setPreferredTime('');
                setSelectedDepartment('Pediatric'); // Reset to default
            } else {
                alert('Failed to send appointment details. Please try again.');
                console.error('Webhook error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error sending data to webhook:', error);
            alert('An error occurred while sending appointment details. Check console for more info.');
        }
    };

    return (
        <>
            <style>
                {`
                    /* Removed body styling */

                    .container {
                        z-index: 1;
                        position: relative; /* Added to enable z-index */
                        background-color: #ffffff;
                        border-radius: 15px;
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                        padding: 40px;
                        width: 100%;
                        max-width: 1400px;
                        box-sizing: border-box;
                        /* Centering and margin-top applied here */
                        margin: 210px auto 40px auto; /* 210px top margin, auto for left/right to center */
                        display: block; /* Ensure it behaves as a block for margin: auto to work */
                        // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        color: #333; /* Moved from body */
                        background-color: #e9eff6; /* Moved from body, if you want it on the container itself */
                    }

                    header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 50px;
                        border-bottom: 2px solid #f0f0f0;
                        padding-bottom: 25px;
                    }

                    header h1 {
                        color: #2c3e50;
                        font-size: 32px;
                        margin: 0;
                        font-weight: 600;
                    }

                    .navbooknow { /* Changed from nav */
                        display: flex;
                        align-items: center;
                    }

                    .department-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                        display: flex;
                        gap: 30px;
                        font-size: 17px;
                        color: #7f8c8d;
                        font-weight: 500;
                    }

                    .department-list li {
                        cursor: pointer;
                        padding: 8px 0;
                        position: relative;
                        transition: color 0.3s ease;
                    }

                    .department-list li::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: -5px;
                        width: 0;
                        height: 3px;
                        background-color: #3498db;
                        border-radius: 2px;
                        transition: width 0.3s ease-in-out;
                    }

                    .department-list li:hover,
                    .department-list li.active {
                        color: #3498db;
                    }

                    .department-list li:hover::after,
                    .department-list li.active::after {
                        width: 100%;
                    }

                    .book-now-btn {
                        background-color: #3467B1;
                        color: #fff;
                        border: none;
                        border-radius: 30px;
                        padding: 12px 25px;
                        font-size: 17px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-left: 40px;
                        transition: background-color 0.3s ease, transform 0.2s ease;
                        font-weight: 600;
                        box-shadow: 0 4px 10px rgba(52, 103, 177, 0.3);
                    }

                    .book-now-btn:hover {
                        background-color: #2a538e;
                        transform: translateY(-2px);
                    }

                    .book-now-btn i {
                        font-size: 15px;
                    }

                    .form-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 35px;
                    }

                    .form-field {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        padding: 20px;
                        border-radius: 10px;
                        background-color: #f8fafd;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                        transition: box-shadow 0.3s ease, transform 0.3s ease; /* Added transform transition */
                    }

                    .form-field:focus-within {
                        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
                    }

                    .form-field:hover { /* Added hover effect for form-field */
                        transform: translateY(-5px);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                    }

                    .icon-circle {
                        background-color: #eaf4fb;
                        color: #3498db;
                        width: 55px;
                        height: 55px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 24px;
                        flex-shrink: 0;
                        box-shadow: 0 2px 5px rgba(52, 152, 219, 0.2);
                    }

                    .input-group {
                        flex-grow: 1;
                    }

                    .input-group label {
                        display: block;
                        font-size: 15px;
                        color: #7f8c8d;
                        margin-bottom: 8px;
                        font-weight: 500;
                    }

                    .input-group input[type="text"],
                    .input-group input[type="email"],
                    .input-group input[type="tel"],
                    .input-group input[type="date"],
                    .input-group input[type="time"] {
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        padding: 12px 15px;
                        width: calc(100% - 30px);
                        font-size: 17px;
                        color: #333;
                        outline: none;
                        transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    }

                    .input-group input[type="text"]:focus,
                    .input-group input[type="email"]:focus,
                    .input-group input[type="tel"]:focus,
                    .input-group input[type="date"]:focus,
                    .input-group input[type="time"]:focus {
                        border-color: #3498db;
                        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                    }

                    .submit-appointment-btn {
                        background-color: #3498db;
                        color: #fff;
                        border: none;
                        border-radius: 30px;
                        padding: 15px 35px;
                        font-size: 20px;
                        cursor: pointer;
                        display: block;
                        margin: 50px auto 0;
                        transition: background-color 0.3s ease, transform 0.2s ease;
                        font-weight: 600;
                        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
                    }

                    .submit-appointment-btn:hover {
                        background-color: #2980b9;
                        transform: translateY(-3px);
                    }

                    @media (max-width: 992px) {
                        .form-grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }

                    @media (max-width: 768px) {
                        header {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 20px;
                        }
                       
                        .department-list {
                            flex-wrap: wrap;
                            gap: 15px;
                            width: 100%;
                            justify-content: center;
                        }
                        .book-now-btn {
                            margin-left: 0;
                            width: 100%;
                            justify-content: center;
                        }
                        .form-grid {
                            grid-template-columns: 1fr;
                        }
                        .container {
                            padding: 25px;
                        }
                    }
                `}
            </style>
            <div className="container">
                <header>
                    <h1>Book Appointment Now</h1>
                    <nav className="navbooknow"> {/* Changed class name here */}
                        <ul className="department-list">
                            <li
                                data-department="Diabetes"
                                className={selectedDepartment === 'Diabetes' ? 'active' : ''}
                                onClick={() => handleDepartmentClick('Diabetes')}
                            >
                                Diabetes
                            </li>
                            <li
                                data-department="Nephrology"
                                className={selectedDepartment === 'Nephrology' ? 'active' : ''}
                                onClick={() => handleDepartmentClick('Nephrology')}
                            >
                                Nephrology
                            </li>
                            <li
                                data-department="Urology"
                                className={selectedDepartment === 'Urology' ? 'active' : ''}
                                onClick={() => handleDepartmentClick('Urology')}
                            >
                                Urology
                            </li>
                            <li
                                data-department="Kidney Transplant"
                                className={selectedDepartment === 'Kidney Transplant' ? 'active' : ''}
                                onClick={() => handleDepartmentClick('Kidney Transplant')}
                            >
                                Kidney Transplant
                            </li>
                            <li
                                data-department="Other"
                                className={selectedDepartment === 'Other' ? 'active' : ''}
                                onClick={() => handleDepartmentClick('Other')}
                            >
                                Other
                            </li>
                        </ul>
                        <button className="book-now-btn" onClick={handleFormSubmission}>
                            Book Now <i className="fas fa-arrow-right"></i>
                        </button>
                    </nav>
                </header>

                <form id="appointmentForm">
                    <div className="form-grid">
                        <div className="form-field">
                            <div className="icon-circle"><i className="fas fa-user"></i></div>
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="David John"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="icon-circle"><i className="fas fa-phone"></i></div>
                            <div className="input-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+91 67678 79089"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="icon-circle"><i className="fas fa-credit-card"></i></div>
                            <div className="input-group">
                                <label htmlFor="medicalRecord">Medical Record Number</label>
                                <input
                                    type="text"
                                    id="medicalRecord"
                                    name="medicalRecord"
                                    placeholder="123456-7890-0987"
                                    value={medicalRecord}
                                    onChange={(e) => setMedicalRecord(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="icon-circle"><i className="fas fa-list-alt"></i></div>
                            <div className="input-group">
                                <label htmlFor="reason">Reason for Visit</label>
                                <input
                                    type="text"
                                    id="reason"
                                    name="reason"
                                    placeholder="Routine Checkup"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="icon-circle"><i className="fas fa-calendar-alt"></i></div>
                            <div className="input-group">
                                <label htmlFor="preferredDate">Preferred Date</label>
                                <input
                                    type="date"
                                    id="preferredDate"
                                    name="preferredDate"
                                    placeholder="YYYY-MM-DD"
                                    value={preferredDate}
                                    onChange={(e) => setPreferredDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <div className="icon-circle"><i className="fas fa-clock"></i></div>
                            <div className="input-group">
                                <label htmlFor="preferredTime">Preferred Time</label>
                                <input
                                    type="time"
                                    id="preferredTime"
                                    name="preferredTime"
                                    placeholder="HH:MM"
                                    value={preferredTime}
                                    onChange={(e) => setPreferredTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="selectedDepartment" name="selectedDepartment" value={selectedDepartment} />
                </form>
            </div>
        </>
    );
}


export function BookNowMobile() {
    // State for form fields
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [medicalRecord, setMedicalRecord] = useState('');
    const [reason, setReason] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('Pediatric'); // Default to Pediatric

    // Function to handle department selection
    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    // Function to handle form submission
    const handleFormSubmission = async (event) => {
        event.preventDefault();

        const formData = {
            name,
            phone,
            medicalRecord,
            reason,
            preferredDate,
            preferredTime,
            selectedDepartment,
        };

        const webhookUrl = 'https://play.svix.com/in/e_fj8CbU3MjuXGTohGwvtBBTd4M1z/';

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Appointment details sent successfully!');
                console.log('Webhook response:', await response.json());
                // Reset form fields
                setName('');
                setPhone('');
                setMedicalRecord('');
                setReason('');
                setPreferredDate('');
                setPreferredTime('');
                setSelectedDepartment('Pediatric'); // Reset to default
            } else {
                alert('Failed to send appointment details. Please try again.');
                console.error('Webhook error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error sending data to webhook:', error);
            alert('An error occurred while sending appointment details. Check console for more info.');
        }
    };

    const departments = [
        { name: "Diabetes", value: "Diabetes" },
        { name: "Nephrology", value: "Nephrology" },
        { name: "Urology", value: "Urology" },
        { name: "Kidney Transplant", value: "Kidney Transplant" },
        { name: "Other", value: "Other" },
    ];

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

            <style>
                {`
                    body {
                        margin: 0;
                        // font-family: 'Montserrat', sans-serif;
                        overflow-x: hidden;
                        background-color: #e9eff6; /* Apply background to body for mobile */
                    }

                    .container-mobile {
                        background-color: #ffffff;
                        border-radius: 15px;
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                        padding: 25px; /* Adjusted padding for mobile */
                        width: 95%; /* Take more width on mobile */
                        max-width: 500px; /* Max width for mobile container */
                        margin: 20px auto; /* Smaller top margin, auto for centering */
                        box-sizing: border-box;
                        color: #333;
                    }

                    .header-mobile {
                        text-align: center; /* Center header text */
                        margin-bottom: 30px; /* Adjusted margin */
                        padding-bottom: 15px;
                        border-bottom: 2px solid #f0f0f0;
                    }

                    .header-mobile h1 {
                        color: #2c3e50;
                        font-size: 24px; /* Smaller font size for mobile */
                        margin: 0;
                        font-weight: 700;
                    }

                    .department-selection-mobile {
                        margin-bottom: 30px;
                        text-align: center;
                    }

                    .department-selection-mobile label {
                        display: block;
                        font-size: 16px;
                        color: #7f8c8d;
                        margin-bottom: 10px;
                        font-weight: 500;
                    }

                    .department-dropdown-mobile {
                        width: 100%;
                        padding: 12px 15px;
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        font-size: 16px;
                        color: #333;
                        background-color: #f8fafd;
                        appearance: none; /* Remove default dropdown arrow */
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-6.5%200-12.3%203.2-16.1%208.1-3.8%204.9-4.9%2011-3.1%2016.2l128%20128c3.8%203.8%209%205.9%2014.2%205.9%205.2%200%2010.4-2.1%2014.2-5.9l128-128c3.8-4.9%202.6-11-1.2-16.2z%22%2F%3E%3C%2Fsvg%3E');
                        background-repeat: no-repeat;
                        background-position: right 15px center;
                        background-size: 12px;
                        cursor: pointer;
                        outline: none;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                        transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    }

                    .department-dropdown-mobile:focus {
                        border-color: #3498db;
                        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                    }

                    .form-grid-mobile {
                        display: flex; /* Use flexbox for stacking */
                        flex-direction: column; /* Stack items vertically */
                        gap: 20px; /* Space between form fields */
                    }

                    .form-field-mobile {
                        display: flex;
                        align-items: center;
                        gap: 15px; /* Smaller gap for mobile */
                        padding: 15px; /* Adjusted padding */
                        border-radius: 10px;
                        background-color: #f8fafd;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                        transition: box-shadow 0.3s ease, transform 0.3s ease;
                    }

                    .form-field-mobile:focus-within {
                        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.2);
                    }

                    .form-field-mobile:hover {
                        transform: translateY(-3px); /* Slightly less movement on hover */
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    }

                    .icon-circle-mobile {
                        background-color: #eaf4fb;
                        color: #3498db;
                        width: 45px; /* Smaller icon circle */
                        height: 45px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 20px; /* Smaller icon size */
                        flex-shrink: 0;
                        box-shadow: 0 2px 5px rgba(52, 152, 219, 0.2);
                    }

                    .input-group-mobile {
                        flex-grow: 1;
                    }

                    .input-group-mobile label {
                        display: block;
                        font-size: 14px; /* Smaller label font size */
                        color: #7f8c8d;
                        margin-bottom: 5px; /* Smaller margin */
                        font-weight: 500;
                    }

                    .input-group-mobile input[type="text"],
                    .input-group-mobile input[type="tel"],
                    .input-group-mobile input[type="date"],
                    .input-group-mobile input[type="time"] {
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        padding: 10px 12px; /* Adjusted padding */
                        width: calc(100% - 24px); /* Adjust width for padding */
                        font-size: 16px; /* Adjusted font size */
                        color: #333;
                        outline: none;
                        transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    }

                    .input-group-mobile input[type="text"]:focus,
                    .input-group-mobile input[type="tel"]:focus,
                    .input-group-mobile input[type="date"]:focus,
                    .input-group-mobile input[type="time"]:focus {
                        border-color: #3498db;
                        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                    }

                    .submit-appointment-btn-mobile {
                        background-color: #3498db;
                        color: #fff;
                        border: none;
                        border-radius: 30px;
                        padding: 12px 25px; /* Adjusted padding */
                        font-size: 18px; /* Adjusted font size */
                        cursor: pointer;
                        display: block;
                        width: 100%; /* Full width button */
                        margin: 40px auto 0; /* Space above, centered */
                        transition: background-color 0.3s ease, transform 0.2s ease;
                        font-weight: 600;
                        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
                    }

                    .submit-appointment-btn-mobile:hover {
                        background-color: #2980b9;
                        transform: translateY(-2px);
                    }
                `}
            </style>
            <div className="container-mobile">
                <header className="header-mobile">
                    <h1>Book Appointment Now</h1>
                </header>

                <form id="appointmentFormMobile">
                    <div className="department-selection-mobile">
                        <label htmlFor="departmentSelect">Select Department</label>
                        <select
                            id="departmentSelect"
                            className="department-dropdown-mobile"
                            value={selectedDepartment}
                            onChange={(e) => handleDepartmentClick(e.target.value)}
                        >
                            {departments.map((dept) => (
                                <option key={dept.value} value={dept.value}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-grid-mobile">
                        <div className="form-field-mobile">
                            <div className="icon-circle-mobile"><i className="fas fa-user"></i></div>
                            <div className="input-group-mobile">
                                <label htmlFor="nameMobile">Name</label>
                                <input
                                    type="text"
                                    id="nameMobile"
                                    name="name"
                                    placeholder="David John"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field-mobile">
                            <div className="icon-circle-mobile"><i className="fas fa-phone"></i></div>
                            <div className="input-group-mobile">
                                <label htmlFor="phoneMobile">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneMobile"
                                    name="phone"
                                    placeholder="(123) 456 - 789"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field-mobile">
                            <div className="icon-circle-mobile"><i className="fas fa-credit-card"></i></div>
                            <div className="input-group-mobile">
                                <label htmlFor="medicalRecordMobile">Medical Record Number</label>
                                <input
                                    type="text"
                                    id="medicalRecordMobile"
                                    name="medicalRecord"
                                    placeholder="123456-7890-0987"
                                    value={medicalRecord}
                                    onChange={(e) => setMedicalRecord(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field-mobile">
                            <div className="icon-circle-mobile"><i className="fas fa-list-alt"></i></div>
                            <div className="input-group-mobile">
                                <label htmlFor="reasonMobile">Reason for Visit</label>
                                <input
                                    type="text"
                                    id="reasonMobile"
                                    name="reason"
                                    placeholder="Routine Checkup"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field-mobile">
                            <div className="icon-circle-mobile"><i className="fas fa-calendar-alt"></i></div>
                            <div className="input-group-mobile">
                                <label htmlFor="preferredDateMobile">Preferred Date</label>
                                <input
                                    type="date"
                                    id="preferredDateMobile"
                                    name="preferredDate"
                                    placeholder="YYYY-MM-DD"
                                    value={preferredDate}
                                    onChange={(e) => setPreferredDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field-mobile">
                            <div className="icon-circle-mobile"><i className="fas fa-clock"></i></div>
                            <div className="input-group-mobile">
                                <label htmlFor="preferredTimeMobile">Preferred Time</label>
                                <input
                                    type="time"
                                    id="preferredTimeMobile"
                                    name="preferredTime"
                                    placeholder="HH:MM"
                                    value={preferredTime}
                                    onChange={(e) => setPreferredTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="selectedDepartmentMobile" name="selectedDepartment" value={selectedDepartment} />
                    <button type="submit" className="submit-appointment-btn-mobile" onClick={handleFormSubmission}>
                        Book Appointment
                    </button>
                </form>
            </div>
        </>
    );
}