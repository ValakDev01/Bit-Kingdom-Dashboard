import Button from '../../features/authentication/Button/Button';
import useUser from '../../hooks/authentication/useUser';
import { HiOutlineUser } from 'react-icons/hi2';
import { IoMoonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import './HeaderMenu.scss';

function HeaderMenu() {
  const { isAuthenticated, isActive } = useUser();
  const navigate = useNavigate();

  return (
    <ul className='header-menu'>
      {!isAuthenticated && (
        <li>
          <Button
            onClick={() => navigate('/login')}
            size='small'
            variation='primary'
          >
            Log In
          </Button>
        </li>
      )}

      {!isAuthenticated && (
        <li>
          <Button
            onClick={() => navigate('/signup')}
            size='small'
            variation='secondary'
          >
            Sign Up
          </Button>
        </li>
      )}

      {isAuthenticated && (
        <div className='main-list'>
          <li
            className={`main-link ${isActive ? '' : 'disabled-user'}`}
            onClick={() => navigate('/account')}
          >
            <HiOutlineUser />
          </li>
          <li className='main-link'>
            <IoMoonOutline />
          </li>
        </div>
      )}
    </ul>
  );
}

export default HeaderMenu;
