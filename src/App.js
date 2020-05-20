import React, { useState } from 'react';

import './App.css';

const api = {
  key: '5f21e2a433a952901e44855c94de29a0',
  baseUrl: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('')
          console.log(result)
        }
        );
    }
  }

  return (
    <main className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? "app warm" : "app") : "app"}>
      <div className="search-box">
        <input
          type="text"
          className="searchbar"
          placeholder="search.."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)} °c
          </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
              <div className="weather">
                {weather.wind.speed} kmph
              </div>
            </div>
          </div>
        </div>
      ) : ('')}

    </main>

  );
}

export default App;
