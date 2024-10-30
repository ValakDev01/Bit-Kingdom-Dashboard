import { FC } from 'react';

import './Select.scss';

type SelectProps = {
  id: string;
  defaultValue?: string;
  options: { value: number | string; label: string | number }[];
};

const Select: FC<SelectProps> = ({ id, defaultValue, options }) => {
  return (
    <select className='select' id={id} defaultValue={defaultValue}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
