import DarkModeContext from '../../context/DarkModeContext';
import { useContext } from 'react';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

import './DarkModeToggle.scss';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <li
      className='main-link'
      onClick={toggleDarkMode}
      aria-label='Toggle theme'
    >
      {isDarkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
    </li>
  );
}

export default DarkModeToggle;
