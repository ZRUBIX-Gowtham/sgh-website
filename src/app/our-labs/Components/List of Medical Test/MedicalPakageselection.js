"use client";

// WhatsAppStyledPackageSelector.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';

function MedicalPackageSelectionButtons({ faqData, selectedPackage, onPackageSelect }) {
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
        <div className="twitter-modal-container">
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

                /* Overall Container for the Twitter-like Modal */
                .twitter-modal-container {
                    width: 100%;
                    max-width: 400px; /* Wider for Twitter feed */
                    height: 600px; /* Taller for Twitter feed */
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                    background-color: #fff; /* White background for Twitter */
                    display: flex;
                    flex-direction: column; /* Arrange children vertically */
                    position: relative; /* For positioning camera view */
                }

                /* Twitter Header Bar */
                .twitter-header {
                    background-color: #fff; /* White background */
                    color: #000; /* Black text */
                    padding: 20px 15px;
                    font-size: 1.2em;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #eee; /* Subtle border */
                }

                .twitter-header-icons {
                    display: flex;
                    gap: 15px;
                    color: #1da1f2; /* Twitter blue */
                }

                .twitter-header-icons span {
                    cursor: pointer;
                }

                /* Twitter Search Bar Styling */
                .twitter-search-bar {
                    background-color: #fff; /* White background */
                    padding: 10px 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid #eee;
                }

                .twitter-search-bar input {
                    flex-grow: 1;
                    padding: 8px 15px;
                    border-radius: 20px; /* Rounded search bar */
                    border: 1px solid #ddd;
                    outline: none;
                    font-size: 1em;
                    background-color: #f5f8fa; /* Light gray background for input */
                    color: #333;
                }

                .twitter-search-bar span {
                    color: #1da1f2; /* Twitter blue for icons */
                    cursor: pointer;
                }

                /* Twitter Tab Navigation (Home, Search, Notifications, Messages) */
                .twitter-tabs {
                    display: flex;
                    background-color: #fff; /* White background */
                    color: #555; /* Darker gray for inactive tabs */
                    font-weight: 500;
                    position: relative;
                    border-bottom: 1px solid #eee;
                }

                .twitter-tab-button {
                    flex: 1;
                    padding: 15px 0;
                    text-align: center;
                    cursor: pointer;
                    transition: color 0.3s ease;
                    position: relative;
                    font-size: 0.9em;
                }

                .twitter-tab-button.camera-tab {
                    flex: 0 0 60px;
                    font-size: 1.5em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .twitter-tab-button.active {
                    color: #1da1f2; /* Twitter blue for active tab */
                }

                .twitter-tab-button.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 25%;
                    right: 25%;
                    height: 3px;
                    background-color: #1da1f2; /* Twitter blue */
                    border-radius: 2px;
                }

                /* Content Area below Tabs (Twitter Feed) */
                .twitter-content {
                    padding: 0;
                    background-color: white; /* White background for feed */
                    min-height: 0;
                    flex-grow: 1;
                    overflow-y: auto; /* Enable scrolling for content */
                    /* Custom Scrollbar */
                    scrollbar-width: thin; /* For Firefox */
                    scrollbar-color: rgba(0, 0, 0, 0.3) transparent; /* For Firefox, lighter scrollbar */
                }

                /* Custom Scrollbar for Webkit browsers (Chrome, Safari) */
                .twitter-content::-webkit-scrollbar {
                    width: 7px;
                }

                .twitter-content::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.3); /* Lighter transparent black */
                    border-radius: 10px;
                }

                .twitter-content::-webkit-scrollbar-track {
                    background: transparent;
                }

                /* Styling for the Twitter-like Entries (your package buttons) */
                .twitter-tweet-entry-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }

                .twitter-tweet-entry {
                    display: flex;
                    padding: 10px 15px;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                    background-color: white;
                    transition: background-color 0.2s ease;
                }

                .twitter-tweet-entry:hover {
                    background-color: #f5f8fa; /* Light hover background */
                }

                .twitter-tweet-entry.active {
                    background-color: #e8f5fe; /* Lighter blue for active tweet */
                }

                .twitter-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background-color: #1da1f2; /* Twitter blue */
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.1em;
                    font-weight: 600;
                    margin-right: 10px;
                    flex-shrink: 0;
                }

                .twitter-tweet-info {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .twitter-tweet-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 2px;
                }

                .twitter-tweet-name {
                    font-size: 1em;
                    font-weight: bold;
                    color: #111;
                    margin-right: 5px;
                }

                .twitter-tweet-username {
                    font-size: 0.9em;
                    color: #657786; /* Twitter gray */
                }

                .twitter-tweet-text {
                    font-size: 0.95em;
                    color: #111;
                    line-height: 1.3;
                }

                .twitter-tweet-time {
                    font-size: 0.8em;
                    color: #657786;
                    margin-left: auto;
                    flex-shrink: 0;
                }

                /* Footer for navigation buttons (Twitter-like) */
                .twitter-footer {
                    background-color: #fff; /* White background */
                    color: #555; /* Darker gray for icons */
                    display: flex;
                    justify-content: space-around;
                    padding: 8px 0;
                    font-size: 1.3em;
                    border-top: 1px solid #eee;
                }

                .twitter-footer-icon {
                    cursor: pointer; /* Clickable icons */
                    padding: 5px 10px;
                    transition: color 0.2s ease;
                }

                .twitter-footer-icon:hover {
                    color: #1da1f2; /* Twitter blue on hover */
                }

                /* Camera View Styling */
                .twitter-camera-view-full {
                    flex-grow: 1;
                    background-color: black;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                .twitter-camera-view-full video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                /* Status and Bookings Specific Styling (Twitter-like) */
                .twitter-status-entry,
                .twitter-booking-entry {
                    display: flex;
                    align-items: center;
                    padding: 10px 15px;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                    background-color: white;
                    transition: background-color 0.2s ease;
                }

                .twitter-status-entry:hover,
                .twitter-booking-entry:hover {
                    background-color: #f5f8fa;
                }

                .twitter-status-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background-color: #657786; /* Twitter gray */
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.1em;
                    font-weight: 600;
                    margin-right: 10px;
                    flex-shrink: 0;
                    border: 2px solid #1da1f2; /* Twitter blue border */
                }

                .twitter-status-info,
                .twitter-booking-info {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .twitter-status-name,
                .twitter-booking-title {
                    font-size: 1em;
                    font-weight: bold;
                    color: #111;
                }

                .twitter-status-time,
                .twitter-booking-details {
                    font-size: 0.9em;
                    color: #657786;
                }

                /* Styling for video played directly in status tab (Twitter-like) */
                .twitter-status-video-player {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: black;
                    position: relative;
                }

                .twitter-status-video-player video {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }

                .twitter-video-progress-bar-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 5px;
                    background-color: rgba(0, 0, 0, 0.3); /* Lighter gray for progress bar */
                    z-index: 1001;
                }

                .twitter-video-progress-bar {
                    height: 100%;
                    background-color: #1da1f2; /* Twitter blue */
                    width: 0%;
                    transition: width 0.1s linear;
                }

                .twitter-bookings-summary {
                    padding: 20px;
                    text-align: center;
                    font-size: 1.1em;
                    color: #333;
                    background-color: #e8f5fe; /* Light blue background */
                    border-bottom: 1px solid #ddd;
                }

                /* Heart animation styling (Twitter-like) */
                .twitter-heart-animation-container {
                    position: absolute;
                    bottom: 15px;
                    right: 15px;
                    z-index: 1002;
                }

                .twitter-heart-icon {
                    font-size: 2em;
                    color: #e0245e; /* Twitter red for heart */
                    opacity: 1;
                    cursor: pointer;
                    animation: none;
                }

                .twitter-heart-icon.animate {
                    animation: twitter-heart-pop 1s ease-out forwards;
                }

                @keyframes twitter-heart-pop {
                    0% {
                        transform: translateY(0) scale(0.5);
                        opacity: 0;
                    }
                    25% {
                        transform: translateY(-20px) scale(1.1);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(-40px) scale(1.2);
                        opacity: 0.8;
                    }
                    75% {
                        transform: translateY(-20px) scale(1.1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: translateY(0) scale(0.5);
                        opacity: 0;
                    }
                }
                `}
            </style>

            <div className="twitter-header">
                <span>Twitter</span>
                <div className="twitter-header-icons">
                    <span><i className="fas fa-sparkles"></i></span> {/* Twitter sparkle icon */}
                </div>
            </div>

            <div className="twitter-tabs">
                <div
                    className={`twitter-tab-button ${activeTab === 'Chats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Chats')}
                >
                    <i className="fas fa-home"></i>
                </div>
                <div
                    className={`twitter-tab-button ${activeTab === 'Status' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Status')}
                >
                    <i className="fas fa-bell"></i>
                </div>
                <div
                    className={`twitter-tab-button ${activeTab === 'Bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Bookings')}
                >
                    <i className="fas fa-envelope"></i>
                </div>
            </div>

       

            {activeTab === 'Camera' && (
                <div className="camera-view-full">
                    <video ref={videoRef} autoPlay playsInline></video>
                </div>
            )}

            {activeTab === 'Chats' && (
                <div className="twitter-content">
                    <div className="twitter-tweet-entry-container">
                        {filteredFaqData.map((item, index) => (
                            <div
                                key={index}
                                className={`twitter-tweet-entry ${selectedPackage === item.question ? 'active' : ''}`}
                                onClick={() => onPackageSelect(item.question)}
                            >
                                <div className="twitter-avatar">
                                    {getProfileInitial(item.question)}
                                </div>
                                <div className="twitter-tweet-info">
                                    <div className="twitter-tweet-header">
                                        <div className="twitter-tweet-name">{item.question}</div>
                                        <div className="twitter-tweet-username">@{item.question.toLowerCase().replace(/ /g, '').substring(0, 10)}</div>
                                        <div className="twitter-tweet-time">Now</div>
                                    </div>
                                    <div className="twitter-tweet-text">Tap to view details about this package.</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'Status' && (
                <div className="twitter-content">
                    {!playingVideo ? (
                        <div className="twitter-tweet-entry-container">
                            <div className="twitter-status-entry" onClick={() => setPlayingVideo('/HeartHealth.mp4')}> {/* Start video on click */}
                                <div className="twitter-status-avatar">Y</div>
                                <div className="twitter-status-info">
                                    <div className="twitter-status-name">Cardiac Master Health Checkup</div>
                                    <div className="twitter-status-time">Today, 10:30 AM</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="twitter-status-video-player">
                            <div className="twitter-video-progress-bar-container">
                                <div className="twitter-video-progress-bar" style={{ width: `${videoProgress}%` }}></div>
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
                            <div className="twitter-heart-animation-container">
                                <span 
                                    className={`twitter-heart-icon ${heartClicked ? 'animate' : ''}`} 
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
                <div className="twitter-content">
                    <div className="twitter-bookings-summary">
                        100+ bookings done!
                    </div>
                    <div style={{ padding: '20px', textAlign: 'center', color: '#555' }}>
                        You have no upcoming bookings.
                    </div>
                </div>
            )}

            <div className="twitter-footer">
                <span className="twitter-footer-icon"><i className="fas fa-home"></i></span> 
                <span className="twitter-footer-icon"><i className="fas fa-search"></i></span> 
                <span className="twitter-footer-icon"><i className="fas fa-bell"></i></span> 
                <span className="twitter-footer-icon"><i className="fas fa-envelope"></i></span> 
            </div>
        </div>
    );
}

export default MedicalPackageSelectionButtons;
