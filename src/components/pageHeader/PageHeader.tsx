"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  EllipsisVerticalIcon,
  ArrowLeftIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { MoodysAIButton, CompanyTags } from "@/components/ui";

// Types for dropdown menu items
export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  disabled?: boolean;
}

// Types for chat configuration
export interface ChatConfig {
  title: string;
  description: string;
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Types for back button configuration
export interface BackButtonConfig {
  url: string;
  label?: string;
}

// Types for company tag
export interface CompanyTag {
  type: string;
  label: string;
  value: string;
  icon: string;
}

// Types for company info (for company detail variant)
export interface CompanyInfo {
  id: string;
  uuid: string;
  name: string;
  description: string;
  logoUrl?: string;
  tags: CompanyTag[];
}

// Base props
interface BasePageHeaderProps {
  className?: string;
  onToggleChat?: () => void;
  isChatOpen?: boolean;
  chatConfig?: ChatConfig;
  menuItems?: DropdownMenuItem[];
}

// Simple header variant (notifications, companies list)
interface SimpleHeaderProps extends BasePageHeaderProps {
  variant: "simple";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  backButton?: never;
  companyInfo?: never;
}

// Upload header variant (with large title and back button)
interface UploadHeaderProps extends BasePageHeaderProps {
  variant: "upload";
  title: string;
  backButton?: BackButtonConfig;
  icon?: never;
  companyInfo?: never;
}

// Company detail header variant (with company info)
interface CompanyDetailHeaderProps extends BasePageHeaderProps {
  variant: "company-detail";
  companyInfo: CompanyInfo;
  backButton?: BackButtonConfig;
  icon?: never;
  title?: never;
}

export type PageHeaderProps =
  | SimpleHeaderProps
  | UploadHeaderProps
  | CompanyDetailHeaderProps;

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const {
    className = "",
    onToggleChat,
    isChatOpen = false,
    chatConfig,
    menuItems,
  } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Enhanced MoodysAIButton that can accept chat config
  const renderMoodysAIButton = () => {
    if (!onToggleChat) return null;

    // For now, we'll pass the existing MoodysAIButton
    // In the future, we could enhance it to accept chat config
    return <MoodysAIButton isActive={isChatOpen} onToggle={onToggleChat} />;
  };

  // Render dropdown menu
  const renderDropdownMenu = () => {
    if (!menuItems || menuItems.length === 0) return null;

    return (
      <div className="relative">
        <button
          className="flex justify-center items-center w-6 h-6 hover:bg-gray-100 rounded transition-colors duration-150"
          aria-label="More options"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <EllipsisVerticalIcon className="w-6 h-6 text-black" />
        </button>

        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Dropdown */}
            <div className="absolute right-0 top-8 z-20 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick();
                    setIsMenuOpen(false);
                  }}
                  disabled={item.disabled}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors ${
                    item.disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-900"
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Render actions section (AI button + dropdown)
  const renderActions = () => (
    <div className="flex items-center gap-4">
      {renderMoodysAIButton()}
      {renderDropdownMenu()}
    </div>
  );

  // Render back button
  const renderBackButton = (backButton?: BackButtonConfig) => {
    if (!backButton) return null;

    return (
      <Link
        href={backButton.url}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-150"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="text-sm font-medium">
          {backButton.label || "Back"}
        </span>
      </Link>
    );
  };

  // Simple variant (notifications, companies list)
  if (props.variant === "simple") {
    const { icon: Icon, title } = props;

    return (
      <div
        className={`flex flex-col items-start gap-3 py-4 px-8 w-full border-b border-gray-300 ${className}`}
      >
        <div className="flex justify-between items-center w-full">
          {/* Page Title Section */}
          <div className="flex items-center gap-2">
            <Icon className="w-[18px] h-[18px] text-gray-900" />
            <h1 className="text-black text-lg font-medium leading-6">
              {title}
            </h1>
          </div>

          {/* Actions Section */}
          {renderActions()}
        </div>
      </div>
    );
  }

  // Upload variant (with large title and back button)
  if (props.variant === "upload") {
    const { title, backButton } = props;

    return (
      <div
        className={`flex flex-col items-start gap-4 py-4 px-8 w-full border-b border-gray-300 ${className}`}
      >
        {/* Top Row: Back Button + Actions */}
        <div className="flex justify-between items-center w-full">
          {renderBackButton(backButton)}
          {renderActions()}
        </div>

        {/* Page Title */}
        <div className="w-full">
          <h1 className="text-3xl font-[650] leading-9 text-black">{title}</h1>
        </div>
      </div>
    );
  }

  // Company detail variant (with company info)
  if (props.variant === "company-detail") {
    const { companyInfo, backButton } = props;

    return (
      <div
        className={`flex flex-col items-start gap-4 py-4 px-8 w-full border-b border-gray-300 ${className}`}
      >
        {/* Top Row: Back Button + Actions */}
        <div className="flex justify-between items-center w-full">
          {renderBackButton(backButton)}
          {renderActions()}
        </div>

        {/* Company Information Row */}
        <div className="flex items-start gap-4 w-full">
          {/* Company Logo */}
          <div className="flex justify-center items-center w-12 h-12 rounded-full border border-gray-200 bg-gray-100">
            {companyInfo.logoUrl ? (
              <Image
                src={companyInfo.logoUrl}
                alt={`${companyInfo.name} logo`}
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
              {companyInfo.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 font-[450] text-xl">
              {companyInfo.description}
            </p>

            {/* Company Tags */}
            <CompanyTags tags={companyInfo.tags} className="mt-2" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PageHeader;
