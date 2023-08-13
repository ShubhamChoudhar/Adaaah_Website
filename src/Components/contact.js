import React, { useState, useEffect } from 'react';
import { FaAsterisk, FaSortUp, FaSortDown } from 'react-icons/fa';
import '../CSS/contact.css';

const ContactUs = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [showAllDays, setShowAllDays] = useState(false);
  const [, setCurrentHours] = useState('');
  const hoursSchedule = [
    { day: 'Monday', startTime: '9:00 AM', endTime: '9:00 PM' },
    { day: 'Tuesday', startTime: '9:00 AM', endTime: '9:00 PM' },
    { day: 'Wednesday', startTime: '9:00 AM', endTime: '9:00 PM' },
    { day: 'Thursday', startTime: '9:00 AM', endTime: '9:00 PM' },
    { day: 'Friday', startTime: '9:00 AM', endTime: '9:00 PM' },
    { day: 'Saturday', startTime: 'Closed', endTime: 'Closed' },
    { day: 'Sunday', startTime: 'Closed', endTime: 'Closed' }
  ];

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobno: '',
    message: '',
    formId: 'form2',
  });


  useEffect(() => {
    const today = new Date().toLocaleString('en-us', { weekday: 'long' });
    setCurrentDay(today);

    const currentTime = new Date();
    const currentHours =
      currentTime.getHours() + ':' + currentTime.getMinutes();
    setCurrentHours(currentHours);
  }, []);

  const handleToggleDays = () => {
    setShowAllDays((prevShowAllDays) => !prevShowAllDays);
  };

  const isCurrentTimeWithinHours = (startTime, endTime) => {
    if (startTime === 'Closed' || endTime === 'Closed') {
      return false;
    }
    const currentTime = new Date();
    const currentTimeStr =
      currentTime.getHours() + ':' + currentTime.getMinutes();
    return startTime <= currentTimeStr && currentTimeStr <= endTime;
  };

  const resetForm = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      mobno: '',
      message: '',
      formId: 'form2',
    });
  };

  const handleInputChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { firstname, lastname, email, mobno, message } = formData;

    const postData = {
      firstname,
      lastname,
      email,
      mobno,
      message,
      formId: 'form2',
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
    <div>
      <h1 className="contact-heading">Contact Form</h1>
      <p className = "par">Please fill out the form to reach out to us.</p>
      <div className="contact-form">
        <form className = "contactForm"onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstname">
              First Name <FaAsterisk className="fa-icons" /> :
            </label>
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
            <label htmlFor="lastname">
              Last Name <FaAsterisk className="fa-icons" /> :
            </label>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="mobno">
              Mobile Number <FaAsterisk className="fa-icons" /> :
            </label>
            <input
              type="tel"
              id="mobno"
              name="mobno"
              value={formData.mobno}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="message">
              Message <FaAsterisk className="fa-icons" /> :
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button className = "contact-btn" type="submit">Submit</button>
        </form>
      </div>

      <div className = "open-hours" onClick={handleToggleDays}>
        {showAllDays ? (
          <div>
            {hoursSchedule.map(({ day, startTime, endTime }) => (
              <div key={day}>
                {day}: {startTime === 'Closed' ? 'Closed' : `${startTime} – ${endTime}`}
              </div>
            ))}
          </div>
          ) : (
          <div>
            {hoursSchedule.map(({ day, startTime, endTime }) => {
              if (day === currentDay) {
                if (startTime === 'Closed') {
                  return (
                    <div key={day}>
                      Today: Closed
                    </div>
                  );
                } else if (isCurrentTimeWithinHours(startTime, endTime)) {
                  return (
                    <div key={day}>
                      Today: Open Till {endTime}
                    </div>
                  );
                } else {
                  return (
                    <div key={day}>
                      Today: Closed ⋅ Opens {startTime}
                    </div>
                  );
                }
              } else {
                return null; // Hide other days when collapsed
              }
            })}
          </div>
        )}
        <div className = "toggle-btn">
          {showAllDays ? <FaSortUp /> : <FaSortDown />}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;