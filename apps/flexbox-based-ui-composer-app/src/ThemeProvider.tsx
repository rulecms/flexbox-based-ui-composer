// Not in use since I figured we needed to change the class at the html tag level

import { useState, createContext, useContext } from 'react';

const defaultTheme = {
  theme: 'dark', // Default theme is 'dark'
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLightTheme: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDarkTheme: () => {},
};

// Create a context for the theme
const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme is 'light'

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Function to set a specific theme
  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setLightTheme, setDarkTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
