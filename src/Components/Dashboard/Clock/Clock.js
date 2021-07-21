import { useEffect, useRef, useState } from "react";
import styles from "./Clock.module.css";

function Clock({ className }) {
  const [time, setTime] = useState();
  const [date, setDate] = useState("");
  const hours = useRef();
  const minutes = useRef();

  //On mount
  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const hrs = now.getHours() !== 12 ? pad(now.getHours() % 12, 2) : 12;
      const mins = pad(now.getMinutes(), 2);
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      if (hrs !== hours.current || mins !== minutes.current) {
        if (hrs !== hours.current) {
          hours.current = hrs;
        }
        if (mins !== minutes.current) {
          minutes.current = mins;
        }
        setTime(hours.current + ":" + minutes.current);
      }
      if (dateStr !== date) {
        setDate(dateStr);
      }
    }

    updateTime();
    setInterval(updateTime, 1000);
  }, []);

  return (
    <>
      <p className={styles.time + " " + className}>{time}</p>
      <p className={styles.date + " " + className}>{date}</p>
    </>
  );
}

function pad(val, length) {
  let valStr = val + "";
  let initialLength = valStr.length;
  if (valStr.length < length) {
    for (let i = 0; i < length - initialLength; i++) {
      valStr = "0" + valStr;
    }
  }
  return valStr;
}

export default Clock;
