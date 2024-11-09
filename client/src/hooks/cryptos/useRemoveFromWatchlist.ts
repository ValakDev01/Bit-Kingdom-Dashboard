import { removeFromYourWatchlist } from '../../services/apiCryptos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type UserData = {
  status: string;
  symbol: string;
};

const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    UserData,
    Error,
    { symbol: string }
  >({
    mutationFn: ({ symbol }) => removeFromYourWatchlist(symbol),
    onSuccess: user => {
      toast.success(`${user.symbol} has been removed successfully!`);
      queryClient.invalidateQueries(['currentUser']);
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

export default useRemoveFromWatchlist;
