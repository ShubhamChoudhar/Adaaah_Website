import React from 'react';
import Navbar from "../Components/navbar";
import GalleryContainer from '../Components/galleryContainer';
import Footer from '../Components/footer';

function Gallery() {
    return (
      <div>
        <Navbar/>
        <GalleryContainer/> 
        <Footer/>
      </div>
    );
  }
  
  export default Gallery;