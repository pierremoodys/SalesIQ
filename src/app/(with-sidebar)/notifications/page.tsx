"use client";

import React, { useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
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

  // Get initial tab from URL, default to "all"
  const initialTab = getValidTab(searchParams.get("tab") || undefined);
  const [activeTab, setActiveTab] = useState<ValidTab>(initialTab);

  // Use React Query to fetch notifications with filters
  const sourceType =
    activeTab === "all" ? undefined : (activeTab as "external" | "internal");
  const {
    data: notificationsData,
    isLoading,
    error,
  } = useNotifications({ sourceType });

  const notifications = notificationsData?.notifications || [];

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
      {/* Tab Navigation */}
      <div
        className="flex-shrink-0 px-6 py-4"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <TabGroup
          selectedIndex={selectedTabIndex}
          onChange={handleTabIndexChange}
        >
          <TabList
            className="inline-flex items-start gap-1 p-1 rounded"
            style={{ backgroundColor: "var(--color-background-secondary)" }}
          >
            {notificationTabs.map((tab) => (
              <Tab
                key={tab.id}
                className="text-sm font-[420] leading-[1.125rem] transition-all duration-150 focus:outline-none cursor-pointer"
              >
                {({ selected }) => (
                  <div
                    className="flex justify-center items-center gap-2 py-2 px-4 rounded"
                    style={{
                      backgroundColor: selected
                        ? "var(--color-surface)"
                        : "transparent",
                      color: selected
                        ? "var(--color-secondary)"
                        : "var(--color-text)",
                    }}
                    onMouseEnter={(e) => {
                      if (!selected) {
                        e.currentTarget.style.backgroundColor =
                          "var(--color-surface-hover)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selected) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <BellIcon className="w-[18px] h-[18px]" />
                    <span>{tab.label}</span>
                  </div>
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
            <p style={{ color: "var(--color-text-muted)" }}>
              Loading notifications...
            </p>
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
            <p style={{ color: "var(--color-text-muted)" }}>
              No {activeTab === "all" ? "" : activeTab} notifications available.
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              New notifications will appear here when they are generated.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
