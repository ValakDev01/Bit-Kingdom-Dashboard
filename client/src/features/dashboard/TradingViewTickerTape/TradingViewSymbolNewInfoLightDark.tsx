// import DarkModeContext from '../../../context/DarkModeContext';
import { useEffect, useRef } from 'react';

function TradingViewSymbolNewInfoLightDark() {
  const container = useRef<HTMLDivElement | null>(null);
  const hasInitialized = useRef(false);

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
          "symbol": "BTCUSD",
          "width": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "isTransparent": true
        }`;
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className='tradingview-widget-container'>
      <div
        className='tradingview-widget-container__widget'
        ref={container}
      ></div>
    </div>
  );
}

export default TradingViewSymbolNewInfoLightDark;
