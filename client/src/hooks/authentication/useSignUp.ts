import { signup } from '../../services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type UserData = {
  status: string;
  token: string;
  data: {
    name: string;
    email: string;
    role: string;
    active: string;
    photo: string;
    gender: string;
    watchlist: string[];
    _id: string;
    createdAt: string;
    __v: number;
    settings: string;
  };
};

const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation<UserData, Error, FormData>({
    mutationFn: (formData: FormData) => signup(formData),
    onSuccess: () => {
      toast.success(`Your account has been created successfully!`);
      navigate('/dashboard');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { mutate, isLoading };
};

export default useSignUp;
