import React, { useState, useEffect } from 'react';
import '../styles/WeatherDetails.css';
import iconMap from '../utils/iconMap'; // Ensure this path matches your project structure

const WeatherDetails = ({ weatherData }) => {
  // Check if weatherData is undefined or null
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString()); // Formats as "HH:MM:SS AM/PM"
    };

    updateTime(); // Set the initial time
    const timer = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }

  const { temperature, description, iconCode, date, week, location } = weatherData;

  // Get the icon path based on the icon code
  const weatherIcon = iconMap[iconCode] || 'default.png'; // Fallback to a default icon if not found

  return (
    <div className="weather-details">
      <div className="details-left">
        <div className="temperature">{temperature}°</div>
        <div className="date-week-time">
          <div className="date-week">
          <div className="week">{week}</div>
            <div className="date">{date}</div>
          </div>
          <div className="time">{currentTime}</div>
        </div>
        <div className="location-description-container">
          <div className="location-description">
            <div className="location">
              <i className="fas fa-map-marker-alt"></i> {/* FontAwesome icon for location */}
              {location}
            </div>
            <div className="description">
              <i className="fas fa-cloud-sun"></i> {/* FontAwesome icon for description */}
              {description}
            </div>
          </div>
        </div>
      </div>
      <div className="details-right">
        <img src={`/images/weather-icons/${weatherIcon}`} alt="Weather Icon" className="weather-icon" />
      </div>
    </div>
  );
};

export default WeatherDetails;
