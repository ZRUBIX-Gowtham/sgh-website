'use client';

import React, { useState, useEffect } from 'react';

import LabHeroSection from './Components/LabheroSection';
import LabIntroSection from './Components/labintrosection';
import MasterHealthCheckups from './Components/MasterHealthCheckup/MasterHealthCheckups';
import ListofMedicalTests from './Components/List of Medical Test/ListofMedicalTest';
import Map from '../home/components/Map';



function Labs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const detectMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Regular expressions to detect common mobile devices
      if (/android/i.test(userAgent)) {
        return true;
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
      }
      // Add more checks for other mobile devices if needed
      return false;
    };

    setIsMobile(detectMobile());

    const handleResize = () => {
      setIsMobile(detectMobile() || window.innerWidth <= 768); // Combine userAgent with width for broader coverage
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .map-section-gradient {
          background: linear-gradient(92deg, #007bff 0%, #28a745 100%);
        }
      `}</style>
      <LabHeroSection/>
      <LabIntroSection/>
      <MasterHealthCheckups/>
      <ListofMedicalTests/>
        <Map headingGradient="linear-gradient(92deg, #007bff 0%, #28a745 100%)" />
      
      {/* <CommonFooter/> */}
    </>
  );
}

export default Labs;