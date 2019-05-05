import React from 'react';


const Weather = (props) => {
  const {
    weatherIconCode,
    isCelcius,
    tempCelcius,
    tempFahrenheit,
    city,
    countryCode,
    country,
    weatherDescription,
    windSpeed,
    humidity,
    displayTime,
  } = props.weather;
  const countryFlagsUrl = 'https://www.countryflags.io/';

  return (
    <div className="weather">
      <div className="weather-wrapper">
        <i className={`wi wi-owm-${weatherIconCode}`} />
        <div className="temperature-control">
          <h1 className="weather-temp">
            {isCelcius ? `${tempCelcius} °C` : `${tempFahrenheit} °F`}
          </h1>
            <div
                className="temperature-toggle"
                onClick={props.onToggle}
                style={{
                  color: isCelcius ? 'rgba(255, 255, 255, .7)' : '#0cfff8'
                }}
            >
              <span>{isCelcius ? '°F' : '°C' }</span>
            </div>
        </div>
      </div>
      <div className="temperature-info">
        <div className="location">
          <h2>{city}, {countryCode[country]}</h2>
          <img src={`${countryFlagsUrl}/${country}/shiny/64.png`} alt=""/>
        </div>
        <h4 style={{textTransform: 'capitalize'}}>
          <span>Weather:</span> {weatherDescription}
        </h4>
        <h4><span>Wind Speed:</span> {windSpeed} km/h</h4>
        <h4><span>Humidity:</span> {humidity}%</h4>
        <h4><span>Date:</span> {displayTime}</h4>
      </div>
    </div>
  );
};

export default Weather;
