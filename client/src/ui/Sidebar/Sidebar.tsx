import Logo from '../../components/Logo/Logo';
import MainNav from '../../ui/MainNav/MainNav';
import LogoutNav from '../LogoutNav/LogoutNav';

import './Sidebar.scss';

function Sidebar() {
  return (
    <aside className='app-layout-sidebar'>
      <div className='sidebar-content'>
        <Logo />
        <MainNav />
      </div>
      <LogoutNav />
    </aside>
  );
}

export default Sidebar;
