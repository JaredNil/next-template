import { Outlet } from "react-router-dom";

import { Providers } from "./providers";
import { AppHeader } from "@/features/header";

export function App() {
  return (
    <Providers>
      <div className="flex flex-col h-[100vh] w-[100vw]">
        <AppHeader />
        <Outlet />
      </div>
    </Providers>
  );
}
