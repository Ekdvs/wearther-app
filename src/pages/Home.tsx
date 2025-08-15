import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { fetchWeather, getCityByName, WeatherData } from '../extra/Api';
import CityCard from '../components/CityCard';


const cityList = process.env.REACT_APP_CITY_LIST || '';


const Home: React.FC = () => {

    const [cityName, setCityName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearch, setIsSearch] = useState(false);



    const { data, isLoading, error } = useQuery({
        queryKey: ['weather'],
        queryFn: () => fetchWeather(cityList),
    });

    const { data: searchedCity, isLoading: isCityLoading, error: searchError } = useQuery({
        queryKey: ['weatherByName', cityName],
        queryFn: () => {
            setIsSearch(false);
            return getCityByName(cityName)
        },
        enabled: isSearch,
        staleTime: 1000 * 60 * 5,
    });

    const navigate = useNavigate();
    const handleCityClick = (city: WeatherData) => {
        navigate(`/city?lon=${city.coord.lon}&lat=${city.coord.lat}`, { state: { city } });
    }

    const handleSearch = () => {

        if (searchTerm !== '') {
            setCityName(searchTerm);
            setIsSearch(true);
        } else {
            alert('Please Enter a value');
        }

    }



    if (error || searchError) {
        return <h2> Error ... </h2>
    }

    const cityCount = data ? data.length : 0;
    const lastRowCount = cityCount % 3;

    return (
        <div className="max-w-[90%] md:max-w-[80%] m-auto text-center">

            <div className='flex max-w-[300px] mx-auto rounded-xl overflow-hidden mt-[100px]'>
                <input type="text" name="city" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} className='text-black w-full px-2' />
                <button onClick={handleSearch} className='p-2 bg-green-500 cursor-pointer'>
                    <img src='/images/search.png' alt='search-icon' className='max-w-6' />
                </button>
            </div>

            {(isLoading || isCityLoading) &&
                <div className='absolute w-full h-full backdrop-blur-md top-0 left-0 flex'>
                    <img alt='loader' src='/images/loading.gif' className='m-auto max-w-20' />
                </div>
            }

            <div className='min-h-20 flex'>
                {(error || searchError) && <p className='m-auto text-[#EF5350]'>Something went wrong, Please try again with correct value !</p>}
            </div>

            <div className='grid grid-cols-6 md:gap-x-5 gap-y-6'>




                {!searchedCity && data?.map((city: WeatherData, index: number) => {

                    let itemPosition = '';
                    if (lastRowCount === 2 && index === cityCount - 2) {
                        itemPosition = 'md:col-start-1 xl:col-start-2';
                    }
                    if (lastRowCount === 1 && index === cityCount - 1) {
                        itemPosition = 'md:col-start-2 md:col-end-6 xl:col-start-3';
                    }
                    if (cityCount === 1) {
                        itemPosition = 'md:col-start-3 md:col-end-6'
                    }

                    return (
                        <div key={index} onClick={() => handleCityClick(city)} className={`col-span-6 md:col-span-3 xl:col-span-2 cursor-pointer ${itemPosition}`}>
                            <CityCard city={city} />
                        </div>
                    );
                })}

                {searchedCity &&
                    <div onClick={() => handleCityClick(searchedCity)} className='col-start-1 col-end-7 md:col-start-2 md:col-end-6 col-span-2 cursor-pointer'>
                        <CityCard city={searchedCity} />
                    </div>
                }

            </div>

        </div>
    );
}

export default Home;
