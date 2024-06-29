import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import search_icon from "../../Assets/search.png";
import clear_icon from "../../Assets/clear.png";
import cloud_icon from "../../Assets/cloud.png";
import drizzle_icon from "../../Assets/drizzle.png";
import rain_icon from "../../Assets/rain.png";
import snow_icon from "../../Assets/snow.png";
import wind_icon from "../../Assets/wind.png";
import sunrise_icon from "../../Assets/sunrise.png";
import sunset_icon from "../../Assets/sunset.png";
import humidity_icon from "../../Assets/humidity.png";


const Weather = () => {
  // State variables for city name input, weather icon, and weather data
  const [cityname, setCityname] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(clear_icon);
  const [weatherData, setWeatherData] = useState(null);

  // Object mapping weather icon codes to corresponding icons.
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": wind_icon,
    "11n": wind_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": cloud_icon,
    "50n": cloud_icon,
  };

  // Function to handle changes in the city input field
  const handleCity = (e) => {
    setCityname(e.target.value);
  };

  // Function to handle search button click or Enter key press
  const handleSearch = async () => {
    if (cityname === "") {
      alert("Please enter a city name");
      return;
    }

    try {
      // Fetching geographical coordinates (latitude, longitude) for the city
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=4&appid=3366da5a35b3a1297f6fc9ed6a2dc846`
      );

      const lat = geoResponse.data[0].lat;
      const lon = geoResponse.data[0].lon;

      // Fetching weather data based on geographical coordinates
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3366da5a35b3a1297f6fc9ed6a2dc846`
      );

      // Formatting weather data for display
      setWeatherData({
        humidity: weatherResponse.data.main.humidity,
        windSpeed: weatherResponse.data.wind.speed,
        temperature: Math.floor(weatherResponse.data.main.temp) - 273, // Converting temperature from Kelvin to Celsius
        location: weatherResponse.data.name,
        sunrise: formatTime(weatherResponse.data.sys.sunrise), // Formatting sunrise time
        sunset: formatTime(weatherResponse.data.sys.sunset), // Formatting sunset time
        icon: weatherResponse.data.weather[0].icon, // Weather icon code
      });

      // Setting weather icon based on weather data
      const iconCode = weatherResponse.data.weather[0].icon;
      setWeatherIcon(allIcons[iconCode]);
    } catch (error) {
      // Handling errors in fetching weather data
      setWeatherData(null);
      console.error("Error in fetching weather data", error);
    }
  };

  // Function to format Unix timestamp to time string
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to handle Enter key press in the city input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="weather">

        {/* Weather App title */}
        <div className="title">
          <h2>Weather App</h2>
        </div>

        {/* Search bar for entering city name */}
        <div className="search-bar">
          <input
            type="text"
            value={cityname}
            placeholder="search city..."
            onChange={handleCity} // Update cityname state on input change
            onKeyPress={handleKeyPress} // Call handleKeyPress on Enter key press
          />
          <img src={search_icon} onClick={handleSearch} alt="search-icon" />
        </div>

        {/* Display weather information if weatherData is available */}
        {weatherData && (
          <>
            <div className="weather-info">
            </div>

            {/* Display weather icon */}
            <img src={weatherIcon} alt="" className="weather-icon" />
            {/* Display temperature */}
            <p className="temperature">{weatherData.temperature}&#176;C</p>
            {/* Display location */}
            <p className="location">{weatherData.location}</p>

            {/* Weather data display */}
            <div className="weather-data">

              {/* Left column with humidity and sunrise */}
              <div className="col1">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>

                <img src={sunrise_icon} alt="" />
                <div>
                  <p>{weatherData.sunrise}</p>
                  <span>Sunrise</span>
                </div>

              </div>

              {/* Right column with wind speed and sunset */}
              <div className="col2">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>

                <img src={sunset_icon} alt="" />
                <div>
                  <p>{weatherData.sunset}</p>
                  <span>Sunset</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
