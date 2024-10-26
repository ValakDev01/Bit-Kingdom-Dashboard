import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Account from './pages/Account/Account';
import Crypto from './pages/Crypto/Crypto';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Settings from './pages/Settings/Settings';
import SignUp from './pages/SignUp/SignUp';
import Watchlist from './pages/Watchlist/Watchlist';

import AppLayout from './ui/AppLayout/AppLayout';

import './styles/index.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to='dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cryptos' element={<Crypto />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/settings' element={<Settings />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
