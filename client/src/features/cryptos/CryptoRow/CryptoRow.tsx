/* eslint-disable max-len */
import Modal from '../../../components/Modal/Modal';
import useUser from '../../../hooks/authentication/useUser';
import useAddToWatchlist from '../../../hooks/cryptos/useAddToWatchlist';
import useRemoveFromWatchlist from '../../../hooks/cryptos/useRemoveFromWatchlist';
import { Crypto } from '../../../types/cryptosTypes';
import { formatCurrency } from '../../../utils/formatCurrency';
import Button from '../../authentication/Button/Button';
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
  watchlist: string[];
};

type Currency = 'USD' | 'EUR' | 'GBP';

const CryptoRow: FC<CryptoRowProps> = ({ crypto, index, watchlist }) => {
  const [starVisible, setStarVisible] = useState<boolean>(
    !watchlist.includes(crypto.symbol)
  );
  const { data } = useUser();
  const { mutate: addCrypto } = useAddToWatchlist();
  const { mutate: deleteCrypto } = useRemoveFromWatchlist();
  const [showModal, setShowModal] = useState(false);

  const currency = (data?.data?.settings?.currency as Currency) || 'USD';
  const cryptoData = crypto.quote[currency];

  const handleStarVisibilityToggle = () => {
    setStarVisible(prevVisible => !prevVisible);
  };

  const handleClickModal = () => {
    setShowModal(modal => !modal);
  };

  const handleDeletation = () => {
    setShowModal(false);
    deleteCrypto({ symbol: String(crypto.symbol) });
    setStarVisible(true);
  };

  return (
    <div className='crypto-row'>
      <StarIcon
        starVisible={starVisible}
        onToggle={handleStarVisibilityToggle}
        addCrypto={() => addCrypto({ symbol: String(crypto.symbol) })}
        deleteCrypto={() => deleteCrypto({ symbol: String(crypto.symbol) })}
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

      <MenuDots
        crypto={crypto}
        addCrypto={() => addCrypto({ symbol: String(crypto.symbol) })}
        setStarVisible={() => setStarVisible(false)}
        setShowModal={() => setShowModal(true)}
      />
      {showModal && (
        <Modal onModal={handleClickModal}>
          <div className='modal__content__data'>
            <h2>Confirm Deletion</h2>
            <p>
              Are you sure you want to remove <strong>{crypto.symbol}</strong>{' '}
              coin from your watchlist? This action cannot be undone!
            </p>
          </div>

          <div className='modal__content__button'>
            <Button size='large' variation='danger' onClick={handleDeletation}>
              Delete crypto
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CryptoRow;
