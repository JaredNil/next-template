import { createBrowserRouter, redirect } from 'react-router-dom';

import { protectedLoader, ProtectedRoute } from './protectedRoute';
import { App } from '@/app/app';
import { ROUTES } from '@/shared/routes/routes';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        loader: protectedLoader,
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.BOARDS,
            lazy: () => import('@/features/boards-list/boardsList.page'),
          },
          {
            path: ROUTES.BOARDS_FAV,
            lazy: () =>
              import('@/features/boards-list/boardsListFavorite.page'),
          },
          {
            path: ROUTES.BOARD,
            lazy: () => import('@/features/board/board.page'),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/features/auth/register.page'),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.BOARDS),
      },
    ],
  },
]);
