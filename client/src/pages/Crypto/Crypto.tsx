import { useState } from 'react';

import CryptoTable from '../../features/cryptos/CryptoTable/CryptoTable';
// eslint-disable-next-line max-len
import TableOperations from '../../features/cryptos/TableOperations/TableOperations';
import './Crypto.scss';

function Crypto() {
  const [sort, setSort] = useState<string>('price-desc');
  const [filter, setFilter] = useState<string>('all');

  return (
    <>
      <div className='row horizontal'>
        <h1 className='heading'>Today's Prices</h1>
        <TableOperations
          setSort={setSort}
          sort={sort}
          setFilter={setFilter}
          filter={filter}
        />
      </div>

      <div className='row'>
        <CryptoTable sort={sort} filter={filter} />
      </div>
    </>
  );
}

export default Crypto;
