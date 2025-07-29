"use client";

import React from "react";
import { NotificationsPageHeader } from "@/components/pageHeader";
import { useChatStore } from "@/stores/chatStore";

interface NotificationsLayoutProps {
  children: React.ReactNode;
}

export default function NotificationsLayout({
  children,
}: NotificationsLayoutProps) {
  const { isChatOpen, toggleChat } = useChatStore();

  return (
    <div className="h-full flex flex-col">
      {/* Page Header - Static */}
      <div className="flex-shrink-0">
        <NotificationsPageHeader
          variant="notifications-list"
          onToggleChat={toggleChat}
          isChatOpen={isChatOpen}
        />
      </div>

      {/* Content Area - Takes remaining space */}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
