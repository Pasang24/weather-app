import "./City.css";

function City({ city, setCityName, fetchData }) {
  const handleClick = () => {
    fetchData(city.name);
    setCityName("");
  };

  return (
    <li className="city" onClick={handleClick}>
      {city.name}, {city.country}
    </li>
  );
}

export default City;
