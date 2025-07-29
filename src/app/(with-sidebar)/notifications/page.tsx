"use client";

import React, { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { BellIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import ChatPanel from "@/components/layout/ChatPanel";
import { useChatStore } from "@/stores/chatStore";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { NotificationList } from "@/components/ui";
import { useNotifications } from "@/hooks/useNotifications";
import { updateNotificationReadStatus } from "@/lib/api";

const notificationTabs = [
  { id: "all", label: "All" },
  { id: "external", label: "External" },
  { id: "internal", label: "Internal" },
];

const VALID_TABS = ["all", "external", "internal"] as const;
type ValidTab = (typeof VALID_TABS)[number];

// Validate and normalize tab parameter
const getValidTab = (tab?: string): ValidTab => {
  if (tab && VALID_TABS.includes(tab as ValidTab)) {
    return tab as ValidTab;
  }
  return "all"; // Default tab
};

export default function NotificationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isChatOpen, chatPanelSize, closeChat, setChatPanelSize } =
    useChatStore();

  // Get initial tab from URL, default to "all"
  const initialTab = getValidTab(searchParams.get("tab") || undefined);
  const [activeTab, setActiveTab] = useState<ValidTab>(initialTab);

  // Animation state management (same as CompanyContentClient)
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRenderChat, setShouldRenderChat] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Use React Query to fetch notifications with filters
  const sourceType =
    activeTab === "all" ? undefined : (activeTab as "external" | "internal");
  const {
    data: notificationsData,
    isLoading,
    error,
  } = useNotifications({ sourceType });

  const notifications = notificationsData?.notifications || [];

  // Initialize shouldRenderChat based on persisted state
  useEffect(() => {
    if (!isInitialized) {
      setShouldRenderChat(isChatOpen);
      setIsInitialized(true);
    }
  }, [isChatOpen, isInitialized]);

  // Handle chat open/close animations (same as CompanyContentClient)
  useEffect(() => {
    if (!isInitialized) return; // Don't animate on initial load

    if (isChatOpen && !shouldRenderChat) {
      // Opening: show panel immediately and start slide-in animation
      setShouldRenderChat(true);
      setIsAnimating(true);
      setAnimationClass("slide-in-right");

      // Clear animation class after animation completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setAnimationClass("");
      }, 300);

      return () => clearTimeout(timer);
    } else if (!isChatOpen && shouldRenderChat) {
      // Closing: start slide-out animation, then hide panel
      setIsAnimating(true);
      setAnimationClass("slide-out-right");

      // Hide panel after animation completes
      const timer = setTimeout(() => {
        setShouldRenderChat(false);
        setIsAnimating(false);
        setAnimationClass("");
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isChatOpen, shouldRenderChat, isInitialized]);

  const updateTabInUrl = (tabId: ValidTab) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (tabId === "all") {
      current.delete("tab");
    } else {
      current.set("tab", tabId);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.replace(`${window.location.pathname}${query}`, { scroll: false });
  };

  const handlePanelResize = (sizes: number[]) => {
    // Only update size if not animating and chat is actually open
    if (!isAnimating && isChatOpen && sizes[1]) {
      setChatPanelSize(sizes[1]);
    }
  };

  const selectedTabIndex = notificationTabs.findIndex(
    (tab) => tab.id === activeTab
  );
  const handleTabIndexChange = (index: number) => {
    const selectedTab = notificationTabs[index];
    if (selectedTab) {
      setActiveTab(selectedTab.id as ValidTab);
      updateTabInUrl(selectedTab.id as ValidTab);
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    console.log("Notification clicked:", notificationId);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await updateNotificationReadStatus(notificationId, true);
      console.log("Marking notification as read:", notificationId);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <PanelGroup
          direction="horizontal"
          onLayout={handlePanelResize}
          className="h-full"
        >
          <Panel
            id="notifications-content"
            defaultSize={shouldRenderChat ? 100 - chatPanelSize : 100}
            className="min-w-0"
          >
            <div className="h-full flex flex-col">
              {/* Tab Navigation */}
              <div className="flex-shrink-0 px-6 py-4 bg-white">
                <TabGroup
                  selectedIndex={selectedTabIndex}
                  onChange={handleTabIndexChange}
                >
                  <TabList className="inline-flex items-start gap-1 p-1 rounded bg-[#f0f0f1]">
                    {notificationTabs.map((tab) => (
                      <Tab
                        key={tab.id}
                        className={({ selected }) =>
                          cn(
                            "flex justify-center items-center gap-2 py-2 px-4 rounded text-sm font-[420] leading-[1.125rem] transition-all duration-150 focus:outline-none cursor-pointer",
                            selected
                              ? "bg-white text-[#005eff]"
                              : "text-[#3c3d3f] hover:bg-white/50"
                          )
                        }
                      >
                        {({ selected }) => (
                          <>
                            <BellIcon
                              className={cn(
                                "w-[18px] h-[18px]",
                                selected ? "text-[#005eff]" : "text-[#3c3d3f]"
                              )}
                            />
                            <span>{tab.label}</span>
                          </>
                        )}
                      </Tab>
                    ))}
                  </TabList>
                </TabGroup>
              </div>

              {/* Content Area */}
              <div className="flex-1 min-h-0 overflow-y-auto">
                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Loading notifications...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500">Error loading notifications</p>
                  </div>
                ) : notifications.length > 0 ? (
                  <div className="p-4">
                    <NotificationList
                      notifications={notifications}
                      onNotificationClick={handleNotificationClick}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No {activeTab === "all" ? "" : activeTab} notifications
                      available.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      New notifications will appear here when they are
                      generated.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Panel>

          {shouldRenderChat && (
            <>
              <PanelResizeHandle />
              <Panel
                id="notifications-chat"
                defaultSize={chatPanelSize}
                minSize={20}
                maxSize={50}
                className={`min-w-0 ${animationClass}`}
              >
                <ChatPanel
                  onClose={closeChat}
                  headerTitle="Research notifications"
                  description="You can research notifications, trends, and get insights about company activities."
                  placeholder="Ask about notifications"
                  headerIcon={DocumentTextIcon}
                />
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
    </div>
  );
}
