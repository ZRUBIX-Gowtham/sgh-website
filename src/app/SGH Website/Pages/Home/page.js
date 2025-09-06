'use client';


import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import { BookNowMobile, BookNow } from './components/BookNow';
import { DepartmentSection } from './components/DepartmentSection';
import { HomeAboutMobile, HomeAboutDesktop } from './components/HomeAbout';
import { BookSection } from './components/BookSection';
import { ExpertiseSectionMobile, ExpertiseSection } from './components/Expertise';
import Map from './components/Map';
import ServicesVariantC from './components/Services';
import { MediaPanels } from './components/MediaPanels';
import PartnerSection from './components/PartnersSec';


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
      <HeroSection/>
      {/* {isMobile ? <HeroSectionMobile /> : <HeroSection />} */}
      {/* {isMobile ? <BookNowMobile /> : <BookNow/>} */}
      <DepartmentSection/>
      <PartnerSection/>
      {isMobile ? <HomeAboutMobile /> : <HomeAboutDesktop/>}
      {/* {isMobile ? <ServicesMobile /> : <ServicesDesktop/>} */}
      <ServicesVariantC/>
      <BookSection/>
      {isMobile ? <ExpertiseSectionMobile /> : <ExpertiseSection/>}
      {/* {isMobile ? <Carousel8Mobile /> : <Carousel8/>} */}
      <MediaPanels/>
      <Map/>
      
      {/* <Newsletter/> */}
      {/* {isMobile ? <FooterMobile /> : <Footer/>} */}
    </>
  );
}

export default HomePage;