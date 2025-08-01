"use client";

import { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChatPanel from "@/components/layout/ChatPanel";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

interface NotificationsContentClientProps {
  children: React.ReactNode;
  initialChatOpen: boolean;
  initialChatSize: number;
}

export default function NotificationsContentClient({
  children,
  initialChatOpen,
  initialChatSize,
}: NotificationsContentClientProps) {
  // Chat panel state
  const [chatPanelSize, setChatPanelSize] = useState(initialChatSize);
  const [shouldRenderChat, setShouldRenderChat] = useState(initialChatOpen);

  // Animation state management
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

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
      // Note: Server-side panel size persistence could be added here if needed
    }
  };

  return (
    <div className="flex-1 min-h-0">
      <PanelGroup
        direction="horizontal"
        onLayout={handlePanelResize}
        className="h-full"
      >
        {/* Notifications Content Panel - NO TRANSITION for instant resize */}
        <Panel
          id="notifications-content"
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
              id="notifications-chat"
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
  );
}
