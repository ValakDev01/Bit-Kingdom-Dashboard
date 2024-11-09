import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { addToYourWatchlist } from '../../services/apiCryptos';
import { Crypto } from '../../types/cryptosTypes';

type UserData = {
  status: string;
  totalCount: number;
  message: string;
  data: Crypto;
};

const useAddToWatchlist = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    UserData,
    Error,
    { symbol: string }
  >({
    mutationFn: ({ symbol }) => addToYourWatchlist(symbol),
    onSuccess: user => {
      toast.success(user.message);
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

export default useAddToWatchlist;
