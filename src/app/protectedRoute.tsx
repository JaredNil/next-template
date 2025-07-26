import { Outlet, Navigate, redirect } from 'react-router-dom';

import { enableMocking } from './main';
import { ROUTES } from '@/shared/routes/routes';
import { useSession } from '@/shared/session/session';

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
}

export async function protectedLoader() {
  await enableMocking();

  const token = await useSession.getState().getFreshToken();

  if (!token) {
    redirect(ROUTES.LOGIN);
  }
  return null;
}
