// components/PageLoader.jsx
'use client';
import React from 'react';
// import v from '../../public/'

const PageLoader = () => {
  return (
    <div className="page-loader-fullscreen-video" role="status" aria-live="polite">
      <video
        src="/Gopi-hospitals.mp4" // Corrected path for video in public folder
        autoPlay
        loop
        muted
        playsInline // Recommended for mobile browsers
        className="fullscreen-loader-video"
        aria-hidden="true"
      >
        Your browser does not support the video tag.
      </video>

      <style jsx>{`
        .page-loader-fullscreen-video {
          position: fixed;
          inset: 0; /* Covers the entire viewport */
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000; /* Fallback background if video takes a moment to load */
          z-index: 9999; /* Ensure it's on top of everything */
          overflow: hidden; /* Hide any video overflow */
        }

        .fullscreen-loader-video {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensures the video covers the entire container */
          display: block;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;