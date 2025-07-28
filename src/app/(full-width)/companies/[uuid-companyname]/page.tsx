"use client";

import React, { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import {
  FolderIcon,
  FolderOpenIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { CompaniesPageHeader } from "@/components/pageHeader";
import ChatPanel from "@/components/layout/ChatPanel";
import { useChatStore } from "@/stores/chatStore";
import { cn } from "@/lib/utils";

interface CompanyTag {
  type: string;
  label: string;
  value: string;
  icon: string;
}

interface Company {
  id: string;
  uuid: string;
  name: string;
  description: string;
  logoUrl?: string;
  tracked: boolean;
  tags: CompanyTag[];
}

interface CompanyPageProps {
  params: Promise<{
    "uuid-companyname": string;
  }>;
}

// Tab configuration
const companyTabs = [
  { id: "notifications", label: "Notifications" },
  { id: "report", label: "Report" },
  { id: "sales-pitch", label: "Sales Pitch" },
  { id: "reach-out", label: "Reach out to Client" },
];

// Parse UUID and company name from the combined parameter
const parseCompanyParam = (param: string) => {
  // Split by the first hyphen after the UUID pattern
  // UUID format: c-550e8400-e29b-41d4-a716-446655440001
  const match = param.match(/^(c-[a-f0-9-]+)-(.+)$/);

  if (match) {
    return {
      uuid: match[1],
      companyName: match[2]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    };
  }

  // Fallback if parsing fails
  return {
    uuid: null,
    companyName: param
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  };
};

export default function CompanyPage({ params }: CompanyPageProps) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("report");
  const { isChatOpen, chatPanelSize, toggleChat, closeChat, setChatPanelSize } =
    useChatStore();

  // Animation state management
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRenderChat, setShouldRenderChat] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize shouldRenderChat based on persisted state
  useEffect(() => {
    if (!isInitialized) {
      setShouldRenderChat(isChatOpen);
      setIsInitialized(true);
    }
  }, [isChatOpen, isInitialized]);

  // Handle chat open/close animations
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

  const handlePanelResize = (sizes: number[]) => {
    // Only update size if not animating and chat is actually open
    if (!isAnimating && isChatOpen && sizes[1]) {
      setChatPanelSize(sizes[1]);
    }
  };

  // For Headless UI direct usage
  const selectedTabIndex = companyTabs.findIndex((tab) => tab.id === activeTab);
  const handleTabIndexChange = (index: number) => {
    const selectedTab = companyTabs[index];
    if (selectedTab) {
      setActiveTab(selectedTab.id);
    }
  };

  useEffect(() => {
    async function loadCompany() {
      try {
        const resolvedParams = await params;
        const { uuid } = parseCompanyParam(resolvedParams["uuid-companyname"]);

        // Fetch from API since this is now a client component
        const response = await fetch("/api/companies");
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        const data = await response.json();
        const foundCompany = data.companies.find(
          (c: Company) => c.uuid === uuid
        );

        if (!foundCompany) {
          notFound();
        }

        setCompany(foundCompany);
      } catch (error) {
        console.error("Error loading company:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadCompany();
  }, [params]);

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading company...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    notFound();
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Notifications</h3>
              <p className="text-gray-600">
                Company notifications and alerts will be displayed here.
              </p>
            </div>
          </div>
        );
      case "report":
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Company Profile</h3>
              <p className="text-gray-600">
                This is where the company report content will be displayed.
              </p>
            </div>
          </div>
        );
      case "sales-pitch":
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Sales Pitch</h3>
              <p className="text-gray-600">
                Sales pitch content and strategies will be shown here.
              </p>
            </div>
          </div>
        );
      case "reach-out":
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Reach out to Client</h3>
              <p className="text-gray-600">
                Client outreach templates and guidance will be displayed here.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Company Header */}
      <div className="flex-shrink-0">
        <CompaniesPageHeader
          variant="company-detail"
          company={company}
          backUrl="/companies"
          onToggleChat={toggleChat}
          isChatOpen={isChatOpen}
        />
      </div>

      {/* Resizable Content Area - Takes remaining height */}
      <div className="flex-1 min-h-0">
        <PanelGroup
          direction="horizontal"
          onLayout={handlePanelResize}
          className="h-full"
        >
          {/* Company Content Panel */}
          <Panel
            id="company-content"
            defaultSize={shouldRenderChat ? 100 - chatPanelSize : 100}
            className="min-w-0"
          >
            <div className="h-full overflow-auto">
              {/* Company Content */}
              <div className="p-6">
                {/* Tab Navigation */}
                <div className="mb-6">
                  <TabGroup
                    selectedIndex={selectedTabIndex}
                    onChange={handleTabIndexChange}
                  >
                    <TabList className="inline-flex items-start gap-1 p-1 rounded bg-[#f0f0f1]">
                      {companyTabs.map((tab) => (
                        <Tab
                          key={tab.id}
                          className={({ selected }) =>
                            cn(
                              "flex justify-center items-center gap-2 py-2 px-4 rounded text-sm font-[420] leading-[1.125rem] transition-all duration-150 focus:outline-none",
                              selected
                                ? "bg-white text-[#005eff]"
                                : "text-[#3c3d3f] hover:bg-white/50"
                            )
                          }
                        >
                          {({ selected }) => {
                            const IconComponent = selected
                              ? FolderOpenIcon
                              : FolderIcon;
                            return (
                              <>
                                <IconComponent
                                  className={cn(
                                    "w-[18px] h-[18px]",
                                    selected
                                      ? "text-[#005eff]"
                                      : "text-[#3c3d3f]"
                                  )}
                                />
                                <span>{tab.label}</span>
                              </>
                            );
                          }}
                        </Tab>
                      ))}
                    </TabList>
                  </TabGroup>
                </div>

                {/* Tab Content */}
                {renderTabContent()}
              </div>
            </div>
          </Panel>

          {/* Chat Panel (conditionally rendered with animation) */}
          {shouldRenderChat && (
            <>
              {/* Resize Handle for Chat */}
              <PanelResizeHandle />

              {/* Chat Panel with Slide Animation */}
              <Panel
                id="company-chat"
                defaultSize={chatPanelSize}
                minSize={20}
                maxSize={50}
                className={`min-w-0 ${animationClass}`}
              >
                <ChatPanel
                  onClose={closeChat}
                  headerTitle="Research company"
                  description="You can research the company, news event and edit the company report or your sales pitch."
                  placeholder="Search for companies"
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
