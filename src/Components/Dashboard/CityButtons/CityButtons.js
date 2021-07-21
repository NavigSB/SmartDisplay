import styles from "./CityButtons.module.css";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import TransitionElement from "../../UI/TransitionElement";
import CityButton from "./CityButton";

const MAX_CITIES = 3;
const FADE_TIME = 1;

const CityButtons = forwardRef(({ onRequestCity, onCityChange }, ref) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    addCity("+", false, onRequestCity);
  }, []);

  function addCity(cityName, selected, callback) {
    if (!cities.map((city) => city.cityName).includes(cityName)) {
      setCities((prevCities) => {
        let newCities = [
          { cityName, callback, selected: selected },
          ...prevCities,
        ];
        if (newCities.length > MAX_CITIES) {
          newCities.splice(newCities.length - 2, 1);
        }
        return newCities;
      });
    }
  }

  function cityClicked(cityName) {
    onCityChange(cityName);
    setCities((prevCities) => {
      return prevCities.map((city) => {
        if (city.cityName === cityName) {
          city.selected = true;
        } else {
          city.selected = false;
        }
        return city;
      });
    });
  }

  useImperativeHandle(ref, () => ({
    addCity: (cityName, selected) => {
      addCity(cityName, selected, cityClicked);
      if (selected) {
        onCityChange(cityName);
      }
    },
  }));

  return (
    <TransitionElement
      className={styles.cityButtons}
      hidden={false}
      vertical={true}
      fadeInTime={FADE_TIME + "s"}
      fadeOutTime={FADE_TIME + "s"}
    >
      {cities.map((city) => {
        return (
          <CityButton
            key={city.cityName}
            onClick={() => city.callback(city.cityName)}
            selected={city.selected}
          >
            {city.cityName}
          </CityButton>
        );
      })}
    </TransitionElement>
  );
});

export default CityButtons;
