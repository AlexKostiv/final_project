
const ipdataKey = `df43ee6e0345397c85bbe4e26dc9b2629ecc4a5a2df1bcdc6e6e87f3`;
const openWeatheMapKey = `7432e6c76236caab2c02e1851c2b6225`;
const countryCodeEndpoint = '../../../static/country-code.json';
const ipdataEndpoint = `https://api.ipdata.co?api-key=${ipEndpointKey}`;
const openWeatheMapEndpoint = `https://api.openweathermap.org/data/2.5/forecast?`;


export const fetchCountryCode = async () => {
  const requestCountryCode = await fetch(countryCodeEndpoint);
  const countryCode = await requestCountryCode.json();

  return countryCode;
};

export const fetchForecast = async (query, lat, lon) => {
  const searchQuery = query ? `q=${query}&` : '';
  const latitude = lat ? `lat=${lat}&` : '';
  const longitude = lon ? `lon=${lon}&` : '';
  const url = `${openWeatheMapEndpoint + searchQuery + latitude + longitude}APPID=${openWeatheMapKey}&units=metric`;
  const forecastRequest = await fetch(url);
  const forecast = await forecastRequest.json();

  return forecast;
};


export const fetchCurrentLocationAndWeather = async () => {
  const requestLocation = await fetch(ipdataEndpoint);
  const location = await requestLocation.json();
  const weather = await fetchForecast(undefined, location.latitude, location.longitude);

  return weather;
};

