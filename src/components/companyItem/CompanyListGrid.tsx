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

interface CompanyListGridProps {
  companies: Company[];
  onTrackingChange?: (companyId: string, isTracked: boolean) => void;
  onClick?: (companyId: string) => void;
  className?: string;
}

interface CompanyGridItemProps {
  company: Company;
  isTracked: boolean;
  onTrackingChange?: (companyId: string, isTracked: boolean) => void;
  onClick?: (companyId: string) => void;
}

const CompanyGridItem: React.FC<CompanyGridItemProps> = ({
  company,
  isTracked,
  onTrackingChange,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleTrackingToggle = () => {
    if (isTracked) {
      setShowConfirmationModal(true);
    } else {
      onTrackingChange?.(company.id, !isTracked);
    }
  };

  const handleConfirmRemoval = () => {
    onTrackingChange?.(company.id, false);
    setShowConfirmationModal(false);
  };

  const handleClick = () => {
    onClick?.(company.id);
  };

  return (
    <>
      <div
        className={`
          flex flex-col p-6 bg-white border border-gray-200 rounded-lg cursor-pointer
          transition-all duration-200 hover:shadow-md hover:border-gray-300
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Header with Logo and Actions */}
        <div className="flex justify-between items-start mb-4">
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

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Always reserve space for minus icon to prevent layout shift */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isTracked) {
                  setShowConfirmationModal(true);
                }
              }}
              className={`flex items-center justify-center w-5 h-5 transition-all duration-150 ${
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
              className="flex items-center justify-center w-5 h-5 hover:scale-110 transition-transform duration-150"
              aria-label={
                isTracked ? `Untrack ${company.name}` : `Track ${company.name}`
              }
            >
              {isTracked ? (
                <RssIcon className="w-5 h-5 text-green-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 hover:border-green-600 transition-colors duration-150" />
              )}
            </button>
          </div>
        </div>

        {/* Company Name & Arrow */}
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-medium leading-6 text-black">
            {company.name}
          </h3>
          <ArrowRightIcon className="w-5 h-5 text-gray-600" />
        </div>

        {/* Description */}
        <p className="text-gray-900 leading-6 mb-4 flex-1">
          {company.description}
        </p>

        {/* Metadata Tags - Using the new CompanyTags component */}
        <CompanyTags
          tags={company.tags}
          maxTags={3}
          showMore={true}
          iconSize="sm"
        />
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

const CompanyListGrid: React.FC<CompanyListGridProps> = ({
  companies,
  onTrackingChange,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 ${className}`}
    >
      {companies.map((company) => (
        <CompanyGridItem
          key={company.uuid}
          company={company}
          isTracked={company.tracked}
          onTrackingChange={onTrackingChange}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default CompanyListGrid;
