import { FC, PropsWithChildren, ReactElement } from 'react';

import './FormRowVertical.scss';

type FormRowVerticalProps = PropsWithChildren<{
  label?: string;
  error?: string;
}>;

const FormRowVertical: FC<FormRowVerticalProps> = ({
  label,
  error,
  children,
}) => {
  return (
    <div className='form-row-vertical'>
      {label && (
        <label htmlFor={(children as ReactElement)?.props?.id}>{label}</label>
      )}
      {children}
      {error && <span className='error'>{error}</span>}
    </div>
  );
};

export default FormRowVertical;
