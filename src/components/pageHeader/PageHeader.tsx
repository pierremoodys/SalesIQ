"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  ArrowLeftIcon,
  BuildingOffice2Icon,
  BellIcon,
  PlusIcon,
  DocumentArrowDownIcon,
  CogIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
  DocumentArrowUpIcon,
  CheckIcon,
  DocumentTextIcon,
  SparklesIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { MoodysAIButton, CompanyTags, Button } from "@/components/ui";

// Icon mapping for server-client serialization
const ICON_MAP = {
  "building-office-2": BuildingOffice2Icon,
  bell: BellIcon,
  plus: PlusIcon,
  "document-arrow-down": DocumentArrowDownIcon,
  cog: CogIcon,
  pencil: PencilIcon,
  trash: TrashIcon,
  share: ShareIcon,
  eye: EyeIcon,
  "question-mark-circle": QuestionMarkCircleIcon,
  "document-arrow-up": DocumentArrowUpIcon,
  check: CheckIcon,
  "document-text": DocumentTextIcon,
  link: LinkIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;

// Types for dropdown menu items (serializable)
export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: IconName;
  disabled?: boolean;
  url?: string; // Optional URL for navigation
}

// Types for chat configuration (serializable)
export interface ChatConfig {
  title: string;
  description: string;
  placeholder: string;
  icon: IconName;
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
  onToggleChat?: () => void; // Client-side chat toggle (for client components)
  toggleChatAction?: () => void; // Server action for chat toggle (for server components)
  isChatOpen?: boolean;
  chatConfig?: ChatConfig;
  menuItems?: DropdownMenuItem[];
}

// Simple header variant (notifications, companies list)
interface SimpleHeaderProps extends BasePageHeaderProps {
  variant: "simple";
  icon: IconName;
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
    toggleChatAction,
    isChatOpen = false,
    menuItems,
  } = props;

  const router = useRouter();

  // MoodysAIButton - maintains original styling for both client and server
  const renderMoodysAIButton = () => {
    if (onToggleChat) {
      // Client-side toggle (for client components like notifications/upload)
      return <MoodysAIButton isActive={isChatOpen} onToggle={onToggleChat} />;
    } else if (toggleChatAction) {
      // Server action toggle - wrap only the button in a form
      const buttonClasses = isChatOpen
        ? "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
        : "bg-gradient-to-r from-[#00276A] to-[#66009F] border-2 border-transparent text-white hover:from-[#001f5a] hover:to-[#5a0089]";

      return (
        <form action={toggleChatAction} style={{ display: "inline" }}>
          <Button
            type="submit"
            size="m"
            icon={
              <SparklesIcon
                className={isChatOpen ? "text-blue-600" : "text-white"}
              />
            }
            iconPosition="left"
            className={buttonClasses}
          >
            {isChatOpen ? "Close Moody's AI" : "Open Moody's AI"}
          </Button>
        </form>
      );
    }

    return null;
  };

  // Render dropdown menu using Headless UI
  const renderDropdownMenu = () => {
    if (!menuItems || menuItems.length === 0) return null;

    return (
      <Menu as="div" className="relative">
        <MenuButton className="flex justify-center items-center p-2 hover:bg-gray-200 rounded transition-colors duration-300 ease-in-out cursor-pointer">
          <EllipsisVerticalIcon className="w-6 h-6 text-black" />
        </MenuButton>

        <MenuItems className="absolute right-0 top-8 z-20 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 focus:outline-none">
          {menuItems.map((item) => (
            <MenuItem key={item.id} disabled={item.disabled}>
              {({ focus, disabled }) => (
                <button
                  onClick={() => {
                    console.log("Menu item clicked:", item.id);
                    if (item.url) {
                      router.push(item.url);
                    }
                  }}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                    disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : focus
                      ? "bg-gray-50 text-gray-900"
                      : "text-gray-900"
                  }`}
                >
                  {item.icon &&
                    React.createElement(ICON_MAP[item.icon], {
                      className: "w-4 h-4",
                    })}
                  {item.label}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
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
    const { icon: iconName, title } = props;
    const Icon = ICON_MAP[iconName];

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
