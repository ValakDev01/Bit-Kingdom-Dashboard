import Header from '../../ui/Header/Header';
import Sidebar from '../../ui/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

import './AppLayout.scss';

function AppLayout() {
  return (
    <div className='app-layout'>
      <Header />
      <Sidebar />
      <main className='app-layout-main'>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
