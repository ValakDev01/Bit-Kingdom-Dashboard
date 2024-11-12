import { FC } from 'react';

import Logo from '../../components/Logo/Logo';
import MainNav from '../../ui/MainNav/MainNav';
import LogoutNav from '../LogoutNav/LogoutNav';
import './Sidebar.scss';

type SidebarType = {
  showMenu: boolean;
};

const Sidebar: FC<SidebarType> = ({ showMenu }) => {
  return (
    <aside className={`app-layout-sidebar ${!showMenu ? 'not-visible' : ''}`}>
      <div className='sidebar-content'>
        <Logo />
        <MainNav />
      </div>
      <LogoutNav />
    </aside>
  );
};

export default Sidebar;
