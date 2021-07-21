import styles from "./Dashboard.module.css";
import UIElement from "../UI/UIElement";
import Clock from "./Clock/Clock";
import CurrentWeather from "./Weather/CurrentWeather";
import { useErrorHelper } from "../ErrorProvider";
import { getWeatherDataByCoords } from "../../Services/WeatherData";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CityButtons from "./CityButtons/CityButtons";

const Dashboard = forwardRef(({ onRequestCity }, ref) => {
  const errorHelper = useErrorHelper();
  const [currentCity, setCurrentCity] = useState();
  const buttonsRef = useRef();
  const weatherRef = useRef();

  async function updateGeolocation() {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve([position.coords.latitude, position.coords.longitude]);
          },
          () => {
            errorHelper.displayError(
              "Could not get current possition (check Geolocation settings)"
            );
            resolve();
          }
        );
      } else {
        errorHelper.displayError(
          "Geolocation is not available on your device."
        );
        resolve();
      }
    });
  }

  useEffect(() => {
    async function updateCurrentCity() {
      let coords = await updateGeolocation();
      setCurrentCity();
      if (typeof coords === "object") {
        let weatherData = await getWeatherDataByCoords(coords[0], coords[1]);
        setCurrentCity(weatherData.name);
        buttonsRef.current.addCity(weatherData.name, true);
      }
    }
    updateCurrentCity();
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: weatherRef.current.refresh,
    addCity: (cityName) => buttonsRef.current.addCity(cityName, false),
  }));

  return (
    <UIElement className={styles.dashboard}>
      <Clock className={styles.dashboardComp} />
      <CurrentWeather className={styles.dashboardComp} ref={weatherRef} cityName={currentCity} />
      <CityButtons ref={buttonsRef} onRequestCity={onRequestCity} onCityChange={(cityName) => setCurrentCity(cityName)} />
    </UIElement>
  );
});

export default Dashboard;
