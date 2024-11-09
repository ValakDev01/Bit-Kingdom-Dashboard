/* eslint-disable max-len */
import { useContext } from 'react';

import Spinner from '../../components/Spinner/Spinner';
import DarkModeContext from '../../context/DarkModeContext';
import TradingViewSymbolInfoDark from '../../features/cryptos/TradingViewWidget/TradingViewSymbolInfoDark';
import TradingViewSymbolInfoLight from '../../features/cryptos/TradingViewWidget/TradingViewSymbolInfoLight';
import TradingViewWidgetDark from '../../features/cryptos/TradingViewWidget/TradingViewWidgetDark';
import TradingViewWidgetLight from '../../features/cryptos/TradingViewWidget/TradingViewWidgetLight';
import useSingleCrypto from '../../hooks/cryptos/useSingleCrypto';
import './SingleCrypto.scss';

function SingleCrypto() {
  const { cryptoSymbol, isDarkMode } = useContext(DarkModeContext);
  const { isLoading } = useSingleCrypto(cryptoSymbol);

  if (isLoading) return <Spinner />;

  return (
    <div className='single-crypto-container'>
      {isDarkMode ? (
        <TradingViewSymbolInfoDark />
      ) : (
        <TradingViewSymbolInfoLight />
      )}
      <div className='crypto-widget'>
        {isDarkMode ? <TradingViewWidgetDark /> : <TradingViewWidgetLight />}
      </div>
    </div>
  );
}

export default SingleCrypto;
