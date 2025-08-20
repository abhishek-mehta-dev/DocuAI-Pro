"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="flex">
      {/* Sidebar */}
      <DashboardSidebar activeItem={activeItem} onItemClick={setActiveItem} />

      {/* Main content */}
      <div className="flex-1 p-6 bg-background min-h-screen">{children}</div>
    </div>
  );
}
