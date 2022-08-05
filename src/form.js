import { useState, useEffect } from "react";
import Axios from "axios";
const FormResponse = () => {
  var [city, setCity] = useState("");
  var [state, setState] = useState("");
  var [country, setCountry] = useState("");
  var [lat, setLat] = useState("");
  var [lon, setLon] = useState("");
  var [weatherdata, setWeatherdata] = useState("");
  useEffect(() => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1e31eeadc4767e3f049f78d373ef95fb&units=metric`
    ).then((response) => {
      setWeatherdata(response.data);
      console.log(weatherdata);
      // console.log(weatherdata.main.temp);
      // console.log(weatherdata.wind.speed);
    });
  }, [lat, lon]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    await Axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=1e31eeadc4767e3f049f78d373ef95fb&units=metric`
    ).then((response) => {
      console.log(response);
      console.log(response.data[0].lat);
      setLat(response.data[0].lat);
      console.log(response.data[0].lon);
      setLon(response.data[0].lon);
    });
  };
  return (
    <div className="weather-form">
      <h2>Weather Boy</h2>
      <form className="form">
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
        <label>State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        ></input>
        <label>Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        ></input>
        <button onClick={handlesubmit}>Show Weather</button>
      </form>

      <div>
        {weatherdata && <p>Current Temperature:{weatherdata.main.temp}</p>}
        {weatherdata && <p>Current Wind Speed:{weatherdata.wind.speed}</p>}
        {weatherdata && (
          <p>Weather Description:{weatherdata.weather[0].description}</p>
        )}
      </div>
    </div>
  );
};

export default FormResponse;
