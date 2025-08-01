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

  const getButtonStyle = () => {
    if (isActive) {
      // Close Moody's AI state
      return {
        backgroundColor: "var(--color-button-background)",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "var(--color-secondary)",
        color: "var(--color-secondary)",
      };
    } else {
      // Open Moody's AI state
      return {
        background: "linear-gradient(to right, #00276A, #66009F)",
        borderWidth: "2px",
        borderStyle: "solid",
        borderImage: "linear-gradient(to right, #00276A, #66009F) 1",
        color: "white",
      };
    }
  };

  const getIconColor = () => {
    return isActive ? "var(--color-secondary)" : "white";
  };

  const getHoverStyle = () => {
    if (isActive) {
      return {
        backgroundColor: "var(--color-gray-50)",
      };
    } else {
      return {
        background: "linear-gradient(to right, #001f5a, #5a0089)",
      };
    }
  };

  return (
    <Button
      onClick={onToggle}
      size="m"
      icon={
        <SparklesIcon
          style={{
            color: getIconColor(),
          }}
        />
      }
      iconPosition="left"
      className={`transition-all duration-200 ease-in-out ${className}`}
      style={getButtonStyle()}
      onMouseEnter={(e) => {
        const hoverStyle = getHoverStyle();
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        const normalStyle = getButtonStyle();
        Object.assign(e.currentTarget.style, normalStyle);
      }}
    >
      {isActive ? "Close Moody's AI" : "Open Moody's AI"}
    </Button>
  );
};

export default MoodysAIButton;
