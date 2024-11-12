import { FC } from 'react';

import useUser from '../../hooks/authentication/useUser';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import UserAvatar from '../UserAvatar/UserAvatar';
import './Header.scss';

type TypeHeader = {
  showMenu: boolean;
  onShow: () => void;
};

const Header: FC<TypeHeader> = ({ onShow, showMenu }) => {
  const { isAuthenticated } = useUser();

  return (
    <header className='app-layout-header'>
      {isAuthenticated && <UserAvatar />}
      <HeaderMenu showMenu={showMenu} onShow={onShow} />
    </header>
  );
};

export default Header;
