import env from "react-dotenv";

const API_MAIN = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherDataByCity(cityName) {
  try {
    let response = await fetch(
      API_MAIN +
        "?q=" +
        cityName +
        "&units=imperial&appid=" +
        env.OPEN_WEATHER_API_KEY
    );
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getWeatherDataByCoords(lat, long) {
  try {
    let response = await fetch(
      API_MAIN +
        "?lat=" +
        lat +
        "&lon=" +
        long +
        "&units=imperial&appid=" +
        env.OPEN_WEATHER_API_KEY
    );
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}
