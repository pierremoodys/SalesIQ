"use client";

import React, { useState } from "react";
import {
  MinusCircleIcon,
  RssIcon,
  ArrowRightIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { ConfirmationModal, CompanyTags } from "@/components/ui";
import { HOVER_TRANSITIONS, COMPANY_STYLES } from "@/lib/styles";

interface CompanyTag {
  type: string;
  label: string;
  value: string;
  icon: string;
}

interface Company {
  id: string;
  uuid: string;
  name: string;
  description: string;
  logoUrl?: string;
  tracked: boolean;
  tags: CompanyTag[];
}

interface CompanyListItemProps {
  company: Company;
  className?: string;
  isTracked?: boolean;
  onTrackingChange?: (companyId: string, isTracked: boolean) => void;
  onClick?: (companyId: string) => void;
}

const CompanyListItem: React.FC<CompanyListItemProps> = ({
  company,
  className = "",
  isTracked = false,
  onTrackingChange,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleTrackingToggle = () => {
    if (isTracked) {
      // Show confirmation modal for removing
      setShowConfirmationModal(true);
    } else {
      // Add directly without confirmation
      onTrackingChange?.(company.id, !isTracked);
    }
  };

  const handleConfirmRemoval = () => {
    onTrackingChange?.(company.id, false);
    setShowConfirmationModal(false);
  };

  const handleCompanyClick = () => {
    onClick?.(company.id);
  };

  const getCompanyNameClass = () => {
    if (isTracked && isHovered) {
      return "text-blue-600";
    }
    return "text-primary";
  };

  const getArrowIconClass = () => {
    const slideClass = isHovered ? "translate-x-2" : "translate-x-0";
    const colorClass = isTracked && isHovered ? "text-blue-600" : "text-muted";
    return `${colorClass} transform ${slideClass}`;
  };

  const getHoverClass = () => {
    return "hover:bg-surface-hover";
  };

  return (
    <>
      <div
        className={`
          flex justify-between items-start px-4 py-8 w-full border-b 
          cursor-pointer ${HOVER_TRANSITIONS.slow}
          ${getHoverClass()}
          ${className}
        `}
        style={{ borderColor: "var(--color-border)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCompanyClick}
      >
        {/* Left Content */}
        <div className="flex items-start gap-4 flex-1">
          {/* Company Logo */}
          <div
            className="flex justify-center items-center w-12 h-12 rounded-full border"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background-secondary)",
            }}
          >
            {company.logoUrl ? (
              <Image
                src={company.logoUrl}
                alt={`${company.name} logo`}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <BuildingOffice2Icon className="w-6 h-6 text-muted" />
            )}
          </div>

          {/* Company Content */}
          <div className="flex flex-col justify-center items-start gap-2 flex-1 pr-8">
            {/* Company Name & Arrow */}
            <div className="flex items-start gap-2">
              <h3
                className={`text-xl font-[700] leading-6 transition-colors duration-200 ease-in-out ${getCompanyNameClass()}`}
              >
                {company.name}
              </h3>
              <ArrowRightIcon
                className={`w-6 h-6 transition-colors duration-200 ease-in-out ${getArrowIconClass()}`}
              />
            </div>

            {/* Description */}
            <p className="text-description font-[450] text-xl">
              {company.description}
            </p>

            {/* Metadata Tags - Using the new CompanyTags component */}
            <CompanyTags tags={company.tags} className="mt-4 self-stretch" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Always reserve space for minus icon to prevent layout shift */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isTracked) {
                setShowConfirmationModal(true);
              }
            }}
            className={`flex items-center justify-center w-5 h-5 ${
              HOVER_TRANSITIONS.fast
            } ${
              isTracked && isHovered
                ? "text-blue-900 hover:text-blue-700 hover:scale-110 opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label={`Remove ${company.name} from tracked companies`}
          >
            <MinusCircleIcon className="w-5 h-5" />
          </button>

          {/* Tracking Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTrackingToggle();
            }}
            className={`flex items-center justify-center w-5 h-5 ${COMPANY_STYLES.buttonHover}`}
            aria-label={
              isTracked ? `Untrack ${company.name}` : `Track ${company.name}`
            }
          >
            {isTracked ? (
              <RssIcon className="w-5 h-5 text-green-600" />
            ) : (
              <div
                className={`w-5 h-5 rounded-full border-2 hover:border-green-600 ${HOVER_TRANSITIONS.colors}`}
                style={{ borderColor: "var(--color-border)" }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmRemoval}
        title="Remove Company"
        message={`Are you sure you want to remove "${company.name}" from your tracked companies? You can always add it back later.`}
        confirmButtonText="Remove"
        cancelButtonText="Cancel"
        type="danger"
      />
    </>
  );
};

export default CompanyListItem;
