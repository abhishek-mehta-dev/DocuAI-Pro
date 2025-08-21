"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/Sidebar";
import routes from "@/lib/routes";

export default function DashboardLayout({ children }) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const pathname = usePathname();

  // Routes where sidebar should be hidden
  const hideSidebarRoutes = [routes.payment];
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed) */}
      {!shouldHideSidebar && (
        <div className="h-screen sticky top-0">
          <DashboardSidebar
            activeItem={activeItem}
            onItemClick={setActiveItem}
          />
        </div>
      )}

      {/* Main content (scrollable) */}
      <div className="flex-1 p-6 bg-background overflow-y-auto">{children}</div>
    </div>
  );
}
