import { Outlet } from 'react-router-dom';

// import { useSession } from '@/shared/session/session';

export function ProtectedRoute() {
  // const { session } = useSession();

  // if (!session) {
  //   return <Outlet />;
  //   // return <Navigate to={ROUTES.LOGIN} />;
  // }
  return <Outlet />;
}

// Защита от получения доступа до верификации пользователя - переработать
// export async function protectedLoader() {
//   const token = await useSession.getState().refreshToken();

//   if (!token) {
//     redirect(ROUTES.LOGIN);
//   }
//   return null;
// }
