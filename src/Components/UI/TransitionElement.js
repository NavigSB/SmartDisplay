import { useEffect, useRef, useState } from "react";
import styles from "./TransitionElement.module.css";

function TransitionElement({
  children,
  className,
  style,
  vertical,
  horizontal,
  hidden,
  startHidden,
  fadeInTime,
  fadeOutTime,
  flyInTime,
  maxHeight,
}) {
  const animationQueue = useRef([]);
  const [currentAnimation, setCurrentAnimation] = useState("");
  const displayed = useRef(startHidden ? false : true);
  const times = useRef({
    "--fadein-time": "3.5s",
    "--fadeout-time": "2s",
    "--flyin-time": "1s",
    "--max-height": "7vh",
  });
  let animating = false;

  useEffect(() => {
    times.current = {
      "--fadein-time": fadeInTime || times.current["--fadein-time"],
      "--fadeout-time": fadeOutTime || times.current["--fadeout-time"],
      "--flyin-time": flyInTime || times.current["--flyin-time"],
      "--max-height": maxHeight || times.current["--max-height"],
    };
  }, [fadeInTime, fadeOutTime, flyInTime, maxHeight]);

  useEffect(() => {
    if (
      displayed.current &&
      hidden &&
      !animationQueue.current.includes(styles.hiding)
    ) {
      animationQueue.current.push(styles.hiding);
    }
    if (horizontal && !animationQueue.current.includes(styles.horizontal)) {
      animationQueue.current.push(styles.horizontal);
    } else if (vertical && !animationQueue.current.includes(styles.vertical)) {
      animationQueue.current.push(styles.vertical);
    }
    if (
      (currentAnimation === "" && animationQueue.current.length > 0) ||
      (currentAnimation !== "" && animating === false)
    ) {
      displayed.current = true;
      setCurrentAnimation(animationQueue.current.pop());
      animating = true;
    }
  }, [horizontal, vertical, hidden]);

  return (
    <div
      className={currentAnimation + " " + className}
      style={{
        ...style,
        ...times.current,
        display: displayed.current ? "" : "none",
      }}
      onAnimationEnd={() => {
        animating = false;
        if (currentAnimation === "hiding") {
          displayed.current = false;
        }
        if (animationQueue.current.length > 0) {
          setCurrentAnimation(animationQueue.current.pop());
        } else {
          setCurrentAnimation("");
        }
      }}
    >
      {children}
    </div>
  );
}

export default TransitionElement;
