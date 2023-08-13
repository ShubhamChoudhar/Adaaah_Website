import "./index.css";
import Home from "./Routes/home";
import MobileDJServices from "./Routes/mobileDJServices";
import Gallery from "./Routes/gallery";
import AboutUs from "./Routes/aboutUs";
import ContactUs from "./Routes/contact";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element  = {<Home/>}/>
        <Route path = "/mobiledjservices" element  = {<MobileDJServices/>}/>
        <Route path = "/gallery" element  = {<Gallery/>}/>
        <Route path = "/about" element  = {<AboutUs/>}/>
        <Route path = "/contact" element  = {<ContactUs/>}/>
      </Routes>
    </>

  );
}

export default App;