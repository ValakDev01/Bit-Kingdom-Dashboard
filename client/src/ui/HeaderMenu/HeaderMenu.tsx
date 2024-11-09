import { useEffect, useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import FullPageSpinner from '../../components/FullPageSpinner/FullPageSpinner';
import Button from '../../features/authentication/Button/Button';
import useUser from '../../hooks/authentication/useUser';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import './HeaderMenu.scss';

function HeaderMenu() {
  const { isAuthenticated, isActive } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNavigateWithDelay = (path: string) => {
    setRedirectPath(path);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading && redirectPath) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        navigate(redirectPath);
      }, 500);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isLoading, navigate, redirectPath]);

  if (isLoading) return <FullPageSpinner />;

  return (
    <ul className='header-menu'>
      {!isAuthenticated && (
        <li>
          <Button
            onClick={() => handleNavigateWithDelay('/login')}
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
            onClick={() => handleNavigateWithDelay('/signup')}
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
          <DarkModeToggle />
        </div>
      )}
    </ul>
  );
}

export default HeaderMenu;
