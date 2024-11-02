// eslint-disable-next-line max-len
import FullPageSpinner from '../../../components/FullPageSpinner/FullPageSpinner';
import useUser from '../../../hooks/authentication/useUser';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <FullPageSpinner />;

  if (isAuthenticated) return children;

  return null;
};

export default ProtectedRoute;
