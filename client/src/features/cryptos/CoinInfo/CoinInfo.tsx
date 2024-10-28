import { Crypto } from '../../../types/cryptosTypes';
import { FC } from 'react';

import './CoinInfo.scss';

type CoinInfoProps = {
  crypto: Crypto;
};

const CoinInfo: FC<CoinInfoProps> = ({ crypto }) => {
  return (
    <div className='name-block'>
      <div className='image-wrapper'>
        <img
          src={
            `https://s2.coinmarketcap.com/static/img/coins/64x64/` +
            `${crypto.id}.png`
          }
          alt={crypto.name}
        />
      </div>
      <div className='coin-name'>{crypto.name}</div>
      <div className='coin-symbol'>{crypto.symbol}</div>
    </div>
  );
};

export default CoinInfo;
