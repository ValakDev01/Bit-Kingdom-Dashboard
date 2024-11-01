import { ComponentPropsWithoutRef, FC, forwardRef } from 'react';

import './Select.scss';

type SelectProps = ComponentPropsWithoutRef<'select'>;

const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    return <select className='select' ref={ref} {...props} />;
  }
);

export default Select;
