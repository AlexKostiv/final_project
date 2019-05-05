import React from 'react';
import moment from 'moment';


const DailyForecast = ({ forecast, isCelcius }) => {
  var bank = [];
  var today = moment().date();

  var newData = forecast.filter( (day) => {
    var ApiDate = moment.unix(day.dt).date();
    if (ApiDate === today) {
      return false;
    } else if (bank.indexOf(ApiDate) > -1){
      return false;
    } else {
      bank.push(ApiDate);
      return true;
    }
  });
  return (
      <div className="forecast">
        {newData.map((list, index) => {
          const dayCode = moment.unix(list.dt).format('dddd, MMM D');
          if (index === 0) {
            return (
                <div
                    className="forecast__item"
                    key={list.dt}
                >
                  <i className={`wi wi-owm-${list.weather[0].id}`} />
                  <h5 className="forecast-date">{dayCode}</h5>
                  <h2 className="forecast-temp">
                    {isCelcius ? Math.round(list.main.temp) : Math.round((list.main.temp * (9 / 5)) + 32)}<span>°</span>
                  </h2>
                </div>
            );
          } else {
            return (
                <div
                    className="forecast__item"
                    key={list.dt}
                >
                  <i className={`wi wi-owm-${list.weather[0].id}`} />
                  <h5 className="forecast-date">{dayCode}</h5>
                  <h2 className="forecast-temp">
                    {isCelcius ? Math.round(list.main.temp) : Math.round((list.main.temp * (9 / 5)) + 32)}<span>°</span>
                  </h2>
                </div>
            );
          }
        })}
      </div>
  );
};


export default DailyForecast;


