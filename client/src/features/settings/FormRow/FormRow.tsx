import { FC, PropsWithChildren, isValidElement } from 'react';

import './FormRow.scss';

type FormRowProps = PropsWithChildren<{
  label?: string;
  error?: string;
}>;

const FormRow: FC<FormRowProps> = ({ label, error, children }) => {
  const childId = isValidElement(children) ? children.props.id : undefined;

  return (
    <div className='form-row'>
      {label && (
        <label className='form-row__label' htmlFor={childId}>
          {label}
        </label>
      )}
      {children}
      {error && <span className='form-row__error'>{error}</span>}
    </div>
  );
};

export default FormRow;
