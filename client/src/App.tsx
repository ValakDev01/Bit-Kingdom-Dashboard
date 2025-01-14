import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Account from './pages/Account/Account';
import Crypto from './pages/Crypto/Crypto';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Settings from './pages/Settings/Settings';
import SignUp from './pages/SignUp/SignUp';
import SingleCrypto from './pages/SingleCrypto/SingleCrypto';
import Watchlist from './pages/Watchlist/Watchlist';

import DarkModeProvider from './context/DarkModeProvider';
// eslint-disable-next-line max-len
import ProtectedRoute from './features/authentication/ProtectedRoute/ProtectedRoute';
import './styles/index.scss';
import AppLayout from './ui/AppLayout/AppLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 12 * 60 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route
                path='/account'
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path='/cryptos' element={<Crypto />} />
              <Route path='/cryptos/:id' element={<SingleCrypto />} />
              <Route
                path='/watchlist'
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/settings'
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/resetPassword/:token' element={<ResetPassword />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
