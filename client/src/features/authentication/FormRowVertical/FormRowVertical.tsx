import { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

import './FormRowVertical.scss';

type FormRowVerticalProps = PropsWithChildren<{
  label?: string;
  forgotLabel?: ReactNode;
  error?: string;
  onModal?: () => void;
}>;

const FormRowVertical: FC<FormRowVerticalProps> = ({
  label,
  forgotLabel,
  error,
  children,
  onModal,
}) => {
  return (
    <div className='form-row-vertical'>
      <div className='form-row-vertical__labels'>
        {label && (
          <label htmlFor={(children as ReactElement)?.props?.id}>{label}</label>
        )}
        {forgotLabel && (
          <div className='form-row-vertical__forgot' onClick={onModal}>
            {forgotLabel}
          </div>
        )}
      </div>
      {children}
      {error && <span className='error'>{error}</span>}
    </div>
  );
};

export default FormRowVertical;
