// ForecastCard.js
import React from "react";
import "../styles/ForecastCard.css"; // Import your CSS if needed

const ForecastCard = ({ date, temp, description, icon }) => {
  return (
    <div className="forecast-card">
      <div className="forecast-date">{date}</div>
      <img
        src={icon}
        alt={description || "Weather icon"}
        className="forecast-icon"
      />
      <div className="forecast-temp">{temp}°</div>
      <div className="forecast-description">{description}</div>
    </div>
  );
};

export default ForecastCard;
