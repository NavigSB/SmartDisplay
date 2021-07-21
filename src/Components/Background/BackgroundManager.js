import { useCallback, useEffect, useRef } from "react";
import Background from "./Background";

function BackgroundManager({ photoCount, photoDuration, children }) {
  const intervalId = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const backgroundRef = useCallback((backgroundAPI) => {
    if (backgroundAPI !== null) {
      if(intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      intervalId.current = setInterval(() => {
        backgroundAPI.nextImage();
      }, (parseInt(photoDuration) + 1) * 1000);
    }
  }, [photoDuration]);

  return (
    <Background ref={backgroundRef} photoCount={photoCount}>
      {children}
    </Background>
  );
}

export default BackgroundManager;
