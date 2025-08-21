"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Youtube,
  Send,
  Bot,
  User,
  X,
  CheckCircle,
  AlertCircle,
  Link,
} from "lucide-react";

export function YoutubeInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [processedVideo, setProcessedVideo] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChatting, setIsChatting] = useState(false);

  const extractVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleVideoProcess = async () => {
    if (!youtubeUrl.trim()) return;

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "system",
          content: "Please enter a valid YouTube URL.",
        },
      ]);
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call to extract transcript
      // In real implementation, this would call your backend to get YouTube transcript
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate processing time

      const videoTitle = `YouTube Video ${videoId}`; // In real app, fetch actual title

      setProcessedVideo({
        id: videoId,
        title: videoTitle,
        url: youtubeUrl,
        status: "processed",
        transcript: "Transcript extracted successfully", // In real app, this would be the actual transcript
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "system",
          content: `YouTube video "${videoTitle}" has been processed and transcript extracted.`,
        },
      ]);

      setYoutubeUrl("");
    } catch (error) {
      console.error("Processing failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "system",
          content: "Failed to process YouTube video. Please try again.",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeVideo = () => {
    setProcessedVideo(null);
    setMessages((prev) => prev.filter((msg) => msg.type !== "system"));
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    if (!processedVideo) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "system",
          content: "Process a YouTube video first to ask questions.",
        },
      ]);
      return;
    }

    setIsChatting(true);

    try {
      // Simulate AI response based on video transcript
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          content: `Based on the YouTube video transcript, here's my response to your question: "${inputValue}". This is a simulated response that would analyze the video content.`,
        },
      ]);
    } catch (error) {
      console.error("Chat failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "system",
          content: "Failed to get AI response. Please try again.",
        },
      ]);
    } finally {
      setIsChatting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-sans text-3xl font-bold text-foreground mb-2">
          Chat with YouTube Videos
        </h1>
        <p className="text-muted-foreground">
          Enter a YouTube video URL to extract transcript and chat with AI about
          the content
        </p>
      </div>

      {/* YouTube URL Input Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {!processedVideo ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Youtube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {isProcessing ? "Processing Video..." : "Process YouTube Video"}
              </h3>
              <p className="text-muted-foreground mb-4">
                Enter a YouTube video URL to extract transcript and start
                chatting
              </p>

              <div className="flex space-x-2 max-w-md mx-auto mb-4">
                <Input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1"
                  disabled={isProcessing}
                />
                <Button
                  onClick={handleVideoProcess}
                  disabled={!youtubeUrl.trim() || isProcessing}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Link className="h-4 w-4 mr-2" />
                  {isProcessing ? "Processing..." : "Process"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-card rounded-lg">
              <div className="flex items-center space-x-3">
                <Youtube className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">
                    {processedVideo.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Video ID: {processedVideo.id}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Processed
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeVideo}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 mb-4">
        <CardContent className="p-0 h-full">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div className="space-y-2">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-medium">Ready to help!</h3>
                  <p className="text-muted-foreground">
                    Process a YouTube video and start asking questions about its
                    content
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.type === "system"
                          ? "bg-accent text-accent-foreground"
                          : "bg-card text-card-foreground"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="h-4 w-4" />
                      ) : message.type === "system" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.type === "system"
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : "bg-card text-card-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                processedVideo
                  ? "Ask a question about the video content..."
                  : "Process a YouTube video first to start chatting"
              }
              className="flex-1"
              disabled={!processedVideo || isChatting}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || !processedVideo || isChatting}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
