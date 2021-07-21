import styles from "./UIElement.module.css";

function UIElement({ children, className }) {
  return (
    <div className={`${styles.uiElement} ${styles.noselect} ${className}`}>
      {children}
    </div>
  );
}

export default UIElement;
