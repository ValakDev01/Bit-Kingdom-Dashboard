import { createContext } from 'react';

interface DarkModeContextType {
  isDarkMode: boolean;
  totalCountWatchlist: number;
  toggleDarkMode: () => void;
  handleLogoutDark: () => void;
  // eslint-disable-next-line no-unused-vars
  updateCryptoSymbol: (symbol: string) => void;
  cryptoSymbol: string;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  totalCountWatchlist: 0,
  toggleDarkMode: () => {},
  handleLogoutDark: () => {},
  updateCryptoSymbol: () => {},
  cryptoSymbol: '',
});

export default DarkModeContext;
