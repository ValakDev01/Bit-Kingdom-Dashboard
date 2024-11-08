import DarkModeContext from '../../../context/DarkModeContext';
import useUser from '../../../hooks/authentication/useUser';
import { useContext, useEffect, useRef } from 'react';

function TradingViewSymbolInfoLight() {
  const container = useRef<HTMLDivElement | null>(null);
  const { cryptoSymbol } = useContext(DarkModeContext);
  const hasInitialized = useRef<boolean>(false);
  const { data } = useUser();

  const currentUserCurrency = data?.data?.settings?.currency || 'USD';

  useEffect(() => {
    if (container.current && !hasInitialized.current) {
      hasInitialized.current = true;

      const script = document.createElement('script');
      script.src =
        // eslint-disable-next-line max-len
        'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "${cryptoSymbol}${currentUserCurrency}",
          "width": "100%",
          "locale": "en",
          "colorTheme": "light",
          "isTransparent": false
        }`;
      container.current.appendChild(script);
    }
  }, [cryptoSymbol, currentUserCurrency]);

  return (
    <div className='tradingview-widget-container'>
      <div
        className='tradingview-widget-container__widget'
        ref={container}
      ></div>
    </div>
  );
}

export default TradingViewSymbolInfoLight;
