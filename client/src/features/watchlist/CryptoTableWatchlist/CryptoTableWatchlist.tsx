import Spinner from '../../../components/Spinner/Spinner';
import useUser from '../../../hooks/authentication/useUser';
import { Crypto } from '../../../types/cryptosTypes';
import CryptoRow from '../../cryptos/CryptoRow/CryptoRow';
import Pagination from '../../cryptos/Pagination/Pagination';
import TableHeader from '../../cryptos/TableHeader/TableHeader';
import { useSearchParams } from 'react-router-dom';

import './CryptoTableWatchlist.scss';

const CryptoTableWatchlist = () => {
  const { data: currentUserData, isLoading } = useUser();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const resultsPerPage = currentUserData?.data?.settings?.resultsPerPage || 10;
  const watchlist = currentUserData?.data?.watchlist || [];
  const totalCount = watchlist.length;

  if (isLoading) return <Spinner />;

  return (
    <div className='crypto-table-watchlist'>
      <TableHeader />
      {watchlist
        .slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
        .map((crypto: Crypto, id: number) => (
          <CryptoRow
            crypto={crypto}
            key={crypto.id}
            index={(currentPage - 1) * resultsPerPage + id + 1}
          />
        ))}
      <Pagination count={totalCount ?? 0} />
    </div>
  );
};

export default CryptoTableWatchlist;
