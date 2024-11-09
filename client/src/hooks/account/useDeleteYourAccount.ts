import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteMyAccount } from '../../services/apiAccount';

type UserData = {
  status: string;
  message: string;
};

const useDeleteYourAccount = () => {
  const { mutate } = useMutation<
    UserData,
    Error,
    { password: string; passwordConfirm: string; phrase: string }
  >({
    mutationFn: ({ password, passwordConfirm, phrase }) =>
      deleteMyAccount(password, passwordConfirm, phrase),
    onSuccess: () => {
      toast.success('Your account has been deleted!');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
    onError: error => {
      toast.error(error.message || 'There was an error deleting your account!');
    },
  });

  return { mutate };
};

export default useDeleteYourAccount;
