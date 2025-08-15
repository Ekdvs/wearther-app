export interface WeatherData {
    id: number;
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        sea_level: number;
    };
    coord: {
        lat: number;
        lon: number;
    };
    sys: {
        country: string;
    };
    wind: {
        speed: number;
    }
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string;
        }
    ]
}

export interface CityData {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        sea_level: number;
    };
    dt: number;
    wind: {
        speed: number;
    };
    weather: [{
        id: number;
        main: string;
        description: string;
        icon: string;
    }];
}

export interface CityDisplayData {
    temp: number;
    feels_like: number;
    humidity: number;
    sea_level: number;
    speed: number;
    description: string;
    icon: string;
}

const apiKey = process.env.REACT_APP_WEATHER_API_KEY || '';


export const fetchWeather = async (Ids: string): Promise<WeatherData[]> => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${Ids}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data.list);
    return data.list;

}

export const getCityByName = async (cityName: string): Promise<WeatherData> => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data);
    return data;

}

export const getWeatherByCoord = async (lat: string, lon: string): Promise<WeatherData> => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data);
    return data;

}

export const getCityForecast = async (lat: string, lon: string): Promise<CityData[]> => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log(data.list);
    return data.list;

}