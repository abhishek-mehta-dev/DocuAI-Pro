"use client";
import AIAgentsInterface from "@/components/AIAgentsInterface";
import { withAuth } from "@/components/auth/withAuth";

const AIAgentsPage = () => {
  return <AIAgentsInterface />;
};

export default withAuth(AIAgentsPage);
