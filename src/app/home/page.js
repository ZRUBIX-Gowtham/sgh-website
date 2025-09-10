'use client';


import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

import HeroSection from './components/HeroSection';
import { BookNowMobile, BookNow } from './components/BookNow';
import { HomeAboutMobile, HomeAboutDesktop } from './components/HomeAbout';
import { BookSection } from './components/BookSection';
import Map from './components/Map';
import PartnerSection from './components/PartnersSec';
import Header from '../common-components/header/page';
import CommonFooter from '../common-components/footer/page';

// Dynamically import components that cause hydration issues with SSR disabled
const DynamicDepartmentSection = dynamic(() => import('./components/DepartmentSection').then(mod => mod.DepartmentSection), { ssr: false });
const DynamicServicesVariantC = dynamic(() => import('./components/Services'), { ssr: false });
const DynamicExpertiseSection = dynamic(() => import('./components/Expertise').then(mod => mod.ExpertiseSection), { ssr: false });
const DynamicExpertiseSectionMobile = dynamic(() => import('./components/Expertise').then(mod => mod.ExpertiseSectionMobile), { ssr: false });
const DynamicMediaPanels = dynamic(() => import('./components/MediaPanels').then(mod => mod.MediaPanels), { ssr: false });


function HomePage() {
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
      <HeroSection/>
      <DynamicDepartmentSection/> 
      <PartnerSection/>
      {isMobile ? <HomeAboutMobile /> : <HomeAboutDesktop/>}
      <DynamicServicesVariantC/>
      <BookSection/>
      {isMobile ? <DynamicExpertiseSectionMobile /> : <DynamicExpertiseSection/>}
      <Map headingGradient="linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 80%)" />      
      <CommonFooter/>
    </>
  );
}

export default HomePage;