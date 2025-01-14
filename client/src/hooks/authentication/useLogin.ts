import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/apiAuth';

type UserData = {
  status: string;
  token: string;
  message: string;
};

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    UserData,
    Error,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: user => {
      toast.success(user.message);
      queryClient.invalidateQueries(['currentUser']);
      navigate('/dashboard', { replace: true });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

export default useLogin;
