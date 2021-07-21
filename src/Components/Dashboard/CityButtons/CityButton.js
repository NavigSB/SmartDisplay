import styles from "./CityButton.module.css";
import { useEffect, useState } from "react";

function CityButton({ children, onClick, selected }) {
  const [cityName, setCityName] = useState(children);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => setCityName(children), [children]);

  useEffect(() => setIsSelected(selected), [selected]);

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.cityButton} onClick={() => onClick(cityName)}>
        {cityName}
        <hr
          className={
            styles.buttonUnderline + " " + (isSelected ? styles.selected : "")
          }
        />
      </button>
    </div>
  );
}

export default CityButton;
