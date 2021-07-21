import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "./CitySearch.module.css";
import CitySearchBar from "./CitySearchBar";
import CitySearchItem from "./CitySearchItem";

const CITIES = [
  "New York City",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const CitySearch = forwardRef(({ onAddCity }, ref) => {
  const [hidden, setHidden] = useState(true);
  const [cityItems, setCityItems] = useState();

  function updateCities(searchTerm) {
    setCityItems(
      CITIES.filter((cityName) =>
        cityName.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((cityName) => (
        <CitySearchItem
          key={cityName}
          onClick={() => {
            setHidden(true);
            onAddCity(cityName);
          }}
        >
          {cityName}
        </CitySearchItem>
      ))
    );
  }

  useEffect(() => {
    updateCities("");
  }, []);

  useImperativeHandle(ref, () => ({
    searchForCity: () => setHidden(false),
  }));

  return (
    <div style={{ display: hidden ? "none" : "block" }}>
      <div className={styles.grayScreen} onClick={() => setHidden(true)}></div>
      <div className={styles.citySearch}>
        <CitySearchBar onSearchChange={updateCities} />
        <div style={{ overflow: "auto", height: "85%" }}>{cityItems}</div>
      </div>
    </div>
  );
});

export default CitySearch;
