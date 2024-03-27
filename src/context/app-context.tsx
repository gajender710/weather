import React, { createContext, useState, useContext, ReactNode } from "react";

interface AppContextProps {
  currentCity: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
  bookmarks: string[];
  setBookmarks: React.Dispatch<React.SetStateAction<string[]>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("");

  const contextValue: AppContextProps = {
    bookmarks,
    setBookmarks,
    currentCity,
    setCurrentCity,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
