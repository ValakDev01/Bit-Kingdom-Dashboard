import CryptoTable from '../../features/cryptos/CryptoTable/CryptoTable';

import './Crypto.scss';

function Crypto() {
  return (
    <>
      <div className='row horizontal'>
        <h1 className='heading'>Today's Prices</h1>
        <p>Filter / Sort</p>
      </div>

      <div className='row'>
        <CryptoTable />
      </div>
    </>
  );
}

export default Crypto;
