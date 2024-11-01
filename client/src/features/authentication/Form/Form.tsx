import { FC, FormEvent, PropsWithChildren } from 'react';

import './Form.scss';

type FormProps = PropsWithChildren<{
  // eslint-disable-next-line no-unused-vars
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  type?: 'regular' | 'modal';
}>;

const Form: FC<FormProps> = ({ children, onSubmit, type = 'regular' }) => {
  return (
    <form className={`form ${type}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
