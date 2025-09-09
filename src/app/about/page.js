'use client';

import React, { useState, useEffect } from 'react';
import AboutHeroSection from './Components/AboutHeroSection';
// import CommonFooter from '../../Common-Components/Footer';
import AboutService from './Components/AboutService';
import {AboutWhyUs, AboutWhyUsMobile } from './Components/AboutWhyUs';
import AboutExperience from './Components/AboutExperience';
import AboutDoctors from './Components/AboutDoctors.js';
import AboutRewards from './Components/AboutReward';
import Map from '../home/components/Map';
import Header from '../common-components/header/page';
import CommonFooter from '../common-components/footer/page';

function Aboutpage() {
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
    
      <Header/>
      <AboutHeroSection/>
      <AboutService/>
      {/* <AboutWhyUs/> */}
      {isMobile ? <AboutWhyUsMobile /> : <AboutWhyUs/>}
      <AboutExperience/>
      <AboutDoctors/>
      <AboutRewards/>
      <Map/>
      <CommonFooter/>
    </>
  );
}

export default Aboutpage;