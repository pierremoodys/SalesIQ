"use client";

import React, { useEffect } from "react";
import {
  CloudArrowUpIcon,
  DocumentArrowUpIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  PageHeader,
  DropdownMenuItem,
  ChatConfig,
} from "@/components/pageHeader";
import { UploadTable } from "@/components/ui";
import { useChatStore } from "@/stores/chatStore";
import { ROUTES } from "@/config/routes";

export default function UploadPage() {
  const { isChatOpen, toggleChat, setChatAvailable } = useChatStore();

  // Set chat availability for upload page
  useEffect(() => {
    setChatAvailable(true, {
      page: "upload",
    });

    // Cleanup: disable chat when leaving this page
    return () => setChatAvailable(false);
  }, [setChatAvailable]);

  return (
    <div className="h-full flex flex-col">
      {/* Header with back button */}
      <div className="flex-shrink-0">
        <PageHeader
          variant="upload"
          title="Upload file"
          backButton={{
            url: ROUTES.HOME,
            label: "Back to dashboard",
          }}
          onToggleChat={toggleChat}
          isChatOpen={isChatOpen}
          chatConfig={{
            title: "Upload assistant",
            description:
              "I can help you with file uploads, processing, or troubleshooting upload issues.",
            placeholder: "Ask about uploading files",
            icon: DocumentArrowUpIcon,
          }}
          menuItems={[
            {
              id: "upload-help",
              label: "Upload Help",
              icon: QuestionMarkCircleIcon,
              onClick: () => console.log("Show help"),
            },
            {
              id: "clear-all",
              label: "Clear All Files",
              icon: TrashIcon,
              onClick: () => console.log("Clear files"),
            },
          ]}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-0 p-8">
        <div className="mx-auto space-y-8">
          {/* Upload Box */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors duration-200">
                {/* Upload Icon */}
                <div className="mb-4">
                  <CloudArrowUpIcon className="mx-auto h-16 w-16 text-gray-400" />
                </div>

                {/* Upload Text */}
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">
                    Drag & drop files or{" "}
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Browse
                    </button>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: CSV
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Previous uploads section */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">
              Previous upload:
            </h2>

            {/* Upload table */}
            <UploadTable
              onDelete={(id) => {
                console.log("Delete file with id:", id);
                // TODO: Implement delete functionality
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
