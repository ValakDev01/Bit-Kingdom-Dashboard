import { Crypto } from '../../../types/cryptosTypes';
import { FC } from 'react';

import './Chart.scss';

type ChartProps = {
  crypto: Crypto;
  change7d: number;
};

const Chart: FC<ChartProps> = ({ crypto, change7d }) => {
  return (
    <div className='chart'>
      <img
        src={
          `https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/` +
          `${crypto.id}.svg`
        }
        alt={crypto.name}
        className={change7d > 0 ? 'chart-icon-up' : 'chart-icon-down'}
      />
    </div>
  );
};

export default Chart;
