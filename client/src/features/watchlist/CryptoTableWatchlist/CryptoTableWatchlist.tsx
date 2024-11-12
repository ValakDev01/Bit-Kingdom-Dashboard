import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import Spinner from '../../../components/Spinner/Spinner';
import useUser from '../../../hooks/authentication/useUser';
import useCryptos from '../../../hooks/cryptos/useCryptos';
import { Crypto } from '../../../types/cryptosTypes';
import CryptoRow from '../../cryptos/CryptoRow/CryptoRow';
import Pagination from '../../cryptos/Pagination/Pagination';
import TableHeader from '../../cryptos/TableHeader/TableHeader';
import './CryptoTableWatchlist.scss';

type CryptoTableProps = {
  sort: string;
  filter: string;
};

const CryptoTableWatchlist: FC<CryptoTableProps> = ({ sort, filter }) => {
  const { data: currentUserData } = useUser();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const resultsPerPage = currentUserData?.data?.settings?.resultsPerPage || 10;

  const { data, isLoading } = useCryptos(sort, filter, 1, 100);

  const filteredObject = data?.data.filter(el =>
    currentUserData?.data?.watchlist.includes(el.symbol)
  );

  const totalCount = filteredObject?.length;

  if (totalCount === 0) return <h3>We found 0 results with this filter!</h3>;
  if (isLoading) return <Spinner />;

  return (
    <div className='crypto-container'>
      <div className='crypto-table-watchlist'>
        <TableHeader />
        {filteredObject
          ?.slice(
            (currentPage - 1) * resultsPerPage,
            currentPage * resultsPerPage
          )
          ?.map((crypto: Crypto, id: number) => (
            <CryptoRow
              crypto={crypto}
              key={crypto.id}
              watchlist={currentUserData?.data?.watchlist || []}
              index={(currentPage - 1) * resultsPerPage + id + 1}
            />
          ))}
        <Pagination count={totalCount ?? 0} />
      </div>
    </div>
  );
};

export default CryptoTableWatchlist;
