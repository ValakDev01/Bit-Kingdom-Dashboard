import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import Spinner from '../../../components/Spinner/Spinner';
import useUser from '../../../hooks/authentication/useUser';
import useCryptos from '../../../hooks/cryptos/useCryptos';
import CryptoRow from '../CryptoRow/CryptoRow';
import Pagination from '../Pagination/Pagination';
import TableHeader from '../TableHeader/TableHeader';
import './CryptoTable.scss';

type CryptoTableProps = {
  sort: string;
  filter: string;
};

const CryptoTable: FC<CryptoTableProps> = ({ sort, filter }) => {
  const { data: currentUserData } = useUser();

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const resultsPerPage = currentUserData?.data?.settings?.resultsPerPage || 10;

  const { isLoading, data, error, totalCount } = useCryptos(
    sort,
    filter,
    currentPage,
    resultsPerPage
  );

  if (isLoading) return <Spinner />;
  if (error)
    return <p>There was an error fetching the data. Please, try again!</p>;

  return (
    <div className='crypto-table'>
      <TableHeader />
      {data?.data.map((crypto, id) => (
        <CryptoRow
          crypto={crypto}
          key={crypto.id}
          watchlist={currentUserData?.data?.watchlist || []}
          index={(currentPage - 1) * resultsPerPage + id + 1}
        />
      ))}
      <Pagination count={totalCount ?? 0} />
    </div>
  );
};

export default CryptoTable;
