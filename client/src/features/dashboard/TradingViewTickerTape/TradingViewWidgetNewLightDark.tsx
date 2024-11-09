/* eslint-disable max-len */
import DarkModeContext from '../../../context/DarkModeContext';
import useUser from '../../../hooks/authentication/useUser';
import { memo, useContext, useEffect, useRef } from 'react';

function TradingViewWidgetNewLightDark() {
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
        'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
                  {
                    "symbols": [
                      [
                        "ETH${currentUserCurrency}|1M|${currentUserCurrency}"
                      ]
                    ],
                    "chartOnly": false,
                    "width": "100%",
                    "height": "100%",
                    "locale": "en",
                    "colorTheme": "dark",
                    "autosize": true,
                    "showVolume": false,
                    "showMA": false,
                    "hideDateRanges": false,
                    "hideMarketStatus": false,
                    "hideSymbolLogo": false,
                    "scalePosition": "right",
                    "scaleMode": "Normal",
                    "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
                    "fontSize": "10",
                    "noTimeScale": false,
                    "valuesTracking": "1",
                    "changeMode": "price-and-percent",
                    "chartType": "area",
                    "maLineColor": "#2962FF",
                    "maLineWidth": 1,
                    "maLength": 9,
                    "headerFontSize": "medium",
                    "backgroundColor": "#18212f",
                    "lineWidth": 2,
                    "lineType": 0,
                    "dateRanges": [
                      "1m|30",
                      "3m|60",
                      "12m|1D",
                      "60m|1W",
                      "all|1M"
                    ]
                  }`;
      container.current.appendChild(script);
    }
  }, [cryptoSymbol, currentUserCurrency]);

  return (
    <div className='tradingview-widget-container' ref={container}>
      <div className='tradingview-widget-container__widget'></div>
    </div>
  );
}

export default memo(TradingViewWidgetNewLightDark);
