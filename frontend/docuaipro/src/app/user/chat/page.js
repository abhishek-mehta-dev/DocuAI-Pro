"use client";

import { withAuth } from "@/components/auth/withAuth";
import { ChatInterface } from "@/components/ChatInterface";

const ChatWithAIPage = () => {
  return <ChatInterface />;
};

export default withAuth(ChatWithAIPage);
