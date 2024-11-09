import { FC } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

import useUser from '../../../hooks/authentication/useUser';
import './StarIcon.scss';

type StarIconProps = {
  starVisible: boolean;
  onToggle: () => void;
  addCrypto: () => void;
  deleteCrypto: () => void;
};

const StarIcon: FC<StarIconProps> = ({
  starVisible,
  onToggle,
  addCrypto,
  deleteCrypto,
}) => {
  const { isAuthenticated } = useUser();

  return (
    <div
      className={`star-icon ${isAuthenticated ? '' : 'icon-disabled'}`}
      onClick={onToggle}
    >
      {starVisible ? (
        <FaRegStar onClick={addCrypto} />
      ) : (
        <FaStar className='filled-star' onClick={deleteCrypto} />
      )}
    </div>
  );
};

export default StarIcon;
