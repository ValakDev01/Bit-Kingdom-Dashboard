import { useContext, useEffect, useRef } from 'react';

import DarkModeContext from '../../../context/DarkModeContext';
import useUser from '../../../hooks/authentication/useUser';

function TradingViewSymbolInfoDark() {
  const container = useRef<HTMLDivElement | null>(null);
  const { cryptoSymbol } = useContext(DarkModeContext);
  const hasInitialized = useRef(false);
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
          "colorTheme": "dark",
          "isTransparent": true
        }`;
      container.current.appendChild(script);
    }
  }, [cryptoSymbol, currentUserCurrency]);

  return (
    <div
      className='tradingview-widget-container'
      style={{ backgroundColor: '#18212f', border: '1px solid #3E4142' }}
    >
      <div
        className='tradingview-widget-container__widget'
        ref={container}
      ></div>
    </div>
  );
}

export default TradingViewSymbolInfoDark;
