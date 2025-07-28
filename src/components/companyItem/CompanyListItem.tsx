"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  CalendarIcon,
  UsersIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { ConfirmationModal } from "@/components/ui";

interface CompanyTag {
  type: string;
  label: string;
  value: string;
  icon: string;
}

interface CompanyData {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  tracked: boolean;
  tags: CompanyTag[];
}

interface CompanyListItemProps {
  company: CompanyData;
  isTracked?: boolean;
  onTrackingChange?: (companyId: string, isTracked: boolean) => void;
  onClick?: (companyId: string) => void;
  className?: string;
}

const CompanyListItem: React.FC<CompanyListItemProps> = ({
  company,
  isTracked = false,
  onTrackingChange,
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleTrackingToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTrackingChange?.(company.id, !isTracked);
  };

  const handleMinusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmationModal(true);
  };

  const handleConfirmRemoval = () => {
    onTrackingChange?.(company.id, false);
  };

  const handleItemClick = () => {
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
      <IconComponent className="w-3 h-3 text-gray-700" />
    ) : null;
  };

  // Dynamic styling based on state
  const getBackgroundClass = () => {
    return "bg-white";
  };

  const getCompanyNameClass = () => {
    if (isTracked && isHovered) {
      return "text-brand-moody-bright-blue";
    }
    return "text-black";
  };

  const getArrowIconClass = () => {
    if (isTracked && isHovered) {
      return "text-brand-moody-bright-blue";
    }
    return "text-blue-1000";
  };

  return (
    <div
      className={`
        flex justify-between items-start px-4 py-8 w-full border-b border-gray-200 
        cursor-pointer transition-all duration-200
        ${getBackgroundClass()}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleItemClick}
    >
      {/* Left Content */}
      <div className="flex items-start gap-4 flex-1">
        {/* Company Logo */}
        <div className="flex justify-center items-center w-12 h-12 rounded-full border border-gray-200 bg-gray-100">
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
              className={`font-gt-america text-lg font-medium leading-6 ${getCompanyNameClass()}`}
            >
              {company.name}
            </h3>
            <ArrowRightIcon className={`w-6 h-6 ${getArrowIconClass()}`} />
          </div>

          {/* Description */}
          <p className="font-gt-america text-gray-900 leading-6">
            {company.description}
          </p>

          {/* Metadata Tags */}
          <div className="flex flex-wrap items-start gap-2 self-stretch">
            {company.tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-1">
                {getIconComponent(tag.icon)}
                <span className="font-gt-america text-gray-900 text-[10px] font-medium">
                  {tag.label} -
                </span>
                <span className="font-gt-america text-gray-900 text-xs">
                  {tag.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Show minus icon on hover for tracked companies */}
        {isTracked && isHovered && (
          <button
            onClick={handleMinusClick}
            className="flex items-center justify-center w-5 h-5 hover:scale-110 transition-transform duration-150"
            aria-label={`Remove ${company.name} from tracked companies`}
          >
            <MinusCircleIcon className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Track/Check Button */}
        <button
          onClick={handleTrackingToggle}
          className="flex items-center justify-center w-5 h-5 hover:scale-110 transition-transform duration-150"
          aria-label={
            isTracked ? `Untrack ${company.name}` : `Track ${company.name}`
          }
        >
          {isTracked ? (
            <CheckCircleIcon className="w-5 h-5 text-purple-1000" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-purple-1000 transition-colors duration-150" />
          )}
        </button>
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
    </div>
  );
};

export default CompanyListItem;
