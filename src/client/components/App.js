import React, { Component } from 'react';
import moment from 'moment';
import 'moment-timezone';

import DailyForecast from './DailyForecast';
import Weather from './Weather';
import Header from './Header';
import Loader from './Loader';
import SearchEmpty from './SearchEmpty';

import {
  fetchCountryCode,
  fetchForecast,
  fetchCurrentLocationAndWeather
} from '../api/api';

export default class WeatherApp extends Component {
  state = {
    country: '',
    countryCode: {},
    city: '',
    displayTime: '',
    forecast:[],
    humidity: '',
    isCelcius: true,
    isSearching: false,
    lat: '',
    loaded: false,
    lon: '',
    tempCelcius: '',
    tempFahrenheit: '',
    weather: '',
    weatherDescription: '',
    windSpeed: '',
    weatherIconCode: '',
    searchQuery: '',
    searchStatus: undefined,
  };

  componentDidMount() {
    try {
      this.setCountryCode();
      this.fetchUserLocation();
    } catch (e) {
      console.log('An error occured', e);
    }
  }

  fetchUserLocation = async () => {
    const weather = await fetchCurrentLocationAndWeather();

    this.setCurrentWeather(weather);
  };

  // Fetch country code json file
  setCountryCode = async () => {
    if (localStorage.countryCode && Object.keys(localStorage.countryCode).length === 0) {
      const countryCodeStore = JSON.parse(localStorage.getItem('countryCode'));
      this.setState(() => ({ countryCode: countryCodeStore }));
    } else {
      const countryCode = await fetchCountryCode();
      localStorage.setItem('countryCode', JSON.stringify(countryCode));

      this.setState(() => ({ countryCode }));
    }
  };

  setCurrentWeather = (weather) => {
    this.setState({
      city: weather.city.name,
      country: weather.city.country,
      lat: weather.city.coord.lat,
      lon: weather.city.coord.lon,
      tempCelcius: Math.round(weather.list[0].main.temp),
      tempFahrenheit: Math.round((weather.list[0].main.temp * (9/5)) + 32),
      weather: weather.list[0].weather[0].description,
      humidity: weather.list[0].main.humidity,
      windSpeed: weather.list[0].wind.speed,
      weatherDescription: weather.list[0].weather[0].description,
      weatherIconCode: weather.list[0].weather[0].id,
      displayTime: moment.unix(weather.list[0].dt).format('dddd, MMM D'),
      searchStatus: undefined,
      isSearching: false,
      forecast: weather.list,
      loaded: true
    });
  };

  // Search query handler
  onSearchQueryChange = (e) => {
    let input = e.target.value.toLowerCase().trimStart();
    this.setState(() => ({
      searchQuery: input
    }));
  };

  // Search on enter
  onKeyEnter = (e) => {
    if(e.keyCode == 13) {
      this.onSearchWeather();
    }
  };

  // Http request Search <city,country> current weather
  searchCityWeather = async () => {
    try {
      const weather = await fetchForecast(this.state.searchQuery);

      this.setCurrentWeather(weather);
    } catch (e) {
      this.setState({
        searchStatus: 'Location not found',
        isSearching: false
      });
    }
  };

  // Method that's being triggered for searching weather
  onSearchWeather = () => {
    const { searchQuery, isSearching } = this.state;

    if (searchQuery.length !== 0 && !isSearching) {
      this.setState({
        isSearching: true,
        searchStatus: undefined
      });
      this.searchCityWeather();
    }
  };

  // Celcius/Fahrenheit switch
  onToggleFahrenheit = () => {
    this.setState({ isCelcius: !this.state.isCelcius });
  };


  render() {
    const {
      loaded,
      searchQuery,
      isCelcius,
      searchStatus,
      forecast,
      isSearching
    } = this.state;

    return (
        <React.Fragment>
          {loaded ? (
              <div className="container">
                <Header
                    isSearching={isSearching}
                    onChange={this.onSearchQueryChange}
                    onKeyDown={this.onKeyEnter}
                    onSearchWeather={this.onSearchWeather}
                    searchQuery={searchQuery}
                />
                <div className="app-content">
                  {(!isSearching && !searchStatus) && (
                      <React.Fragment>
                        <Weather
                            onToggle={this.onToggleFahrenheit}
                            weather={this.state}
                        />
                        <DailyForecast
                            forecast={forecast}
                            isCelcius={isCelcius}
                        />
                      </React.Fragment>

                  )}

                  {(isSearching && !searchStatus) && (
                      <Loader />
                  )}
                  {searchStatus && (
                      <SearchEmpty searchStatus={searchStatus}/>
                  )}
                </div>
              </div>
          ) : (
              <Loader />
          )}
        </React.Fragment>
    );
  }
}






