import { ComponentPropsWithoutRef, FC } from 'react';

import './Button.scss';

type ButtonProps = {
  size?: 'small' | 'medium' | 'large';
  variation?: 'primary' | 'secondary' | 'danger';
} & ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({
  size = 'medium',
  variation = 'primary',
  children,
  ...props
}) => {
  return (
    <button className={`button ${size} ${variation}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
