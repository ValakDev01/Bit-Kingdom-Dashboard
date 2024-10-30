import { ChangeEvent, FC } from 'react';

import './Select.scss';

interface OptionType {
  value: string;
  label: string;
}

type SelectProps = {
  options: OptionType[];
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  type?: 'white' | 'default';
};

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  type = 'default',
  ...props
}) => {
  return (
    <select
      className={`styled-select ${type}`}
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
