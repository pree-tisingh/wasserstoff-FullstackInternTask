
import { getWindDirection } from './direction.js';
const API_KEY = process.env.REACT_APP_API_KEY;

export const getWeather = async (city, unit) => {
    try {
        // Fetch main weather data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        console.log('Full Weather Data:', data); // Log the entire response for inspection
        
        const { lon, lat } = data.coord; // Extract latitude and longitude

        // Fetch UV index data using latitude and longitude
        const uvResponse = await fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        if (!uvResponse.ok) throw new Error('Failed to fetch UV index');
        const uvData = await uvResponse.json();
        console.log('UV Index Data:', uvData);

        return {
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            wind_direction: getWindDirection(data.wind.deg), // Add wind direction
            weather: data.weather[0],
            uvIndex: uvData.value ,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
export const getForecast = async (city, unit) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    console.log('Full Forecast Data:', data); // Log the entire forecast response

    // Aggregate data by date
    const dailyForecast = {};
    data.list.forEach(entry => {
        const date = entry.dt_txt.split(' ')[0]; // Get date part from the timestamp
        if (!dailyForecast[date]) {
            dailyForecast[date] = {
                tempSum: 0,
                count: 0,
                description: entry.weather[0].description,
                icon: entry.weather[0].icon,
                rainProbSum: 0 // Initialize rain probability sum
            };
        }
        dailyForecast[date].tempSum += entry.main.temp;
        dailyForecast[date].count += 1;
        dailyForecast[date].rainProbSum += entry.pop; // Add the precipitation probability
    });

    // Convert aggregated data to an array
    const forecastArray = Object.keys(dailyForecast).map(date => ({
        date,
        temp: (dailyForecast[date].tempSum / dailyForecast[date].count).toFixed(1),
        description: dailyForecast[date].description,
        icon: dailyForecast[date].icon,
        rain: ((dailyForecast[date].rainProbSum / dailyForecast[date].count) * 100).toFixed(1) // Calculate average precipitation probability and convert to percentage
    }));

    // Return only the first 5 days of forecast
    return forecastArray.slice(0, 5);
};


  