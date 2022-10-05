import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";


const SearchBar = (props) => {
    const [query, setQuery] = useState('');

    const searchWeather = (e) => {
        if (e.key == "Enter") {
            props.geoLocation(query);
            setQuery('');
        }
    }

    return (
        <div>
            <div className='search-box'>
                <input
                    type="text"
                    className='search-bar'
                    placeholder='Search...'
                    list="city"
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={(e) => props.setWeather([])}
                    value={query}
                    onKeyDown={(e) => searchWeather(e)}
                />
                <datalist id="city">
                    {props.searchData.map((item, index) =>
                        <option value={item} key={index}></option>)}
                </datalist>
                <div className='tooltip'>
                    <span className="tooltiptext tooltip-bottom">Current <br /> Location</span>
                    <FontAwesomeIcon icon={faLocationCrosshairs} className="dot fa-3x" onClick={() => props.currentSearch()} />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;