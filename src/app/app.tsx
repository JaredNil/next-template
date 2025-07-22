import { Outlet } from "react-router-dom";

import { Providers } from "./providers";
import { AppHeader } from "@/features/header";

export function App() {

  return (
    <Providers>
      <div>
        <AppHeader />
        <Outlet />
      </div>
    </Providers>
  );
}
