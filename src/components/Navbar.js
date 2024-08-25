import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon
import '../styles/Navbar.css';

const Navbar = ({ onSearch, onToggleUnit, onToggleDarkMode, isCelsius, isDarkMode }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-left">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="navbar-right">
        <label className="switch">
          <input
            type="checkbox"
            checked={!isCelsius}
            onChange={() => onToggleUnit(!isCelsius)}
          />
          <span className="slider round"></span>
        </label>
        <span className="unit-label">{isCelsius ? '°C' : '°F'}</span>
        <button onClick={onToggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
