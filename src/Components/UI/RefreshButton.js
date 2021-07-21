import styles from "./RefreshButton.module.css";
import UIElement from "./UIElement";

function RefreshButton({ onRefresh }) {
  return (
    <UIElement>
      <img
        className={styles.refresh}
        onClick={onRefresh}
        width="48"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Refresh_icon.png/512px-Refresh_icon.png"
      />
    </UIElement>
  );
}

export default RefreshButton;
