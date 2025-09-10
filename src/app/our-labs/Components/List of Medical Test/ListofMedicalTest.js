// MasterHealthCheckups.jsx
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import MedicalPackageSelectionButtons from './MedicalPakageselection';


// Reusing the chat widget's message components for consistency
function SystemMessage({ text }) {
    return (
        <div className="twitter-system-message">
            {text}
        </div>
    );
}
function BotMessage({ text, list, isTyping }) {
    return (
        <div className="twitter-bot-message-wrapper">
            <div className="twitter-bot-avatar">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHW-NLxclPLszlqKKFIpMLwuivoz6A3nDuaw&s" alt="Bot Avatar" className="rounded-full" width={28} height={28} />
            </div>
            <div className="twitter-bot-message">
                {text && <p>{text}</p>}
                {list && (
                    <ul>
                        {list.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                )}
                {isTyping && <span className="twitter-typing-indicator"></span>}
            </div>
        </div>
    );
}
function UserMessage({ text }) {
    return (
        <div className="twitter-user-message-wrapper">
            <div className="twitter-user-message">
                {text}
            </div>
        </div>
    );
}

function PillButton({ label, onClick, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="twitter-pill-button"
        >
            {label}
        </button>
    );
}
function RowButtons({ items }) {
    return (
        <div className="twitter-row-buttons">
            {items.map((it, idx) => (
                <PillButton key={idx} label={it.label} onClick={it.onClick} disabled={it.disabled} />
            ))}
        </div>
    );
}

function BottomInput({ disabled, onSend, placeholder, value, setValue, inputDisabled }) {
    function send() {
        if (disabled) return;
        const v = value.trim();
        if (!v) return;
        onSend(v);
        setValue("");
    }

    return (
        <div className="twitter-bottom-input-container">
            <input
                value={value}
                disabled={disabled || inputDisabled} // Disable input based on inputDisabled prop
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={disabled ? "Type is disabled. Use the options above." : placeholder}
                className="twitter-bottom-input"
            />
            <button
                onClick={send}
                disabled={disabled}
                aria-label="Send message"
                className="twitter-send-button"
            >
                <i className="fa-solid fa-paper-plane" />
            </button>
        </div>
    );
}

// New component for other checkup suggestions
function OtherCheckupSuggestions({ faqData, selectedPackage, onPackageSelect }) {
    const otherPackages = faqData.filter(pkg => pkg.question !== selectedPackage);

    if (otherPackages.length === 0) {
        return null;
    }

    return (
        <div className="twitter-other-checkup-suggestions">
            <p className="suggestion-heading">View more checkup suggestions:</p>
            <ul>
                {otherPackages.map((pkg, index) => (
                    <li key={index} onClick={() => onPackageSelect(pkg.question)}>
                        {pkg.question} <i className="fa-solid fa-arrow-right"></i>
                    </li>
                ))}
            </ul>
        </div>
    );
}


function ListofMedicalTests() {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const chatContainerRef = useRef(null);
    const [inputValue, setInputValue] = useState(""); // State for the input field value
    const [inputFieldDisabled, setInputFieldDisabled] = useState(false); // State to disable input field
    const [isNightMode, setIsNightMode] = useState(false); // State for night mode
    const [showNightModeOption, setShowNightModeOption] = useState(false); // State for showing night mode option
    const [isTyping, setIsTyping] = useState(false); // New state for typing indicator
    const [isOnline, setIsOnline] = useState(false); // New state for online status

    const toggleNightMode = () => {
        setIsNightMode(prevMode => !prevMode);
    };

    const Steps = useMemo(() => ({
        WELCOME_SCREEN: "WELCOME_SCREEN",
        DETAILS_SHOWN: "DETAILS_SHOWN",
        ASK_NAME: "ASK_NAME",
        ASK_EMAIL: "ASK_EMAIL",
        ASK_PHONE: "ASK_PHONE",
        REVIEW_ENQUIRY: "REVIEW_ENQUIRY",
        ENQUIRY_CONFIRMED: "ENQUIRY_CONFIRMED",
        ERROR: "ERROR",
    }), []);

    const [currentStep, setCurrentStep] = useState(Steps.WELCOME_SCREEN);
    const [form, setForm] = useState({ department: "", name: "", email: "", phone: "" });
    const [sending, setSending] = useState(false);

    // New state to store chat history for each package
    const [packageChatHistory, setPackageChatHistory] = useState({});

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

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    // Initial load: Display welcome for Cardiac Master Health Checkup
    useEffect(() => {
        const initialPackage = faqData[0]; // Cardiac Master Health Checkup
        handlePackageSelect(initialPackage.question);
    }, []); // Run only once on component mount

    // Effect to save current chat state to history whenever it changes
    useEffect(() => {
        if (selectedPackage) {
            setPackageChatHistory(prev => ({
                ...prev,
                [selectedPackage]: {
                    chatMessages,
                    currentStep,
                    inputValue,
                    form,
                    inputFieldDisabled,
                    isTyping,
                }
            }));
        }
    }, [chatMessages, currentStep, inputValue, form, inputFieldDisabled, selectedPackage, isTyping]);

    // Effect to toggle online status
    useEffect(() => {
        const interval = setInterval(() => {
            setIsOnline(prev => !prev);
        }, 3000); // Toggle every 3 seconds

        return () => clearInterval(interval);
    }, []);


    const handlePackageSelect = (packageName) => {
        // Save current package's state before switching
        if (selectedPackage && selectedPackage !== packageName) {
            setPackageChatHistory(prev => ({
                ...prev,
                [selectedPackage]: {
                    chatMessages,
                    currentStep,
                    inputValue,
                    form,
                    inputFieldDisabled,
                }
            }));
        }

        setSelectedPackage(packageName);
        setForm(prev => ({ ...prev, department: packageName }));

        // Load history for the new package or initialize if no history exists
        if (packageChatHistory[packageName]) {
            const history = packageChatHistory[packageName];
            setChatMessages(history.chatMessages);
            setCurrentStep(history.currentStep);
            setInputValue(history.inputValue);
            setForm(history.form);
            setInputFieldDisabled(history.inputFieldDisabled);
            setIsTyping(history.isTyping || false);
        } else {
            // Initialize new package chat with details shown automatically
            const packageDetails = faqData.find(pkg => pkg.question === packageName);
            setChatMessages([
                { type: 'bot', text: `Welcome to ${packageName}!` },
                { type: 'bot', text: `Here are the details for the ${packageName}:` },
                { type: 'bot', list: packageDetails.answer },
                { type: 'bot', text: "Would you like to make an enquiry about this package? Type 'Book Now' below." }
            ]);
            setCurrentStep(Steps.DETAILS_SHOWN);
            setInputValue("Book Now");
            setInputFieldDisabled(true);
            setForm(prev => ({ ...prev, department: packageName, name: "", email: "", phone: "" }));
        }
    };

    const handleChatInputSend = (text) => {
        const value = text.trim();
        if (!value) return;

        setChatMessages(prev => [...prev, { type: 'user', text: value }]);
        setInputValue(""); // Clear input after sending

        // Add typing indicator
        setChatMessages(prev => [...prev, { type: 'bot', text: "Typing...", isTyping: true }]);
        setIsTyping(true);

        setTimeout(() => {
            setChatMessages(prev => prev.filter(msg => !msg.isTyping)); // Remove typing indicator
            setIsTyping(false);
            if (currentStep === Steps.DETAILS_SHOWN && value.toLowerCase() === "book now") {
                setChatMessages(prev => [...prev, { type: 'bot', text: "Great! What is your full name?" }]);
                setCurrentStep(Steps.ASK_NAME);
                setInputValue("");
                setInputFieldDisabled(false);
            } else if (currentStep === Steps.ASK_NAME) {
                setForm(prev => ({ ...prev, name: value }));
                setChatMessages(prev => [...prev, { type: 'bot', text: "Thanks, " + value + "! What is your email address?" }]);
                setCurrentStep(Steps.ASK_EMAIL);
            } else if (currentStep === Steps.ASK_EMAIL) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    setChatMessages(prev => [...prev, { type: 'bot', text: "Please enter a valid email address." }]);
                    return;
                }
                setForm(prev => ({ ...prev, email: value }));
                setChatMessages(prev => [...prev, { type: 'bot', text: "Got it. What is your 10-digit phone number?" }]);
                setCurrentStep(Steps.ASK_PHONE);
            } else if (currentStep === Steps.ASK_PHONE) {
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(value)) {
                    setChatMessages(prev => [...prev, { type: 'bot', text: "Please enter a valid 10-digit phone number." }]);
                    return;
                }
                setForm(prev => ({ ...prev, phone: value }));
                setChatMessages(prev => [...prev, { type: 'bot', text: "Please review your details before confirming your enquiry." }]);
                setCurrentStep(Steps.REVIEW_ENQUIRY);
                setInputValue("");
                setInputFieldDisabled(false);
            } else {
                // Handle unexpected input or other steps where free typing is allowed
                setChatMessages(prev => [...prev, { type: 'bot', text: "I'm not sure how to respond to that. Please follow the prompts." }]);
            }
        }, 500);
    };

    const handleConfirmEnquiry = async () => {
        setSending(true);
        setChatMessages(prev => [...prev, { type: 'user', text: "Confirm Enquiry" }]);
        setChatMessages(prev => [...prev, { type: 'bot', text: "Submitting your enquiry request..." }]);

        const dataToSend = {
            title: "Health Package Enquiry",
            ...form,
            selectedPackage: selectedPackage,
        };

        const webhookUrl = 'https://play.svix.com/in/e_gmEgAgBctDDeaAyTrbfEgLk3ACr/'; // Replace with your actual webhook URL

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setChatMessages(prev => [...prev, { type: 'bot', text: "Your enquiry has been successfully submitted! We will contact you shortly." }]);
                setCurrentStep(Steps.ENQUIRY_CONFIRMED);
            } else {
                setChatMessages(prev => [...prev, { type: 'bot', text: "Failed to submit enquiry. Please try again." }]);
                setCurrentStep(Steps.ERROR);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setChatMessages(prev => [...prev, { type: 'bot', text: "An error occurred. Please try again." }]);
            setCurrentStep(Steps.ERROR);
        } finally {
            setSending(false);
        }
    };

    // Determine if the chat input should be disabled
    const isChatInputDisabled = sending || [Steps.ENQUIRY_CONFIRMED, Steps.ERROR].includes(currentStep);

    return (
        <>
            <style>
                {`
                /* General Layout */
                .twitter-main-layout {
                    display: flex;
                    justify-content: center;
                    background-color: #ffffffff; /* Light grey background */
                    gap: 20px;
                    margin: 0px auto 40px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                /* Section Header */
                .twitter-section-wrap {
                    position: relative;
                    overflow: clip;
                    background: transparent;
                    isolation: isolate;
                }
                .twitter-section-content {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    max-width: 1300px;
                    margin: 0 auto;
                    padding: 25px 25px;
                    color: #0f1419; /* Twitter dark text */
                    z-index: 1;
                }
                .twitter-pills {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: left;
                    margin-bottom: 18px;
                }
                .twitter-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 10px;
                    font-weight : 500;
                    border-radius: 999px;
                    font-size: 12px;
                    letter-spacing: 0.02em;
                    background: rgba(29, 161, 242, 0.1); /* Twitter blue light */
                    color: #1f4e9b; /* Twitter blue */
                    border: 1px solid rgba(29, 161, 242, 0.22);
                    width: fit-content;
                    align-self: flex-start;
                }
                .twitter-heading {
                   font-size: 40px;
            line-height: 1.1;
            font-weight: 700;
            letter-spacing: -0.02em;
            background: #212529;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin: 0 0 5px;
                }
                @media (max-width: 768px) {
                    .twitter-heading { font-size: 34px; }
                }
                @media (max-width: 480px) {
                    .twitter-heading { font-size: 30px; }
                }
                .twitter-subdesc {
                    margin: 10px 0px;
                    max-width: 1400px;
                    text-align: left;
                    color: #5b7083; /* Twitter muted text */
                    line-height: 1.7;
                    font-size: 16px;
                }

                /* Chat Container */
                .twitter-chat-container {
                    flex-grow: 1;
                    width: 50%;
                    max-width: 700px;
                    background-color: #ffffff; /* White background for chat */
                    border-radius: 15px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: 600px; /* Fixed height for chat container */
                    border: 1px solid #e1e8ed; /* Light border */
                }

                /* Night Mode */
                .twitter-chat-container.night-mode {
                    background-color: #15202b; /* Twitter dark background */
                    color: #e1e8ed; /* Twitter light text */
                    border-color: #38444d;
                }
                .twitter-chat-container.night-mode .twitter-chat-header {
                    background: #15202b;
                    color: #e1e8ed;
                    border-bottom-color: #38444d;
                }
                .twitter-chat-container.night-mode .twitter-chat-messages {
                    background-color: #15202b;
                }
                .twitter-chat-container.night-mode .twitter-bot-message {
                    background: #22303c; /* Darker bot message background */
                    color: #e1e8ed;
                    border-color: #38444d;
                }
                .twitter-chat-container.night-mode .twitter-user-message {
                    background: #1da1f2; /* Twitter blue for user messages */
                    color: #ffffff;
                    border-color: #1da1f2;
                }
                .twitter-chat-container.night-mode .twitter-system-message {
                    background: #38444d;
                    color: #e1e8ed;
                }
                .twitter-chat-container.night-mode .twitter-bottom-input-container {
                    background: #15202b;
                    border-top-color: #38444d;
                }
                .twitter-chat-container.night-mode .twitter-bottom-input {
                    background: #22303c;
                    color: #e1e8ed;
                    border-color: #38444d;
                }
                .twitter-chat-container.night-mode .twitter-bottom-input::placeholder {
                    color: #8899a6;
                }
                .twitter-chat-container.night-mode .twitter-pill-button {
                    background: #22303c;
                    color: #e1e8ed;
                    border-color: #38444d;
                }
                .twitter-chat-container.night-mode .twitter-pill-button:hover:not(:disabled) {
                    background-color: #38444d;
                }
                .twitter-chat-container.night-mode .twitter-review-card {
                    background: #22303c;
                    color: #e1e8ed;
                    border-color: #38444d;
                }
                .twitter-chat-container.night-mode .twitter-review-card h4 {
                    color: #e1e8ed;
                }
                .twitter-chat-container.night-mode .twitter-review-card strong {
                    color: #e1e8ed;
                }
                .twitter-chat-container.night-mode .twitter-confirm-button {
                    background: #1da1f2;
                }
                .twitter-chat-container.night-mode .twitter-send-button {
                    background: #1da1f2;
                }
                .twitter-chat-container.night-mode .twitter-send-button:hover:not(:disabled) {
                    background: #0c85d0;
                }
                .twitter-chat-container.night-mode .twitter-chat-header .package-info i {
                    color: #1da1f2;
                }
                .twitter-chat-container.night-mode .other-checkup-suggestions {
                    background-color: #22303c;
                    border-color: #38444d;
                    color: #e1e8ed;
                }
                .twitter-chat-container.night-mode .other-checkup-suggestions .suggestion-heading {
                    color: #e1e8ed;
                }
                .twitter-chat-container.night-mode .other-checkup-suggestions li {
                    border-bottom-color: #38444d;
                    color: #1da1f2;
                }
                .twitter-chat-container.night-mode .other-checkup-suggestions li:hover {
                    background-color: #38444d;
                }
                .twitter-chat-container.night-mode .other-checkup-suggestions li i {
                    color: #1da1f2;
                }
                .twitter-chat-container.night-mode .online-status {
                    color: #8899a6;
                }


                /* Chat Header */
                .twitter-chat-header {
                    background: #ffffff; /* White header */
                    color: #0f1419;
                    padding: 15px 20px;
                    font-size: 1.1em;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid #e1e8ed;
                }
                .twitter-chat-header .profile-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .twitter-chat-header .header-content {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .twitter-chat-header h3 {
                    margin: 0;
                    font-size: 1.1em;
                }
                .twitter-chat-header .package-info {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin: 5px 0 0;
                    font-size: 0.8em;
                    opacity: 0.9;
                }
                .twitter-chat-header .package-info i {
                    color: #1da1f2; /* Twitter blue for checkmark */
                }

                /* Chat Messages */
                .twitter-chat-messages {
                    flex-grow: 1;
                    padding: 20px;
                    overflow-y: auto;
                    flex-direction: column;
                    gap: 10px;
                    background-color: #f7f9fa; /* Light background for messages */
                    position: relative;
                    justify-content: flex-end;
                    min-height: 0;
                    scrollbar-width: thin;
                    scrollbar-color: #aab8c2 transparent;
                }
                .twitter-chat-messages::-webkit-scrollbar {
                    width: 5px;
                }
                .twitter-chat-messages::-webkit-scrollbar-track {
                    background: transparent;
                }
                .twitter-chat-messages::-webkit-scrollbar-thumb {
                    background-color: #aab8c2;
                    border-radius: 10px;
                }
                .twitter-chat-messages:hover::-webkit-scrollbar-thumb {
                    background-color: #8899a6;
                }

                /* Chat Message Styles */
                .twitter-system-message {
                    font-size: 12px;
                    color: #5b7083;
                    background: #e1e8ed;
                    padding: 6px 10px;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    width: fit-content;
                    max-width: 85%;
                    align-self: center;
                }
                .twitter-bot-message-wrapper {
                    display: flex;
                    margin-bottom: 10px;
                    gap: 8px;
                    align-items: flex-start;
                }
                .twitter-bot-avatar {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: #1da1f2; /* Twitter blue for bot avatar */
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    flex: 0 0 auto;
                    overflow: hidden;
                }
                .twitter-bot-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .twitter-bot-message {
                    background: #e1e8ed; /* Light grey for bot messages */
                    border: 1px solid #e1e8ed;
                    padding: 8px 12px;
                    border-radius: 18px; /* More rounded corners */
                    color: #0f1419;
                    max-width: 80%;
                    white-space: pre-wrap;
                    box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.05);
                }
                .twitter-bot-message ul {
                    list-style-type: disc;
                    padding-left: 20px;
                    margin: 5px 0;
                }
                .twitter-bot-message li {
                    margin-bottom: 3px;
                }
                .twitter-user-message-wrapper {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 10px;
                }
                .twitter-user-message {
                    background: #1da1f2; /* Twitter blue for user messages */
                    border: 1px solid #1da1f2;
                    padding: 8px 12px;
                    border-radius: 18px; /* More rounded corners */
                    color: #ffffff;
                    max-width: 80%;
                    box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.05);
                }

                /* Pill Button */
                .twitter-pill-button {
                    border: 1px solid #e1e8ed;
                    background: #fff;
                    color: #0f1419;
                    padding: 8px 12px;
                    border-radius: 999px;
                    cursor: pointer;
                    font-size: 14px;
                    opacity: 1;
                    transition: background-color 0.2s ease;
                }
                .twitter-pill-button:hover:not(:disabled) {
                    background-color: #f7f9fa;
                }
                .twitter-pill-button:disabled {
                    cursor: not-allowed;
                    opacity: 0.6;
                }
                .twitter-row-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 10px;
                }

                /* Bottom Chat Input */
                .twitter-bottom-input-container {
                    border-top: 1px solid #e1e8ed;
                    padding: 10px;
                    background: #ffffff;
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
                .twitter-bottom-input {
                    flex: 1;
                    padding: 10px 15px;
                    border-radius: 25px; /* More rounded for Twitter feel */
                    border: 1px solid #e1e8ed;
                    outline: none;
                    font-size: 14px;
                    background: #f7f9fa;
                    color: #0f1419;
                }
                .twitter-bottom-input:disabled {
                    background: #e1e8ed;
                    cursor: not-allowed;
                }
                .twitter-send-button {
                    background: #1da1f2; /* Twitter blue for send button */
                    color: #ffffff;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    padding: 0;
                    cursor: pointer;
                    opacity: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2em;
                    transition: background 0.2s ease;
                }
                .twitter-send-button:hover:not(:disabled) {
                    background: #0c85d0; /* Darker blue on hover */
                }
                .twitter-send-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                /* Review Details Card */
                .twitter-review-card {
                    border: 1px solid #e1e8ed;
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 12px;
                    color: #0f1419;
                    margin-bottom: 12px;
                    box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.05);
                }
                .twitter-review-card h4 {
                    font-weight: 700;
                    margin-bottom: 6px;
                    color: #0f1419;
                }
                .twitter-review-card p {
                    font-size: 14px;
                    line-height: 1.6;
                    margin-bottom: 4px;
                }
                .twitter-review-card strong {
                    color: #0f1419;
                }
                .twitter-review-buttons {
                    display: flex;
                    gap: 8px;
                    margin-top: 15px;
                }
                .twitter-confirm-button {
                    background: #1da1f2; /* Twitter blue */
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 10px 12px;
                    cursor: pointer;
                    opacity: 1;
                    transition: opacity 0.3s ease;
                }
                .twitter-confirm-button:disabled {
                    cursor: not-allowed;
                    opacity: 0.7;
                }

                /* Responsive adjustments */
                @media (max-width: 1024px) {
                    .twitter-chat-container {
                        width: 40%;
                    }
                }
                @media (max-width: 768px) {
                    .twitter-main-layout {
                        flex-direction: column;
                        align-items: center;
                        gap: 15px;
                    }
                    .twitter-chat-container {
                        width: 95%;
                        max-width: none;
                    }
                    .twitter-modal-container {
                    width: 95%;
                    }

                }

                /* Styles for OtherCheckupSuggestions */
                .twitter-other-checkup-suggestions {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #e8f5fe; /* Light Twitter blue background */
                    border-radius: 10px;
                    border: 1px solid #aedffc;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                }
                .twitter-other-checkup-suggestions .suggestion-heading {
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #0f1419;
                }
                .twitter-other-checkup-suggestions ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .twitter-other-checkup-suggestions li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #e1e8ed;
                    cursor: pointer;
                    color: #1da1f2; /* Twitter blue text for links */
                    transition: background-color 0.2s ease;
                }
                .twitter-other-checkup-suggestions li:last-child {
                    border-bottom: none;
                }
                .twitter-other-checkup-suggestions li:hover {
                    background-color: #f0f2f5; /* Lighter blue on hover */
                }
                .twitter-other-checkup-suggestions li i {
                    margin-left: 10px;
                    color: #1da1f2;
                }

                /* New styles for online status and package name animation */
                .package-info-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    overflow: hidden;
                    height: 60px;
                    justify-content: center;
                    transition: height 0.3s ease-in-out;
                }
                .package-name {
                    font-size: 1em;
                    font-weight: bold;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: transform 0.3s ease-in-out;
                }
                .package-name.active {
                    transform: translateY(-5px);
                }
                .online-status {
                    font-size: 0.6em;
                    color: #8899a6; /* Twitter grey for online status */
                    opacity: 0;
                    height: 0;
                    overflow: hidden;
                    transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out, transform 0.3s ease-in-out;
                }
                .online-status.active {
                    opacity: 1;
                    height: 18px;
                    transform: translateY(-5px);
                }
                .twitter-typing-indicator {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #1da1f2;
                    animation: twitter-typing-blink 1s infinite;
                    margin-left: 5px;
                }
                .twitter-typing-indicator:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .twitter-typing-indicator:nth-child(3) {
                    animation-delay: 0.4s;
                }
                @keyframes twitter-typing-blink {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }
                `}
            </style>

             <div className="twitter-section-wrap">
                <div className="twitter-section-content">
                    <div className="twitter-pills">
                        <span className="twitter-pill">Comprehensive Care</span>
                        <span className="twitter-pill">Personalized Packages</span>
                    </div>

                    <h2 className="twitter-heading">List of Medical Tests</h2>
                    <p className="twitter-subdesc">
                        Explore our range of List of Medical Tests packages designed to keep you healthy. Book an appointment today for a comprehensive assessment.
                    </p>
                </div>
            </div>

            <div className="twitter-main-layout">
                <MedicalPackageSelectionButtons
                    faqData={faqData}
                    selectedPackage={selectedPackage}
                    onPackageSelect={handlePackageSelect}
                />

                <div className={`twitter-chat-container ${isNightMode ? 'night-mode' : ''}`}>
                    <div className="twitter-chat-header">
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHW-NLxclPLszlqKKFIpMLwuivoz6A3nDuaw&s" alt="Profile" className="profile-image" width={40} height={40} />
                        <div className="header-content">
                            {selectedPackage && (
                                <div className="package-info-wrapper">
                                    <p className={`package-name ${isOnline ? 'active' : ''}`}>
                                        {selectedPackage} <i className="fa-solid fa-check-circle text-blue-400"></i>
                                    </p>
                                    <span className={`online-status ${isOnline ? 'active' : ''}`}>
                                        online
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => setShowNightModeOption(prev => !prev)} className="text-blue-500 text-xl focus:outline-none">
                                <i className="fa-solid fa-ellipsis-v"></i>
                            </button>
                            {showNightModeOption && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                    <button
                                        onClick={() => {
                                            toggleNightMode();
                                            setShowNightModeOption(false);
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        {isNightMode ? "Day Mode" : "Night Mode"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="twitter-chat-messages" ref={chatContainerRef}>
                        {chatMessages.map((msg, index) =>
                            msg.type === "system" ? <SystemMessage key={index} text={msg.text} /> :
                            msg.type === "bot" ? <BotMessage key={index} text={msg.text} list={msg.list} isTyping={msg.isTyping} /> :
                            <UserMessage key={index} text={msg.text} />
                        )}

                        {currentStep === Steps.REVIEW_ENQUIRY && (
                            <div className="twitter-review-card">
                                <h4>Review your enquiry details</h4>
                                <p><strong>Package:</strong> {selectedPackage}</p>
                                <p><strong>Name:</strong> {form.name}</p>
                                <p><strong>Email:</strong> {form.email}</p>
                                <p><strong>Phone:</strong> {form.phone}</p>
                                <div className="twitter-review-buttons">
                                    <button
                                        className="twitter-pill-button"
                                        onClick={() => {
                                            setChatMessages(prev => [...prev, { type: 'user', text: "Edit Details" }]);
                                            setChatMessages(prev => [...prev, { type: 'bot', text: "Okay, let's re-enter your name. What is your full name?" }]);
                                            setCurrentStep(Steps.ASK_NAME);
                                            setForm(prev => ({ ...prev, name: "", email: "", phone: "" })); // Clear form for re-entry
                                            setInputValue(""); // Clear input
                                            setInputFieldDisabled(false); // Enable input
                                        }}
                                    >
                                        Edit Details
                                    </button>
                                    <button
                                        className="twitter-confirm-button"
                                        onClick={handleConfirmEnquiry}
                                        disabled={sending}
                                    >
                                        {sending ? "Confirming..." : "Confirm Enquiry"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === Steps.ENQUIRY_CONFIRMED && (
                            <OtherCheckupSuggestions
                                faqData={faqData}
                                selectedPackage={selectedPackage}
                                onPackageSelect={handlePackageSelect}
                            />
                        )}
                    </div>
                    <BottomInput
                        disabled={isChatInputDisabled}
                        onSend={handleChatInputSend}
                        placeholder="Type your message here..."
                        value={inputValue}
                        setValue={setInputValue}
                        inputDisabled={inputFieldDisabled} // Pass inputDisabled prop
                    />
                </div>
            </div>
        </>
    );
}

export default ListofMedicalTests;