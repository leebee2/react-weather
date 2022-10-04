import React, { useEffect, useState } from 'react';

const api = {
  key: 'ca19fef0c6e3e329aeb70050d11e3888',
  baseUrl: 'https://api.openweathermap.org/'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [searchData, setSearchData] = useState([]);

  const searchWeather = (e) => {
    if (e.key == "Enter") {
      geoLocation();
    }
  }

  /**
   * 도시 이름으로 바로 날씨 정보를 받아올 수 없어서 
   * 위도 경도를 먼저 받고 실행해야함
   */
  const geoLocation = async () => {
    try {
      let response = await fetch(`${api.baseUrl}geo/1.0/direct?q=${query}&appid=${api.key}`)
      let data = await response.json();

      if (data.length > 0) {
        let lat = data[0].lat;
        let lon = data[0].lon;

        getSearchWeather(lat, lon);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 
   * @param {*} lat 위도 
   * @param {*} lon 경도
   */
  const getSearchWeather = async (lat, lon) => {
    try {
      let response = await fetch(`${api.baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`)
      let result = await response.json();

      setWeather(result);
      cityLocalStorageList();
    } catch (error) {
      console.log(error);
    }
  }

  const cityLocalStorageList = () => {
    let citySearch = localStorage.getItem('citySearch')
    let search = citySearch == null ? [] : JSON.parse(citySearch);

    search.push(query);
    search = new Set(search);
    search = [...search];

    localStorage.setItem('citySearch', JSON.stringify(search));
    setSearchData(search);
    setQuery('');
  }

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

  useEffect(() => {
    let citySearch = localStorage.getItem('citySearch')
    let search = citySearch == null ? [] : JSON.parse(citySearch);

    setSearchData(search);
  }, [])

  return (
    <div className={(typeof weather.main != "undefined") ?
      (weather.main.temp > 16 ? 'app warm' : 'app')
      : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type="text"
            className='search-bar'
            placeholder='Search...'
            list="city"
            onChange={(e) => setQuery(e.target.value)}
            onClick={(e) => setWeather([])}
            value={query}
            onKeyDown={(e) => searchWeather(e)}
          />
          <datalist id="city">
            {searchData.map((item, index) =>
              <option value={item} key={index}></option>)}
          </datalist>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {weather.main.temp}°C
              </div>
              <div className="weather"> {weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
            <div className="location">
            Enter the weather.
          </div>)}
      </main>
    </div>
  );
}

export default App;
