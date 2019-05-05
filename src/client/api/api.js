const countryCodeEndpoint = '../../../static/country-code.json';
const ipEndpoint = `http://ip-api.com/json/`;


export const fetchCountryCode = async () => {
  const requestCountryCode = await fetch(countryCodeEndpoint);
  const countryCode = await requestCountryCode.json();

  return countryCode;
};

export const fetchForecast = async (query, lat, lon) => {
  const searchQuery = query ? `q=${query}&` : '';
  const latitude = lat ? `lat=${lat}&` : '';
  const longitude = lon ? `lon=${lon}&` : '';
  const url = `${'http://api.openweathermap.org/data/2.5/forecast?' + searchQuery + latitude + longitude}APPID=7432e6c76236caab2c02e1851c2b6225&units=metric`;
  const forecastRequest = await fetch(url);
  const forecast = await forecastRequest.json();

  return forecast;
};


export const fetchCurrentLocationAndWeather = async () => {
  const requestLocation = await fetch(ipEndpoint);
  const location = await requestLocation.json();
  const weather = await fetchForecast(undefined, location.lat, location.lon);

  return weather;
};

