import { createContext } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  totalCountWatchlist: number;
  toggleDarkMode: () => void;
  handleLogoutDark: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  totalCountWatchlist: 0,
  toggleDarkMode: () => {},
  handleLogoutDark: () => {},
});

export default DarkModeContext;
