import { LuLayoutDashboard, LuSettings } from 'react-icons/lu';
import { MdListAlt, MdOutlineAccountCircle } from 'react-icons/md';
import { TbCoin } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

import './MainNav.scss';

function MainNav() {
  return (
    <nav>
      <ul className='nav-list'>
        <li>
          <NavLink to='/dashboard' className='nav-link'>
            <LuLayoutDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/account' className='nav-link'>
            <MdOutlineAccountCircle />
            <span>Account</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/cryptos' className='nav-link'>
            <TbCoin />
            <span>Crypto</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/watchlist' className='nav-link'>
            <MdListAlt />
            <span>Watchlist</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/settings' className='nav-link'>
            <LuSettings />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
