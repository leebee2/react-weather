import React from 'react';

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
                    <img src={process.env.PUBLIC_URL + `/img/${weather.weather[0].icon}.png`} alt="weather" className='weather-icon'/>
                    {Math.round(weather.main.temp)}°C
                </div>
                {/* <div className="weather"> {weather.weather[0].main}</div> */}
            </div>
        </div>
    );
};

export default WeatherData;