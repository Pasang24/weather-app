import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import axios from "axios";
// import searchWeather from "./searchWeather";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_SERVER_URL}/forecast.json`, {
        params: {
          key: import.meta.env.VITE_REACT_API_KEY,
          q: "Kathmandu",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  const fetchData = (cityName) => {
    axios
      .get(`${import.meta.env.VITE_REACT_SERVER_URL}/forecast.json`, {
        params: {
          key: import.meta.env.VITE_REACT_API_KEY,
          q: cityName,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Weather App</h1>
      <SearchBar fetchData={fetchData} />
      <Weather data={data} />
    </>
  );
}

export default App;
