"use client";

import { withAuth } from "@/components/auth/withAuth";
import ComingSoonPage from "@/components/ComingSoonPage";
// import AIAgentsInterface from "@/components/AIAgentsInterface";

const AIAgentsPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Agents</h1>
          <p className="text-muted-foreground">
            Manage and monitor your AI agents for document processing
          </p>
        </div>
      </div>

      {/* Coming Soon placeholder */}
      <ComingSoonPage />
    </div>
  );
};

export default withAuth(AIAgentsPage);
