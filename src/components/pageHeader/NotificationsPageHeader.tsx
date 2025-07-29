"use client";

import React from "react";
import { EllipsisVerticalIcon, BellIcon } from "@heroicons/react/24/outline";
import { MoodysAIButton } from "@/components/ui";

// Base header props
interface BaseHeaderProps {
  className?: string;
  onToggleChat?: () => void;
  isChatOpen?: boolean;
}

// Notifications list variant
interface NotificationsListHeaderProps extends BaseHeaderProps {
  variant: "notifications-list";
}

type NotificationsPageHeaderProps = NotificationsListHeaderProps;

const NotificationsPageHeader: React.FC<NotificationsPageHeaderProps> = (
  props
) => {
  const { className = "", onToggleChat, isChatOpen } = props;

  if (props.variant === "notifications-list") {
    return (
      <div
        className={`flex flex-col items-start gap-3 py-4 px-8 w-full border-b border-gray-300 ${className}`}
      >
        <div className="flex justify-between items-center w-full">
          {/* Page Title Section */}
          <div className="flex items-center gap-2">
            <BellIcon className="w-[18px] h-[18px] text-gray-900" />
            <h1 className="text-black text-lg font-medium leading-6">
              Notifications
            </h1>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            {/* Moody's AI Chat Button */}
            {onToggleChat && (
              <MoodysAIButton onToggle={onToggleChat} isActive={isChatOpen} />
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
      </div>
    );
  }

  return null;
};

export default NotificationsPageHeader;
