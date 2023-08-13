import React from 'react';
import Navbar from "../Components/navbar";
import ServicesCatalog from '../Components/servicesCatalog';
import Footer from '../Components/footer';

function MobileDJServices(){
  return (
    <div>
        <Navbar/>
        <ServicesCatalog/>
        <Footer/>
    </div>
  );
}

export default MobileDJServices;