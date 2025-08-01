"use client";

import React, { useEffect, useRef, useState } from "react";
import { UploadTable, UploadComponent } from "@/components/ui";

interface UploadPageClientProps {
  isChatOpen?: boolean;
}

export default function UploadPageClient(props: UploadPageClientProps) {
  console.log("🔵 UploadPageClient RECEIVED PROPS:", props);

  const { isChatOpen: initialChatOpen = false } = props;

  console.log("🔵 UploadPageClient RENDER:", { initialChatOpen, props });

  const [isChatOpen, setIsChatOpen] = useState(initialChatOpen);
  const previousUploadsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialScrolled = useRef(false);

  // Sync local state with prop changes (when server action updates the state)
  useEffect(() => {
    console.log("🔄 Syncing local state with prop:", {
      currentState: isChatOpen,
      newProp: initialChatOpen,
    });
    setIsChatOpen(initialChatOpen);
  }, [initialChatOpen]);

  console.log("🔵 Current state:", {
    isChatOpen,
    initialChatOpen,
    hasInitialScrolled: hasInitialScrolled.current,
  });

  // Initial scroll effect based on server-provided chat state
  useEffect(() => {
    console.log("🟡 Initial scroll useEffect triggered:", {
      hasInitialScrolled: hasInitialScrolled.current,
      initialChatOpen,
      containerExists: !!containerRef.current,
      uploadsExists: !!previousUploadsRef.current,
    });

    if (hasInitialScrolled.current) {
      console.log("🔴 Skipping initial scroll - already done");
      return;
    }

    const container = containerRef.current;
    const previousUploads = previousUploadsRef.current;

    if (!container || !previousUploads) {
      console.log("🔴 Missing refs:", {
        container: !!container,
        previousUploads: !!previousUploads,
      });
      return;
    }

    if (initialChatOpen) {
      console.log("🟢 SCROLLING TO TABLE - chat is open");
      // If chat is open from server state, scroll to table section
      previousUploads.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.log("🟢 SCROLLING TO TOP - chat is closed");
      // If chat is closed, ensure we start at the top
      container.scrollTo({
        top: 0,
        behavior: "auto", // No animation for initial position
      });
    }

    hasInitialScrolled.current = true;
    console.log("🟢 Initial scroll completed, hasInitialScrolled set to true");
  }, []); // Run only once on mount

  // Smooth scroll effect when user toggles chat state
  useEffect(() => {
    console.log("🟡 Chat state change useEffect triggered:", {
      isChatOpen,
      hasInitialScrolled: hasInitialScrolled.current,
      containerExists: !!containerRef.current,
      uploadsExists: !!previousUploadsRef.current,
    });

    // Skip if this is the initial render
    if (!hasInitialScrolled.current) {
      console.log(
        "🔴 Skipping user interaction scroll - initial scroll not done yet"
      );
      return;
    }

    const container = containerRef.current;
    const previousUploads = previousUploadsRef.current;

    if (!container || !previousUploads) {
      console.log("🔴 Missing refs for user interaction:", {
        container: !!container,
        previousUploads: !!previousUploads,
      });
      return;
    }

    if (isChatOpen) {
      console.log("🟢 USER OPENED CHAT - scrolling to table");
      // Scroll to Previous uploads section when user opens chat
      previousUploads.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.log("🟢 USER CLOSED CHAT - scrolling to top");
      // Scroll back to top when user closes chat
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [isChatOpen]);

  return (
    <div ref={containerRef} className="h-full overflow-y-auto">
      <div className="p-8">
        <div className="mx-auto space-y-8">
          {/* Upload Box */}
          <UploadComponent size="medium" />

          {/* Previous uploads section */}
          <div ref={previousUploadsRef} className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">
              Previous upload:
            </h2>

            {/* Upload table */}
            <UploadTable />
          </div>
        </div>
      </div>
    </div>
  );
}
