import { CityDisplayData, WeatherData } from "../extra/Api";

const CityCard: React.FC<{ city: WeatherData, classNames?: string, displayData?: CityDisplayData | null }> = ({ city, classNames, displayData }) => {

    const temp = displayData ? displayData.temp : city.main.temp;
    const feelsLike = displayData ? displayData.feels_like : city.main.feels_like;
    const humidity = displayData ? displayData.humidity : city.main.humidity;
    const seaLevel = displayData ? displayData.sea_level : city.main.sea_level;
    const speed = displayData ? displayData.speed : city.wind.speed;
    const description = displayData ? displayData.description : city.weather[0].description;
    const icon = displayData ? displayData.icon : city.weather[0].icon;

    return (
        <div className={`bg-card-bg-4 rounded-[20px] px-2 py-6 transition-shadow duration-100 ease-in-out hover:shadow-city-card-hover ${classNames}`}>
            <h2 className="font-bold text-[40px] leading-[65px]">
                {city.name}, {city.sys.country}
            </h2>
            <img
                className="mx-auto w-[150px] min-h-[150px]"
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
            />

            <p className="font-extralight text-[42px] md-6">{temp}°C</p>
            <div className="flex mb-6">
                <div className="flex flex-col justify-between mx-auto gap-2">
                    <div className="flex gap-3">
                        <img className="max-w-[30px] object-contain" src='/images/humidity.png' alt="humidity" />
                        <div className="text-left">
                            <p className="text-[18px]">{humidity}%</p>
                            <p className="text-[12px]">Humidity</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img className="max-w-[30px] object-contain" src='/images/sea-level.png' alt="sea level" />
                        <div className="text-left">
                            <p className="text-[18px]">{seaLevel}hPa</p>
                            <p className="text-[12px]">Sea Level</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between mx-auto gap-2">
                    <div className="flex gap-3">
                        <img className="max-w-[30px] object-contain" src='/images/wind-speed.png' alt="wind speed" />
                        <div className="text-left">
                            <p className="text-[18px]">{speed}</p>
                            <p className="text-[12px]">Wind Speed</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <img className="max-w-[30px] object-contain" src='/images/feels-like.png' alt="feels like" />
                        <div className="text-left">
                            <p className="text-[18px]">{feelsLike}</p>
                            <p className="text-[12px]">Feels Like</p>
                        </div>
                    </div>
                </div>

            </div>

            <p className="font-extralight capitalize">Summary : {description}</p>

        </div>
    )
};

export default CityCard;