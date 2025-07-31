"use client";

import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { UploadPageHeader } from "@/components/pageHeader";
import { UploadTable } from "@/components/ui";

export default function UploadPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header with back button */}
      <div className="flex-shrink-0">
        <UploadPageHeader title="Upload file" backUrl="/" />
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
