"use client";

import { useState } from "react";
import {
  PlusIcon,
  XMarkIcon,
  MicrophoneIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
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

      {/* Chat Container - Takes remaining space with side margins and drop shadow */}
      <div
        className="flex-1 mx-4 flex flex-col rounded-lg border border-[#d7d8d7] bg-white overflow-hidden min-h-0"
        style={{
          boxShadow: "2px 2px 4px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 justify-between items-center gap-2 py-2 px-4 h-8 border-b border-b-[#d7d8d7] bg-[#deebff]/40">
          <div className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4 text-[#646669]" />
            <div className="text-[#3c3d3f]  text-xs">Add or edit companies</div>
          </div>
          <button
            onClick={onClose}
            className="text-[#a6a9aa] hover:text-[#646669] transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Content - Takes remaining space */}
        <div className="flex flex-col justify-between p-4 flex-1 min-h-0">
          <div className="flex justify-center items-center gap-2.5">
            <div className="font-[420] text-md text-gray-600">
              Tell me about the size, industry, location of the companies you
              want to start tracking.
            </div>
          </div>

          {/* Input Area - Pinned to bottom of content area */}
          <div className="flex justify-between items-center py-2 px-3 h-14 rounded border border-[#2475ff] mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Search for companies"
              className="flex-1 text-[#585a5c]  leading-6 bg-transparent border-none outline-none placeholder:text-[#585a5c]"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <div className="flex items-center gap-4 h-10">
              <MicrophoneIcon className="w-6 h-6 text-[#646669]" />
              <button
                onClick={handleSendMessage}
                className="flex justify-center items-center w-8 h-8 rounded bg-[#e7e7f0] hover:bg-[#d1d1db] transition-colors"
              >
                <ArrowRightIcon className="w-6 h-6 text-[#646669]" />
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
