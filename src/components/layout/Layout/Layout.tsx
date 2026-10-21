import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { AppBar } from "@/components/layout";

export const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
