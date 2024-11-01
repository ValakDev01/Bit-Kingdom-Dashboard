import { ComponentPropsWithoutRef, FC, forwardRef } from 'react';

import './Input.scss';

type InputProps = ComponentPropsWithoutRef<'input'>;

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input className='input' ref={ref} {...props} />;
  }
);
export default Input;
