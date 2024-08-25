import React from 'react';
import '../styles/WeatherCard.css';

const WeatherCard = ({ temp, temp_min, temp_max, humidity, wind_speed, weather }) => {
    return (
        <div className="weather-card">
            <div className="weather-icon">
                <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt={weather.description} />
            </div>
            <div className="weather-info">
                <h1>{temp}°C</h1>
                <p>Min: {temp_min}°C</p>
                <p>Max: {temp_max}°C</p>
                <p>Humidity: {humidity}%</p>
                <p>Wind: {wind_speed} m/s</p>
                <p>{weather.description}</p>
            </div>
        </div>
    );
};

export default WeatherCard;
