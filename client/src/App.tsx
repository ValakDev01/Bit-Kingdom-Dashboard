import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import Account from './pages/Account/Account';
import Crypto from './pages/Crypto/Crypto';
import Dashboard from './pages/Dashboard/Dashboard';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Settings from './pages/Settings/Settings';
import Watchlist from './pages/Watchlist/Watchlist';

import './styles/index.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate replace to='dashboard' />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/account' element={<Account />} />
        <Route path='/cryptos' element={<Crypto />} />
        <Route path='/watchlist' element={<Watchlist />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
