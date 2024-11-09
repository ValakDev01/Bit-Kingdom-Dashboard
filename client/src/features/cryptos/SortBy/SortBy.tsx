import { ChangeEvent, FC } from 'react';

import Select from '../Select/Select';

type SortByProps = {
  // eslint-disable-next-line no-unused-vars
  setSort: (sort: string) => void;
  sort: string;
};

const SortBy: FC<SortByProps> = ({ setSort, sort }) => {
  const options = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'volume-asc-1h', label: '1h Change: Low to High' },
    { value: 'volume-desc-1h', label: '1h Change: High to Low' },
    { value: 'volume-asc-24h', label: '24h Change: Low to High' },
    { value: 'volume-desc-24h', label: '24h Change: High to Low' },
    { value: 'volume-asc-7d', label: '7d Change: Low to High' },
    { value: 'volume-desc-7d', label: '7d Change: High to Low' },
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div className='sort-by'>
      <Select
        options={options}
        type='white'
        value={sort}
        onChange={handleChange}
      />
    </div>
  );
};

export default SortBy;
