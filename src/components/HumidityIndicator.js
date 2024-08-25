// HumidityIndicator.js

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/WeatherDashboard.css'; // Import the CSS file

const HumidityIndicator = ({ humidity }) => {
  return (
    <div className="humidity-indicator-container">
      <div style={{ width: '90px', height: '90px' }}>
        <CircularProgressbar
          value={humidity}
          text={`${humidity}%`}
          styles={buildStyles({
            pathColor: `rgba(0, 123, 255, ${humidity / 100})`,
            textColor: '#333',
            trailColor: '#e6e6e6',
            strokeLinecap: 'round',
          })}
        />
      </div>
    </div>
  );
};

export default HumidityIndicator;
