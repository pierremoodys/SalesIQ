"use client";

import React from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui";

interface MoodysAIButtonProps {
  className?: string;
  isActive?: boolean;
  onToggle?: () => void;
}

const MoodysAIButton: React.FC<MoodysAIButtonProps> = ({
  className = "",
  isActive = false,
  onToggle,
}) => {
  if (!onToggle) {
    return null;
  }

  const buttonClasses = isActive
    ? "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
    : "bg-gradient-to-r from-[#00276A] to-[#66009F] border-2 border-transparent text-white hover:from-[#001f5a] hover:to-[#5a0089]";

  return (
    <Button
      onClick={onToggle}
      size="m"
      icon={
        <SparklesIcon className={isActive ? "text-blue-600" : "text-white"} />
      }
      iconPosition="left"
      className={`${buttonClasses} ${className}`}
    >
      {isActive ? "Close Moody's AI" : "Open Moody's AI"}
    </Button>
  );
};

export default MoodysAIButton;
