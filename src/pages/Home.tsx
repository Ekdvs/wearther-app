import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// TypeScript interface for weather data
interface CityWeather {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
}

const Home: React.FC = () => {
  const [inputCity, setInputCity] = useState(""); // typed city
  const [searchCity, setSearchCity] = useState("Colombo"); // default city
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "";

  // Fetch weather data
  const fetchWeather = async (): Promise<CityWeather> => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("Failed to fetch weather data");
    return res.json();
  };

  // React Query
  const { data, isLoading, error, refetch } = useQuery<CityWeather>({
    queryKey: ["weather", searchCity],
    queryFn: fetchWeather,
    enabled: false, // disable auto-fetch, we'll trigger manually
  });

  // Load default city on component mount
  useEffect(() => {
    refetch();
  }, []); // empty dependency = run once

  // Handle search submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCity.trim()) return;
    setSearchCity(inputCity);
    refetch();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h1>Weather App</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading */}
      {isLoading && <h2 className="loading">Loading...</h2>}

      {/* Error */}
      {error && <p className="error">Error fetching data</p>}

      {/* Weather Data */}
      {data && (
        <div className="weather-card">
          <h2>
            {data.name}, {data.sys.country}
          </h2>
          <p>Temperature: {data.main.temp} °C</p>
          <p>Feels Like: {data.main.feels_like} °C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>
            Weather: {data.weather[0].main} ({data.weather[0].description})
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].main}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
