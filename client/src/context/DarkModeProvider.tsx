import useUser from '../hooks/authentication/useUser';
import { useLocalStorageState } from '../hooks/other/useLocalStorage';
import useUpdateSetting from '../hooks/settings/useUpdateSetting';
import DarkModeContext from './DarkModeContext';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

const DarkModeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data } = useUser();
  const { mutate } = useUpdateSetting();

  const [cryptoSymbol, setCryptoSymbol] = useState<string>(
    localStorage.getItem('cryptoSymbol') || 'BTC'
  );

  const totalCountWatchlist = data?.totalCount;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode');

  useEffect(() => {
    const isUserDarkMode = data?.data?.settings?.theme === 'dark';

    if (data && isUserDarkMode !== undefined) {
      setIsDarkMode(isUserDarkMode);
    }
  }, [data, setIsDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
    mutate({ theme: !isDarkMode ? 'dark' : 'light' });
  };

  const handleLogoutDark = () => {
    setIsDarkMode(false);
  };

  const updateCryptoSymbol = (symbol: string) => {
    setCryptoSymbol(symbol);
    localStorage.setItem('cryptoSymbol', symbol);
  };

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        handleLogoutDark,
        totalCountWatchlist,
        updateCryptoSymbol,
        cryptoSymbol,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
