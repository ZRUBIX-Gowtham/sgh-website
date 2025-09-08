// MasterHealthCheckups.jsx
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import PackageSelectionButtons from './PackageSelectionButtons'; // Import the new component

// Reusing the chat widget's message components for consistency
function SystemMessage({ text }) {
    return (
        <div className="chat-system-message">
            {text}
        </div>
    );
}
function BotMessage({ text, list, isTyping }) {
    return (

        <div className="chat-bot-message-wrapper">
            <div className="chat-bot-avatar">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHW-NLxclPLszlqKKFIpMLwuivoz6A3nDuaw&s" alt="Bot Avatar" className="rounded-full" width={28} height={28} />
            </div>
            <div className="chat-bot-message">
                {text && <p>{text}</p>}
                {list && (
                    <ul>
                        {list.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    );
}
function UserMessage({ text }) {
    return (
        <div className="chat-user-message-wrapper">
            <div className="chat-user-message">
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
            className="chat-pill-button"
        >
            {label}
        </button>
    );
}
function RowButtons({ items }) {
    return (
        <div className="chat-row-buttons">
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
        <div className="chat-bottom-input-container">
            <input
                value={value}
                disabled={disabled || inputDisabled} // Disable input based on inputDisabled prop
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={disabled ? "Type is disabled. Use the options above." : placeholder}
                className="chat-bottom-input"
            />
            <button
                onClick={send}
                disabled={disabled}
                aria-label="Send message"
                className="chat-send-button"
            >
                <i className="fa-solid fa-paper-plane" />
                <span>Send</span>
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
        <div className="other-checkup-suggestions">
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


function MasterHealthCheckups() {
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
            question: "Cardiac Master Health Checkup",
            answer: [
                "Hemogram (CBC)", "Blood Group", "ESR", "Blood Glucose - (F)", "Blood Glucose (2 Hrs PP)",
                "HbA1c (Glycated Hemoglobin A1c)", "Urea", "Creatinine", "Uric Acid", "Lipid Profile",
                "Sodium", "Potassium", "Bilirubin - Total & Direct", "Total Protein And A/G Ratio",
                "AST (SGOT)", "ALT (SGPT)", "Hs Crp", "Urine Micro Albumin / Creatinine Ratio",
                "Vitamin D", "FT3, FT4, TSH", "Urine Complete Analysis", "XRAY CHEST PA",
                "Ultrasonagraphy Abdomen - Kub", "Echo Cardiogram", "ECG", "Eye Checkup",
            ]
        },
        {
            question: "Diabetic Master Health Checkup",
            answer: [
                "Hemogram (CBC)", "Blood Group", "ESR", "Blood Glucose - (F)", "Blood Glucose (2 Hrs PP)",
                "HbA1c (Glycated Hemoglobin A1c)", "Urea", "Creatinine", "Uric Acid", "Lipid Profile",
                "Sodium", "Potassium", "Bilirubin - Total & Direct", "Total Protein And A/G Ratio",
                "AST (SGOT)", "ALT (SGPT)", "Urine Micro Albumin / Creatinine Ratio",
                "FT3, FT4, TSH", "Urine Complete Analysis", "XRAY CHEST PA", "ECG",
                "Ultrasonagraphy Abdomen - Kub", "Vascular Doppler & Vibrotham", "Podiascan", "Eye Checkup",
            ]
        },
        {
            question: "General Master Health Checkup",
            answer: [
                "Hemogram (CBC)", "Blood Group", "ESR", "Blood Glucose - (F)", "Blood Glucose (2 Hrs PP)",
                "HbA1c (Glycated Hemoglobin A1c)", "Urea", "Creatinine", "Uric Acid", "Lipid Profile",
                "Sodium", "Potassium", "Bilirubin - Total & Direct", "Total Protein And A/G Ratio",
                "AST (SGOT)", "ALT (SGPT)", "Urine Micro Albumin / Creatinine Ratio",
                "FT3, FT4, TSH", "Urine Complete Analysis", "XRAY CHEST PA", "ECG",
            ]
        },
        {
            question: "Executive Master Health Checkup",
            answer: [
                "Hemogram (CBC)", "Blood Group", "ESR", "Blood Glucose - (F)", "Blood Glucose (2 Hrs PP)",
                "HbA1c (Glycated Hemoglobin A1c)", "Urea", "Creatinine", "Uric Acid", "Lipid Profile",
                "Sodium, Potassium", "Bilirubin - Total & Direct",
                "Total Protein And A/G Ratio", "AST (SGOT)", "ALT (SGPT)", "Hs Crp",
                "Urine Micro Albumin / Creatinine Ratio", "Vitamin D", "FT3, FT4, TSH",
                "HBsAg, HCV", "PSA (Prostate Specific Antigen) (Male)", "Urine Complete Analysis",
                "XRAY CHEST PA", "ECG", "Echo Cardiogram", "Uroflow Meter",
                "Ultrasonagraphy Abdomen - Kub", "Vascular Doppler & Vibrotham", "Podiascan", "Eye Checkup",
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
            // Initialize new package chat
            setChatMessages([
                { type: 'bot', text: `Welcome to ${packageName}!` },
                { type: 'bot', text: "Type 'Start' to view details and make an enquiry." }
            ]);
            setCurrentStep(Steps.WELCOME_SCREEN);
            setInputValue("Start");
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
            if (currentStep === Steps.WELCOME_SCREEN && value.toLowerCase() === "start") {
                const packageDetails = faqData.find(pkg => pkg.question === selectedPackage);
                setChatMessages(prev => [...prev,
                    { type: 'bot', text: `Here are the details for the ${selectedPackage}:` },
                    { type: 'bot', list: packageDetails.answer },
                    { type: 'bot', text: "Would you like to make an enquiry about this package? Type 'Book Now' below." }
                ]);
                setCurrentStep(Steps.DETAILS_SHOWN);
                setInputValue("Book Now");
                setInputFieldDisabled(true);
            } else if (currentStep === Steps.DETAILS_SHOWN && value.toLowerCase() === "book now") {
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


                .master-health-main-layout {
                    display: flex;
                    justify-content: center;
                    background-color: #ffffffff;
                    gap: 20px;
                    // padding: 20px;
                    // max-width: 1400px;
                    margin: 50px auto;
                }
                    /* New styles for heading, subheading, and pills */
.master-health-section-wrap {
    position: relative;
    overflow: clip;
    background: transparent;
    isolation: isolate;
}
    .text-white {
    color: white;
    cursor: pointer;
}

.master-health-section-content {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 1300px;
    margin: 0 auto;
    padding: 25px 25px; /* Adjust padding as needed */
    color: var(--ink); /* Assuming --ink is defined in your global CSS or you can define it here */
    z-index: 1;
}

.master-health-pills {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: left;
    margin-bottom: 18px;
}
.master-health-pill {
    display: inline-flex
;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 12px;
    letter-spacing: 0.02em;
    background: rgba(47, 128, 237, 0.10);
    color: #1f4e9b;
    border: 1px solid rgba(47, 128, 237, 0.22);
    width: fit-content;
    align-self: flex-start;
}

.master-health-heading {
    margin: 0 0 8px;
    font-size: 40px;
    line-height: 1.08;
    font-weight: 900;
    letter-spacing: -0.02em;
    text-align: left;
    background: linear-gradient(92deg, #0b1324 0%, #274760 00%, #2f80ed 90%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
@media (max-width: 768px) {
    .master-health-heading { font-size: 34px; }
}
@media (max-width: 480px) {
    .master-health-heading { font-size: 30px; }
}

.master-health-subdesc {
    margin: 10px 0px;
    max-width: 1400px;
    text-align: left;
    color: #475569; /* Using a direct color, assuming --muted is not globally available */
    line-height: 1.7;
    font-size: 16px;
}


                /* Chat Container */
                .master-health-chat-container {
                    flex-grow: 1;
                    width: 50%;
                    max-width: 700px;
                    background-color: #f0f2f5; /* Light grey for chat background */
                    border-radius: 15px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    height: 600px; /* Fixed height for chat container */
                }

                .master-health-chat-container.night-mode {
                    background-color: #000000; /* Black background for night mode */
                    color: #ffffff; /* White text for night mode */
                }

                .master-health-chat-container.night-mode .master-health-chat-header {
                    background: #1a1a1a; /* Darker header for night mode */
                    color: #ffffff;
                }

                .master-health-chat-container.night-mode .master-health-chat-messages {
                    background-color: #000000; /* Black background for messages in night mode */
                    background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); /* WhatsApp background image */
                    background-size: contain;
                }

                .master-health-chat-container.night-mode .chat-bot-message {
                    background: #333333; /* Darker bot message background */
                    color: #ffffff;
                    border-color: #555555;
                }

                .master-health-chat-container.night-mode .chat-user-message {
                    background: #075e54; /* WhatsApp green for user messages in night mode */
                    color: #ffffff;
                    border-color: #075e54;
                }

                .master-health-chat-container.night-mode .chat-system-message {
                    background: #555555;
                    color: #ffffff;
                }

                .master-health-chat-container.night-mode .chat-bottom-input-container {
                    background: #1a1a1a;
                    border-top-color: #333333;
                }

                .master-health-chat-container.night-mode .chat-bottom-input {
                    background: #333333;
                    color: #ffffff;
                    border-color: #555555;
                }

                .master-health-chat-container.night-mode .chat-bottom-input::placeholder {
                    color: #cccccc;
                }

                .master-health-chat-container.night-mode .chat-pill-button {
                    background: #333333;
                    color: #ffffff;
                    border-color: #555555;
                }

                .master-health-chat-container.night-mode .chat-pill-button:hover:not(:disabled) {
                    background-color: #555555;
                }

                .master-health-chat-container.night-mode .chat-review-card {
                    background: #333333;
                    color: #ffffff;
                    border-color: #555555;
                }

                .master-health-chat-container.night-mode .chat-review-card h4 {
                    color: #ffffff;
                }

                .master-health-chat-container.night-mode .chat-review-card strong {
                    color: #ffffff;
                }

                .master-health-chat-container.night-mode .chat-confirm-button {
                    background: #075e54;
                }

                .master-health-chat-container.night-mode .chat-send-button {
                    background: #075e54;
                }

                .master-health-chat-container.night-mode .chat-send-button:hover:not(:disabled) {
                    background: #054a42;
                }

                .master-health-chat-container.night-mode .master-health-chat-header .package-info i {
                    color: #ffffff; /* White checkmark in night mode */
                }

                .master-health-chat-header {
                    background: #075e54; /* WhatsApp green header */
                    color: white;
                    padding: 15px 20px;
                    font-size: 1.3em;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .master-health-chat-header .profile-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .master-health-chat-header .header-content {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .master-health-chat-header h3 {
                    margin: 0;
                    font-size: 1.3em;
                }
                .master-health-chat-header .package-info {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin: 5px 0 0;
                    font-size: 0.9em;
                    opacity: 0.9;
                }
                .master-health-chat-header .package-info i {
                    color: #0072ed; /* WhatsApp green for checkmark */
                }


                .master-health-chat-messages {
                    flex-grow: 1;
                    padding: 20px;
                    overflow-y: auto; /* Make messages scrollable */

                    flex-direction: column;
                    gap: 10px;
                    background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); /* WhatsApp background image */
                    background-size: contain;
                    position: relative; /* Needed for relative positioning of FAB */
                    justify-content: flex-end; /* Pushes content to the bottom */
                    min-height: 0; /* Crucial for flex items with overflow */

                    /* Custom scrollbar styles */
                    scrollbar-width: auto; /* For Firefox */
                }

                .master-health-chat-messages::-webkit-scrollbar {
                    width: 5px; /* Minimal width */
                    height: 4px;
                }

                .master-health-chat-messages::-webkit-scrollbar-track {
                    background: transparent; /* Transparent track */
                }

                .master-health-chat-messages::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.2); /* Semi-transparent thumb */
                    border-radius: 10px;
                    border: 1px solid transparent;
                }

                .master-health-chat-messages:hover::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.4); /* Darker on hover */
                }

                /* Chat Message Styles (from provided chat widget) */
                .chat-system-message {
                    font-size: 12px;
                    color: #334155;
                    background: #e2e8f0;
                    padding: 6px 10px;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    width: fit-content;
                    max-width: 85%;
                }
                .chat-bot-message-wrapper {
                    display: flex;
                    margin-bottom: 10px;
                    gap: 8px;
                    align-items: flex-start;
                }
                .chat-bot-avatar {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: #075e54; /* WhatsApp green for bot avatar */
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    flex: 0 0 auto;
                    overflow: hidden; /* Ensure image is contained */
                }
                .chat-bot-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .chat-bot-message {
                    background: #ffffff; /* White for bot messages */
                    border: 1px solid #e5e7eb;
                    padding: 8px 12px;
                    border-radius: 12px;
                    color: #0f172a;
                    max-width: 80%;
                    white-space: pre-wrap;
                    box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
                }
                .chat-bot-message ul {
                    list-style-type: disc;
                    padding-left: 20px;
                    margin: 5px 0;
                }
                .chat-bot-message li {
                    margin-bottom: 3px;
                }
                .chat-user-message-wrapper {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 10px;
                }
                .chat-user-message {
                    background: #dcf8c6; /* WhatsApp light green for user messages */
                    border: 1px solid #dcf8c6;
                    padding: 8px 12px;
                    border-radius: 12px;
                    color: #0f172a;
                    max-width: 80%;
                    box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
                }

                /* Pill Button */
                .chat-pill-button {
                    border: 1px solid #e5e7eb;
                    background: #fff;
                    color: #0f172a;
                    padding: 8px 12px;
                    border-radius: 999px;
                    cursor: pointer;
                    font-size: 14px;
                    opacity: 1;
                    transition: background-color 0.2s ease;
                }
                .chat-pill-button:hover:not(:disabled) {
                    background-color: #f0f2f5;
                }
                .chat-pill-button:disabled {
                    cursor: not-allowed;
                    opacity: 0.6;
                }
                .chat-row-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 10px;
                }

                /* Start Button */
                .master-health-start-button-wrapper {
                        display: flex;
    justify-content: center;

    margin-top: 180px;
    margin-left: 400px;
                }
                .master-health-start-button {
    background: linear-gradient(45deg, #25d366, #128c7e);
    color: white; /* Changed to black for better contrast on glass effect */
    border: 1px solid rgba(255, 255, 255, 0.5); /* Subtle white border */
    padding: 7px 90px;
    border-radius: 5px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(5px); /* Glass effect blur for button */
}
.master-health-start-button:hover {
    background: rgba(18, 140, 126, 0.8); /* Darker WhatsApp green with transparency */
    transform: translateY(-2px);
}

.glass-effect-card {
    background: linear-gradient(45deg, #25d366, #128c7e);
    backdrop-filter: blur(10px); /* Glass effect blur */
    border: 1px solid rgba(255, 255, 255, 0.3); /* Light border */
    border-radius: 15px;
    padding: 20px;
    color: white; /* Black text inside glass effect */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 20px;
}
.glass-effect-card p {
    font-size: 1.2em;
    margin-bottom: 15px;
}


                /* Floating Action Button for Book Now */
                .master-health-fab-book-now-wrapper {
                    text-align: right; /* Align button to the left */
                    width: 100%; /* Take full width to allow left alignment */
                    margin-top: auto; /* Push to bottom */
                    padding: 0 20px 10px; /* Add some padding for spacing */
                }
                .master-health-fab-book-now {
                    position: relative; /* Changed to relative */
                    background: linear-gradient(45deg, #25d366, #128c7e); /* WhatsApp green gradient */
                    color: white;
                    border: none;
                    border-radius: 30px; /* Pill shape */
                    padding: 12px 20px;
                    font-size: 1em;
                    font-weight: bold;
                    cursor: pointer;
                    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                    display: inline-flex; /* Use inline-flex to respect text-align */
                    align-items: center;
                    gap: 8px;
                    z-index: 10; /* Ensure it's above other content */
                }
                .master-health-fab-book-now:hover {
                    background: linear-gradient(45deg, #128c7e, #075e54); /* Darker gradient on hover */
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }
                .master-health-fab-book-now i {
                    font-size: 1.2em;
                }


                /* Bottom Chat Input */
                .chat-bottom-input-container {
                    border-top: 1px solid #e5e7eb;
                    padding: 10px;
                    background: #f0f2f5; /* Light grey for input background */
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
                .chat-bottom-input {
                    flex: 1;
                    padding: 10px 12px;
                    border-radius: 20px; /* More rounded for WhatsApp feel */
                    border: 1px solid #e5e7eb;
                    outline: none;
                    font-size: 14px;
                    background: #fff;
                }
                .chat-bottom-input:disabled {
                    background: #f1f5f9;
                    cursor: not-allowed;
                }
                .chat-send-button {
                    background: #128c7e; /* WhatsApp green for send button */
                    color: #ffffff;
                    border: none;
                    border-radius: 50%; /* Circular send button */
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
                .chat-send-button i {
                    margin-right: 0; /* Remove gap for circular button */
                }
                .chat-send-button span {
                    display: none; /* Hide "Send" text for circular button */
                }
                .chat-send-button:hover:not(:disabled) {
                    background: #075e54; /* Darker green on hover */
                }
                .chat-send-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                /* Review Details Card */
                .chat-review-card {
                    border: 1px solid #e5e7eb;
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 12px;
                    color: #0f172a;
                    margin-bottom: 12px;
                    box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
                }
                .chat-review-card h4 {
                    font-weight: 700;
                    margin-bottom: 6px;
                    color: #333;
                }
                .chat-review-card p {
                    font-size: 14px;
                    line-height: 1.6;
                    margin-bottom: 4px;
                }
                .chat-review-card strong {
                    color: #212529;
                }
                .chat-review-buttons {
                    display: flex;
                    gap: 8px;
                    margin-top: 15px;
                }
                .chat-confirm-button {
                    background: #25d366; /* WhatsApp green */
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    padding: 10px 12px;
                    cursor: pointer;
                    opacity: 1;
                    transition: opacity 0.3s ease;
                }
                .chat-confirm-button:disabled {
                    cursor: not-allowed;
                    opacity: 0.7;
                }


                /* Responsive adjustments */
                @media (max-width: 1024px) {
                    .master-health-chat-container {
                        width: 40%;
                    }
                }

                @media (max-width: 768px) {
                    .master-health-main-layout {
                        flex-direction: column;
                        align-items: center;
                        gap: 15px;
                        // margin-bottom: 60px;
                    }
                        .glass-effect-card{
                        background: linear-gradient(45deg, #25d366, #128c7e);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 20px;
    color: white;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 20px;
                        }
    .master-health-start-button-wrapper {
    margin-top: 115px;
    margin-left: 60px;
    }
                    .master-health-chat-container {
                        width: 90%;
                        max-width: none;
                    }
                }

                @media (max-width: 480px) {
                }

                /* Styles for OtherCheckupSuggestions */
                .other-checkup-suggestions {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #e7f3ff; /* Light blue background */
                    border-radius: 10px;
                    border: 1px solid #cce0ff;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                }

                .master-health-chat-container.night-mode .other-checkup-suggestions {
                    background-color: #222222;
                    border-color: #444444;
                    color: #ffffff;
                }

                .other-checkup-suggestions .suggestion-heading {
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #333333;
                }

                .master-health-chat-container.night-mode .other-checkup-suggestions .suggestion-heading {
                    color: #ffffff;
                }

                .other-checkup-suggestions ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .other-checkup-suggestions li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #e0e0e0;
                    cursor: pointer;
                    color: #007bff; /* Blue text for links */
                    transition: background-color 0.2s ease;
                }

                .master-health-chat-container.night-mode .other-checkup-suggestions li {
                    border-bottom-color: #555555;
                    color: #87ceeb; /* Lighter blue for night mode links */
                }

                .other-checkup-suggestions li:last-child {
                    border-bottom: none;
                }

                .other-checkup-suggestions li:hover {
                    background-color: #f0f8ff; /* Lighter blue on hover */
                }

                .master-health-chat-container.night-mode .other-checkup-suggestions li:hover {
                    background-color: #333333;
                }

                .other-checkup-suggestions li i {
                    margin-left: 10px;
                    color: #007bff;
                }

                .master-health-chat-container.night-mode .other-checkup-suggestions li i {
                    color: #87ceeb;
                }

                /* New styles for online status and package name animation */
                .package-info-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    overflow: hidden; /* Hide overflow during transition */
                    height: 60px; /* Adjusted height for smoother transition */
                    justify-content: center; /* Center content vertically */
                    transition: height 0.3s ease-in-out;
                }

                .package-name {
                    font-size: 1em;
                    font-weight: bold;
                    margin: 0;
                    display: flex; /* To align text and icon */
                    align-items: center;
                    gap: 5px; /* Space between text and tick */
                    transition: transform 0.3s ease-in-out;
                }

                .package-name.active {
                    transform: translateY(-5px); /* Move up when online is active */
                }

                .online-status {
                    font-size: 0.6em;
                    color: #dcf8c6; /* Light green for online status */
                    opacity: 0;
                    height: 0;
                    overflow: hidden;
                    transition: opacity 0.3s ease-in-out, height 0.3s ease-in-out, transform 0.3s ease-in-out;
                }

                .online-status.active {
                    opacity: 1;
                    height: 18px; /* Adjust height as needed for the text */
                    transform: translateY(-5px); /* Move up with package name */
                }

                .master-health-chat-container.night-mode .online-status {
                    color: #ffffffdd; /* Darker green for night mode online status */
                }
                `}
            </style>

             <div className="master-health-section-wrap">
                <div className="master-health-section-content">
                    <div className="master-health-pills">
                        <span className="master-health-pill">Comprehensive Care</span>
                        <span className="master-health-pill">Personalized Packages</span>
                    </div>

                    <h2 className="master-health-heading">Master Health Checkups</h2>
                    <p className="master-health-subdesc">
                        Explore our range of master health checkup packages designed to keep you healthy. Book an appointment today for a comprehensive assessment.
                    </p>
                </div>
            </div>

            <div className="master-health-main-layout">
                <PackageSelectionButtons
                    faqData={faqData}
                    selectedPackage={selectedPackage}
                    onPackageSelect={handlePackageSelect}
                />

                <div className={`master-health-chat-container ${isNightMode ? 'night-mode' : ''}`}>
                    <div className="master-health-chat-header">
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
                            <button onClick={() => setShowNightModeOption(prev => !prev)} className="text-white text-xl focus:outline-none">
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
                    <div className="master-health-chat-messages" ref={chatContainerRef}>
                        {chatMessages.map((msg, index) =>
                            msg.type === "system" ? <SystemMessage key={index} text={msg.text} /> :
                            msg.type === "bot" ? <BotMessage key={index} text={msg.text} list={msg.list} isTyping={msg.isTyping} /> :
                            <UserMessage key={index} text={msg.text} />
                        )}

                        {/* Removed the "Would you like to send? Start" button */}
                        {/* Removed the "Book Now" FAB button */}

                        {currentStep === Steps.REVIEW_ENQUIRY && (
                            <div className="chat-review-card">
                                <h4>Review your enquiry details</h4>
                                <p><strong>Package:</strong> {selectedPackage}</p>
                                <p><strong>Name:</strong> {form.name}</p>
                                <p><strong>Email:</strong> {form.email}</p>
                                <p><strong>Phone:</strong> {form.phone}</p>
                                <div className="chat-review-buttons">
                                    <button
                                        className="chat-pill-button"
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
                                        className="chat-confirm-button"
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

export default MasterHealthCheckups;