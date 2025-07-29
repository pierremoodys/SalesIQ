import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
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

// Impact level styling
const getImpactStyling = (type: string) => {
  switch (type) {
    case "high-impact":
      return {
        borderColor: "#e297a6",
        textColor: "#ba0c2f",
        bgColor: "#ba0c2f",
      };
    case "medium-impact":
      return {
        borderColor: "#fbbf24",
        textColor: "#d97706",
        bgColor: "#d97706",
      };
    case "alert":
      return {
        borderColor: "#e297a6",
        textColor: "#ba0c2f",
        bgColor: "#ba0c2f",
      };
    case "reminder":
      return {
        borderColor: "#93c5fd",
        textColor: "#1d4ed8",
        bgColor: "#1d4ed8",
      };
    case "update":
      return {
        borderColor: "#86efac",
        textColor: "#059669",
        bgColor: "#059669",
      };
    case "highlight":
      return {
        borderColor: "#c084fc",
        textColor: "#7c3aed",
        bgColor: "#7c3aed",
      };
    default:
      return {
        borderColor: "#d1d5db",
        textColor: "#6b7280",
        bgColor: "#6b7280",
      };
  }
};

// Priority icon component
const PriorityIcon = ({ type }: { type: string }) => {
  const { bgColor } = getImpactStyling(type);

  return (
    <div className="flex justify-center items-center pr-[0.1875rem] py-px pl-0 w-3.5 h-3.5">
      <div className="flex items-end">
        <div
          className="w-0.5 h-[0.3125rem] rounded-[0.875px]"
          style={{ backgroundColor: bgColor }}
        />
        <div
          className="w-0.5 h-2 rounded-[0.875px] ml-px"
          style={{ backgroundColor: bgColor }}
        />
        <div
          className="w-0.5 h-[0.6875rem] rounded-[0.875px] ml-px"
          style={{ backgroundColor: bgColor }}
        />
      </div>
    </div>
  );
};

// Read checkmark icon
const ReadIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.4717 3.52876C12.7321 3.78911 12.7321 4.21122 12.4717 4.47157L5.1384 11.8049C4.87805 12.0653 4.45594 12.0653 4.19559 11.8049L0.862254 8.47157C0.601905 8.21122 0.601905 7.78911 0.862254 7.52876C1.1226 7.26841 1.54471 7.26841 1.80506 7.52876L4.66699 10.3907L11.5289 3.52876C11.7893 3.26841 12.2114 3.26841 12.4717 3.52876ZM15.1384 6.19543C15.3987 6.45577 15.3987 6.87788 15.1384 7.13823L10.1384 12.1382C9.87805 12.3986 9.45594 12.3986 9.19559 12.1382L8.19559 11.1382C7.93524 10.8779 7.93524 10.4558 8.19559 10.1954C8.45594 9.93508 8.87805 9.93508 9.1384 10.1954L9.66699 10.724L14.1956 6.19543C14.4559 5.93508 14.878 5.93508 15.1384 6.19543Z"
      fill="#646669"
    />
  </svg>
);

// New notification bell icon
const NewIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99973 1.99984C6.16792 1.99984 4.66639 3.50136 4.66639 5.33317C4.66639 7.76473 4.14444 9.37675 3.58499 10.4024C3.53426 10.4954 3.48333 10.5834 3.43261 10.6665H12.587C12.5069 10.5382 12.4257 10.3985 12.3448 10.2469C12.1716 9.92202 12.2945 9.5182 12.6193 9.34494C12.9442 9.17167 13.348 9.29457 13.5213 9.61944C13.7617 10.0702 13.9975 10.3772 14.1647 10.5653C14.2484 10.6594 14.3151 10.7241 14.3569 10.7622C14.3779 10.7812 14.3926 10.7936 14.4 10.7998C14.4023 10.8017 14.4039 10.803 14.4048 10.8037C14.6307 10.9765 14.7222 11.2738 14.6322 11.544C14.5414 11.8162 14.2867 11.9998 13.9997 11.9998H1.99973C1.70595 11.9998 1.4468 11.8075 1.36166 11.5264C1.27744 11.2482 1.3832 10.9479 1.62219 10.7837C1.62265 10.7834 1.62329 10.7829 1.62409 10.7823C1.62922 10.7785 1.64113 10.7694 1.65887 10.7546C1.69435 10.7251 1.75327 10.6726 1.82826 10.5934C1.97788 10.4355 2.19327 10.1695 2.41446 9.76394C2.85501 8.95626 3.33306 7.56828 3.33306 5.33317C3.33306 2.76498 5.43154 0.666504 7.99973 0.666504C8.53603 0.666504 9.00735 0.744095 9.47721 0.900715C9.82651 1.01715 10.0153 1.39469 9.89885 1.74399C9.78242 2.09328 9.40487 2.28206 9.05557 2.16563C8.72544 2.05558 8.39675 1.99984 7.99973 1.99984ZM1.62892 10.7791C1.62898 10.7791 1.62903 10.7791 1.62908 10.779C1.62908 10.779 1.62908 10.779 1.62907 10.779L1.62892 10.7791ZM11.9997 3.99984C11.2633 3.99984 10.6664 4.59679 10.6664 5.33317C10.6664 6.06955 11.2633 6.6665 11.9997 6.6665C12.7361 6.6665 13.3331 6.06955 13.3331 5.33317C13.3331 4.59679 12.7361 3.99984 11.9997 3.99984ZM9.33306 5.33317C9.33306 3.86041 10.527 2.6665 11.9997 2.6665C13.4725 2.6665 14.6664 3.86041 14.6664 5.33317C14.6664 6.80593 13.4725 7.99984 11.9997 7.99984C10.527 7.99984 9.33306 6.80593 9.33306 5.33317ZM6.54523 13.4156C6.86787 13.2383 7.27323 13.356 7.45062 13.6786C7.50469 13.777 7.58417 13.859 7.68077 13.9161C7.77737 13.9733 7.88754 14.0034 7.99976 14.0034C8.11198 14.0034 8.22215 13.9733 8.31875 13.9161C8.41535 13.859 8.49483 13.777 8.5489 13.6786C8.72629 13.356 9.13164 13.2383 9.45428 13.4156C9.77692 13.593 9.89467 13.9984 9.71728 14.321C9.54818 14.6286 9.29957 14.8851 8.99745 15.0638C8.69532 15.2425 8.35076 15.3367 7.99976 15.3367C7.64875 15.3367 7.30419 15.2425 7.00207 15.0638C6.69994 14.8851 6.45134 14.6286 6.28223 14.321C6.10484 13.9984 6.22259 13.593 6.54523 13.4156Z"
      fill="#BA0C2F"
    />
  </svg>
);

const NotificationListItem: React.FC<NotificationListItemProps> = ({
  notification,
  onClick,
  onMarkAsRead,
}) => {
  const { borderColor, textColor } = getImpactStyling(notification.type);
  const isExternal = notification.sourceType === "external";

  const handleClick = () => {
    if (onClick) {
      onClick(notification.id);
    }
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 p-4 border-b border-b-[#d7d8d7] cursor-pointer hover:bg-gray-50 transition-colors",
        notification.isRead ? "bg-[#f0f0f1]" : "bg-white"
      )}
      onClick={handleClick}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center self-stretch">
        <div className="flex items-center gap-2">
          {/* Source Badge - Only show for external */}
          {isExternal && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 py-2 px-px h-6">
                <div className="w-6 h-1 bg-gray-400" />
                <div className="text-black font-medium text-xs leading-[1.0625rem]">
                  {notification.source}
                </div>
              </div>
            </div>
          )}

          {/* Impact Badge */}
          <div
            className="flex justify-center items-center py-1 px-2 rounded-full border"
            style={{ borderColor }}
          >
            <PriorityIcon type={notification.type} />
            <div className="text-[10px] ml-1" style={{ color: textColor }}>
              {notification.type.replace("-", " ")}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1">
          {notification.isRead ? <ReadIcon /> : <NewIcon />}
          <div
            className={cn(
              "font-medium text-xs leading-[1.0625rem]",
              notification.isRead ? "text-[#646669]" : "text-[#ba0c2f]"
            )}
          >
            {notification.isRead ? "Read" : "New"}
          </div>
        </div>
      </div>

      {/* Title */}
      <div
        className={cn(
          "font-medium text-lg leading-6",
          notification.isRead ? "text-[#646669]" : "text-black"
        )}
      >
        {notification.title}
      </div>

      {/* Description */}
      <div
        className={cn(
          "self-stretch text-sm leading-[1.375rem]",
          notification.isRead ? "text-[#646669]" : "text-[#3c3d3f]"
        )}
      >
        {notification.description}
      </div>

      {/* Bottom Section */}
      <div className="flex items-start gap-2 self-stretch">
        {/* Affected Companies */}
        <div className="flex flex-col items-start gap-2">
          <div className="text-[#3c3d3f] font-bold text-[8px] uppercase">
            Affected Companies:
          </div>
          <div className="flex flex-wrap items-start content-start gap-4">
            {notification.affectedCompanies.map((company) => (
              <div
                key={company.uuid}
                className="flex items-center rounded-full"
              >
                <div className="text-[#316bbd] text-center font-medium text-xs leading-[1.1875rem] underline">
                  {company.name}
                </div>
                <ChevronRightIcon className="w-3 h-3 ml-1 text-[#316bbd]" />
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex flex-wrap justify-end items-start content-start gap-4">
            {notification.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-0.5 py-0 px-2 rounded-full bg-[#d5e4f8]"
              >
                <div className="text-[#113b61] text-center text-xs leading-[1.1875rem]">
                  {tag}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[#3c3d3f] font-bold text-[8px] uppercase">
            Tags
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationListItem;
