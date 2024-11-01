import { login } from '../../services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type UserData = {
  status: string;
  token: string;
  message: string;
};

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation<
    UserData,
    Error,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: user => {
      toast.success(user.message);
      navigate('/dashboard');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

export default useLogin;
