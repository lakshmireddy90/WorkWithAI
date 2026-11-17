import { useState } from "react";

import {
  Outlet,
  useLocation,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard Overview",
    "/dashboard/analytics": "Analytics",
    "/dashboard/users": "Users Management",
    "/dashboard/settings": "Settings",
  };

  const title =
    pageTitles[location.pathname] ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <Header
          title={title}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-400">
          © 2026 AdminPanel. All rights reserved.
          <span className="mx-2">|</span>
          Built with React and Tailwind CSS.
        </footer>

      </div>
    </div>
  );
};

export default DashboardLayout;