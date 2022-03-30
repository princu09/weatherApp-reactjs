import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const [tempInfo, setTempInfo] = useState("");
  const current = new Date().toLocaleString();
  const [city, setcity] = useState("Ahmedabad");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0b96293758b4c64600fff3987223be12`;
      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { country, sunset } = data.sys;
      const { speed } = data.wind;

      const myWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        country,
        sunset,
        speed,
      };
      setTempInfo(myWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const changeCity = () => {
    ref.current.click();
  };

  const handleClick = (e) => {
    getWeatherInfo();
    refClose.current.click();
  };

  const onChange = (e) => {
    setcity({ ...city, [e.target.name]: e.target.value });
  };

  let sec = tempInfo.sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  const [weatherState, setWeatherState] = useState("");

  useEffect(() => {
    if (tempInfo.weathermood) {
      switch (tempInfo.weathermood) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-fog");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        default:
          setWeatherState("wi-day-sunny");
          break;
      }
    }
    getWeatherInfo();
  }, [tempInfo.weathermood]);

  const [mode, setMode] = useState("light");
  const [modeIcon, setmodeIcon] = useState(<i className="ri-moon-fill" />);
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setmodeIcon(<i className="ri-sun-fill" />);
    } else {
      setMode("light");
      setmodeIcon(<i className="ri-moon-fill" />);
    }
  };

  return (
    <>
      <div className={`main__${mode}`}>
        <div className={`main__div container text-white rounded p-3`}>
          <div className="menu">
            <p className="brand-name">WeatherApp</p>
            <div class="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={toggleMode}
              />
              <label
                className={`form-check-label text-${
                  mode === "light" ? "dark" : "light"
                }`}
                htmlFor="flexSwitchCheckDefault"
              >
                {modeIcon}
              </label>
            </div>
          </div>
          <div className="date__time">
            <p className="m-0">{current}</p>
          </div>

          <div className="weather__data">
            <p className="h4 m-0">
              <i class={`wi ${weatherState}`} /> {tempInfo.weathermood} <br />
              <span className="temp">{tempInfo.temp}</span>{" "}
            </p>
          </div>

          <div className="extra__data">
            <p className="h6">
              Location : &nbsp;
              <span className="fw-bold">
                {tempInfo.name} , {tempInfo.country}{" "}
              </span>
            </p>
            <p
              className="mb-3"
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={changeCity}
            >
              Change City
            </p>
          </div>

          <div className="weather__details mt-5">
            <div className="row">
              <div className="col-6 col-lg-3 d-flex">
                <i class="wi wi-sunset" />
                <div className="">
                  <p className="m-0">{timeStr}</p>
                  <p className="m-0">Sunset</p>
                </div>
              </div>
              <div className="col-6 col-lg-3 d-flex">
                <i class="wi wi-humidity" />
                <div className="">
                  <p className="m-0">{tempInfo.humidity}</p>
                  <p className="m-0">Humidity</p>
                </div>
              </div>
              <div className="col-6 col-lg-3 d-flex">
                <i class="wi wi-rain" />
                <div className="">
                  <p className="m-0">{tempInfo.pressure} MM</p>
                  <p className="m-0">Pressure</p>
                </div>
              </div>
              <div className="col-6 col-lg-3 d-flex">
                <i class="wi wi-sandstorm" />
                <div className="">
                  <p className="m-0">{tempInfo.speed}</p>
                  <p className="m-0">Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg__blur__img"></div>
      </div>
      <button
        type="button"
        className="d-none btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change City
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form class="">
                <label htmlFor="">Enter City Name : </label>
                <input
                  type="text"
                  class="form-control"
                  style={{ backgroundColor: "transparent" }}
                  name="city"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-dark btn-sm"
                onClick={handleClick}
              >
                Change City
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
