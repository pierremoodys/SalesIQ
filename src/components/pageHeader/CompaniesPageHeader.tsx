"use client";

import React from "react";
import {
  EllipsisVerticalIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { MoodysAIButton } from "@/components/ui";

interface CompaniesPageHeaderProps {
  className?: string;
  onToggleChat?: () => void;
  isChatOpen?: boolean;
}

const CompaniesPageHeader: React.FC<CompaniesPageHeaderProps> = ({
  className = "",
  onToggleChat,
  isChatOpen = false,
}) => {
  return (
    <div
      className={`flex flex-col items-start gap-3 py-4 px-8 w-full border-b border-gray-300 ${className}`}
    >
      <div className="flex justify-between items-center w-full">
        {/* Page Title Section */}
        <div className="flex items-center gap-2">
          <BuildingOffice2Icon className="w-[18px] h-[18px] text-gray-900" />
          <h1 className=" text-black text-lg font-medium leading-6">
            Your companies
          </h1>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          {/* Moody's AI Button */}
          <MoodysAIButton isActive={isChatOpen} onToggle={onToggleChat} />

          {/* Menu Button */}
          <button
            className="flex justify-center items-center w-6 h-6 hover:bg-gray-100 rounded transition-colors duration-150"
            aria-label="More options"
          >
            <EllipsisVerticalIcon className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPageHeader;
