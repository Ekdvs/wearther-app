import React, { useState } from 'react';
import './App.css';
import { useQuery } from '@tanstack/react-query';

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
  const API_key = process.env.REACT_APP_WEATHER_API_KEY||'';

  const fetchWeather = async (): Promise<CityWeather> => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_key}&units=metric`
    );
console.log("API KEY:", process.env.REACT_APP_WEATHER_API_KEY);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  };

  const { data, isLoading, error } = useQuery<CityWeather>({
    queryKey: ['weather', searchCity], // refetches when searchCity changes
    queryFn: fetchWeather,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
    
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Enter city"
        />

        {data && (
          <ul>
            <li>City: {data.name}</li>
            <li>Country: {data.sys.country}</li>
            <li>Feels like: {data.main.feels_like} °C</li>
            <li>Humidity: {data.main.humidity}%</li>
            <li>Weather: {data.weather[0].main}</li>
            <li>
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].main}
              />
            </li>
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
