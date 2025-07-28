"use client";

import React, { useState } from "react";
import { Button } from "@headlessui/react";
import { SparklesIcon } from "@heroicons/react/16/solid";

interface MoodysAIButtonProps {
  isActive?: boolean;
  onToggle?: (active: boolean) => void;
  className?: string;
}

const MoodysAIButton: React.FC<MoodysAIButtonProps> = ({
  isActive: controlledActive,
  onToggle,
  className = "",
}) => {
  const [internalActive, setInternalActive] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isActive =
    controlledActive !== undefined ? controlledActive : internalActive;

  const handleClick = () => {
    const newState = !isActive;
    if (onToggle) {
      onToggle(newState);
    } else {
      setInternalActive(newState);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`
        inline-flex 
        justify-center 
        items-center 
        gap-2
        py-2 
        px-3 
        rounded-lg 
        font-gt-america
        text-sm 
        leading-[1.375rem] 
        font-medium
        transition-all 
        duration-200 
        hover:scale-[1.02]
        active:scale-[0.98]
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2
        ${
          isActive
            ? "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 focus:ring-gray-300"
            : "border-2 text-white focus:ring-purple-700"
        }
        ${!isActive ? "bg-gradient-to-br from-[#66009F] to-[#00276A]" : ""}
        ${
          !isActive
            ? "hover:from-[#5a0089] hover:to-[#001f5a] border-transparent"
            : ""
        }
        ${className}
      `}
    >
      <SparklesIcon
        className={`
          w-4 h-4 
          ${isActive ? "text-gray-600" : "text-white"}
        `}
      />
      <span className="whitespace-nowrap">
        {isActive ? "Close Moody's AI" : "Open Moody's AI"}
      </span>
    </Button>
  );
};

export default MoodysAIButton;
