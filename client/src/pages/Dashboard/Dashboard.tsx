/* eslint-disable max-len */
import { useContext } from 'react';

import DarkModeContext from '../../context/DarkModeContext';
import TradingViewMiniSymbolOverviewSol from '../../features/dashboard/TradingViewTickerTape/TradingViewMiniSymbolOverviewSol';
import TradingViewMiniSymbolOverviewSolDark from '../../features/dashboard/TradingViewTickerTape/TradingViewMiniSymbolOverviewSolDark';
import TradingViewMiniSymbolOverviewXRP from '../../features/dashboard/TradingViewTickerTape/TradingViewMiniSymbolOverviewXRP';
import TradingViewMiniSymbolOverviewXRPDark from '../../features/dashboard/TradingViewTickerTape/TradingViewMiniSymbolOverviewXRPDark';
import TradingViewSymbolNewInfoLight from '../../features/dashboard/TradingViewTickerTape/TradingViewSymbolNewInfoLight';
import TradingViewSymbolNewInfoLightDark from '../../features/dashboard/TradingViewTickerTape/TradingViewSymbolNewInfoLightDark';
import TradingViewWidgetNewLight from '../../features/dashboard/TradingViewTickerTape/TradingViewWidgetNewLight';
import TradingViewWidgetNewLightDark from '../../features/dashboard/TradingViewTickerTape/TradingViewWidgetNewLightDark';
import './Dashboard.scss';

function Dashboard() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className='main-dashboard-container'>
      <div className={isDarkMode ? 'nested-block-1-dark' : 'nested-block-1'}>
        {isDarkMode ? (
          <TradingViewSymbolNewInfoLightDark />
        ) : (
          <TradingViewSymbolNewInfoLight />
        )}
      </div>
      <div className='nested-block-2'>
        {isDarkMode ? (
          <TradingViewWidgetNewLightDark />
        ) : (
          <TradingViewWidgetNewLight />
        )}
      </div>
      <div className={isDarkMode ? 'nested-block-3-dark' : 'nested-block-3'}>
        {isDarkMode ? (
          <TradingViewMiniSymbolOverviewSolDark />
        ) : (
          <TradingViewMiniSymbolOverviewSol />
        )}
      </div>
      <div className={isDarkMode ? 'nested-block-4-dark' : 'nested-block-4'}>
        {isDarkMode ? (
          <TradingViewMiniSymbolOverviewXRPDark />
        ) : (
          <TradingViewMiniSymbolOverviewXRP />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
