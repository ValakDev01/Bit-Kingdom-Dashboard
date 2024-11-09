import { useContext } from 'react';

import DarkModeContext from '../../context/DarkModeContext';
import './Logo.scss';

function Logo() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className='logo-container'>
      <img
        src={
          isDarkMode
            ? '../../../assets/img/logo-dark.png'
            : '../../../assets/img/logo-light.png'
        }
        alt='Logo'
        className='logo-image'
      />
    </div>
  );
}

export default Logo;
