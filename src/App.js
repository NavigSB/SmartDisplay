import { useRef, useState } from "react";
import BackgroundManager from "./Components/Background/BackgroundManager";
import CitySearch from "./Components/CitySearch/CitySearch";
import Dashboard from "./Components/Dashboard/Dashboard";
import { ErrorProvider } from "./Components/ErrorProvider";
import ErrorMessage from "./Components/UI/ErrorMessage";
import RefreshButton from "./Components/UI/RefreshButton";

function App() {
  const PHOTO_COUNT = 10;
  const PHOTO_DURATION = 15;
  const ERROR_DURATION = 3;

  const [errorMsg, setErrorMsg] = useState("");
  const dashboardRef = useRef();
  const searchRef = useRef();

  return (
    <ErrorProvider onError={setErrorMsg}>
      <BackgroundManager
        photoCount={PHOTO_COUNT}
        photoDuration={PHOTO_DURATION}
      >
        <RefreshButton onRefresh={() => dashboardRef.current.refresh()} />
        <CitySearch
          ref={searchRef}
          onAddCity={(cityName) => dashboardRef.current.addCity(cityName)}
        />
        <Dashboard
          ref={dashboardRef}
          onRequestCity={() => searchRef.current.searchForCity()}
        />
        <ErrorMessage errorDuration={ERROR_DURATION}>{errorMsg}</ErrorMessage>
      </BackgroundManager>
    </ErrorProvider>
  );
}

export default App;
