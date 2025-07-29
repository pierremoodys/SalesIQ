import React from "react";
import {
  ChevronRightIcon,
  CheckIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface AffectedCompany {
  uuid: string;
  name: string;
}

export interface Notification {
  id: string;
  type: string;
  category: string;
  title: string;
  description: string;
  source: string;
  sourceType: "internal" | "external";
  date: string;
  isNew: boolean;
  isRead: boolean;
  affectedCompanies: AffectedCompany[];
  tags: string[];
  impact: "positive" | "negative" | "neutral";
}

interface NotificationListItemProps {
  notification: Notification;
  onClick?: (notificationId: string) => void;
  onMarkAsRead?: (notificationId: string) => void;
}

// Priority icon component
const PriorityIcon = ({ type }: { type: string }) => {
  return (
    <div className="flex justify-center items-center pr-[0.1875rem] py-px pl-0 w-3.5 h-3.5">
      <div className="flex items-end">
        <div className="w-0.5 h-[0.3125rem] rounded-[0.875px]" />
        <div className="w-0.5 h-2 rounded-[0.875px] ml-px" />
        <div className="w-0.5 h-[0.6875rem] rounded-[0.875px] ml-px" />
      </div>
    </div>
  );
};

// Read checkmark icon using heroicon
const ReadIcon = () => <CheckIcon className="w-4 h-4 text-gray-700" />;

// New notification bell icon using heroicon
const NewIcon = () => <BellIcon className="w-4 h-4 text-moodys-red" />;

// Source Badge Component
const SourceBadge = ({
  source,
  isExternal,
}: {
  source: string;
  isExternal: boolean;
}) => {
  if (!isExternal) return null;

  return (
    <div className="flex items-center gap-2 py-2 px-px h-6">
      <div className="w-6 h-1 bg-gray-400" />
      <div className="text-black font-medium text-xs leading-[1.0625rem]">
        {source}
      </div>
    </div>
  );
};

// Impact Badge Component
const ImpactBadge = ({ type }: { type: string }) => {
  return (
    <div className="flex justify-center items-center py-1 px-2 rounded-full">
      <PriorityIcon type={type} />
      <div className="text-[10px] ml-1">{type.replace("-", " ")}</div>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ isRead }: { isRead: boolean }) => (
  <div className="flex items-center gap-1">
    {isRead ? <ReadIcon /> : <NewIcon />}
    <div
      className={cn(
        "font-medium text-xs leading-[1.0625rem]",
        isRead ? "text-gray-400" : "text-moodys-red"
      )}
    >
      {isRead ? "Read" : "New"}
    </div>
  </div>
);

// Main Content Component
const NotificationMainContent = ({
  notification,
}: {
  notification: Notification;
}) => (
  <div className={cn("flex flex-col gap-4 p-6 rounded-lg")}>
    {/* Header with source, impact, and status badges */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <SourceBadge
          source={notification.source}
          isExternal={notification.sourceType === "external"}
        />
        <ImpactBadge type={notification.type} />
      </div>
      <div className="flex items-center gap-4">
        <StatusBadge isRead={notification.isRead} />
      </div>
    </div>

    {/* Title */}
    <h3 className={cn("font-semibold text-xl leading-7")}>
      {notification.title}
    </h3>

    {/* Description */}
    <p className={cn("text-base leading-6")}>{notification.description}</p>
    {/* Tags Section */}
    <div className="py-2">
      <NotificationTags tags={notification.tags} />
    </div>
  </div>
);

// Affected Companies Component
const AffectedCompanies = ({ companies }: { companies: AffectedCompany[] }) => (
  <div className={cn("flex flex-col gap-3 px-4")}>
    <div className="font-bold text-xs uppercase tracking-wide text-moodys-blue">
      AFFECTED COMPANIES:
    </div>
    <div className="flex flex-wrap gap-3">
      {companies.map((company) => (
        <div
          key={company.uuid}
          className="flex items-center gap-1 text-moodys-bright-blue hover:text-blue-800 transition-colors cursor-pointer"
        >
          <span className="font-medium text-m underline">{company.name}</span>
          <ChevronRightIcon className="w-3 h-3" />
        </div>
      ))}
    </div>
  </div>
);

// Tags Component
const NotificationTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-gray-600 text-gray-700"
      >
        #{tag}
      </span>
    ))}
  </div>
);

const NotificationListItem: React.FC<NotificationListItemProps> = ({
  notification,
  onClick,
  onMarkAsRead,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(notification.id);
    }
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div className="mb-6 pb-6 border-b border-gray-400">
      <div className="cursor-pointer" onClick={handleClick}>
        {/* Main Content Area */}
        <NotificationMainContent notification={notification} />

        {/* Separated Action Areas */}
        <div className="space-y-2">
          {/* Affected Companies Section */}
          <AffectedCompanies companies={notification.affectedCompanies} />
        </div>
      </div>
    </div>
  );
};

export default NotificationListItem;
