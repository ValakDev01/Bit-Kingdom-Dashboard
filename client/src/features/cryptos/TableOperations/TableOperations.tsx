import { FC } from 'react';

import Filter from '../Filter/Filter';
import SortBy from '../SortBy/SortBy';
import './TableOperations.scss';

type TableOperationsProps = {
  // eslint-disable-next-line no-unused-vars
  setFilter: (filter: string) => void;
  filter: string;
  // eslint-disable-next-line no-unused-vars
  setSort: (sort: string) => void;
  sort: string;
};

const TableOperations: FC<TableOperationsProps> = ({
  setFilter,
  filter,
  setSort,
  sort,
}) => {
  return (
    <div className='table-operations'>
      <Filter setFilter={setFilter} filter={filter} />
      <SortBy setSort={setSort} sort={sort} />
    </div>
  );
};

export default TableOperations;
