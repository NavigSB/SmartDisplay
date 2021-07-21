import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { getWeatherDataByCity } from "../../../Services/WeatherData";
import TransitionElement from "../../UI/TransitionElement";
import styles from "./CurrentWeather.module.css";

const CurrentWeather = forwardRef(({ className, cityName }, ref) => {
  const ICONS_URL = "http://openweathermap.org/img/wn/";

  const MAX_HEIGHT = "10vh";
  const FADE_IN_TIME = 1;
  const FADE_OUT_TIME = 1;
  const FLY_IN_TIME = 1;

  const [hidden, setHidden] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const dataDelayId = useRef(null);

  useEffect(() => {
    refresh(false);
  }, []);

  useEffect(() => {
    refresh(true);
  }, [cityName]);

  async function refresh(delayed) {
    setHidden(true);
    if (cityName !== undefined && dataDelayId.current === null) {
      let weatherData = await getWeatherDataByCity(cityName);
      dataDelayId.current = setTimeout(() => {
        setHidden(false);
        setWeatherData({
          iconSrc: ICONS_URL + weatherData.weather[0].icon + "@2x.png",
          temp: Math.round(weatherData.main.temp),
        });
        dataDelayId.current = null;
      }, parseInt((FADE_IN_TIME - 0.25) * 1000 * (delayed ? 1 : 0)));
    }
  }

  useImperativeHandle(ref, () => ({
    refresh: () => refresh(true),
  }));

  return (
    <TransitionElement
      className={styles.currentWeather + " " + className}
      maxHeight={MAX_HEIGHT}
      fadeInTime={FADE_IN_TIME + "s"}
      fadeOutTime={FADE_OUT_TIME + "s"}
      flyInTime={FLY_IN_TIME + "s"}
      horizontal={!hidden}
      hidden={hidden}
      startHidden
    >
      <img className={styles.icon} src={weatherData.iconSrc} />
      <p className={className}>{weatherData.temp}°</p>
    </TransitionElement>
  );
});

export default CurrentWeather;
