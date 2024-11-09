/* eslint-disable max-len */
import DarkModeContext from '../../context/DarkModeContext';
import TableOperations from '../../features/cryptos/TableOperations/TableOperations';
import CryptoTableWatchlist from '../../features/watchlist/CryptoTableWatchlist/CryptoTableWatchlist';
import EmptyWatchlist from '../../features/watchlist/EmptyWatchlist/EmptyWatchlist';
import { useContext, useState } from 'react';

import './Watchlist.scss';

function Watchlist() {
  const { totalCountWatchlist } = useContext(DarkModeContext);
  const [sort, setSort] = useState<string>('price-desc');
  const [filter, setFilter] = useState<string>('all');

  return (
    <>
      {totalCountWatchlist ? (
        <>
          <div className='row horizontal'>
            <h1 className='heading'>Your Tracked Coins</h1>
            <TableOperations
              setSort={setSort}
              sort={sort}
              setFilter={setFilter}
              filter={filter}
            />
          </div>

          <div className='row'>
            <CryptoTableWatchlist sort={sort} filter={filter} />
          </div>
        </>
      ) : (
        <EmptyWatchlist />
      )}
    </>
  );
}

export default Watchlist;
