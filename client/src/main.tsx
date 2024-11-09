import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './components/ErrorFallback/ErrorFallback.tsx';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace('/dashboard')}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
