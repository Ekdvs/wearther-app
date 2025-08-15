import React, { useState, useEffect } from 'react';
import './App.css';

type CityWeather = {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
};

function App() {
  const [searchCity, setSearchCity] = useState("Colombo");
  const [cityData, setCityData] = useState<CityWeather | null>(null);

  const API_key = "1864e11174c47bd3604b18227edfc618";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_key}&units=metric`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: CityWeather = await response.json();
        setCityData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [searchCity]);

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Enter city"
        />

        {cityData && (
          <ul>
            <li>City: {cityData.name}</li>
            <li>County:{cityData.sys.country}</li>
            <li>Feels like: {cityData.main.feels_like} °C</li>
            <li>Humidity: {cityData.main.humidity}%</li>
            <li>Weather: {cityData.weather[0].main}</li>
            <li>
              <img
                src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
                alt={cityData.weather[0].main}
              />
            </li>
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
