// import React, { Suspense } from "react";
import CommonFooter from "../common-components/footer/page";
import Header from "../common-components/header/page";
import Map from "../home/components/Map";
import DepartmentHeroSection from "./Components/DepartementHeroSection";
import DepartmentViewer from "./Components/Departmentsidemenu";

export default  function Department (){
  return(
    <div>
      {/* <Suspense> */}
      {/* </Suspense> */}
       
      <Header/>
      <DepartmentHeroSection/>
      <DepartmentViewer/>
      <Map/>
      <CommonFooter/>
    </div>
  )
}