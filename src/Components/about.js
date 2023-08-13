import React, {useState} from 'react';
import "../CSS/about.css";
import Image18 from "../Assets/Images/Image18.jpg";
import Image19 from "../Assets/Images/Image19.jpg";
import Image20 from "../Assets/Images/Image20.jpg";
import Image21 from "../Assets/Images/Image21.jpg";
import { FaAsterisk } from 'react-icons/fa';

const About = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    feedback: '',
    formId: 'form1',
  });

  const resetForm = () => {
    setFormData({
      firstname: '',
      lastname: '',
      feedback: '',
      formId: 'form1',
    });
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstname, lastname, feedback} = formData;

    const postData = {
      firstname,
      lastname,
      feedback,
      formId: 'form1',
    };
  
    fetch('http://localhost:3001/write-to-spreadsheet', {
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
        console.log('Data sent successfully!');
        // You can add any success message or redirection logic here if needed.
        resetForm();
      })
      .catch((error) => {
        console.error('Error sending data:', error);
        // You can handle errors and display an error message if needed.
      });
  };

  return (
    <div className = "about-section">
      <h1 className = "about-heading">About Us</h1>
      <p className = "parag">
        Welcome to our artistic haven, where creativity flourishes and the worlds of art, painting, and DJing converge. We are passionate about curating immersive experiences that blend the visual arts, the strokes of a brush, and the beats that move your soul. Whether you're drawn to the vibrant colors on canvas, the transformative power of a well-executed stroke, or the pulsating rhythms that command your feet to dance, our mission is to transport you to a realm where artistry knows no limits. Join us on this extraordinary journey as we celebrate the synergy between art, painting, and DJing, and explore the boundless possibilities that lie within the realms of creativity.
      </p>

      <div className = "about">
        <div className="about-column">
            <div className="about-circle">
                <img src = {Image18} alt = "Mission" />
            </div>
                <h3 className = "about-heading3">Mission</h3>
                <p className = "about-p">At Adaaah, our utmost dedication is to deliver exceptional products and services to our valued customers. Our mission revolves around assisting clients in accessing top-notch Mobile DJ Services without compromising on affordability. With great pride, we aim to create unforgettable experiences for you and your esteemed guests.</p>
        </div>
        <div className = "about-column">
            <div className="about-circle">
                <img src = {Image19} alt = "Team" />
            </div>
                <h3 className = "about-heading3">Team</h3>
                <p className = "about-p">Adaaah is powered by a team of highly skilled and passionate DJ professionals. With an experience of over 15 years, we specialize in curating remarkable experiences for South Asian weddings, fusion weddings, and a wide range of private, public, and corporate events. Our team's expertise and dedication ensure that your event receives the utmost attention to detail and an unmatched level of service.</p>
        </div>
        <div className = "about-column">
            <div className = "about-circle">
                <img src = {Image20} alt = "Approach" />
            </div>
                <h3 className = "about-heading3">Approach</h3>
                <p className = "about-p">At Adaaah, we understand the importance of personalization and strive to create a customized experience for every event. We take pride in working closely with our clients right from the initial stages to ensure that we fully understand their specific needs, preferences, and goals. By establishing a close partnership, we can develop a comprehensive strategy that is perfectly tailored to meet and exceed their expectations. Our DJ packages are carefully curated to fulfill client's needs.</p>
        </div>
      

        <div className = "about-column">
            <div className = "about-circle">
                <img src = {Image21} alt = "Values" />
            </div>
                <h3 className = "about-heading3">Values</h3>
                <p className = "about-p">At Adaah, we uphold the highest ethical standards in all our actions and decisions. We foster a culture of creativity and continuously strive for improvement and innovation. We believe in the power of collaboration and teamwork to achieve shared goals. We put our customers at the center of everything we do and strive to exceed their expectations.</p>
        </div>
      </div>

      <div className = "testimonial-section">
        <h1>Testimonials</h1>
        <div className="testimonial">
          <h3>- Abha Jha</h3>
          <p>Amazing experience with Adaah. Highly recommended!</p>
         
        </div>
        <div className="testimonial">
          <h3>- Shubham Choudhary</h3>
          <p>Their service exceeded my expectations. Will definitely use again!</p>
        </div>
      </div>

      <div>
        <h1 className = "feedback-heading">Leave Feedback</h1>
        <div className = "feedback-form">
          <form className = "about-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname">First Name <FaAsterisk className = 'fa-icons'/> :</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="lastname">Last Name <FaAsterisk className = 'fa-icons'/> :</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="feedback">Feedback <FaAsterisk className = 'fa-icons'/> :</label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button className = "about-btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default About;