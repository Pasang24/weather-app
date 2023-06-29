import LineChart from "./LineChart";
import sun from "../assets/sun.png";
import "./Weather.css";

function Weather({ data }) {
  const tempData = {
    labels: data.forecast.forecastday.map((forecast) => forecast.date.slice(5)),
    datasets: [
      {
        label: "Max Temperature",
        data: data.forecast.forecastday.map(
          (forecast) => forecast.day.maxtemp_c
        ),
        pointRadius: 6,
        borderColor: "yellow",
      },
      {
        label: "Min Temperature",
        data: data.forecast.forecastday.map(
          (forecast) => forecast.day.mintemp_c
        ),
        pointRadius: 6,
        borderColor: "skyblue",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperture in °C",
        },
        min: 0,
        max: 60,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  function sunPercent(sunRise, sunSet, currentTime) {
    let sunRiseMins;
    let sunSetMins;
    let currentMins;

    let sunRiseArr = sunRise.slice(0, 5).split(":");
    sunRiseMins = parseInt(sunRiseArr[0]) * 60 + parseInt(sunRiseArr[1]);

    let sunSetArr = sunSet.slice(0, 5).split(":");
    sunSetMins = parseInt(sunSetArr[0]) * 60 + parseInt(sunSetArr[1]);
    if (sunSet.slice(6) === "PM") sunSetMins += 720;

    let currentMinsArr = currentTime.split(":");

    currentMins =
      parseInt(currentMinsArr[0]) * 60 + parseInt(currentMinsArr[1]);

    console.log(sunRiseMins, sunSetMins, currentMins);

    let percentage =
      ((currentMins - sunRiseMins) / (sunSetMins - sunRiseMins)) * 100;

    if (percentage < 0) return 0;
    else if (percentage > 100) return 100;
    else return percentage;
  }

  const sunPosition = sunPercent(
    data.forecast.forecastday[0].astro.sunrise,
    data.forecast.forecastday[0].astro.sunset,
    data.location.localtime.slice(11)
  );

  return (
    <div className="weather-container">
      <div className="basic-info">
        <h2>{data.location.name}</h2>
        <h2>Local Time: {data.location.localtime.slice(11)}</h2>
        <img src={data.current.condition.icon} alt="weather-icon" />
        <h1>{data.current.temp_c}°C</h1>
        <h2>{data.current.condition.text}</h2>
      </div>

      <div className="current-day-info">
        {data.forecast.forecastday[0].hour.map((hourData, indx) => {
          return (
            <div className="hour-info" key={indx}>
              <h3>{hourData.time.slice(11)}</h3>
              <h2>{hourData.temp_c}°C</h2>
              <img src={hourData.condition.icon} />
              <h4>
                {hourData.wind_dir} {hourData.wind_kph}km/h
              </h4>
            </div>
          );
        })}
      </div>

      <h2>3-Day Forecast</h2>
      <LineChart data={tempData} options={options} />

      <h2>Other Information</h2>
      <div className="other-info">
        <div className="sun-info">
          <div className="sun-path">
            <img
              src={sun}
              className="sun"
              style={{ left: `${sunPosition}%` }}
            ></img>
          </div>
        </div>
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
