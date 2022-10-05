import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureThreeQuarters, faCloud, faWind, faDroplet} from "@fortawesome/free-solid-svg-icons";

const WeatherData = ({ weather }) => {
    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March',
            'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December']
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${year} / ${month} / ${date}  ${day}`;
    }

    return (
        <div>
            <div className="location-box">
                <div className='location-data'>
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                </div>
            </div>
            <div className="weather-box">
                <div className="temp">
                    <img src={process.env.PUBLIC_URL + `/img/${weather.weather[0].icon}.png`} alt="weather" className='weather-icon' />
                    {Math.round(weather.main.temp)}°C
                </div>
                {/* <div className="weather"> {weather.weather[0].main}</div> */}
            </div>
            <div className='weather-other-box'>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faDroplet} className='weather-icon-mini' />
                        {weather.main.humidity}%
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCloud} className='weather-icon-mini' />
                        {weather.clouds.all}%
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTemperatureThreeQuarters} className='weather-icon-mini' />
                        {Math.round(weather.main.temp)}°C
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faWind} className='weather-icon-mini' />
                        {weather.wind.speed}m/s
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WeatherData;