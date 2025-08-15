import { Link, useLocation, useSearchParams } from "react-router";
import CityCard from "../components/CityCard";
import { CityData, CityDisplayData, getCityForecast, getWeatherByCoord, WeatherData } from "../extra/Api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";


const City: React.FC = () => {

    const [searchParams] = useSearchParams();
    const lon = searchParams.get('lon') || '';
    const lat = searchParams.get('lat') || '';

    const [cityDisplayData, setCityDisplayData] = useState<CityDisplayData | null>(null);
    const [selectedCard, setSelectedCard] = useState(-1);

    console.log(lon, lat);

    const location = useLocation();
    const { city } = (location.state || {}) as { city: WeatherData };

    const { data: newCity, isLoading, error } = useQuery({
        queryKey: ['weatherByCoord', lat + lon],
        queryFn: () => getWeatherByCoord(lat, lon),
        enabled: !city,
    });

    const { data: cityForecast, isLoading: isForecastLoading, error: forecastError } = useQuery({
        queryKey: ['forecastByCoords', lat + lon],
        queryFn: () => getCityForecast(lat, lon),
    });

    const cardClickHandler = (city: CityData, index: number) => {


        setCityDisplayData({
            temp: city.main.temp,
            feels_like: city.main.feels_like,
            humidity: city.main.humidity,
            sea_level: city.main.sea_level,
            speed: city.wind.speed,
            description: city.weather[0].description,
            icon: city.weather[0].icon,
        })
        console.log(city);
        setSelectedCard(index);
    }

    return (
        <div className="mt-[20px]">

            {isLoading &&
                <div className='absolute w-full h-full backdrop-blur-md top-0 left-0 flex'>
                    <img alt='loader' src='/images/loading.gif' className='m-auto max-w-20' />
                </div>
            }

            <div className='min-h-10 flex flex-col text-center'>
                {error && forecastError &&
                    <>
                        <p className='m-auto text-[#EF5350]'>Something went wrong, please try again !</p>
                        <Link to={'/'} className="px-3 py-2 rounded-lg bg-green-400 text-black m-auto mt-4"><button className="">Home</button></Link>
                    </>
                }
            </div>

            {city && <CityCard city={city} displayData={cityDisplayData} classNames="text-center mb-8 max-w-[80%] mx-auto" />}
            {!city && newCity && <CityCard city={newCity} displayData={cityDisplayData} classNames="text-center mb-8 max-w-[80%] mx-auto" />}

            <div className="weather-slider relative">

                {!isLoading && isForecastLoading &&
                    <div className='absolute z-10 w-full h-full backdrop-blur-md top-0 left-0 flex'>
                        <img alt='loader' src='/images/loading.gif' className='m-auto max-w-20' />
                    </div>
                }

                <Swiper
                    modules={[Pagination, Mousewheel]}
                    spaceBetween={20}
                    slidesPerView={10}
                    pagination={{
                        clickable: true,
                    }}
                    mousewheel

                >
                    {cityForecast?.map((city: CityData, index: number) => {

                        const date = new Date(city.dt * 1000);
                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                        const formattedTime = date.toLocaleTimeString('en-US', {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        })

                        return (
                            <SwiperSlide onClick={() => cardClickHandler(city, index)}>
                                <div key={index} className={`bg-card-bg-4 rounded-[20px] px-2 py-6 transition-shadow duration-300 ease-in-out hover:shadow-city-card-hover text-center cursor-pointer hover:-translate-y-2  ${index === selectedCard ? 'shadow-city-card-selected hover:shadow-city-card-selected' : ''}`}>
                                    <p>{city.main.temp}°C</p>
                                    <img
                                        className="mx-auto w-[100px] min-h-[100px]"
                                        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                                        alt={city.weather[0].description}
                                    />
                                    <p>{dayName}</p>
                                    <p>{formattedTime}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>


        </div>
    )
};

export default City;