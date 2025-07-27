import { Outlet } from 'react-router-dom';

import { Providers } from './providers';
import { AppHeader } from '@/features/header';
import { useTheme } from '@/shared/theme';

export function App() {
  const { toggleTheme } = useTheme();

  return (
    <Providers>
      <div className="flex flex-col h-[100vh] w-[100vw] bg-bg2 text-font1">
        <div
          onClick={() => {
            toggleTheme();
          }}
        >
          Change theme
        </div>
        <AppHeader />
        <Outlet />
      </div>
    </Providers>
  );
}
