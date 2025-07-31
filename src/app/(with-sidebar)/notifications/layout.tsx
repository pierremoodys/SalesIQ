"use client";

import React, { useEffect } from "react";
import { NotificationsPageHeader } from "@/components/pageHeader";
import { useChatStore } from "@/stores/chatStore";

interface NotificationsLayoutProps {
  children: React.ReactNode;
}

export default function NotificationsLayout({
  children,
}: NotificationsLayoutProps) {
  const { isChatOpen, toggleChat, setChatAvailable } = useChatStore();

  // Set chat availability for notifications page
  useEffect(() => {
    setChatAvailable(true, {
      page: "notifications",
    });

    // Cleanup: disable chat when leaving this layout
    return () => setChatAvailable(false);
  }, [setChatAvailable]);

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
