import Spinner from '../../../components/Spinner/Spinner';
import { getAllCryptos } from '../../../services/apiCryptos';
import { CryptoArray } from '../../../types/cryptosTypes';
import CryptoRow from '../CryptoRow/CryptoRow';
import TableHeader from '../TableHeader/TableHeader';
import { useQuery } from '@tanstack/react-query';

import './CryptoTable.scss';

function CryptoTable() {
  const { isLoading, data, error } = useQuery<CryptoArray>({
    queryKey: ['crypto'],
    queryFn: getAllCryptos,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>The error occurred!</p>;

  return (
    <div className='crypto-table'>
      <TableHeader />
      {data?.map(crypto => <CryptoRow crypto={crypto} key={crypto.id} />)}
    </div>
  );
}

export default CryptoTable;
