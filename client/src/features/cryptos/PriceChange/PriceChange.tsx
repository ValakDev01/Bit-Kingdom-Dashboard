import { FC } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import './PriceChange.scss';

type PriceChangeProps = {
  change: number;
};

const PriceChange: FC<PriceChangeProps> = ({ change }) => {
  return (
    <div className={`change ${change > 0 ? 'green-color' : 'red-color'}`}>
      {change > 0 ? (
        <IoMdArrowDropup className='arrow-icon-up' />
      ) : (
        <IoMdArrowDropdown className='arrow-icon-down' />
      )}
      <span>{Math.abs(change).toFixed(2)}%</span>
    </div>
  );
};

export default PriceChange;
