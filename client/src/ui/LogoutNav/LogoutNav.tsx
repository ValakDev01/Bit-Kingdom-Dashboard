import { BiLogIn } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import './LogoutNav.scss';

function LogoutNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' className='logout-link'>
            <BiLogIn />
            <span>Log Out</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default LogoutNav;
