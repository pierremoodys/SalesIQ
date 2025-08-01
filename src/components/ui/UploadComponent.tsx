"use client";

import React from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

interface UploadComponentProps {
  size?: "medium" | "small";
  className?: string;
  onFileSelect?: (files: FileList) => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  size = "medium",
  className = "",
  onFileSelect,
}) => {
  const isMedium = size === "medium";
  const isSmall = size === "small";

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className={`${isMedium ? "p-8" : "p-4"} h-full flex flex-col`}>
        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-400 transition-colors duration-200 cursor-pointer flex-1 flex flex-col justify-center ${
            isMedium ? "p-12" : "p-6"
          }`}
        >
          {/* Upload Icon */}
          <div className={isMedium ? "mb-4" : "mb-3"}>
            <CloudArrowUpIcon
              className={`mx-auto text-gray-400 ${
                isMedium ? "h-16 w-16" : "h-8 w-8"
              }`}
            />
          </div>

          {/* Upload Text */}
          <div className={isMedium ? "space-y-2" : "space-y-1"}>
            <p
              className={`font-medium text-gray-900 ${
                isMedium ? "text-lg" : "text-sm"
              }`}
            >
              {isMedium ? (
                <>
                  Drag & drop files or{" "}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Browse
                  </button>
                </>
              ) : (
                <>
                  Drop files or{" "}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    browse
                  </button>
                </>
              )}
            </p>
            <p className={`text-gray-500 ${isMedium ? "text-sm" : "text-xs"}`}>
              Supported formats: CSV
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
