import useUser from '../../../hooks/authentication/useUser';
import NextButton from '../NextButton/NextButton';
import PrevButton from '../PrevButton/PrevButton';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import './Pagination.scss';

type PaginationProps = {
  count: number;
};

const Pagination: FC<PaginationProps> = ({ count }) => {
  const { data: currentUserData } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const resultsPerPage = currentUserData?.data?.settings?.resultsPerPage || 10;
  const pageCount = Math.ceil(count / resultsPerPage);

  function handleNextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', String(next));
    setSearchParams(searchParams);
  }

  function handlePrevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', String(prev));
    setSearchParams(searchParams);
  }

  if (pageCount < 1) return null;

  return (
    <div className='styled-pagination'>
      <p>
        Results: <span>{(currentPage - 1) * resultsPerPage + 1}</span> -{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * resultsPerPage}
        </span>{' '}
        of <span>{count}</span>
      </p>

      <div className='buttons'>
        <PrevButton disabled={currentPage === 1} onClick={handlePrevPage} />
        <NextButton
          disabled={currentPage === pageCount}
          onClick={handleNextPage}
        />
      </div>
    </div>
  );
};

export default Pagination;
