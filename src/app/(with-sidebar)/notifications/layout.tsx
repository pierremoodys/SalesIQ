"use client";

import React, { useEffect } from "react";
import {
  PageHeader,
  DropdownMenuItem,
  ChatConfig,
} from "@/components/pageHeader";
import {
  BellIcon,
  DocumentTextIcon,
  CogIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
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
        <PageHeader
          variant="simple"
          icon={BellIcon}
          title="Notifications"
          onToggleChat={toggleChat}
          isChatOpen={isChatOpen}
          chatConfig={{
            title: "Research notifications",
            description:
              "You can research notifications, trends, and get insights about company activities.",
            placeholder: "Ask about notifications",
            icon: DocumentTextIcon,
          }}
          menuItems={[
            {
              id: "mark-all-read",
              label: "Mark All as Read",
              icon: CheckIcon,
              onClick: () => console.log("Mark all as read"),
            },
            {
              id: "notification-settings",
              label: "Notification Settings",
              icon: CogIcon,
              onClick: () => console.log("Open settings"),
            },
          ]}
        />
      </div>

      {/* Content Area - Takes remaining space */}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
