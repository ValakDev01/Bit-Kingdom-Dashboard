import { FC } from 'react';

import Button from '../../features/authentication/Button/Button';
import './ErrorFallback.scss';

type ErrorFallbackType = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback: FC<ErrorFallbackType> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <>
      <main className='error-fallback'>
        <div className='box'>
          <h1 className='heading'>Something went wrong 🧐</h1>
          <p>{error.message}</p>
          <Button size='large' onClick={resetErrorBoundary}>
            Try again
          </Button>
        </div>
      </main>
    </>
  );
};

export default ErrorFallback;
