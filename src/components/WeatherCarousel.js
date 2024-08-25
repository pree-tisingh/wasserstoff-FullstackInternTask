import React, { useState, useEffect } from 'react';
import '../styles/WeatherCarousel.css'; // Add your styles here

const WeatherCarousel = () => {
  const images = [
    'img1.webp',
    'img2.jpg',
    'img3.webp'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [images.length]);

  return (
    <div className="carousel">
      <img
        src={`/images/weather-icons/${images[currentImageIndex]}`}
        alt="Weather Carousel"
        className="carousel-image"
      />
    </div>
  );
};

export default WeatherCarousel;
