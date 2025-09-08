"use client";

// WhatsAppStyledPackageSelector.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';

function PackageSelectionButtons({ faqData, selectedPackage, onPackageSelect }) {
    const [activeTab, setActiveTab] = useState('Chats');
    const [playingVideo, setPlayingVideo] = useState(null); // To manage which video is playing
    const [videoProgress, setVideoProgress] = useState(0); // To manage video playback progress
    const [searchTerm, setSearchTerm] = useState('');
    const [heartClicked, setHeartClicked] = useState(false); // To control heart animation on click
    const videoRef = useRef(null);
    const currentStream = useRef(null); // To keep track of the active media stream

    // Function to generate a simple profile initial for the avatar
    const getProfileInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    // Filter faqData based on searchTerm
    const filteredFaqData = useMemo(() => {
        if (!searchTerm) {
            return faqData;
        }
        return faqData.filter(item =>
            item.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [faqData, searchTerm]);

    // Effect to handle camera stream
    useEffect(() => {
        if (activeTab === 'Camera') {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((stream) => {
                        currentStream.current = stream; // Store the stream
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                        }
                    })
                    .catch((err) => {
                        console.error("Error accessing camera: ", err);
                        alert("Could not access camera. Please ensure you have granted permissions.");
                        setActiveTab('Chats'); // Switch back to chats if camera access fails
                    });
            } else {
                alert("Your browser does not support camera access.");
                setActiveTab('Chats');
            }
        } else {
            // Stop camera stream when camera tab is not active
            if (currentStream.current) {
                const tracks = currentStream.current.getTracks();
                tracks.forEach(track => track.stop());
                currentStream.current = null; // Clear the stored stream
                if (videoRef.current) {
                    videoRef.current.srcObject = null; // Clear video element source
                }
            }
        }

        // Cleanup function to stop camera when component unmounts or activeTab changes
        return () => {
            if (currentStream.current) {
                const tracks = currentStream.current.getTracks();
                tracks.forEach(track => track.stop());
                currentStream.current = null;
            }
        };
    }, [activeTab]); // Dependency on activeTab ensures this effect re-runs when the tab changes

    const handleHeartClick = () => {
        setHeartClicked(true);
        setTimeout(() => setHeartClicked(false), 1000); // Hide heart after 1 second
    };

    return (
        <div className="whatsapp-modal-container">
            <style>
                {`
                html, body, #root {
                    height: 100%;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                      sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                /* Overall Container for the WhatsApp-like Modal */
                .whatsapp-modal-container {
                    width: 100%;
                    max-width: 400px; /* Typical phone width */
                    height: 600px; /* Fixed height for the modal to enable scrolling */
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                    background-color: #f0f2f5; /* Light gray background */
                    display: flex;
                    flex-direction: column; /* Arrange children vertically */
                    position: relative; /* For positioning camera view */
                }

                /* WhatsApp Header Bar */
                .whatsapp-header {
                    background-color: #075e54; /* WhatsApp green */
                    color: white;
                    padding: 15px 20px;
                    font-size: 1.3em;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .whatsapp-header-icons {
                    display: flex;
                    gap: 20px;
                }

                .whatsapp-header-icons span {
                    cursor: pointer;
                }

                /* Search Bar Styling */
                .whatsapp-search-bar {
                    background-color: white; /* Changed to white */
                    padding: 10px 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid #eee; /* Add a subtle border */
                }

                .whatsapp-search-bar input {
                    flex-grow: 1;
                    padding: 8px 10px;
                    border-radius: 5px;
                    border: 1px solid #ccc; /* Add a subtle border to input */
                    outline: none;
                    font-size: 1em;
                    color: #333; /* Darker text color */
                }

                .whatsapp-search-bar span {
                    color: #666; /* Color for close icon */
                    cursor: pointer;
                }

                /* WhatsApp Tab Navigation (Camera, Chats, Status, Bookings) */
                .whatsapp-tabs {
                    display: flex;
                    background-color: #075e54; /* WhatsApp green */
                    color: rgba(255, 255, 255, 0.7);
                    font-weight: 500;
                    position: relative;
                }

                .whatsapp-tab-button {
                    flex: 1;
                    padding: 15px 0;
                    text-align: center;
                    cursor: pointer;
                    transition: color 0.3s ease;
                    position: relative;
                }

                .whatsapp-tab-button.camera-tab {
                    flex: 0 0 60px; /* Fixed width for camera icon */
                    font-size: 1.5em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .whatsapp-tab-button.active {
                    color: white;
                }

                .whatsapp-tab-button.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background-color: #25d366; /* WhatsApp light green */
                }

                /* Content Area below Tabs */
                .whatsapp-content {
                    padding: 0;
                    background-color: white; /* Chat background */
                    min-height: 0; /* Allow content to shrink */
                    flex-grow: 1; /* Allow content to take available space */
                    overflow-y: auto; /* Enable scrolling for content */
                    /* Custom Scrollbar */
                    scrollbar-width: thin; /* For Firefox */
                    scrollbar-color: rgba(0, 0, 0, 0.7) transparent; /* For Firefox */
                }

                /* Custom Scrollbar for Webkit browsers (Chrome, Safari) */
                .whatsapp-content::-webkit-scrollbar {
                    width: 7px;
                }

                .whatsapp-content::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.7); /* 70% transparent black */
                    border-radius: 10px;
                }

                .whatsapp-content::-webkit-scrollbar-track {
                    background: transparent;
                }

                /* Styling for the Chat-like Entries (your package buttons) */
                .whatsapp-chat-entry-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .whatsapp-chat-entry {
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                    background-color: white;
                    transition: background-color 0.2s ease;
                }

                .whatsapp-chat-entry:hover {
                    background-color: #f5f5f5;
                }

                .whatsapp-chat-entry.active {
                    background-color: #e0f2f1; /* Light green for active chat */
                }

                .whatsapp-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #25d366; /* WhatsApp light green */
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.2em;
                    font-weight: 600;
                    margin-right: 15px;
                    flex-shrink: 0; /* Prevent shrinking */
                }

                .whatsapp-chat-info {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .whatsapp-chat-name {
                    font-size: 1.1em;
                    font-weight: 600;
                    color: #111;
                }

                .whatsapp-chat-last-message {
                    font-size: 0.9em;
                    color: #666;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .whatsapp-chat-time {
                    font-size: 0.8em;
                    color: #999;
                    margin-left: 10px;
                    flex-shrink: 0;
                }

                /* Footer for navigation buttons */
                .whatsapp-footer {
                    background-color: #202020; /* Dark gray for footer */
                    color: white;
                    display: flex;
                    justify-content: space-around;
                    padding: 10px 0;
                    font-size: 1.5em;
                }

                .whatsapp-footer-icon {
                    cursor: default; /* Not clickable */
                    padding: 5px 10px;
                }

                /* Camera View Styling */
                .camera-view-full {
                    flex-grow: 1; /* Take full available space */
                    background-color: black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                .camera-view-full video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover; /* Cover the entire area */
                }
                /* Status and Bookings Specific Styling */
                .whatsapp-status-entry,
                .whatsapp-booking-entry {
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                    background-color: white;
                    transition: background-color 0.2s ease;
                }

                .whatsapp-status-entry:hover,
                .whatsapp-booking-entry:hover {
                    background-color: #f5f5f5;
                }

                .whatsapp-status-avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #607d8b; /* Grey-blue for status */
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.2em;
                    font-weight: 600;
                    margin-right: 15px;
                    flex-shrink: 0;
                    border: 2px solid #25d366; /* WhatsApp green border */
                }

                .whatsapp-status-info,
                .whatsapp-booking-info {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .whatsapp-status-name,
                .whatsapp-booking-title {
                    font-size: 1.1em;
                    font-weight: 600;
                    color: #111;
                }

                .whatsapp-status-time,
                .whatsapp-booking-details {
                    font-size: 0.9em;
                    color: #666;
                }

                /* Styling for video played directly in status tab */
                .whatsapp-status-video-player {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: black;
                    position: relative; /* For progress bar positioning and heart icon */
                }

                .whatsapp-status-video-player video {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain; /* Ensure vertical videos are fully visible */
                }

                .whatsapp-video-progress-bar-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 5px;
                    background-color: rgba(128, 128, 128, 0.5); /* Gray background for progress bar */
                    z-index: 1001;
                }

                .whatsapp-video-progress-bar {
                    height: 100%;
                    background-color: #25d366; /* WhatsApp green */
                    width: 0%;
                    transition: width 0.1s linear; /* Smoother transition for progress bar */
                }

                .whatsapp-bookings-summary {
                    padding: 20px;
                    text-align: center;
                    font-size: 1.2em;
                    color: #333;
                    background-color: #e7feff; /* Light blue background */
                    border-bottom: 1px solid #ddd;
                }

                /* Heart animation styling */
                .heart-animation-container {
                    position: absolute;
                    bottom: 20px; /* Position at bottom */
                    right: 20px; /* Position at right */
                    z-index: 1002;
                }

                .heart-icon {
                    font-size: 2.5em; /* Slightly smaller heart */
                    color: red;
                    opacity: 1; /* Make it visible initially */
                    cursor: pointer; /* Make it clickable */
                    animation: none; /* Reset animation initially */
                }

                .heart-icon.animate {
                    animation: heart-pop 1s ease-out forwards;
                }

                @keyframes heart-pop {
                    0% {
                        transform: translateY(0) scale(0.5);
                        opacity: 0;
                    }
                    25% {
                        transform: translateY(-25px) scale(1.1);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(-50px) scale(1.2);
                        opacity: 0.8;
                    }
                    75% {
                        transform: translateY(-25px) scale(1.1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: translateY(0) scale(0.5);
                        opacity: 0;
                    }
                }
                `}
            </style>

            <div className="whatsapp-header">
                <span>WhatsApp</span>
                <div className="whatsapp-header-icons">
                    <span>⋮</span> {/* More options icon */}
                </div>
            </div>

            <div className="whatsapp-tabs">
                {/* <div
                    className={`whatsapp-tab-button camera-tab ${activeTab === 'Camera' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Camera')}
                >
                    📸
                </div> */}
                <div
                    className={`whatsapp-tab-button ${activeTab === 'Chats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Chats')}
                >
                    CHATS
                </div>
                <div
                    className={`whatsapp-tab-button ${activeTab === 'Status' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Status')}
                >
                    STATUS
                </div>
                <div
                    className={`whatsapp-tab-button ${activeTab === 'Bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Bookings')}
                >
                    BOOKINGS
                </div>
            </div>

       

            {activeTab === 'Camera' && (
                <div className="camera-view-full">
                    <video ref={videoRef} autoPlay playsInline></video>
                </div>
            )}

            {activeTab === 'Chats' && (
                <div className="whatsapp-content">
                    <div className="whatsapp-chat-entry-container">
                        {filteredFaqData.map((item, index) => (
                            <div
                                key={index}
                                className={`whatsapp-chat-entry ${selectedPackage === item.question ? 'active' : ''}`}
                                onClick={() => onPackageSelect(item.question)}
                            >
                                <div className="whatsapp-avatar">
                                    {getProfileInitial(item.question)}
                                </div>
                                <div className="whatsapp-chat-info">
                                    <div className="whatsapp-chat-name">{item.question}</div>
                                    <div className="whatsapp-chat-last-message">Tap to view details about this package.</div>
                                </div>
                                {/* You can add dynamic time here if needed */}
                                <div className="whatsapp-chat-time">Now</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'Status' && (
                <div className="whatsapp-content">
                    {!playingVideo ? (
                        <div className="whatsapp-chat-entry-container">
                            <div className="whatsapp-status-entry" onClick={() => setPlayingVideo('/HeartHealth.mp4')}> {/* Start video on click */}
                                <div className="whatsapp-status-avatar">Y</div>
                                <div className="whatsapp-status-info">
                                    <div className="whatsapp-status-name">Cardiac Master Health Checkup</div>
                                    <div className="whatsapp-status-time">Today, 10:30 AM</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="whatsapp-status-video-player">
                            <div className="whatsapp-video-progress-bar-container">
                                <div className="whatsapp-video-progress-bar" style={{ width: `${videoProgress}%` }}></div>
                            </div>
                            <video 
                                src={playingVideo} 
                                autoPlay 
                                playsInline 
                                onTimeUpdate={(e) => {
                                    const progress = (e.currentTarget.currentTime / e.currentTarget.duration) * 100;
                                    setVideoProgress(progress);
                                }}
                                onEnded={() => {
                                    setPlayingVideo(null);
                                    setVideoProgress(0);
                                }}
                            ></video>
                            <div className="heart-animation-container">
                                <span 
                                    className={`heart-icon ${heartClicked ? 'animate' : ''}`} 
                                    onClick={handleHeartClick}
                                >
                                    ❤️
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'Bookings' && (
                <div className="whatsapp-content">
                    <div className="whatsapp-bookings-summary">
                        100+ bookings done!
                    </div>
                    <div style={{ padding: '20px', textAlign: 'center', color: '#555' }}>
                        You have no upcoming bookings.
                    </div>
                </div>
            )}

            <div className="whatsapp-footer">
                <span className="whatsapp-footer-icon">&#9664;</span> 
                <span className="whatsapp-footer-icon">&#11044;</span> 
                <span className="whatsapp-footer-icon">&#9724;</span> 
            </div>
        </div>
    );
}

export default PackageSelectionButtons;