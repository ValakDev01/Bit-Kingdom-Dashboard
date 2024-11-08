import { FC } from 'react';

import './Select.scss';

type SelectProps = {
  id: string;
  defaultValue?: string | number;
  options: { value: number | string; label: string | number }[];
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: FC<SelectProps> = ({
  id,
  defaultValue,
  options,
  disabled,
  onChange,
}) => {
  return (
    <select
      className='select'
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
