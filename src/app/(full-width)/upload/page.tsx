import React from "react";
import { UploadPageClient } from "@/components/layout";
import { getChatState } from "@/lib/chat-server-actions";

// Server component that handles upload page
export default async function UploadPage() {
  // Get chat state directly in the page
  const { isChatOpen } = await getChatState();

  console.log("📄 UploadPage server-side chat state:", { isChatOpen });

  try {
    return (
      <div className="h-full">
        {/* Interactive Content - Client-rendered */}
        <UploadPageClient isChatOpen={isChatOpen} />
      </div>
    );
  } catch (error) {
    console.error("Error loading upload page:", error);
    throw error;
  }
}
