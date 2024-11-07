import { forgotPassword } from '../../services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type ForgotPassword = {
  status: string;
  message: string;
};

const useForgotPassword = (setShowModal: () => void) => {
  const { isLoading, mutate } = useMutation<
    ForgotPassword,
    Error,
    { email: string }
  >({
    mutationFn: ({ email }) => forgotPassword(email),
    onSuccess: data => {
      toast.success(data.message);
      setShowModal();
    },
    onError: () => {
      toast.error('There was an error sending the email!');
    },
  });

  return { isLoading, mutate };
};

export default useForgotPassword;
