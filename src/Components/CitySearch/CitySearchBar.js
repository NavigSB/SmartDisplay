import styles from "./CitySearchBar.module.css";

function CitySearchBar({ onSearchChange }) {
  function searchChanged(event) {
    onSearchChange(event.target.value);
  }

  return (
    <input
      type="text"
      placeholder={"Search for a city..."}
      className={styles.searchBar}
      onChange={searchChanged}
    ></input>
  );
}

export default CitySearchBar;
