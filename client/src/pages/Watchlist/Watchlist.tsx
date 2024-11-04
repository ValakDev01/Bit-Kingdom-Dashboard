/* eslint-disable max-len */
import DarkModeContext from '../../context/DarkModeContext';
import CryptoTableWatchlist from '../../features/watchlist/CryptoTableWatchlist/CryptoTableWatchlist';
import EmptyWatchlist from '../../features/watchlist/EmptyWatchlist/EmptyWatchlist';
import { useContext } from 'react';

import './Watchlist.scss';

function Watchlist() {
  const { totalCountWatchlist } = useContext(DarkModeContext);

  return (
    <>
      {totalCountWatchlist ? (
        <>
          <div className='row horizontal'>
            <h1 className='heading'>Your Tracked Coins</h1>
          </div>

          <div className='row'>
            <CryptoTableWatchlist />
          </div>
        </>
      ) : (
        <EmptyWatchlist />
      )}
    </>
  );
}

export default Watchlist;
