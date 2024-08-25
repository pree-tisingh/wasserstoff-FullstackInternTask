import React from 'react';
import '../styles/StylizedCompass.css'; // Ensure this CSS file exists and is correctly linked

const StylizedCompass = ({ direction }) => {
  // Ensure direction is a valid number
  const rotateDegrees = direction || 0; // Default to 0 if direction is undefined

  return (
    <div className="stylized-compass">
      <div className="compass-circle">
        <div 
          className="compass-pointer" 
          style={{ transform: `rotate(${rotateDegrees}deg)` }} 
        ></div>
        <div className="compass-nsew">
          <div>N</div>
          <div>E</div>
          <div>S</div>
          <div>W</div>
        </div>
      </div>
    </div>
  );
};

export default StylizedCompass;
