import { updateMySettings } from '../../services/apiSettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type SettingsData = {
  status: string;
  message: string;
  data: {
    _id: string;
    user: string;
    resultsPerPage: number;
    theme: string;
    currency: string;
    __v: number;
  };
};

const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    SettingsData,
    Error,
    { resultsPerPage?: number; theme?: string; currency?: string }
  >({
    mutationFn: ({ resultsPerPage, theme, currency }) =>
      updateMySettings(resultsPerPage, theme, currency),
    onSuccess: data => {
      queryClient.invalidateQueries(['currentUser']);
      toast.success(data.message);
    },
    onError: error => {
      toast.error(error.message || 'There was an error updating your account!');
    },
  });

  return { mutate, isLoading };
};

export default useUpdateSetting;
