"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  Send,
  Bot,
  User,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (file && file.type === "application/pdf") {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setUploadedFile({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          status: "uploaded",
        });
        setIsUploading(false);
        // Add system message about successful upload
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "system",
            content: `PDF "${file.name}" has been successfully uploaded and processed. You can now ask questions about this document.`,
          },
        ]);
      }, 2000);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setMessages((prev) => prev.filter((msg) => msg.type !== "system"));
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        content: uploadedFile
          ? `Based on the PDF "${uploadedFile.name}", I can help you with that. Here's what I found in the document...`
          : "Please upload a PDF document first so I can analyze it and answer your questions about its content.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-sans text-3xl font-bold text-foreground mb-2">
          Chat with AI
        </h1>
        <p className="text-muted-foreground">
          Upload a PDF document and ask questions about its content
        </p>
      </div>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {!uploadedFile ? (
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {isUploading ? "Uploading..." : "Upload PDF Document"}
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your PDF here, or click to browse
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isUploading ? "Processing..." : "Choose File"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-card rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium text-card-foreground">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {uploadedFile.size}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Uploaded
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Messages */}
      {/* <Card className="flex-1 mb-4">
        <CardContent className="p-0 h-full">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div className="space-y-2">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-medium">Ready to help!</h3>
                  <p className="text-muted-foreground">
                    Upload a PDF and start asking questions
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
      </Card> */}

      {/* Input Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                uploadedFile
                  ? "Ask a question about your document..."
                  : "Upload a PDF first to start chatting"
              }
              className="flex-1"
              disabled={!uploadedFile}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || !uploadedFile}
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
