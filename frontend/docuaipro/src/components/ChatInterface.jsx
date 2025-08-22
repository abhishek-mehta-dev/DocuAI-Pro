"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, X, CheckCircle, Paperclip } from "lucide-react";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";
import { useUploadPdf, useChatWithPdf } from "@/hooks/useDocument";

export function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { trigger: uploadTrigger, isLoading: isUploading } = useUploadPdf();
  const { trigger: chatTrigger, isLoading: isChatting } = useChatWithPdf();

  const handleFileUpload = async (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      dispatch(
        showMessage({ message: "Only PDF files are allowed", type: "error" })
      );
      return;
    }

    try {
      const uploadedData = await uploadTrigger(file);

      if (uploadedData?.status === "error") {
        dispatch(showMessage({ message: uploadedData.message, type: "error" }));
        return;
      }

      dispatch(showMessage({ message: uploadedData.message, type: "success" }));

      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        status: "uploaded",
        data: uploadedData.data, // contains doc_id
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "system",
          content: `PDF "${file.name}" has been successfully uploaded.`,
        },
      ]);
    } catch (error) {
      console.error("Upload failed:", error);
      dispatch(
        showMessage({
          message: error?.response?.data?.message || error.message,
          type: "error",
        })
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "system",
          content: `Failed to upload "${file.name}".`,
        },
      ]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
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

    if (!uploadedFile) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "system",
          content: "Upload a PDF first to ask questions.",
        },
      ]);
      return;
    }

    try {
      const response = await chatTrigger({
        doc_id: uploadedFile.data.id,
        question: inputValue,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          content: response?.data?.answer || "No response from AI.",
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
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Chat with AI
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">
                  How can I help you today?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Upload a PDF document and I'll help you analyze its content
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="group">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.type === "system"
                          ? "bg-orange-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-medium text-foreground">
                        {message.type === "user"
                          ? "You"
                          : message.type === "system"
                          ? "System"
                          : "DocuAI Pro"}
                      </div>
                      <div className="text-sm text-foreground leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {uploadedFile && (
            <div className="mb-3 flex items-center justify-between bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{uploadedFile.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({uploadedFile.size})
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="relative">
            <div className="flex items-end space-x-2 bg-muted rounded-2xl p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 h-8 w-8 p-0 hover:bg-background"
                disabled={isUploading || isChatting}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message DocuAI Pro..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                disabled={isUploading || isChatting}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isUploading || isChatting}
                size="sm"
                className="flex-shrink-0 h-8 w-8 p-0 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <p className="text-xs text-muted-foreground text-center mt-3">
            DocuAI Pro can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
