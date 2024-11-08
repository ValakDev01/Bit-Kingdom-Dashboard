import { updateMyData } from '../../services/apiAccount';
import { Crypto } from '../../types/cryptosTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type UserData = {
  status: string;
  message: string;
  data: Crypto;
};

const useUpdateYourData = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<UserData, Error, FormData>({
    mutationFn: (formData: FormData) => updateMyData(formData),
    onSuccess: user => {
      toast.success(user.message);
      setTimeout(() => {
        queryClient.invalidateQueries(['currentUser']);
        window.location.reload();
      }, 1500);
    },
    onError: () => {
      toast.error('There was an error updating your data!');
    },
  });

  return { mutate };
};

export default useUpdateYourData;
