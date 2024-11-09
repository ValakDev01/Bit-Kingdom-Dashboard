import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateMyPassword } from '../../services/apiAccount';

type UserData = {
  status: string;
  message: string;
};

const useUpdateYourPassword = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    UserData,
    Error,
    { passwordCurrent: string; password: string; passwordConfirm: string }
  >({
    mutationFn: ({ passwordCurrent, password, passwordConfirm }) => {
      if (password !== passwordConfirm) {
        throw new Error('Passwords do not match!');
      }

      if (passwordCurrent === password) {
        throw new Error(
          'New password should be different from your current password!'
        );
      }
      return updateMyPassword(passwordCurrent, password, passwordConfirm);
    },
    onSuccess: user => {
      toast.success(user.message);

      setTimeout(() => {
        queryClient.invalidateQueries(['currentUser']);
        window.location.reload();
      }, 1500);
    },
    onError: error => {
      if (error.message === 'Passwords do not match!') {
        toast.error('Passwords do not match!');
      } else {
        toast.error(
          error.message || 'There was an error updating your password!'
        );
      }
    },
  });

  return { mutate };
};

export default useUpdateYourPassword;
