import { useEffect, useRef, useState } from "react";
import styles from "./ErrorMessage.module.css";
import UIElement from "./UIElement";

function ErrorMessage({ errorDuration, children }) {
  const messageQueue = useRef([]);
  const [message, setMessage] = useState([""]);
  const lastTimeout = useRef(null);

  useEffect(() => {
    if (children !== "") {
      messageQueue.current = [children, ...messageQueue.current];
      if (lastTimeout.current === null) {
        setNewMessage();
      }
    }
  }, [children]);

  function setNewMessage() {
    let newMessage = messageQueue.current.pop();
    if (newMessage !== undefined && newMessage !== message) {
      lastTimeout.current = setTimeout(
        setNewMessage,
        parseInt(errorDuration) * 1000
      );
      setMessage(newMessage);
    } else if(newMessage === message) {
      setNewMessage();
    }else{
      lastTimeout.current = null;
      setMessage("");
    }
  }

  return (
    <div className={styles.error}>
      <UIElement>
        <h4 className={styles.message}>{message}</h4>
      </UIElement>
    </div>
  );
}

export default ErrorMessage;
