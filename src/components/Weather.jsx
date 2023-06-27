import "./Weather.css";

function Weather({ data }) {
  return (
    <div className="weather-container">
      <div className="basic-info">
        <h2>{data.location.name}</h2>
        <h2>Local TIme: {data.location.localtime.slice(11)}</h2>
        <img src={data.current.condition.icon} alt="weather-icon" />
        <h1>{data.current.temp_c}°C</h1>
        <h2>{data.current.condition.text}</h2>
      </div>

      <h2>24 Hour Weather Forecast</h2>
      <div className="current-day-info">
        {data.forecast.forecastday[0].hour.map((hourData, indx) => {
          return (
            <div className="hour-info" key={indx}>
              <h3>{hourData.time.slice(11)}</h3>
              <h2>{hourData.temp_c}°</h2>
              <img src={hourData.condition.icon} />
              <h4>
                {hourData.wind_dir} {hourData.wind_kph}km/h
              </h4>
            </div>
          );
        })}
      </div>

      <h2>Other Information</h2>
      <div className="other-info">
        <div className="info">
          <h3>
            <span>Sunrise</span>
            <span>{data.forecast.forecastday[0].astro.sunrise}</span>
          </h3>
          <h3>
            <span>Sunset</span>
            <span>{data.forecast.forecastday[0].astro.sunset}</span>
          </h3>
        </div>
        <div className="info">
          <h3>
            <span>Humidity</span>
            <span>{data.current.humidity}%</span>
          </h3>
          <h3>
            <span>Pressure</span>
            <span>{data.current.pressure_mb} mbar</span>
          </h3>
        </div>
        <div className="info">
          <h3>
            <span>Wind Speed</span>
            <span>{data.current.wind_kph}km/h</span>
          </h3>
          <h3>
            <span>UV Index</span>
            <span>{data.current.uv}</span>
          </h3>
        </div>
        <div className="info">
          <h3>
            <span>Latitude</span>
            <span>{data.location.lat}</span>
          </h3>
          <h3>
            <span>Longitude</span>
            <span>{data.location.lon}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Weather;
