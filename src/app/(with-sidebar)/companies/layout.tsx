"use client";

import { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { CompaniesPageHeader } from "@/components/pageHeader";
import { CompaniesFilter } from "@/components/ui";
import ChatPanel from "@/components/layout/ChatPanel";
import { useChatStore } from "@/stores/chatStore";
import {
  CompaniesContext,
  CompaniesContextType,
} from "@/contexts/CompaniesContext";

interface CompaniesLayoutProps {
  children: React.ReactNode;
}

export default function CompaniesLayout({ children }: CompaniesLayoutProps) {
  // Use Zustand store for persistent chat state
  const { isChatOpen, chatPanelSize, toggleChat, closeChat, setChatPanelSize } =
    useChatStore();

  // Local state for companies-specific functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"list" | "grid" | "table">("list");

  // Animation state management
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRenderChat, setShouldRenderChat] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const contextValue: CompaniesContextType = {
    searchQuery,
    setSearchQuery,
    viewType,
    setViewType,
  };

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

  return (
    <CompaniesContext.Provider value={contextValue}>
      <div className="h-full flex flex-col">
        {/* Page Header - Static */}
        <div className="flex-shrink-0">
          <CompaniesPageHeader
            variant="companies-list"
            onToggleChat={toggleChat}
            isChatOpen={isChatOpen}
          />
        </div>

        {/* Filters - Static */}
        <div className="flex-shrink-0 border-b border-gray-200">
          <CompaniesFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewType={viewType}
            onViewTypeChange={setViewType}
          />
        </div>

        {/* Resizable Content Area - Takes remaining height */}
        <div className="flex-1 min-h-0">
          <PanelGroup
            direction="horizontal"
            onLayout={handlePanelResize}
            className="h-full"
          >
            {/* Company Items Panel - NO TRANSITION for instant resize */}
            <Panel
              id="companies-content"
              defaultSize={shouldRenderChat ? 100 - chatPanelSize : 100}
              className="min-w-0"
            >
              <div className="h-full overflow-auto">{children}</div>
            </Panel>

            {/* Chat Panel (conditionally rendered with animation) */}
            {shouldRenderChat && (
              <>
                {/* Resize Handle for Chat */}
                <PanelResizeHandle />

                {/* Chat Panel with Slide Animation ONLY */}
                <Panel
                  id="companies-chat"
                  defaultSize={chatPanelSize}
                  minSize={20}
                  maxSize={50}
                  className={`min-w-0 ${animationClass}`}
                >
                  <ChatPanel onClose={closeChat} />
                </Panel>
              </>
            )}
          </PanelGroup>
        </div>
      </div>
    </CompaniesContext.Provider>
  );
}
