import React, { createContext, useContext, useState } from 'react';

// Define the type for the context
interface GlobalContextType {
  ethAddress: string | null;
  setEthAddress: (address: string | null) => void;
}

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Provide the context to the application
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ethAddress, setEthAddress] = useState<string | null>(null);

  return (
    <GlobalContext.Provider value={{ ethAddress, setEthAddress }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
