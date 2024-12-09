import { createContext, useContext, useState } from 'react';

// Create the context
const LoaderContext = createContext();

// Provider component
export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Hook to use loader context
export const useLoader = () => useContext(LoaderContext);
