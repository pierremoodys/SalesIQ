"use client";

import { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
// Remove direct import of server actions
import { usePathname } from "next/navigation";
import ChatPanel from "@/components/layout/ChatPanel";
import {
  CompaniesContext,
  CompaniesContextType,
} from "@/contexts/CompaniesContext";

interface CompaniesContentClientProps {
  children: React.ReactNode;
  initialChatOpen: boolean;
  initialChatSize: number;
}

export default function CompaniesContentClient({
  children,
  initialChatOpen,
  initialChatSize,
}: CompaniesContentClientProps) {
  const pathname = usePathname();

  // Local state for companies-specific functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"list" | "grid" | "table">("list");

  // Chat panel state
  const [chatPanelSize, setChatPanelSize] = useState(initialChatSize);
  const [shouldRenderChat, setShouldRenderChat] = useState(initialChatOpen);

  // Animation state management
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Companies context value
  const contextValue: CompaniesContextType = {
    searchQuery,
    setSearchQuery,
    viewType,
    setViewType,
  };

  // Initialize shouldRenderChat based on server state
  useEffect(() => {
    if (!isInitialized) {
      setShouldRenderChat(initialChatOpen);
      setIsInitialized(true);
    }
  }, [initialChatOpen, isInitialized]);

  // Handle chat open/close animations
  useEffect(() => {
    if (!isInitialized) return; // Don't animate on initial load

    if (initialChatOpen && !shouldRenderChat) {
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
    } else if (!initialChatOpen && shouldRenderChat) {
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
  }, [initialChatOpen, shouldRenderChat, isInitialized]);

  const handlePanelResize = (sizes: number[]) => {
    // Only update size if not animating and chat is actually open
    if (!isAnimating && initialChatOpen && sizes[1]) {
      setChatPanelSize(sizes[1]);
      // Note: Panel size will be persisted via other means (cookies, localStorage, etc.)
      // For now, we'll just track it locally in client state
    }
  };

  return (
    <CompaniesContext.Provider value={contextValue}>
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
                <ChatPanel
                  onClose={() => {
                    // For now, just a placeholder - chat close will be handled via PageHeader
                    console.log("Chat close clicked");
                  }}
                />
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
    </CompaniesContext.Provider>
  );
}
