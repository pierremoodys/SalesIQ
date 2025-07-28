"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  EllipsisVerticalIcon,
  BuildingOffice2Icon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { MoodysAIButton, CompanyTags } from "@/components/ui";

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
  tags: CompanyTag[];
}

// Base header props
interface BaseHeaderProps {
  className?: string;
  onToggleChat?: () => void;
  isChatOpen?: boolean;
}

// Companies list variant
interface CompaniesListHeaderProps extends BaseHeaderProps {
  variant: "companies-list";
}

// Individual company variant
interface CompanyDetailHeaderProps extends BaseHeaderProps {
  variant: "company-detail";
  company: Company;
  backUrl?: string;
}

type CompaniesPageHeaderProps =
  | CompaniesListHeaderProps
  | CompanyDetailHeaderProps;

const CompaniesPageHeader: React.FC<CompaniesPageHeaderProps> = (props) => {
  const { className = "", onToggleChat, isChatOpen = false } = props;

  if (props.variant === "companies-list") {
    return (
      <div
        className={`flex flex-col items-start gap-3 py-4 px-8 w-full border-b border-gray-300 ${className}`}
      >
        <div className="flex justify-between items-center w-full">
          {/* Page Title Section */}
          <div className="flex items-center gap-2">
            <BuildingOffice2Icon className="w-[18px] h-[18px] text-gray-900" />
            <h1 className="text-black text-lg font-medium leading-6">
              Your companies
            </h1>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            {/* Moody's AI Button */}
            <MoodysAIButton isActive={isChatOpen} onToggle={onToggleChat} />

            {/* Menu Button */}
            <button
              className="flex justify-center items-center w-6 h-6 hover:bg-gray-100 rounded transition-colors duration-150"
              aria-label="More options"
            >
              <EllipsisVerticalIcon className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (props.variant === "company-detail") {
    const { company, backUrl = "/companies" } = props;

    return (
      <div
        className={`flex flex-col items-start gap-4 py-4 px-8 w-full border-b border-gray-300 ${className}`}
      >
        {/* Top Row: Back Button + Actions */}
        <div className="flex justify-between items-center w-full">
          {/* Back Button */}
          <Link
            href={backUrl}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-150"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            {/* Moody's AI Button */}
            <MoodysAIButton isActive={isChatOpen} onToggle={onToggleChat} />

            {/* Menu Button */}
            <button
              className="flex justify-center items-center w-6 h-6 hover:bg-gray-100 rounded transition-colors duration-150"
              aria-label="More options"
            >
              <EllipsisVerticalIcon className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        {/* Company Information Row */}
        <div className="flex items-start gap-4 w-full">
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
          <div className="flex flex-col justify-center items-start gap-2 flex-1">
            {/* Company Name */}
            <h1 className="text-xl font-[700] leading-6 text-black">
              {company.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 font-[450] text-xl">
              {company.description}
            </p>

            {/* Company Tags */}
            <CompanyTags tags={company.tags} className="mt-2" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CompaniesPageHeader;
