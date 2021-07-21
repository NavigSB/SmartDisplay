import env from "react-dotenv";
import { createClient } from "pexels";

const MAX_PEXEL_RESULTS = 110;

export function getBackgroundImages(photoCount) {
  return new Promise((resolve) => {
    const client = createClient(env.PEXELS_API_KEY);

    if (+photoCount < 2) {
      photoCount = 2;
    } else if (+photoCount > 80) {
      photoCount = 80;
    }

    const page = Math.floor(
      Math.random() * (MAX_PEXEL_RESULTS / +photoCount + 1)
    );

    client.collections
      .media({ id:"10a390n", page, per_page: photoCount })
      .then((response) => {
        resolve(
          response.media.map((photo) => {
            return photo.src["large2x"];
          })
        );
      });
  });
}
