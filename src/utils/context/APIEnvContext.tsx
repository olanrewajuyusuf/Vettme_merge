import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface EnvContextType {
  isLive: boolean;
  setIsLive: Dispatch<SetStateAction<boolean>>;
}

export const APIEnvContext = createContext<EnvContextType | undefined>(undefined);

export const APIEnvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLive, setIsLive] = useState(false);

  return (
    <APIEnvContext.Provider value={{ isLive, setIsLive }}>
      {children}
    </APIEnvContext.Provider>
  );
};