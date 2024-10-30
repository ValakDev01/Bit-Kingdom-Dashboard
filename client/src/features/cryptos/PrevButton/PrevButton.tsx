import { FC } from 'react';
import { HiChevronLeft } from 'react-icons/hi';

import './PrevButton.scss';

type PrevButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const PrevButton: FC<PrevButtonProps> = ({ onClick, disabled }) => (
  <button className='pagination-button' disabled={disabled} onClick={onClick}>
    <HiChevronLeft />
    <span>Previous</span>
  </button>
);

export default PrevButton;
