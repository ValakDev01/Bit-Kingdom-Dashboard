import React, { useEffect, useRef } from 'react';

const TradingViewMiniSymbolOverviewXRP: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (containerRef.current && !hasInitialized.current) {
      hasInitialized.current = true;

      const script = document.createElement('script');
      script.src =
        // eslint-disable-next-line max-len
        'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: 'BITSTAMP:XRPUSD',
        width: '100%',
        height: '100%',
        locale: 'en',
        dateRange: '12M',
        colorTheme: 'light',
        isTransparent: false,
        autosize: true,
        largeChartUrl: '',
      });

      containerRef.current?.appendChild(script);
    }
  }, []);

  return (
    <div
      className='tradingview-widget-container'
      ref={containerRef}
      style={{ width: 350, height: 220 }}
    >
      <div className='tradingview-widget-container__widget'></div>
    </div>
  );
};

export default TradingViewMiniSymbolOverviewXRP;
