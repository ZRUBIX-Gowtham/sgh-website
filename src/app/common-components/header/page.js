import React, { Suspense } from "react";
import HeaderComponent from "./header-component";

export default  function Header (){
  return(
    <div>
      <Suspense>
        <HeaderComponent/>
      </Suspense>
    </div>
  )
}