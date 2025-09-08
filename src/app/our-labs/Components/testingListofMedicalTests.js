import React, { useState, useEffect } from 'react';

// HealthPackageForm Component
const HealthPackageForm = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [messages, setMessages] = useState('');
    const [dateError, setDateError] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            // Reset form fields when the form is closed
            setName('');
            setEmail('');
            setPhone('');
            setDate('');
            setMessages('');
            setDateError(false);
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date) {
            setDateError(true);
            return;
        }
        setDateError(false);

        const formData = {
            name,
            email,
            phone,
            date,
            messages,
        };
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="list-medical-tests-form-overlay">
            <div className="list-medical-tests-form-container">
                <div className="list-medical-tests-form-header">
                    <h3>Health Package Appointment</h3>
                    <button className="list-medical-tests-close-button" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        minLength="10" // Enforce minimum 10 digits
                        maxLength="10" // Enforce maximum 10 digits
                        pattern="[0-9]{10}" // Ensure exactly 10 digits
                        title="Phone number must be 10 digits" // Tooltip for invalid input
                    />
                    <input
                        type="date"
                        placeholder="Enter Date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            setDateError(false);
                        }}
                        required
                    />
                    {dateError && <p className="list-medical-tests-error-message">This field is required.</p>}
                    <textarea
                        placeholder="Messages"
                        value={messages}
                        onChange={(e) => setMessages(e.target.value)}
                    ></textarea>
                    <button type="submit" className="list-medical-tests-submit-button">SUBMIT</button>
                </form>
            </div>
        </div>
    );
};

function TestListofMedicalTests() {
    const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default
    const [isFormOpen, setIsFormOpen] = useState(false);

    const faqData = [
        {
            question: "Hematology",
            answer: [
                "Hemoglobin (Hb)",
                "Total WBC Count (TC)",
                "Differential Count (DC)",
                "Packed Cell Volume",
                "ESR",
                "Absolute Eosinophil Count",
                "Rbc Count",
                "Absolute Lymphocyte Count",
                "Platelet Count",
                "Malarial Parasites (Card)",
                "Smear For MP",
                "Smear For Microfilaria",
                "Mantoux Test (MX)",
                "Grouping & Rh Typing",
                "Prothrombin Time (PT) With INR",
                "APTT",
                "D-Dimer",
                "Bleeding Time / Clotting Time",
                "PERIPHERAL SMEAR STUDY",
            ]
        },
        {
            question: "BioChemistry",
            answer: [
                "Blood Glucose - F",
                "Glucometer Sugar - F",
                "Blood Glucose - PP",
                "Glucometer Sugar - PP",
                "Blood Glucose - R",
                "Glucometer Sugar - R",
                "HbA1c (Glycated Hemoglobin A1c)",
                "Urea",
                "Creatinine",
                "Uric Acid",
                "Sodium",
                "Chloride",
                "Potassium",
                "Bicarbonate",
                "Total Cholesterol",
                "Triglycerides",
                "HDL Cholesterol",
                "LDL Cholesterol",
                "Bilirubin Total & Direct",
                "Total Protein And A/G Ratio",
                "AST (SGOT)",
                "ALT (SGPT)",
                "Alkaline Phosphates",
                "GGTP",
                "Calcium",
                "Phosphorus",
                "Magnesium",
                "CPK - MB",
                "Complement C3",
                "CPK - Total",
                "Complement C4",
                "Troponin - I",
                "NT-Pro BNP",
                "Hs CRP",
                "Procalcitonin (PCT)",
                "LDH",
                "Iron TIBC & & Transferrin Saturation",
                "Amylase",
                "Blood Ketone",
                "Lipase",
                "Ammonia",
                "Cholinesterase",
                "Arterial Blood Gas Analysis (ABG)",
                "Urine Micro Albumin",
                "Urine Creatinine",
                "Urine Micro Albumin / Creatinine Ratio",
                "Urine Protein / Creatinine Ratio",
                "24 Hr Urine Protein",
                "24 Hr Urine BIOCHEMISTRY",
            ]
        },
        {
            question: "Serology",
            answer: [
                "Rheumatoid Factor (RA)",
                "ASO TITRE",
                "C-Reactive Protein (CPR)",
                "WIDAL",
                "Weil Felix",
                "Dengue - Ns1, 1gM, 1gG",
                "Leptospirosis",
                "Chikungunya",
                "Helicobacter Pylori",
                "HIV",
                "HBsAg",
                "HCV",
            ]
        },
        {
            question: "Cinical Pathology",
            answer: [
                "Urine Sugar (F) (PP)",
                "Occult Blood",
                "Urine Acetone (Ketone)",
                "SEMEN ANALYSIS",
                "Urine Pregnancy Test",
            ]
        },
        {
            question: "MicroBiology",
            answer: [
                "Gram's Staining",
                "Culture & Sensitivity",
                "AFB Staining",
                "Fungal Staining",
            ]
        },
        {
            question: "EndoCrinology",
            answer: [
                "TSH",
                "FT3",
                "FT4",
                "Ferritin",
                "25-Hydroxy Vitamin D",
                "Vitamin B12",
                "SARS Covid 2 IgG",
                "PSA (Prostate Specific Antigen)",
                "Folic Acid (Folate)",
                "SARS Covid 2 IgM",
                "PTH [Intact Para Thyroid Hormone]",
            ]
        },
        {
            question: "Body Fluid",
            answer: [
                "Cell Count",
                "Sugar",
                "Protein",
                "LDH",
                "Amylase",
                "ADA",
            ]
        },
        {
            question: "Pathology",
            answer: [
                "FNAC",
                "PAP Smear",
                "Cytology",
                "Biopsy",
            ]
        },
    ];

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleBookNowClick = () => {
        setIsFormOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        console.log('Form Data to send:', formData);

        // Add the title field to the formData
        const dataToSend = {
            title: "Health Package Form", // Added title here
            ...formData,
        };

        // Replace with your actual webhook URL
        const webhookUrl = 'https://play.svix.com/in/e_fj8CbU3MjuXGTohGwvtBBTd4M1z/'; // <--- IMPORTANT: Replace this with your actual webhook URL

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                alert('Appointment booked successfully!');
                setIsFormOpen(false); // Close the form on successful submission
            } else {
                console.error('Form submission failed:', response.statusText);
                alert('Failed to book appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <style>
                {`
                .list-medical-tests-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    max-width: 1300px;
                    margin: 0 auto;
                }

                .list-medical-tests-box-container {
                    display: flex;
                    flex-direction: column;
                    width: 45%;
                    margin: 10px;
                }

                .list-medical-tests-faq-box {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .list-medical-tests-question {
                    background-color: #f9f9f9;
                    padding: 15px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: bold;
                    color: #333;
                }

                .list-medical-tests-answer {
                    padding: 15px;
                    background-color: #fff;
                    border-top: 1px solid #eee;
                }

                .list-medical-tests-answer-list-item {
                    margin-bottom: 5px;
                    list-style-type: disc;
                    margin-left: 20px;
                    color: #555;
                }

                .list-medical-tests-arrow {
                    font-size: 1.2em;
                    transition: transform 0.3s ease-in-out;
                }

                .list-medical-tests-main-heading {
                    text-align: left;
                    width: 100%;
                    color : #2c3e50;
                    max-width: 1200px;
                    margin: 0 auto 0 auto;
                    padding: 0 20px;
                    box-sizing: border-box;
                }

                .list-medical-tests-book-now-button {
                    background: linear-gradient(to right, #0056b3, #003f7f); /* Gradient color */
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1em;
                    margin-top: 15px;
                    display: block;
                    width: fit-content;
                    margin-left: auto;
                    margin-right: auto;
                    transition: background 0.3s ease; /* Smooth transition for hover */
                }

                .list-medical-tests-book-now-button:hover {
                    background: linear-gradient(to right, #003f7f, #0056b3); /* Reversed gradient on hover */
                }

                /* Form Overlay and Container Styles */
                .list-medical-tests-form-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .list-medical-tests-form-container {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 400px;
                    position: relative;
                }

                .list-medical-tests-form-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .list-medical-tests-form-header h3 {
                    margin: 0;
                    font-size: 1.5em;
                    color: #333;
                }

                .list-medical-tests-close-button {
                    background: none;
                    border: none;
                    font-size: 2em;
                    cursor: pointer;
                    color: #888;
                }

                .list-medical-tests-close-button:hover {
                    color: #333;
                }

                .list-medical-tests-form-container input,
                .list-medical-tests-form-container textarea {
                    width: calc(100% - 20px);
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 1em;
                }

                .list-medical-tests-form-container textarea {
                    resize: vertical;
                    min-height: 80px;
                }

                .list-medical-tests-submit-button {
                    background: linear-gradient(to right, #0056b3, #003f7f); /* Gradient color */
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 1.1em;
                    width: 100%;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: background 0.3s ease; /* Smooth transition for hover */
                }

                .list-medical-tests-submit-button:hover {
                    background: linear-gradient(to right, #003f7f, #0056b3); /* Reversed gradient on hover */
                }

                .list-medical-tests-error-message {
                    color: red;
                    font-size: 0.9em;
                    margin-top: -10px;
                    margin-bottom: 10px;
                }

                /* Mobile alignment */
                @media (max-width: 768px) {
                .list-medical-tests-intro-content h3{ /* Corrected class name */
                        margin-top: 0;
                        font-size: 1.6rem;
                        margin-bottom: 1rem;
                }
                    .list-medical-tests-box-container {
                        width: 95%;
                    }
                    .list-medical-tests-main-heading {
                        padding: 0 20px;
                    }
                    .list-medical-tests-form-container {
                        width: 90%;
                    }
                }
                `}
            </style>
            <h2 className="list-medical-tests-main-heading">List of Medical Tests</h2>
            <div className="list-medical-tests-container">
                <div className="list-medical-tests-box-container">
                    {faqData.slice(0, Math.ceil(faqData.length / 2)).map((item, index) => (
                        <div key={index} className="list-medical-tests-faq-box">
                            <div className="list-medical-tests-question" onClick={() => toggleAnswer(index)}>
                                {item.question}
                                <span className="list-medical-tests-arrow" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>&#9660;</span>
                            </div>
                            {openIndex === index && (
                                <div className="list-medical-tests-answer">
                                    <ul>
                                        {item.answer.map((ans, ansIndex) => (
                                            <li key={ansIndex} className="list-medical-tests-answer-list-item">{ans}</li>
                                        ))}
                                    </ul>
                                    <button className="list-medical-tests-book-now-button" onClick={handleBookNowClick}>Book Now</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="list-medical-tests-box-container">
                    {faqData.slice(Math.ceil(faqData.length / 2)).map((item, index) => (
                        <div key={index + Math.ceil(faqData.length / 2)} className="list-medical-tests-faq-box">
                            <div className="list-medical-tests-question" onClick={() => toggleAnswer(index + Math.ceil(faqData.length / 2))}>
                                {item.question}
                                <span className="list-medical-tests-arrow" style={{ transform: openIndex === (index + Math.ceil(faqData.length / 2)) ? 'rotate(180deg)' : 'rotate(0deg)' }}>&#9660;</span>
                            </div>
                            {openIndex === (index + Math.ceil(faqData.length / 2)) && (
                                <div className="list-medical-tests-answer">
                                    <ul>
                                        {item.answer.map((ans, ansIndex) => (
                                            <li key={ansIndex} className="list-medical-tests-answer-list-item">{ans}</li>
                                        ))}
                                    </ul>
                                    <button className="list-medical-tests-book-now-button" onClick={handleBookNowClick}>Book Now</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <HealthPackageForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
            />
        </>
    );
}

export default TestListofMedicalTests;