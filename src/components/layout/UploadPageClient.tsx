"use client";

import React, { useEffect, useRef } from "react";
import { UploadTable, UploadComponent } from "@/components/ui";
import { useChatStore } from "@/stores/chatStore";

export default function UploadPageClient() {
  const { isChatOpen, setChatAvailable } = useChatStore();
  const previousUploadsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set chat availability for upload page
  useEffect(() => {
    setChatAvailable(true, {
      page: "upload",
    });

    return () => setChatAvailable(false);
  }, [setChatAvailable]);

  // Smooth scroll effect when chat state changes
  useEffect(() => {
    const container = containerRef.current;
    const previousUploads = previousUploadsRef.current;

    if (!container || !previousUploads) return;

    if (isChatOpen) {
      // Scroll to Previous uploads section when chat opens
      previousUploads.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Scroll back to top when chat closes
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
