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
        borderColor: "green",
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
        suggestedMin: 0,
        suggestedMax: 60,
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
        <h3>{data.location.name}</h3>
        <h3>Local Time: {data.location.localtime.slice(11)}</h3>
        <h1>{data.current.temp_c}°C</h1>
        <span>{data.current.condition.text}</span>
      </div>

      <div className="current-day-info">
        {data.forecast.forecastday[0].hour.map((hourData, indx) => {
          return (
            <div className="hour-info" key={indx}>
              <span>{hourData.time.slice(11)}</span>
              <h4>{hourData.temp_c}°</h4>
              <img src={hourData.condition.icon} />
              <span>{hourData.wind_kph}km/h</span>
            </div>
          );
        })}
      </div>

      {/* <h2>3-Day Forecast</h2>
      <LineChart data={tempData} options={options} /> */}

      <div className="other-info">
        <div className="sun-info">
          <div className="paths">
            <div className="total-path"></div>
            <div className="sun-path" style={{ width: `${sunPosition}%` }}>
              <img src={sun} className="sun"></img>
            </div>
          </div>
        </div>
        <div className="info">
          <div>
            <span>Sunrise</span>
            <h3>{data.forecast.forecastday[0].astro.sunrise}</h3>
          </div>
          <div>
            <span>Sunset</span>
            <h3>{data.forecast.forecastday[0].astro.sunset}</h3>
          </div>
        </div>
        <div className="info">
          <div>
            <span>Humidity</span>
            <h3>{data.current.humidity}%</h3>
          </div>
          <div>
            <span>Pressure</span>
            <h3>{data.current.pressure_mb} mbar</h3>
          </div>
        </div>
        <div className="info">
          <div>
            <span>Wind Speed</span>
            <h3>{data.current.wind_kph}km/h</h3>
          </div>
          <div>
            <span>UV Index</span>
            <h3>{data.current.uv}</h3>
          </div>
        </div>
        <div className="info">
          <div>
            <span>Latitude</span>
            <h3>{data.location.lat}</h3>
          </div>
          <div>
            <span>Longitude</span>
            <h3>{data.location.lon}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
