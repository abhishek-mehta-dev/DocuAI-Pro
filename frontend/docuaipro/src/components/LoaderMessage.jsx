"use client";

import { Bot } from "lucide-react";

const LoaderMessage = ({ type }) => {
  return (
    <div className="flex items-start space-x-4">
      {/* Icon */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          type === "upload"
            ? "bg-orange-500 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        <Bot className="h-4 w-4" />
      </div>

      {/* Content (bouncing dots) */}
      <div className="flex-1 space-y-1">
        <div className="text-sm font-medium text-foreground">
          {type === "upload" ? "System" : "DocuAI Pro"}
        </div>
        <div className="text-sm text-foreground leading-relaxed flex space-x-1">
          <span className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-150" />
          <span className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
};

export default LoaderMessage;
