"use client";

import React, { useState } from "react";
import {
  MinusCircleIcon,
  RssIcon,
  ArrowRightIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { ConfirmationModal } from "@/components/ui";

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

interface CompanyListTableProps {
  companies: Company[];
  onTrackingChange?: (companyId: string, isTracked: boolean) => void;
  onClick?: (companyId: string) => void;
  className?: string;
}

interface CompanyTableRowProps {
  company: Company;
  isTracked: boolean;
  onTrackingChange?: (companyId: string, isTracked: boolean) => void;
  onClick?: (companyId: string) => void;
  onShowRemovalModal: (company: Company) => void;
}

const CompanyTableRow: React.FC<CompanyTableRowProps> = ({
  company,
  isTracked,
  onTrackingChange,
  onClick,
  onShowRemovalModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleTrackingToggle = () => {
    if (isTracked) {
      onShowRemovalModal(company);
    } else {
      onTrackingChange?.(company.id, !isTracked);
    }
  };

  const handleClick = () => {
    onClick?.(company.id);
  };

  // Helper to get tag value by type
  const getTagValue = (type: string) => {
    const tag = company.tags.find((tag) => tag.type === type);
    return tag?.value || "-";
  };

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Company Logo & Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex justify-center items-center w-10 h-10 rounded-full border border-gray-200 bg-gray-100">
            {company.logoUrl ? (
              <Image
                src={company.logoUrl}
                alt={`${company.name} logo`}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <BuildingOffice2Icon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-black">{company.name}</h3>
              <ArrowRightIcon className="w-4 h-4 text-gray-600" />
            </div>
            <p className="text-xs text-gray-600 mt-1">{company.description}</p>
          </div>
        </div>
      </td>

      {/* Headquarters */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-900">
            {getTagValue("headquarters")}
          </span>
        </div>
      </td>

      {/* Industry */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <BuildingOffice2Icon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-900">
            {getTagValue("industry")}
          </span>
        </div>
      </td>

      {/* Founded */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-900">
            {getTagValue("founded")}
          </span>
        </div>
      </td>

      {/* Employees */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-900">
            {getTagValue("employees")}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 justify-end">
          {/* Always reserve space for minus icon to prevent layout shift */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isTracked) {
                onShowRemovalModal(company);
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
      </td>
    </tr>
  );
};

const CompanyListTable: React.FC<CompanyListTableProps> = ({
  companies,
  onTrackingChange,
  onClick,
  className = "",
}) => {
  const [companyToRemove, setCompanyToRemove] = useState<Company | null>(null);

  const handleShowRemovalModal = (company: Company) => {
    setCompanyToRemove(company);
  };

  const handleConfirmRemoval = () => {
    if (companyToRemove) {
      onTrackingChange?.(companyToRemove.id, false);
      setCompanyToRemove(null);
    }
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Headquarters
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Industry
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Founded
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employees
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <CompanyTableRow
              key={company.uuid}
              company={company}
              isTracked={company.tracked}
              onTrackingChange={onTrackingChange}
              onClick={onClick}
              onShowRemovalModal={handleShowRemovalModal}
            />
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!companyToRemove}
        onClose={() => setCompanyToRemove(null)}
        onConfirm={handleConfirmRemoval}
        title="Remove Company"
        message={
          companyToRemove
            ? `Are you sure you want to remove "${companyToRemove.name}" from your tracked companies? You can always add it back later.`
            : ""
        }
        confirmButtonText="Remove"
        cancelButtonText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default CompanyListTable;
