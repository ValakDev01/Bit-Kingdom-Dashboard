import { FC } from 'react';
import { HiChevronRight } from 'react-icons/hi';

import './NextButton.scss';

type NextButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const NextButton: FC<NextButtonProps> = ({ onClick, disabled }) => (
  <button className='pagination-button' disabled={disabled} onClick={onClick}>
    <span>Next</span>
    <HiChevronRight />
  </button>
);

export default NextButton;
