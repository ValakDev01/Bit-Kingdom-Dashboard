import FilterButton from '../FilterButton/FilterButton';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import './Filter.scss';

type FilterProps = {
  // eslint-disable-next-line no-unused-vars
  setFilter: (filter: string) => void;
  filter: string;
};

const Filter: FC<FilterProps> = ({ setFilter, filter }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterClick = (filterType: string) => {
    if (Number(searchParams.get('page')) > 1) {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
    setFilter(filterType);
  };

  const filterOptions = [
    { label: 'All', type: 'all' },
    { label: 'Daily Gainers', type: 'gainers' },
    { label: 'Daily Losers', type: 'losers' },
  ];

  return (
    <div className='filter'>
      {filterOptions.map(({ label, type }) => (
        <FilterButton
          key={type}
          onClick={() => handleFilterClick(type)}
          active={filter === type}
          label={label}
        />
      ))}
    </div>
  );
};

export default Filter;
