import { useState, useEffect } from "react";
import axios from "axios";
import CityList from "./CityList";
import Spinner from "./Spinner";
import "./SearchBar.css";

function SearchBar({ fetchData }) {
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    if (cityName.length > 2) {
      const timer = setTimeout(() => {
        setIsLoading(true);
        axios
          .get("http://api.weatherapi.com/v1/search.json", {
            params: {
              key: "5d4f1b212f294d93ad790558230504",
              q: cityName,
            },
          })
          .then((res) => {
            console.log(res.data);
            setCityList(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setCityList([]);
    }
  }, [cityName]);

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={cityName}
          placeholder="Enter city name..."
          onChange={handleChange}
        />
        {isLoading && (
          <div className="loader">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <CityList
            cityList={cityList}
            setCityName={setCityName}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBar;
