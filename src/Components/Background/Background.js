import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

import { getBackgroundImages } from "../../Services/BGImageRetrieval";
import BackgroundImage from "./BackgroundImage";

const Background = forwardRef(({ children, photoCount }, ref) => {
  const [backgroundImages, setBackgroundImages] = useState([]);
  const currentImage = useRef(0);
  const lastImage = useRef();
  const imageRefs = useRef([]);

  //On mount
  useEffect(() => {
    getBackgroundImages(photoCount).then((photos) => {
      setBackgroundImages(
        photos.map((src, index) => {
          if (index === 0) {
            return (
              <BackgroundImage
                key={src}
                src={src}
                ref={(el) => (imageRefs.current[index] = el)}
              />
            );
          } else {
            return (
              <BackgroundImage
                key={src}
                src={src}
                ref={(el) => (imageRefs.current[index] = el)}
                startHidden
              />
            );
          }
        })
      );
      imageRefs.current[currentImage.current].slideIn();
    });
  }, [photoCount]);

  function nextImage() {
    if (imageRefs.current.length > 0) {
      lastImage.current = currentImage.current;
      currentImage.current =
        (currentImage.current + 1) % imageRefs.current.length;
      imageRefs.current[lastImage.current].slideOut();
      imageRefs.current[currentImage.current].slideIn();
    }
  }

  useImperativeHandle(ref, () => ({
    nextImage,
  }));

  return (
    <div>
      {backgroundImages}
      {children}
    </div>
  );
});

export default Background;
