"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  MapPinIcon,
  BuildingOffice2Icon,
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

interface CompanyListTableProps {
  companies: CompanyData[];
  onTrackingChange?: (companyId: string, isTracked: boolean) => void;
  onClick?: (companyId: string) => void;
  className?: string;
}

const CompanyTableRow: React.FC<{
  company: CompanyData;
  isTracked: boolean;
  onTrackingChange?: (companyId: string, isTracked: boolean) => void;
  onClick?: (companyId: string) => void;
  onShowRemovalModal?: (company: CompanyData) => void;
}> = ({
  company,
  isTracked,
  onTrackingChange,
  onClick,
  onShowRemovalModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleTrackingToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTrackingChange?.(company.id, !isTracked);
  };

  const handleMinusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowRemovalModal?.(company);
  };

  const handleItemClick = () => {
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
      onClick={handleItemClick}
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
              <h3 className="font-gt-america text-sm font-medium text-black">
                {company.name}
              </h3>
              <ArrowRightIcon className="w-4 h-4 text-blue-1000" />
            </div>
            <p className="font-gt-america text-xs text-gray-600 mt-1">
              {company.description}
            </p>
          </div>
        </div>
      </td>

      {/* Headquarters */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 text-gray-500" />
          <span className="font-gt-america text-sm text-gray-900">
            {getTagValue("headquarters")}
          </span>
        </div>
      </td>

      {/* Industry */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <BuildingOffice2Icon className="w-4 h-4 text-gray-500" />
          <span className="font-gt-america text-sm text-gray-900">
            {getTagValue("industry")}
          </span>
        </div>
      </td>

      {/* Founded */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="font-gt-america text-sm text-gray-900">
            {getTagValue("founded")}
          </span>
        </div>
      </td>

      {/* Employees */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <UsersIcon className="w-4 h-4 text-gray-500" />
          <span className="font-gt-america text-sm text-gray-900">
            {getTagValue("employees")}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 justify-end">
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
  const [companyToRemove, setCompanyToRemove] = useState<CompanyData | null>(
    null
  );

  const handleShowRemovalModal = (company: CompanyData) => {
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-gt-america">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-gt-america">
              Headquarters
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-gt-america">
              Industry
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-gt-america">
              Founded
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-gt-america">
              Employees
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-gt-america">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <CompanyTableRow
              key={company.id}
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
        isOpen={companyToRemove !== null}
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
