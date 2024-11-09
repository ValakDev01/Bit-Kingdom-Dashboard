import useUser from '../../hooks/authentication/useUser';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import UserAvatar from '../UserAvatar/UserAvatar';
import './Header.scss';

function Header() {
  const { isAuthenticated } = useUser();

  return (
    <header className='app-layout-header'>
      {isAuthenticated && <UserAvatar />}
      <HeaderMenu />
    </header>
  );
}

export default Header;
