import React from "react";
import { UploadPageClient } from "@/components/layout";

// Server component that handles upload page
export default async function UploadPage() {
  try {
    return (
      <div className="h-full">
        {/* Interactive Content - Client-rendered */}
        <UploadPageClient />
      </div>
    );
  } catch (error) {
    console.error("Error loading upload page:", error);
    throw error;
  }
}
