import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Coordinates {
  lat: number;
  lon: number;
  name: string;
}

interface HourlyWeather {
  dt: number;
  temp: number;
  weather: [{ description: string; icon: string }];
}

interface ForecastData {
  hourly: HourlyWeather[];
  timezone_offset: number;
}

const WeatherDetails: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || "";

  // Fetch city coordinates
  const fetchCoordinates = async (): Promise<Coordinates> => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch city data");
    const data = await res.json();
    return { lat: data.coord.lat, lon: data.coord.lon, name: data.name };
  };

  const {
    data: coordData,
    refetch: refetchCoords,
    isLoading: coordsLoading,
    error: coordsError,
  } = useQuery<Coordinates>({
    queryKey: ["coordinates", city],
    queryFn: fetchCoordinates,
  });

  // Fetch hourly forecast
  const fetchHourly = async (): Promise<ForecastData> => {
    if (!coordData) return { hourly: [], timezone_offset: 0 };
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordData.lat}&lon=${coordData.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch hourly data");
    return res.json();
  };

  const {
    data: hourlyData,
    isLoading: hourlyLoading,
    error: hourlyError,
  } = useQuery<ForecastData>({
    queryKey: ["hourly", coordData?.lat, coordData?.lon],
    queryFn: fetchHourly,
    enabled: !!coordData,
  });

  useEffect(() => {
    refetchCoords();
  }, [city]);

  if (coordsLoading || hourlyLoading) return <h2>Loading 24-hour forecast...</h2>;
  if (coordsError || hourlyError) return <p>Error fetching forecast</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>24-Hour Forecast for {coordData?.name}</h1>
      <div style={{ display: "flex", overflowX: "scroll", gap: "15px" }}>
        {hourlyData?.hourly.slice(0, 24).map((hour) => {
          const date = new Date((hour.dt + (hourlyData.timezone_offset || 0)) * 1000);
          const hours = date.getUTCHours();
          return (
            <div
              key={hour.dt}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                minWidth: "100px",
              }}
            >
              <p>{hours}:00</p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
              />
              <p>{hour.temp} °C</p>
              <p>{hour.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDetails;
