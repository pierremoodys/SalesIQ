"use client";

import React, { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChatPanel from "@/components/layout/ChatPanel";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

interface UploadContentClientProps {
  children: React.ReactNode;
  initialChatOpen: boolean;
  initialChatSize: number;
}

export default function UploadContentClient({
  children,
  initialChatOpen,
  initialChatSize,
}: UploadContentClientProps) {
  console.log("🎯 UploadContentClient: initialChatOpen =", initialChatOpen);

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
        {/* Upload Content Panel - NO TRANSITION for instant resize */}
        <Panel
          id="upload-content"
          defaultSize={shouldRenderChat ? 100 - chatPanelSize : 100}
          className="min-w-0"
        >
          <div className="h-full overflow-hidden">
            {(() => {
              console.log(
                "🔗 Cloning children with isChatOpen (initialChatOpen):",
                initialChatOpen,
                "shouldRenderChat:",
                shouldRenderChat
              );
              return React.cloneElement(children as React.ReactElement<any>, {
                isChatOpen: initialChatOpen, // Use initialChatOpen for immediate state changes
              });
            })()}
          </div>
        </Panel>

        {/* Chat Panel (conditionally rendered with animation) */}
        {shouldRenderChat && (
          <>
            {/* Resize Handle for Chat */}
            <PanelResizeHandle />

            {/* Chat Panel with Slide Animation ONLY */}
            <Panel
              id="upload-chat"
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
                headerTitle="Upload assistant"
                description="I can help you with file uploads, processing, or troubleshooting upload issues."
                placeholder="Ask about uploading files"
                headerIcon={DocumentArrowUpIcon}
                showUploadComponent={true}
              />
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
}
