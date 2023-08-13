import React from 'react';
import Navbar from "../Components/navbar";
import HomeComponent from '../Components/homeComponent';
import Footer from '../Components/footer';

function Home() {
    return (
      <div>
        <Navbar/>
        <HomeComponent/>
        <Footer/>
      </div>
    );
  }
  
  export default Home;