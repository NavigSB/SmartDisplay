import styles from "./CitySearchItem.module.css";

function CitySearchItem({ children, onClick }) {
  return (
    <div className={styles.itemContainer} onClick={onClick}>
      <p className={styles.searchItem}>{children}</p>
    </div>
  );
}

export default CitySearchItem;
