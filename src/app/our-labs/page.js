'use client';

import React, { useState, useEffect } from 'react';

import LabHeroSection from './Components/LabheroSection';
import LabIntroSection from './Components/labintrosection';
import MasterHealthCheckups from './Components/MasterHealthCheckup/MasterHealthCheckups';
import ListofMedicalTests from './Components/ListofMedicalTests';
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
      
      <LabHeroSection/>
      <LabIntroSection/>
      <MasterHealthCheckups/>
      <ListofMedicalTests/>
      <Map/>
      {/* <CommonFooter/> */}
    </>
  );
}

export default Labs;