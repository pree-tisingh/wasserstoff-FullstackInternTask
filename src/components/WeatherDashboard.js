import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import WeatherCarousel from "../components/WeatherCarousel";
import WeatherDetails from "../components/WeatherDetails";
import TemperatureBarChart from "../components/TemperatureGaugeChart";
import HumidityIndicator from "../components/HumidityIndicator";
import WindTurbineDisplay from "../components/WindTurbineDisplay";
import StylizedCompass from "../components/StylizedCompass";
import UvIndexGauge from "../components/UvIndexGauge";
import iconMap from "../utils/iconMap";
import { getWeather, getForecast } from "../utils/api";
import { getWindDirection } from "../utils/direction";
import RainGraph from "../components/RainGraph";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/WeatherDashboard.css";

const WeatherDashboard = () => {
  // State hooks for managing city name, weather data, forecast data, temperature unit, and dark mode
  const [city, setCity] = useState("Delhi"); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Default unit is Celsius
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect hook to fetch weather and forecast data when city or unit changes
  useEffect(() => {
    const unit = isCelsius ? "metric" : "imperial";
    const fetchData = async () => {
      try {
        // Fetch weather and forecast data
        const weather = await getWeather(city, unit);
        const forecast = await getForecast(city, unit);

        // Update weather data state
        setWeatherData({
          temperature: weather.temp,
          description: weather.weather.description,
          iconCode: weather.weather.icon,
          date: new Date().toLocaleDateString(),
          week: new Date().toLocaleDateString("en-US", { weekday: "long" }),
          location: city,
          minTemp: weather.temp_min,
          maxTemp: weather.temp_max,
          humidity: weather.humidity,
          windSpeed: weather.wind_speed,
          windDirection: weather.wind_direction,
          uvIndex: weather.uvIndex,
          unit: unit,
          sunrise: new Date(weather.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(weather.sunset * 1000).toLocaleTimeString(),
        });

        // Update forecast data state
        setForecastData(forecast);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage(
          "City not found or an error occurred. Please try again."
        ); // Set error message
      }
    };

    fetchData();
  }, [city, isCelsius]);

  // Function to handle city search
  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  // Function to toggle temperature unit between Celsius and Fahrenheit
  const handleToggleUnit = (unitIsCelsius) => {
    setIsCelsius(unitIsCelsius);
  };

  // Function to toggle dark mode
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Map the weather icon code to the appropriate image
  const weatherIcon = iconMap[weatherData?.iconCode] || "default.png";

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Render the Navbar component */}
      <Navbar
        onSearch={handleSearch}
        onToggleUnit={handleToggleUnit}
        onToggleDarkMode={handleToggleDarkMode}
        isCelsius={isCelsius}
        isDarkMode={isDarkMode}
      />
      <div className="main-content">
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <div className="left-side">
          {/* Render WeatherCarousel component */}
          <WeatherCarousel />
          <div className="weather-info">
            {/* Info containers displaying various weather details */}
            <div className="info-container min-max-temp">
              <div className="info-title">Min/Max Temp</div>
              <div className="info-value">
                <TemperatureBarChart
                  minTemp={weatherData?.minTemp}
                  maxTemp={weatherData?.maxTemp}
                  unit={weatherData?.unit}
                />
              </div>
            </div>
            <div className="info-container humidity">
              <div className="info-title">Humidity</div>
              <HumidityIndicator humidity={weatherData?.humidity} />
            </div>
            <div className="info-container wind-speed">
              <div className="info-title">Wind Speed</div>
              <WindTurbineDisplay windSpeed={weatherData?.windSpeed} />
            </div>
            <div className="info-container wind-direction">
              <div className="info-title">Wind Direction</div>
              <StylizedCompass
                windDirection={getWindDirection(weatherData?.windDirection)}
              />
            </div>
            <div className="info-container uv-index">
              <div className="info-title">UV Index</div>
              <UvIndexGauge uvIndex={weatherData?.uvIndex} />
            </div>
            <div className="info-container weather-icon">
              <div className="info-title">Weather Icon</div>
              <img
                src={`/images/weather-icons/${weatherIcon}`}
                alt="Weather Icon"
                className="weather-icon"
              />
            </div>
          </div>
          {/* Render RainGraph component */}
          <RainGraph forecastData={forecastData} />
        </div>

        <div className="right-side">
          <WeatherDetails weatherData={weatherData} />
          <div className="forecast-container">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast-card">
                <div className="forecast-date">
                  {new Date(day.date).toLocaleDateString()}
                </div>
                <div className="forecast-temp">
                  {day.temp}°{isCelsius ? "C" : "F"}
                </div>
                <div className="forecast-description">{day.description}</div>
                <img
                  src={`/images/weather-icons/${
                    iconMap[day.icon] || "default.png"
                  }`}
                  alt="Weather Icon"
                  className="forecast-icon"
                />
              </div>
            ))}
          </div>
          <div className="sunrise-sunset-container">
            {/* Sunrise and Sunset information */}
            <div className="sunrise-container">
              <div className="info-title" id="new-heading">
                Sunrise
              </div>
              <div className="info-value">{weatherData?.sunrise}</div>
            </div>
            <div className="sunset-container">
              <div className="info-title" id="new-heading">
                Sunset
              </div>
              <div className="info-value">{weatherData?.sunset}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
