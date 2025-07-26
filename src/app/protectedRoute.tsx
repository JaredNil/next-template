import { Outlet, Navigate, redirect } from 'react-router-dom';

import { ROUTES } from '@/shared/routes/routes';
import { useSession } from '@/shared/session/session';

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Outlet />;
    // return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
}

export async function protectedLoader() {
  const token = await useSession.getState().refreshToken();

  if (!token) {
    redirect(ROUTES.LOGIN);
  }
  return null;
}
