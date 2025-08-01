"use client";

import React, { useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { ProcessedMarkdownContent } from "@/lib/serverData";
import StaticMarkdownReport from "@/components/StaticMarkdownReport";
import StaticAccordionTableOfContents from "@/components/StaticAccordionTableOfContents";
import { useRouter, useSearchParams } from "next/navigation";

interface CompanyContentClientProps {
  reportContent: ProcessedMarkdownContent;
  salesPitchContent: ProcessedMarkdownContent;
  reachOutContent: ProcessedMarkdownContent;
  initialTab?: string;
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
  initialTab = "report",
}: CompanyContentClientProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update URL when tab changes
  const updateTabInUrl = (tabId: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (tabId === "report") {
      // Remove tab param for default tab to keep URL clean
      current.delete("tab");
    } else {
      current.set("tab", tabId);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    // Use replace to avoid adding to browser history for tab changes
    router.replace(`${window.location.pathname}${query}`, { scroll: false });
  };

  // For Headless UI direct usage
  const selectedTabIndex = companyTabs.findIndex((tab) => tab.id === activeTab);
  const handleTabIndexChange = (index: number) => {
    const selectedTab = companyTabs[index];
    if (selectedTab) {
      setActiveTab(selectedTab.id);
      updateTabInUrl(selectedTab.id);
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
                <StaticAccordionTableOfContents content={getCurrentContent()} />
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
                <h3 className="text-lg font-medium mb-4">Notifications</h3>
                <p className="text-gray-600">
                  Company notifications and alerts will be displayed here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
