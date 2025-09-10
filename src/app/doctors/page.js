import React, { Suspense } from "react";
import Header from "../common-components/header/page";
import CommonFooter from "../common-components/footer/page";
import Map from "../home/components/Map";
import DoctorHeroSection from "./doctors-component/DoctorHeroSection";
import  {DoctorsList} from "./doctors-component/Doctors"; // This component will now be a client component

export default function Doctors() {
  return (
    <div>
      <Header />
      <DoctorHeroSection />

      <Suspense>
        <DoctorsList />
      </Suspense>

      <Map />
      <CommonFooter />
    </div>
  );
}