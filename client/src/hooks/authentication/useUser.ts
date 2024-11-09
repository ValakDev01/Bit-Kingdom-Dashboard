import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../../services/apiAuth';

const useUser = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    data,
    isAuthenticated: data?.status === 'OK' && !!data?.data?.email,
    isActive: data?.data?.active === 'active',
  };
};

export default useUser;
