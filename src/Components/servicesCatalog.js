import React from 'react';
import '../CSS/servicesCatalog.css';
import premiumSoundLighting from "../Assets/Images/Image6.jpg";
import coldSparks from "../Assets/Images/Image7.jpg";
import co2Canon from "../Assets/Images/Image8.jpg";
import avPackages from "../Assets/Images/Image9.jpg"
import liveDholPlayers from "../Assets/Images/Image10.jpg";
import emcees from "../Assets/Images/Image11.jpg";

const ServicesCatalog = () => {
  return (
    <div className="services-catalog">
        <h2 className="heading2">Services Catalog</h2>
        
      <div className="row">
        <div className="columns">
            <h3>Premium Sound and Lighting</h3>
            <img src = {premiumSoundLighting} alt="Service 1" />
            <p>
                We provide top-of-the-line sound systems and cutting-edge lighting equipment to enhance the ambiance of your event and create an immersive experience.
            </p>
        </div>
        <div className="columns">
            <h3>Cold Sparks</h3>
            <img src = {coldSparks} alt="Service 2" />
            <p>
                Add a touch of magic to your special moments with our mesmerizing cold sparks effect, creating a stunning visual spectacle that will leave a lasting impression.
            </p>
        </div>
        <div className="columns">
            <h3>CO2 Cannon</h3>
            <img src = {co2Canon} alt="Service 3" />
            <p>
                Make a grand entrance or highlight key moments with our CO2 cannons, releasing bursts of cold fog that add excitement and energy to the atmosphere.
            </p>
        </div>
      </div>
      <div className="row">
        <div className="columns">
            <h3>AV Packages</h3>
            <img src = {avPackages} alt="Service 4" />
            <p>
                We offer comprehensive audiovisual packages tailored to your event's requirements, ensuring seamless integration of sound, visuals, and technology for a captivating experience.
            </p>
        </div>
        <div className="columns">
            <h3>Live Dhol Players</h3>
            <img src = {liveDholPlayers} alt="Service 5" />
            <p>
            Our skilled and dynamic live dhol players infuse traditional beats and rhythms, adding an energetic and vibrant touch to your event.
            </p>
        </div>
        <div className="columns">
            <h3>Emcees</h3>
            <img src = {emcees} alt="Service 6" />
            <p>
                Our charismatic emcees are experienced in engaging and entertaining audiences, ensuring smooth transitions and an engaging atmosphere throughout your event.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesCatalog;
