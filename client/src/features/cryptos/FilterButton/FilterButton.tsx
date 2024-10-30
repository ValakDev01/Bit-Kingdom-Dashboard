import { FC } from 'react';

import './FilterButton.scss';

type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  label: string;
};

const FilterButton: FC<FilterButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      className={`filter-button ${active ? 'active' : ''}`}
      onClick={onClick}
      disabled={active}
    >
      {label}
    </button>
  );
};

export default FilterButton;
