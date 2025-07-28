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
import { useCompany, type Company } from "@/hooks/useCompanies";
import MarkdownReport from "@/components/MarkdownReport";
import AccordionTableOfContents from "@/components/AccordionTableOfContents";

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
  const [activeTab, setActiveTab] = useState("report");
  const { isChatOpen, chatPanelSize, toggleChat, closeChat, setChatPanelSize } =
    useChatStore();

  // Get UUID from params
  const [companyUuid, setCompanyUuid] = useState<string | null>(null);

  // Use React Query to fetch company data
  const { data: company, isLoading, error } = useCompany(companyUuid || "");

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
    async function extractUuid() {
      try {
        const resolvedParams = await params;
        const { uuid } = parseCompanyParam(resolvedParams["uuid-companyname"]);
        setCompanyUuid(uuid);
      } catch (error) {
        console.error("Error parsing company params:", error);
        notFound();
      }
    }

    extractUuid();
  }, [params]);

  if (isLoading || !companyUuid) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading company...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    if (error?.message?.includes("not found")) {
      notFound();
    }
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Error loading company data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Company Header - Fixed */}
      <div className="flex-shrink-0">
        <CompaniesPageHeader
          variant="company-detail"
          company={company}
          backUrl="/companies"
          onToggleChat={toggleChat}
          isChatOpen={isChatOpen}
        />
      </div>

      {/* Tab Navigation - Fixed below header */}
      <div className="flex-shrink-0 px-6 py-4 bg-white border-b border-gray-200">
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
                  const IconComponent = selected ? FolderOpenIcon : FolderIcon;
                  return (
                    <>
                      <IconComponent
                        className={cn(
                          "w-[18px] h-[18px]",
                          selected ? "text-[#005eff]" : "text-[#3c3d3f]"
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

      {/* Main Content Area - Takes remaining height */}
      <div className="flex-1 min-h-0">
        <PanelGroup
          direction="horizontal"
          onLayout={handlePanelResize}
          className="h-full"
        >
          {/* Main Content Panel - No longer has overflow-auto */}
          <Panel
            id="company-content"
            defaultSize={shouldRenderChat ? 100 - chatPanelSize : 100}
            className="min-w-0"
          >
            <div className="h-full flex">
              {/* Conditionally render TOC and content based on active tab */}
              {activeTab === "report" ||
              activeTab === "sales-pitch" ||
              activeTab === "reach-out" ? (
                <>
                  {/* Table of Contents - Fixed Left Column */}
                  <div className="w-64 flex-shrink-0 h-full">
                    <div className="h-full p-4">
                      <AccordionTableOfContents
                        companyName={company?.name}
                        section={
                          activeTab === "report"
                            ? "report"
                            : activeTab === "sales-pitch"
                            ? "sales-pitch"
                            : "reach-out"
                        }
                      />
                    </div>
                  </div>

                  {/* Report Content Area - Right Column */}
                  <div className="flex-1 min-w-0 h-full">
                    <div className="h-full overflow-y-auto p-4">
                      <MarkdownReport
                        companyName={company?.name}
                        section={
                          activeTab === "report"
                            ? "report"
                            : activeTab === "sales-pitch"
                            ? "sales-pitch"
                            : "reach-out"
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Notifications tab - Full width */
                <div className="flex-1 h-full overflow-y-auto p-6">
                  <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">
                        Notifications
                      </h3>
                      <p className="text-gray-600">
                        Company notifications and alerts will be displayed here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
