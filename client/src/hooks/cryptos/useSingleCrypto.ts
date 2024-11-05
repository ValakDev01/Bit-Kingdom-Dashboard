import { getSingleCryptoData } from '../../services/apiCryptos';
import { CryptoArray } from '../../types/cryptosTypes';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type SingleCrypto = {
  status: string;
  data: CryptoArray;
};

const useSingleCrypto = (cryptoSymbol: string) => {
  const navigate = useNavigate();

  const { isLoading } = useQuery<SingleCrypto, Error>(
    ['singleCryptoData', cryptoSymbol],
    () => getSingleCryptoData(cryptoSymbol),
    {
      onSuccess: data => {
        navigate(`/cryptos/${data?.data[0]?.symbol}`);
      },
      onError: () => {
        toast.error('There was an error while fetching the data!');
      },
    }
  );

  return { isLoading };
};

export default useSingleCrypto;
