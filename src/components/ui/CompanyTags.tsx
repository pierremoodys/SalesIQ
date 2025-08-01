import React from "react";
import {
  MapPinIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  CalendarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

interface CompanyTag {
  type: string;
  label: string;
  value: string;
  icon: string;
}

interface CompanyTagsProps {
  tags: CompanyTag[];
  className?: string;
  maxTags?: number; // Limit number of tags to display
  showMore?: boolean; // Show "+X more" text when tags are limited
  tagClassName?: string; // Custom styling for individual tags
  iconSize?: "sm" | "md"; // Icon size variants
}

const CompanyTags: React.FC<CompanyTagsProps> = ({
  tags,
  className = "",
  maxTags,
  showMore = true,
  tagClassName = "",
  iconSize = "md",
}) => {
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
    const iconSizeClass = iconSize === "sm" ? "w-3 h-3" : "w-4 h-4";

    return IconComponent ? (
      <IconComponent className={`${iconSizeClass} text-muted flex-shrink-0`} />
    ) : null;
  };

  // Determine which tags to display
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;
  const remainingCount =
    maxTags && tags.length > maxTags ? tags.length - maxTags : 0;

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-start gap-4 ${className}`}>
      {displayTags.map((tag, index) => (
        <div key={index} className={`flex items-center gap-1 ${tagClassName}`}>
          {getIconComponent(tag.icon)}
          <span className="text-muted text-[14px] font-medium">
            {tag.label} -
          </span>
          <span className="text-description text-[14px]">{tag.value}</span>
        </div>
      ))}

      {/* Show "+X more" if tags are limited */}
      {remainingCount > 0 && showMore && (
        <div className="text-muted text-[14px] font-medium">
          +{remainingCount} more
        </div>
      )}
    </div>
  );
};

export default CompanyTags;
