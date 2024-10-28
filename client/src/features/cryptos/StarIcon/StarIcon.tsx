import { FC } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

import './StarIcon.scss';

type StarIconProps = {
  starVisible: boolean;
  onToggle: () => void;
};

const StarIcon: FC<StarIconProps> = ({ starVisible, onToggle }) => {
  return (
    <div className='star-icon' onClick={onToggle}>
      {starVisible ? <FaRegStar /> : <FaStar className='filled-star' />}
    </div>
  );
};

export default StarIcon;
