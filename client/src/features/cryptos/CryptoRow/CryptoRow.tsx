import useUser from '../../../hooks/authentication/useUser';
import { Crypto } from '../../../types/cryptosTypes';
import { formatCurrency } from '../../../utils/formatCurrency';
import Chart from '../Chart/Chart';
import CoinInfo from '../CoinInfo/CoinInfo';
import MenuDots from '../MenuDots/MenuDots';
import PriceChange from '../PriceChange/PriceChange';
import StarIcon from '../StarIcon/StarIcon';
import { FC, useState } from 'react';

import './CryptoRow.scss';

type CryptoRowProps = {
  crypto: Crypto;
  index: number;
};

type Currency = 'USD' | 'EUR' | 'GBP';

const CryptoRow: FC<CryptoRowProps> = ({ crypto, index }) => {
  const [starVisible, setStarVisible] = useState<boolean>(true);
  const { data } = useUser();

  const currency = (data?.data?.settings?.currency as Currency) || 'USD';
  const cryptoData = crypto.quote[currency];

  const handleStarVisibilityToggle = () => {
    setStarVisible(prevVisible => !prevVisible);
  };

  return (
    <div className='crypto-row'>
      <StarIcon
        starVisible={starVisible}
        onToggle={handleStarVisibilityToggle}
      />
      <div className='cmc-rank'>{index}</div>

      <CoinInfo crypto={crypto} />

      <div className='price'>
        {cryptoData ? formatCurrency(cryptoData.price, currency) : 'N/A'}
      </div>

      <PriceChange change={cryptoData?.percent_change_1h} />
      <PriceChange change={cryptoData?.percent_change_24h} />
      <PriceChange change={cryptoData?.percent_change_7d} />

      <div className='market-cap'>
        {cryptoData
          ? formatCurrency(cryptoData.market_cap, currency, false)
          : 'N/A'}
      </div>

      <Chart crypto={crypto} change7d={crypto.quote.USD.percent_change_7d} />

      <MenuDots crypto={crypto} />
    </div>
  );
};

export default CryptoRow;
