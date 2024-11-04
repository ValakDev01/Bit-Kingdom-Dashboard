import Button from '../../authentication/Button/Button';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import './EmptyWatchlist.scss';

const EmptyWatchlist: FC = () => {
  const navigate = useNavigate();

  return (
    <div className='empty-watchlist'>
      <h2>Your Watchlist is Empty</h2>
      <p>
        It looks like you haven’t added any cryptocurrencies to your watchlist
        yet.
      </p>
      <p>
        Explore the available assets and start building your personalized
        watchlist today!
      </p>
      <Button size='large' onClick={() => navigate('/cryptos')}>
        Add Your Crypto
      </Button>
    </div>
  );
};

export default EmptyWatchlist;
