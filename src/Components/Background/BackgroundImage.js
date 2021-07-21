import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import styles from "./BackgroundImage.module.css";

const BackgroundImage = forwardRef(({ src }, ref) => {
  const isLoaded = useRef(false);
  const animating = useRef(false);
  const inFrame = useRef(false);
  const waitingInfo = useRef({
    slideIn: false,
    slideOut: false,
  });
  const imgRef = useRef();

  //Run on rerender
  useEffect(() => {
    isLoaded.current = false;
  });

  function hide() {
    imgRef.current.style.display = "none";
  }

  function show() {
    imgRef.current.style.display = "inline";
  }

  function slideIn() {
    if (isLoaded.current && !animating.current) {
      waitingInfo.current.slideIn = false;
      inFrame.current = true;
      setClassStr(styles.backgroundImg + " " + styles.newBackground);
      show();
    } else {
      waitingInfo.current.slideIn = true;
    }
  }

  function slideOut() {
    if (isLoaded.current && !animating.current) {
      waitingInfo.current.slideOut = false;
      inFrame.current = false;
      setClassStr(styles.backgroundImg + " " + styles.oldBackground);
    } else {
      waitingInfo.current.slideOut = true;
    }
  }

  function setClassStr(classStr) {
    imgRef.current.setAttribute("class", classStr);
  }

  function loadedHandler() {
    isLoaded.current = true;
    attemptAnimation();
  }

  function startAnimationHandler() {
    animating.current = true;
  }

  function endAnimationHandler() {
    animating.current = false;
    if(inFrame.current === false) {
      hide();
    }
    attemptAnimation();
  }

  function attemptAnimation() {
    if (waitingInfo.current.slideIn) {
      slideIn();
    }
    if (waitingInfo.current.slideOut) {
      slideOut();
    }
  }

  useImperativeHandle(ref, () => ({
    hide,
    show,
    slideIn,
    slideOut,
  }));

  return (
    <img
      onAnimationStart={startAnimationHandler}
      onAnimationEnd={endAnimationHandler}
      onLoad={loadedHandler}
      ref={imgRef}
      className={styles.backgroundImg}
      style={{display: "none"}}
      src={src}
    ></img>
  );
});

export default BackgroundImage;
