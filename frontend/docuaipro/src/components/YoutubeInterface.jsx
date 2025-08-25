"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Youtube, Send, CheckCircle, X } from "lucide-react";

export function YoutubeInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [processedVideo, setProcessedVideo] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "ai", content: "This is a mock AI reply." },
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* === Fixed Header === */}
      <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center space-x-3">
          <Youtube className="h-6 w-6 text-primary" />
          <h1 className="font-semibold text-lg">YouTube Chat</h1>
          {processedVideo && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Video Loaded
            </Badge>
          )}
        </div>
        {processedVideo && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => setProcessedVideo(null)}
          >
            <X className="h-4 w-4 mr-1" />
            Clear Video
          </Button>
        )}
      </div>

      {/* === Scrollable Chat === */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Youtube className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Chat with YouTube Videos</h2>
            <p className="text-muted-foreground max-w-md">
              Upload a YouTube video link to extract its transcript and start an
              AI-powered conversation.
            </p>
            <Button
              onClick={() => setShowUrlInput(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Youtube className="h-4 w-4 mr-2" />
              Add YouTube Video
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "user"
                    ? "justify-end text-right"
                    : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* === Fixed Input Bar === */}
      <div className="border-t border-border bg-background sticky bottom-0">
        <div className="max-w-3xl mx-auto p-4 flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
