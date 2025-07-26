import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import './index.css';

let isWorkerStarted = false;

export async function enableMocking(isWorkerStarted: boolean) {
  if(!isWorkerStarted){
    console.warn(isWorkerStarted)
    const { worker } = await import('@/shared/openapi/mocks/browser');
    return worker.start();
  }
}

enableMocking(isWorkerStarted).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}).finally(()=> {isWorkerStarted = true});
