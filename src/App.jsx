import React, { useState, useEffect } from 'react';
import { FaSun, FaCloudRain } from 'react-icons/fa';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

  const API_KEY = "95a2fd1034d64a39a94132103241206";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (condition) => {
    if (condition.toLowerCase().includes('sunny')) {
      return <FaSun size={50} color="orange" />;
    } else if (condition.toLowerCase().includes('rain')) {
      return <FaCloudRain size={50} color="blue" />;
    } else {
      return null;
    }
  };

  return (
    <div className="app">
      <div className="search-box">
        <input 
          type="text" 
          value={city} 
          onChange={handleInputChange} 
          placeholder="Enter city" 
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && !loading && !error && (
        <div className="weather-card">
          <div className="weather-header">
            <h1>{weather.location.name}, {weather.location.region}, {weather.location.country}</h1>
            <br />
            {getWeatherIcon(weather.current.condition.text)}
          </div>
          <div className="weather-details">
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
