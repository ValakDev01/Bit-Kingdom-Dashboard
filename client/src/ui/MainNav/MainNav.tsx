import { LuLayoutDashboard, LuSettings } from 'react-icons/lu';
import { MdListAlt, MdOutlineAccountCircle } from 'react-icons/md';
import { TbCoin } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

import useUser from '../../hooks/authentication/useUser';
import './MainNav.scss';

function MainNav() {
  const { isAuthenticated, isActive } = useUser();

  return (
    <nav>
      <ul className='nav-list'>
        <li>
          <NavLink to='/dashboard' className='nav-link'>
            <LuLayoutDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink
              to='/account'
              data-disabled={isActive ? 'true' : 'false'}
              className='nav-link'
            >
              <MdOutlineAccountCircle />
              <span>Account</span>
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to='/cryptos' className='nav-link'>
            <TbCoin />
            <span>Crypto</span>
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink
              to='/watchlist'
              data-disabled={isActive ? '' : 'false'}
              className='nav-link'
            >
              <MdListAlt />
              <span>Watchlist</span>
            </NavLink>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <NavLink
              to='/settings'
              data-disabled={isActive ? 'true' : 'false'}
              className='nav-link'
            >
              <LuSettings />
              <span>Settings</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MainNav;
