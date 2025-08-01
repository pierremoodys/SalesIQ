"use client";

import React, { useEffect, useRef, useState } from "react";
import { UploadTable, UploadComponent } from "@/components/ui";

interface UploadPageClientProps {
  isChatOpen?: boolean;
}

export default function UploadPageClient({
  isChatOpen: initialChatOpen = false,
}: UploadPageClientProps) {
  const [isChatOpen, setIsChatOpen] = useState(initialChatOpen);
  const previousUploadsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Smooth scroll effect when chat state changes (but not on initial mount)
  useEffect(() => {
    // Skip scroll effect on initial mount to prevent unwanted scrolling on page reload
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

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
