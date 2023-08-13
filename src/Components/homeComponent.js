import React, { useEffect, useState } from 'react';
import "../CSS/homeComponent.css"; 
import homeImg from "../Assets/Images/Image1.jpg";
import weddingImg from "../Assets/Images/Image3.jpg";
import bollywoodNightImg from "../Assets/Images/Image2.jpg";
import clubsBarsImg from "../Assets/Images/Image4.jpg";


const HomeComponent = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
      email: '',
      formId: 'form3',
    });
  
    const resetForm = () => {
      setFormData({
        email: '',
        formId: 'form3',
      });
    };
  
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubscribe = async (event) => {
      event.preventDefault();
    
      const email = formData.email;
    
      if (data.some((subscriber) => subscriber.email === email)) {
        alert('You are already subscribed with this email.');
        return;
      }
    
      const postData = {
        email,
        formId: 'form3',
      };
    
      try {
        const response = await fetch('http://localhost:3001/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
    
        if (response.ok) {
          console.log('Data sent successfully!');
          // You can add any success message or redirection logic here if needed.
          resetForm();
        } else if (response.status === 400) {
          const data = await response.json();
          alert(data.error);
          resetForm();
        } 
        else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error sending data:', error);
        // You can handle other errors and display an error message if needed.
      }
    };
    
    const  handleUnsubscribe = async (event) => {
      event.preventDefault();

    const email = formData.email;

    const postData = {
      email,
    };

    fetch('http://localhost:3001/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log('Unsubscribed successfully!');
        // You can add any success message or redirection logic here if needed.
        resetForm();
      })
      .catch((error) => {
        console.error('Error unsubscribing:', error);
        // You can handle errors and display an error message if needed.
      });
    }
  

  useEffect(() => {
    fetch('http://localhost:3001/api/calendar-events')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function getTimeString(dateTime) {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <div className = "home-component">
      <div className="homeimg">
        <div className="left-column">
          <img src = {homeImg} alt = "Home"/>
        </div>
        <div className="right-column">
          <div className="content">
            <h3>Adaaah</h3>
            <p>Bollywood DJ | Entertainment | Design</p>
          </div>
        </div>
      </div>

      <div className="dj-services">
          <h2 className="heading">DJ Services</h2>
          <div className="column">
              <div className="circle">
                  <img src = {weddingImg} alt="Wedding" />
              </div>
                  <h3 className = "dj-heading3">Wedding</h3>
                  <p className = "dj-p">
                    Our wedding DJs are masters of creating unforgettable moments. With their curated music, seamless transitions, and engaging crowd interactions, they set the stage for an extraordinary celebration. From the grand entrance to the last dance, our DJs curate the perfect playlist that reflects the couple's unique style and keeps the energy alive throughout the night. Their expertise in reading the crowd ensures that every guest has a memorable experience on the dance floor. Trust our wedding DJs to bring the joy and excitement that will make your special day truly remarkable.
                  </p>
          </div>
          <div className="column">
            <div className="circle">
              <img src = {bollywoodNightImg} alt="Bollywood Night" />
            </div>
              <h3 className = "dj-heading3">Bollywood Night</h3>
                <p className = "dj-p">
                  Immerse yourself in the enchanting world of Bollywood with our expert Bollywood night DJs. They create an electrifying atmosphere, blending vibrant beats and rhythms that keep the dance floor alive. With their deep knowledge of Bollywood tracks and seamless mixing skills, they curate a playlist ranging from chart-toppers to timeless favorites. Whether it's a wedding, corporate event, or private party, our DJs guarantee an unforgettable experience filled with energy, excitement, and unforgettable memories. Get ready to dance the night away and embark on a Bollywood musical journey like no other.
                </p>
            </div>
            <div className="column">
              <div className="circle">
                  <img src = {clubsBarsImg} alt="Clubs and Bars"/>
              </div>
                  <h3 className = "dj-heading3">Clubs and Bars</h3>
                  <p className = "dj-p">
                  Unleash the excitement with our club and bar DJs, the ultimate party starters. They ignite the dance floor with diverse music knowledge, seamless mixing, and captivating stage presence. Groove all night to dynamic playlists featuring chart-toppers and underground hits. Their ability to engage the crowd and deliver unforgettable performances guarantees an exceptional experience. Get ready to dance, sing, and let loose as our talented DJs transform your venue into an extraordinary party destination. Let the celebration begin!
                  </p>
              </div>
        </div>

        {/* <div className="upcoming-events">
            <h2>Upcoming Events</h2>
            {data.length === 0 ? (
              <h3>No upcoming events</h3>
            ) : (
            data.map((event) => (
            <div key={event.id} className = "event-details">
              <p>Date - {new Date(event.start.dateTime).toLocaleDateString()}</p>
              <h3>{event.summary}</h3>
              <p>Description - {event.description}</p>
              <p>Time - {getTimeString(event.start.dateTime)} to {getTimeString(event.end.dateTime)}</p>
            </div>
          ))
        )}

        </div> */}

        <div className="upcoming-events">
          <h2>Upcoming Events</h2>
          {data.length === 0 ? (
            <h3>No upcoming events</h3>
          ) : (
            data.map((event) => (
              <div key={event.id} className="event-details">
                <p>Date - {new Date(event.start.dateTime).toLocaleDateString()}</p>
                <div className="event-content">
                  <h3>{event.summary}</h3>
                  <p>{event.description}</p>
                </div>
                <p>
                  Time - {getTimeString(event.start.dateTime)} to{" "}
                  {getTimeString(event.end.dateTime)}
                </p>
              </div>
            ))
          )}
        </div>


        <div className="subscribe-container">
            <h2>Subscribe to Get Notifications</h2>
            <p>Sign up to be the first to know about Bollywood DJ nights and other events hosted by Adaaah</p>
            <form className = "subscribe-form">
              <input className = 'subscribe-input'
                type="email"
                id = 'email'
                name = 'email'
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className = 'sub-btn'>
                <button className = "subs" type="submit" onClick = {handleSubscribe}>Subscribe</button>
                 <button className = "subs" type="submit" onClick = {handleUnsubscribe}>Unsubscribe</button>
               </div>
                
            </form>
        </div>
    </div>
  );
};


export default HomeComponent;
