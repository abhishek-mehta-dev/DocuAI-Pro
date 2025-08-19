"use client";

import { useState } from "react";
import { DashboardContent } from "@/components/Dashboard";
import { withAuth } from "@/components/auth/withAuth";

const DashboardPage = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <DashboardContent activeItem={activeItem} />
        </div>
      </main>
    </div>
  );
};

export default withAuth(DashboardPage);
