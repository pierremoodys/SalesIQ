"use client";

import React, { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import {
  FolderIcon,
  FolderOpenIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import ChatPanel from "@/components/layout/ChatPanel";
import { useChatStore } from "@/stores/chatStore";
import { cn } from "@/lib/utils";
import type { ProcessedMarkdownContent } from "@/lib/serverData";
import StaticMarkdownReport from "@/components/StaticMarkdownReport";
import StaticAccordionTableOfContents from "@/components/StaticAccordionTableOfContents";

interface CompanyContentClientProps {
  reportContent: ProcessedMarkdownContent;
  salesPitchContent: ProcessedMarkdownContent;
  reachOutContent: ProcessedMarkdownContent;
}

// Tab configuration
const companyTabs = [
  { id: "notifications", label: "Notifications" },
  { id: "report", label: "Report" },
  { id: "sales-pitch", label: "Sales Pitch" },
  { id: "reach-out", label: "Reach out to Client" },
];

export default function CompanyContentClient({
  reportContent,
  salesPitchContent,
  reachOutContent,
}: CompanyContentClientProps) {
  const [activeTab, setActiveTab] = useState("report");
  const { isChatOpen, chatPanelSize, closeChat, setChatPanelSize } =
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

  // Get current content based on active tab
  const getCurrentContent = () => {
    switch (activeTab) {
      case "report":
        return reportContent;
      case "sales-pitch":
        return salesPitchContent;
      case "reach-out":
        return reachOutContent;
      default:
        return reportContent;
    }
  };

  return (
    <div className="flex-1 min-h-0">
      <PanelGroup
        direction="horizontal"
        onLayout={handlePanelResize}
        className="h-full"
      >
        {/* Main Content Panel */}
        <Panel
          id="company-content"
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
                  {companyTabs.map((tab) => (
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
                      {({ selected }) => {
                        const IconComponent = selected
                          ? FolderOpenIcon
                          : FolderIcon;
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

            {/* Content Area */}
            <div className="flex-1 min-h-0 flex">
              {/* Conditionally render TOC and content based on active tab */}
              {activeTab === "report" ||
              activeTab === "sales-pitch" ||
              activeTab === "reach-out" ? (
                <>
                  {/* Table of Contents - Fixed Left Column */}
                  <div className="w-64 flex-shrink-0 h-full">
                    <div className="h-full p-4">
                      <StaticAccordionTableOfContents
                        content={getCurrentContent()}
                      />
                    </div>
                  </div>

                  {/* Report Content Area - Right Column */}
                  <div className="flex-1 min-w-0 h-full">
                    <div className="h-full overflow-y-auto p-4">
                      <StaticMarkdownReport content={getCurrentContent()} />
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
  );
}
