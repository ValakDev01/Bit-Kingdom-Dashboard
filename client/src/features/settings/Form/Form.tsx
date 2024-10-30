import { FC, PropsWithChildren } from 'react';

import './Form.scss';

type FormProps = PropsWithChildren<{
  type?: 'modal' | 'standard';
}>;

const Form: FC<FormProps> = ({ children, type }) => {
  return (
    <form className={`form ${type === 'modal' ? 'form--modal' : ''}`}>
      {children}
    </form>
  );
};

export default Form;
