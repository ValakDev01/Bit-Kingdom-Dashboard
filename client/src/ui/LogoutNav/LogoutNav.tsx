import FullPageSpinner from '../../components/FullPageSpinner/FullPageSpinner';
import SpinnerMini from '../../components/SpinnerMini/SpinnerMini';
import useLogout from '../../hooks/authentication/useLogout';
import useUser from '../../hooks/authentication/useUser';
import { useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import './LogoutNav.scss';

function LogoutNav() {
  const { isAuthenticated } = useUser();
  const { mutate, isLoading } = useLogout();
  const [showFullSpinner, setShowFullSpinner] = useState(false);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    mutate();

    setShowFullSpinner(true);

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
