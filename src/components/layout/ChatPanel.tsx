"use client";

import { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  MicrophoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { UploadComponent } from "@/components/ui";

interface ChatPanelProps {
  onClose: () => void;
  headerTitle?: string;
  description?: string;
  placeholder?: string;
  headerIcon?: React.ComponentType<{ className?: string }>;
  showUploadComponent?: boolean; // Add prop to conditionally show upload component
}

export default function ChatPanel({
  onClose,
  headerTitle = "Add or edit companies",
  description = "Tell me about the size, industry, location of the companies you want to start tracking.",
  placeholder = "Search for companies",
  headerIcon: HeaderIcon = PlusIcon,
  showUploadComponent = false,
}: ChatPanelProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 16px top margin */}
      <div className="h-4 flex-shrink-0" />

      {/* Chat Container - Takes remaining space with side margins and glassmorphism */}
      <div
        className="flex-1 mx-4 flex flex-col overflow-hidden min-h-0 relative rounded-md border"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          borderColor: "var(--color-border)",
        }}
      >
        {/* Header */}
        <div
          className="flex flex-shrink-0 justify-between items-center gap-2 py-2 px-4 h-8 border-b"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-background-secondary)",
          }}
        >
          <div className="flex items-center gap-2">
            <HeaderIcon className="w-4 h-4 text-muted" />
            <div className="text-xs" style={{ color: "var(--color-text)" }}>
              {headerTitle}
            </div>
          </div>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Content - Takes remaining space */}
        <div className="flex flex-col p-4 flex-1 min-h-0">
          <div className="flex justify-center items-center gap-2.5 flex-shrink-0">
            <div
              className="font-[420] text-md"
              style={{ color: "var(--color-text)" }}
            >
              {description}
            </div>
          </div>

          {/* Upload Component - Takes full available height when shown */}
          {showUploadComponent ? (
            <div className="flex-1 mt-4 mb-4 min-h-0">
              <UploadComponent size="small" className="h-full" />
            </div>
          ) : (
            <div className="flex-1"></div>
          )}

          {/* Input Area - Pinned to bottom of content area */}
          <div
            className="flex justify-between items-center py-2 px-3 h-14 rounded border mt-4 flex-shrink-0"
            style={{ borderColor: "var(--color-secondary)" }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              className="flex-1 leading-6 bg-transparent border-none outline-none chat-input"
              style={{
                color: "var(--color-text)",
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <div className="flex items-center gap-4 h-10">
              <MicrophoneIcon
                className="w-6 h-6"
                style={{ color: "var(--color-text-muted)" }}
              />
              <button
                onClick={handleSendMessage}
                className="flex justify-center items-center w-8 h-8 rounded transition-colors"
                style={{
                  backgroundColor: "var(--color-background-secondary)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-background-tertiary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-background-secondary)")
                }
              >
                <ArrowRightIcon
                  className="w-6 h-6"
                  style={{ color: "var(--color-text-muted)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 16px bottom margin */}
      <div className="h-4 flex-shrink-0" />
    </div>
  );
}
