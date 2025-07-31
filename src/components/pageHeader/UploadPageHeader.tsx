"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { MoodysAIButton } from "@/components/ui";

interface UploadPageHeaderProps {
  title?: string;
  backUrl?: string;
  className?: string;
  onToggleChat?: () => void;
  isChatOpen?: boolean;
}

const UploadPageHeader: React.FC<UploadPageHeaderProps> = ({
  title = "Upload file",
  backUrl = "/",
  className = "",
  onToggleChat,
  isChatOpen = false,
}) => {
  return (
    <div
      className={`flex flex-col items-start gap-4 py-4 px-8 w-full border-b border-gray-300 ${className}`}
    >
      {/* Top Row: Back Button + Actions */}
      <div className="flex justify-between items-center w-full">
        {/* Back Button */}
        <Link
          href={backUrl}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-150"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          {/* Moody's AI Button */}
          {onToggleChat && (
            <MoodysAIButton isActive={isChatOpen} onToggle={onToggleChat} />
          )}

          {/* Menu Button */}
          <button
            className="flex justify-center items-center w-6 h-6 hover:bg-gray-100 rounded transition-colors duration-150"
            aria-label="More options"
          >
            <EllipsisVerticalIcon className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>

      {/* Page Title */}
      <div className="w-full">
        <h1 className="text-3xl font-[650] leading-9 text-black">{title}</h1>
      </div>
    </div>
  );
};

export default UploadPageHeader;
