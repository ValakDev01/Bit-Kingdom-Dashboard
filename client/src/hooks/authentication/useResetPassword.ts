import { resetPassword } from '../../services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type ResetPassword = {
  status: string;
  token: string;
  message: string;
};

const useResetPassword = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation<
    ResetPassword,
    Error,
    { password: string; passwordConfirm: string; token: string | undefined }
  >({
    mutationFn: ({ password, passwordConfirm, token }) =>
      resetPassword(password, passwordConfirm, token!),
    onSuccess: data => {
      toast.success(data.message);
      navigate('/login', { replace: true });
    },
    onError: () => {
      toast.error('Token is invalid or has expired!');
    },
  });

  return { isLoading, mutate };
};

export default useResetPassword;
