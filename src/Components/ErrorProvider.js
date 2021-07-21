import React, { useContext, useEffect, useState } from "react";

const ErrorContext = React.createContext();

export function useErrorHelper() {
  return useContext(ErrorContext);
}

export function ErrorProvider({ children, onError }) {
  const [errorState, setErrorState] = useState({
    displayError: onError
  });

  useEffect(() => {
    setErrorState({
      displayError: onError
    });
  }, [onError]);

  return <ErrorContext.Provider value={errorState}>{children}</ErrorContext.Provider>;
}
