import { useContext, useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import FullPageSpinner from '../../components/FullPageSpinner/FullPageSpinner';
import SpinnerMini from '../../components/SpinnerMini/SpinnerMini';
import DarkModeContext from '../../context/DarkModeContext';
import useLogout from '../../hooks/authentication/useLogout';
import useUser from '../../hooks/authentication/useUser';
import './LogoutNav.scss';

function LogoutNav() {
  const { isAuthenticated } = useUser();
  const { mutate, isLoading } = useLogout();
  const [showFullSpinner, setShowFullSpinner] = useState(false);
  const { handleLogoutDark } = useContext(DarkModeContext);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setShowFullSpinner(true);
    handleLogoutDark();

    mutate();

    setTimeout(() => {
      setShowFullSpinner(false);
    }, 1500);
  };

  if (showFullSpinner) {
    return <FullPageSpinner />;
  }

  return (
    <nav>
      <ul>
        {isAuthenticated && (
          <li className={isLoading ? 'disabled' : ''}>
            <NavLink to='/' className='logout-link' onClick={handleLogout}>
              {!isLoading ? <BiLogIn /> : <SpinnerMini />}
              <span>Log Out</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default LogoutNav;
