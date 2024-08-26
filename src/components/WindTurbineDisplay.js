// WindTurbineDisplay.js

import React from 'react';
import '../styles/WindTurbineDisplay.css'; // Create this CSS file

const WindTurbineDisplay = ({ windSpeed }) => {
  const spinSpeed = (windSpeed / 100) * 2; // Adjust the max speed value as needed

  return (
    <div className="wind-turbine-container">
      <img
        src="https://clipart-library.com/img/1817018.jpg" 
        alt="Wind Turbine"
        className="wind-turbine-image"
       
      />
      <div className="wind-speed-text">{`${windSpeed} km/h`}</div>
    </div>
  );
};

export default WindTurbineDisplay;
