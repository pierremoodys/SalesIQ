"use client";

import React, { useState } from "react";
import {
  MinusCircleIcon,
  RssIcon,
  ArrowRightIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  CalendarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { ConfirmationModal } from "@/components/ui";
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

  // Icon mapping
  const getIconComponent = (iconName: string) => {
    const iconMap = {
      MapPinIcon: MapPinIcon,
      BuildingOffice2Icon: BuildingOffice2Icon,
      GlobeAmericasIcon: GlobeAmericasIcon,
      CalendarIcon: CalendarIcon,
      UsersIcon: UsersIcon,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? (
      <IconComponent className="w-4 h-4 text-gray-700" />
    ) : null;
  };

  const getCompanyNameClass = () => {
    if (isTracked && isHovered) {
      return "text-blue-600";
    }
    return "text-black";
  };

  const getArrowIconClass = () => {
    if (isTracked && isHovered) {
      return "text-blue-600";
    }
    return "text-gray-600";
  };

  const getHoverClass = () => {
    if (isTracked && isHovered) {
      return "bg-blue-50 border-blue-200";
    }
    return "hover:bg-gray-50";
  };

  return (
    <>
      <div
        className={`
          flex justify-between items-start px-4 py-8 w-full border-b border-gray-200 
          cursor-pointer ${HOVER_TRANSITIONS.slow}
          ${getHoverClass()}
          ${className}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCompanyClick}
      >
        {/* Left Content */}
        <div className="flex items-start gap-4 flex-1">
          {/* Company Logo */}
          <div
            className={`flex justify-center items-center w-12 h-12 rounded-full border border-gray-200 bg-gray-100`}
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
              <BuildingOffice2Icon className="w-6 h-6 text-gray-600" />
            )}
          </div>

          {/* Company Content */}
          <div className="flex flex-col justify-center items-start gap-2 flex-1 pr-8">
            {/* Company Name & Arrow */}
            <div className="flex items-start gap-2">
              <h3
                className={`text-xl font-[700] leading-6 ${
                  HOVER_TRANSITIONS.colors
                } ${getCompanyNameClass()}`}
              >
                {company.name}
              </h3>
              <ArrowRightIcon
                className={`w-6 h-6 ${
                  HOVER_TRANSITIONS.colors
                } ${getArrowIconClass()}`}
              />
            </div>

            {/* Description */}
            <p className="text-gray-600 font-[450] text-xl">
              {company.description}
            </p>

            {/* Metadata Tags */}
            <div className="mt-4 flex flex-wrap items-start gap-4 self-stretch">
              {company.tags.map((tag, index) => (
                <div key={index} className="flex items-center gap-1">
                  {getIconComponent(tag.icon)}
                  <span className="text-gray-600 text-[14px] font-medium">
                    {tag.label} -
                  </span>
                  <span className="text-gray-900 text-[14px]">{tag.value}</span>
                </div>
              ))}
            </div>
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
                className={`w-5 h-5 rounded-full border-2 border-gray-300 hover:border-green-600 ${HOVER_TRANSITIONS.colors}`}
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
